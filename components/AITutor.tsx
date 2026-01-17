import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Mic, Square, Loader, Play, RotateCcw, Send, BookOpen } from 'lucide-react';
import { blobToBase64 } from '../utils/audioUtils';

const AITutor: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      setFeedback(null);
      setAudioUrl(null);
      setAudioBlob(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : MediaRecorder.isTypeSupported('audio/mp4') 
          ? 'audio/mp4' 
          : '';

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const type = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Please ensure permissions are granted.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzeRecitation = async () => {
    if (!audioBlob) return;

    setIsAnalyzing(true);
    try {
      // Initialize inside the function to ensure process.env is available
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const base64Audio = await blobToBase64(audioBlob);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // High quality for recitation analysis
        contents: {
          parts: [
            { inlineData: { mimeType: audioBlob.type, data: base64Audio } },
            { text: `You are a gentle and expert Quran Tajweed teacher. 
              Please listen to this recitation carefully.
              1. Identify the Surah and Verse(s) recited if possible.
              2. Provide specific feedback on Tajweed rules (e.g., Ghunnah, Madd, Qalqalah).
              3. Comment on the Makhraj (articulation points) of letters.
              4. Rate the recitation fluency on a scale of 1-10.
              5. End with an encouraging remark.
              
              Format the response using Markdown with clear headings.` 
            }
          ]
        }
      });

      setFeedback(response.text || "No feedback received.");
    } catch (error) {
      console.error("Analysis error:", error);
      setFeedback("Sorry, there was an error analyzing your recitation. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 max-w-4xl mx-auto">
      <div className="bg-emerald-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <BookOpen className="w-8 h-8" />
          AI Recitation Coach
        </h2>
        <p className="text-emerald-100 mt-2">Record your recitation and get instant expert feedback.</p>
      </div>

      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] bg-slate-50 gap-8">
        
        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          {isRecording ? (
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                   <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                     <Mic className="w-8 h-8 text-white" />
                   </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                   <span className="text-red-600 font-medium animate-pulse">Recording...</span>
                </div>
              </div>
              
              <button 
                onClick={stopRecording}
                className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95"
              >
                <Square className="w-5 h-5 fill-current" />
                Stop Recording
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              {!audioBlob ? (
                <>
                  <button 
                    onClick={startRecording}
                    className="w-24 h-24 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition-colors group cursor-pointer shadow-lg hover:shadow-emerald-500/20"
                  >
                    <Mic className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </button>
                  <p className="text-slate-500 text-center">
                    Tap the microphone to start recording.<br/>
                    Recite clearly for the best feedback.
                  </p>
                </>
              ) : (
                <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="w-6 h-6 text-emerald-600 ml-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Recorded Recitation</p>
                      {audioUrl && (
                        <audio controls src={audioUrl} className="w-full mt-2 h-8" />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={startRecording}
                      className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                      disabled={isAnalyzing}
                    >
                      <RotateCcw className="w-5 h-5" />
                      Record Again
                    </button>
                    <button 
                      onClick={analyzeRecitation}
                      disabled={isAnalyzing}
                      className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Get Feedback
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div className="w-full max-w-2xl mt-8 animate-in fade-in slide-in-from-bottom-8">
            <div className="bg-white rounded-xl border border-emerald-100 shadow-lg overflow-hidden">
               <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <h3 className="font-bold text-emerald-900">Teacher's Feedback</h3>
               </div>
               <div className="p-6 prose prose-emerald prose-sm max-w-none text-slate-700">
                  <div className="whitespace-pre-wrap font-medium leading-relaxed">
                    {feedback}
                  </div>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AITutor;