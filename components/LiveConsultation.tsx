import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Mic, MicOff, PhoneOff, User, MessageSquare, BookOpen, Volume2, Loader2 } from 'lucide-react';

// Manual implementation of encode/decode as per instructions
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveConsultation: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [aiTranscription, setAiTranscription] = useState<string>('');

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startConsultation = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputAudioCtx;
      audioContextRef.current = outputAudioCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            const source = inputAudioCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioCtx.destination);
          },
          onmessage: async (message) => {
            // Audio output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputAudioCtx) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioCtx, 24000, 1);
              const source = outputAudioCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            // Transcription
            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent.inputTranscription.text);
            }
            if (message.serverContent?.outputTranscription) {
              setAiTranscription(prev => prev + ' ' + message.serverContent.outputTranscription.text);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => endConsultation(),
          onerror: (e) => console.error('Live API Error:', e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: "You are Ustadha Nour, a warm, knowledgeable, and patient Quran and Arabic teacher. Your goal is to help students with pronunciation, tajweed, understanding of verses, or general spiritual questions. Speak with clarity and kindness."
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start Live API:', err);
      setIsConnecting(false);
      alert('Could not start the consultation. Please check microphone permissions.');
    }
  };

  const endConsultation = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    if (inputAudioContextRef.current) inputAudioContextRef.current.close();
    if (audioContextRef.current) audioContextRef.current.close();
    
    setIsActive(false);
    setIsConnecting(false);
    setTranscription('');
    setAiTranscription('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border border-white/30">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black">Live Virtual Consultation</h2>
                <p className="text-emerald-50 opacity-90">Instant guidance from Ustadha Nour</p>
              </div>
            </div>
            {isActive && (
              <div className="flex items-center gap-2 bg-emerald-500/30 px-4 py-2 rounded-full border border-white/20 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-xs font-bold uppercase tracking-wider">Live Session</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 min-h-[500px] flex flex-col">
          {!isActive && !isConnecting ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
              <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center relative">
                <User className="w-16 h-16 text-emerald-600" />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-lg text-white shadow-lg">
                  <Volume2 className="w-5 h-5" />
                </div>
              </div>
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to learn?</h3>
                <p className="text-slate-500 leading-relaxed">
                  Start a voice session with our AI teacher. You can ask about Tajweed, 
                  Quranic meaning, or practice your recitation in real-time.
                </p>
              </div>
              <button 
                onClick={startConsultation}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-3xl font-bold shadow-xl shadow-emerald-600/20 transition-all hover:scale-105 flex items-center gap-3"
              >
                <Mic className="w-6 h-6" />
                Start Live Session
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
                    <User className="w-4 h-4" /> Your Speech
                  </div>
                  <div className="flex-1 text-slate-700 italic overflow-y-auto max-h-48 scrollbar-hide">
                    {transcription || "Listening..."}
                  </div>
                </div>
                <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                    <MessageSquare className="w-4 h-4" /> Ustadha Nour
                  </div>
                  <div className="flex-1 text-emerald-900 font-medium overflow-y-auto max-h-48 scrollbar-hide">
                    {aiTranscription || (isConnecting ? "Establishing connection..." : "Preparing response...")}
                  </div>
                </div>
              </div>

              {/* Call Visualizer */}
              <div className="flex justify-center py-10">
                <div className="flex items-center gap-1.5 h-12">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 bg-emerald-500 rounded-full transition-all duration-300 ${isActive && !isMuted ? 'animate-bounce' : 'h-2 opacity-30'}`}
                      style={{ 
                        animationDelay: `${i * 0.1}s`,
                        height: isActive && !isMuted ? `${Math.random() * 40 + 10}px` : '8px'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {isMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>
                <button 
                  onClick={endConsultation}
                  className="w-20 h-20 rounded-3xl bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-600/30 hover:bg-rose-700 transition-all hover:scale-105"
                >
                  <PhoneOff className="w-8 h-8" />
                </button>
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                   {isConnecting ? <Loader2 className="w-7 h-7 animate-spin" /> : <Volume2 className="w-7 h-7" />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Safety & Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <BookOpen className="w-5 h-5" />, title: "Ask Questions", desc: "Inquire about Surah meanings or Tajweed rules." },
          { icon: <Mic className="w-5 h-5" />, title: "Practice Recitation", desc: "Ustadha Nour will listen and guide your pronunciation." },
          { icon: <User className="w-5 h-5" />, title: "Friendly Support", desc: "A safe, AI-powered space to learn at your own pace." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">{item.icon}</div>
             <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
             <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveConsultation;