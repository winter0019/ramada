import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Sparkles, ArrowRight, CheckCircle2, Loader2, User, BookOpen, Heart, Brain, ChevronLeft } from 'lucide-react';
import { View } from '../types';

const QUESTIONS = [
  {
    id: 'goal',
    question: "What is your primary learning goal?",
    options: [
      { id: 'hifz', label: 'Memorization (Hifz)', icon: <BookOpen className="w-5 h-5" /> },
      { id: 'tajweed', label: 'Correction of Recitation (Tajweed)', icon: <Sparkles className="w-5 h-5" /> },
      { id: 'tafseer', label: 'Understanding Meaning (Tafseer)', icon: <Heart className="w-5 h-5" /> },
      { id: 'beginners', label: 'Learn from Basics (Beginners)', icon: <User className="w-5 h-5" /> }
    ]
  },
  {
    id: 'level',
    question: "What is your current level?",
    options: [
      { id: 'absolute', label: 'Absolute Beginner', description: 'Starting from Alif-Ba-Ta' },
      { id: 'intermediate', label: 'Intermediate', description: 'Can read but need fluency' },
      { id: 'advanced', label: 'Advanced', description: 'Looking for mastery or ijazah' }
    ]
  },
  {
    id: 'style',
    question: "Which teaching style do you prefer?",
    options: [
      { id: 'gentle', label: 'Gentle & Patient', icon: <Heart className="w-5 h-5" /> },
      { id: 'strict', label: 'Disciplined & Fast-paced', icon: <Brain className="w-5 h-5" /> },
      { id: 'academic', label: 'Academic & Thorough', icon: <BookOpen className="w-5 h-5" /> }
    ]
  }
];

const TEACHERS_CONTEXT = `
Available Teachers:
1. Sheikh Abdullah Al-Mansur: Hifz master, 15 years exp, disciplined but encouraging, Al-Azhar graduate.
2. Ustadha Fatima Zahra: Kids and Beginners expert, very patient, uses fun visuals, 8 years exp.
3. Qari Ibrahim Khalil: Advanced Tajweed and Maqamat, world-renowned reciter, focuses on melodic beauty.
4. Sister Maryam Siddiqui: Tafseer and Spiritual growth specialist, focuses on applying Quran to life.
`;

const TeacherMatch: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isMatching, setIsMatching] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleSelect = (optionId: string) => {
    const currentQuestionId = QUESTIONS[step].id;
    const newAnswers = { ...answers, [currentQuestionId]: optionId };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      findMatch(newAnswers);
    }
  };

  const findMatch = async (finalAnswers: Record<string, string>) => {
    setIsMatching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Based on the following student preferences, recommend the best teacher from the provided list for a "proper and good" learning experience.
      
      Student Profile:
      - Goal: ${finalAnswers.goal}
      - Level: ${finalAnswers.level}
      - Preferred Style: ${finalAnswers.style}
      
      ${TEACHERS_CONTEXT}
      
      Return as JSON with:
      - teacherName: The name of the recommended teacher
      - reason: A personalized explanation of why this teacher is the proper fit
      - focusArea: What the first lesson should focus on for this student`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              teacherName: { type: Type.STRING },
              reason: { type: Type.STRING },
              focusArea: { type: Type.STRING }
            },
            required: ["teacherName", "reason", "focusArea"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setRecommendation(data);
    } catch (err) {
      console.error("Matching error:", err);
      // Fallback
      setRecommendation({
        teacherName: "Sheikh Abdullah Al-Mansur",
        reason: "Based on your interest in serious learning, the Sheikh's 15 years of experience provides the most proper foundation.",
        focusArea: "Assessment of current recitation and setting a long-term goal."
      });
    } finally {
      setIsMatching(false);
    }
  };

  if (isMatching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-8 animate-in fade-in zoom-in">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Finding Your Perfect Mentor...</h2>
          <p className="text-slate-500 mt-2">Our AI is analyzing teacher profiles to find the most proper match for your journey.</p>
        </div>
      </div>
    );
  }

  if (recommendation) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-50 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-10 text-white text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <CheckCircle2 className="w-4 h-4" /> Match Found
            </div>
            <h2 className="text-4xl font-black">Your Proper Teacher Match</h2>
          </div>
          
          <div className="p-10 space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
               <div className="w-32 h-32 rounded-3xl bg-emerald-600 flex items-center justify-center text-white text-4xl font-black shadow-xl">
                 {recommendation.teacherName.charAt(0)}
               </div>
               <div className="flex-1 text-center md:text-left">
                 <h3 className="text-3xl font-black text-slate-900">{recommendation.teacherName}</h3>
                 <p className="text-emerald-600 font-bold mt-1">Recommended Specialist</p>
               </div>
               <button 
                onClick={() => onNavigate(View.TEACHERS)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20"
               >
                 View Profile <ArrowRight className="w-5 h-5" />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Why this teacher?</h4>
                 <p className="text-slate-600 leading-relaxed font-medium">{recommendation.reason}</p>
               </div>
               <div className="space-y-4">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">First Lesson Focus</h4>
                 <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <p className="text-emerald-900 font-bold">{recommendation.focusArea}</p>
                 </div>
               </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-center gap-4">
              <button 
                onClick={() => {setRecommendation(null); setStep(0); setAnswers({});}} 
                className="text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center gap-2"
              >
                Start Quiz Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900">Find Your Proper Match</h2>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">Answer a few questions to connect with the teacher best suited for your spiritual and academic goals.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="h-2 bg-slate-100 w-full">
           <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="p-10 md:p-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Step {step + 1} of {QUESTIONS.length}</span>
            <h3 className="text-3xl font-black text-slate-900">{currentQ.question}</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className="group flex items-center justify-between p-6 rounded-3xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left active:scale-98"
              >
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                     {(opt as any).icon || <CheckCircle2 className="w-6 h-6" />}
                   </div>
                   <div>
                     <p className="font-black text-slate-900 group-hover:text-emerald-900 transition-colors">{opt.label}</p>
                     {(opt as any).description && <p className="text-sm text-slate-500 group-hover:text-emerald-700/70 transition-colors">{(opt as any).description}</p>}
                   </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" /> Previous Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherMatch;