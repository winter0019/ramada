
import React from 'react';
import { Star, ShieldCheck, Users, BookOpen, Globe, Sparkles, UserPlus, CheckCircle2 } from 'lucide-react';
import { View } from '../types';

interface HeroProps {
  onNavigate: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-32">
      {/* Main Hero Section */}
      <div className="relative overflow-hidden pt-8 lg:pt-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 border border-emerald-100 mb-8 animate-fade-in shadow-sm">
              <Sparkles className="w-4 h-4" />
              Empowering the Ummah with Excellence
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl leading-[1.1]">
              Divine Wisdom, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a86b] to-teal-500">Easily Accessed.</span>
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-slate-500 font-medium">
              Join a global community of 50,000+ students following structured paths with verified mentors. Master the Quran through tradition and technology.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
              <button
                onClick={() => onNavigate(View.SIGNUP)}
                className="w-full sm:w-auto rounded-[2rem] bg-[#00a86b] px-12 py-5.5 text-xl font-black text-white shadow-2xl shadow-emerald-600/30 hover:bg-[#008f5a] hover:-translate-y-1.5 transition-all flex items-center justify-center gap-3 group"
              >
                Join Community <UserPlus className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate(View.TEACHERS)}
                className="w-full sm:w-auto px-10 py-5.5 text-lg font-black text-slate-900 flex items-center justify-center gap-3 hover:text-[#00a86b] transition-all hover:bg-slate-50 rounded-[2rem]"
              >
                Explore Tutors
              </button>
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-10 justify-center lg:justify-start pt-10 border-t border-slate-100">
               <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[10, 11, 12].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} className="w-12 h-12 rounded-full border-4 border-white shadow-xl" alt="" />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight">Trusted by 5k+</p>
                    <div className="flex items-center gap-1 mt-1">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
               </div>
               <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <p className="text-sm font-black text-slate-900">Certified Scholastic Standards</p>
               </div>
            </div>
          </div>

          <div className="relative mt-20 lg:col-span-6 lg:mt-0">
            <div className="relative group">
              <div className="absolute -inset-8 bg-emerald-500/10 rounded-[4rem] blur-3xl group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[3.5rem] bg-white p-6 shadow-2xl border border-slate-50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2340&auto=format&fit=crop"
                  alt="Student learning Quran"
                  className="w-full rounded-[2.5rem] shadow-sm brightness-95 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Floating Stats */}
                <div className="absolute bottom-10 left-10 right-10 flex gap-4">
                   <div className="flex-1 bg-white/95 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-white/50 animate-bounce-slow">
                      <p className="text-2xl font-black text-slate-900">4.9/5</p>
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Student Satisfaction</p>
                   </div>
                   <div className="flex-1 bg-slate-900 p-5 rounded-[2rem] shadow-2xl border border-white/10">
                      <p className="text-2xl font-black text-white">100%</p>
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1">Vetted Mentors</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-24 border-y border-slate-50">
         <TrustItem icon={<Users className="w-8 h-8" />} label="50k+ Active Students" bg="bg-emerald-50" text="text-emerald-600" />
         <TrustItem icon={<Globe className="w-8 h-8" />} label="80+ Countries" bg="bg-blue-50" text="text-blue-600" />
         <TrustItem icon={<BookOpen className="w-8 h-8" />} label="1.2k+ Master Tutors" bg="bg-amber-50" text="text-amber-600" />
         <TrustItem icon={<ShieldCheck className="w-8 h-8" />} label="Proper Ijazah Path" bg="bg-purple-50" text="text-purple-600" />
      </div>
    </div>
  );
};

const TrustItem: React.FC<{ icon: React.ReactNode; label: string; bg: string; text: string }> = ({ icon, label, bg, text }) => (
  <div className="flex flex-col items-center text-center group">
    <div className={`w-20 h-20 ${bg} ${text} rounded-[2rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all`}>
      {icon}
    </div>
    <h3 className="font-black text-slate-900 tracking-tight">{label}</h3>
  </div>
);

export default Hero;
