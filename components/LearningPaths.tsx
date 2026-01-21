import React from 'react';
import { BookOpen, Star, ShieldCheck, Map, ArrowRight, CheckCircle2, Trophy, Clock } from 'lucide-react';
import { View } from '../types';

const PATHS = [
  {
    id: 'tajweed-mastery',
    title: 'The Tajweed Mastery Path',
    desc: 'The proper foundation of Quranic recitation, focusing on pronunciation and rules.',
    icon: <Star className="w-8 h-8 text-amber-500" />,
    color: 'emerald',
    steps: [
      { name: 'Makharij al-Huruf', status: 'completed', desc: 'Points of articulation for all 28 letters.' },
      { name: 'Sifat al-Huruf', status: 'current', desc: 'The characteristics and qualities of sounds.' },
      { name: 'Ghunnah & Madd Rules', status: 'upcoming', desc: 'Rules of nasalization and prolongation.' },
      { name: 'Ijazah Preparation', status: 'upcoming', desc: 'Final review for certification.' }
    ]
  },
  {
    id: 'hifz-journey',
    title: 'The Hifz Preservation Journey',
    desc: 'A systematic way to memorize the Quran with long-term retention strategies.',
    icon: <Trophy className="w-8 h-8 text-emerald-500" />,
    color: 'blue',
    steps: [
      { name: 'Juz Amma Foundation', status: 'upcoming', desc: 'Memorizing the 30th Juz with perfection.' },
      { name: 'Mutashabihat Mastery', status: 'upcoming', desc: 'Understanding verses that look similar.' },
      { name: 'Continuous Muraja’ah', status: 'upcoming', desc: 'The "proper" daily review system.' },
      { name: 'Complete Memorization', status: 'upcoming', desc: 'Finishing the entire 604 pages.' }
    ]
  }
];

const LearningPaths: React.FC<{ onNavigate: (view: View) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-20">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
          <Map className="w-4 h-4" /> Methodology & Progress
        </div>
        <h2 className="text-5xl font-black text-slate-900 leading-tight">Follow the <span className="text-emerald-600">Proper Path</span></h2>
        <p className="text-slate-500 text-lg">We don't just teach verses; we provide a structured methodology built on traditional Islamic pedagogical standards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {PATHS.map((path) => (
          <div key={path.id} className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden group">
            <div className="p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {path.icon}
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended Track</p>
                  <p className="text-lg font-black text-slate-900">{path.steps.length} Milestones</p>
                </div>
              </div>
              
              <h3 className="text-3xl font-black text-slate-900 mb-4">{path.title}</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">{path.desc}</p>
              
              <div className="space-y-6 relative">
                {/* Visual Line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-100"></div>
                
                {path.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-6 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border ${
                      step.status === 'completed' ? 'bg-emerald-500 text-white border-emerald-600' :
                      step.status === 'current' ? 'bg-amber-500 text-white border-amber-600 animate-pulse' :
                      'bg-white text-slate-300 border-slate-100'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className={`font-black ${step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-900'}`}>{step.name}</h4>
                      <p className="text-sm text-slate-500 font-medium mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => onNavigate(View.TEACHER_MATCH)}
                className="w-full mt-12 bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all active:scale-95"
              >
                Find a Path Specialist <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-600 rounded-[3rem] p-12 text-white text-center relative overflow-hidden shadow-2xl">
         <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-black">Not sure where to start?</h3>
            <p className="text-emerald-100 text-lg max-w-xl mx-auto">Our AI Consultant can help you assess your current level and recommend the proper teacher for your unique needs.</p>
            <button 
              onClick={() => onNavigate(View.TEACHER_MATCH)}
              className="bg-white text-emerald-600 px-10 py-5 rounded-2xl font-black shadow-xl hover:shadow-white/20 transition-all active:scale-95 inline-flex items-center gap-2"
            >
              Start Your Assessment <ShieldCheck className="w-5 h-5" />
            </button>
         </div>
         {/* Background Decor */}
         <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
         <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default LearningPaths;