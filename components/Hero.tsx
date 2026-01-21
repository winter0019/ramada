
import React from 'react';
import { ArrowRight, Star, ShieldCheck, Users, BookOpen, Globe, Sparkles, Map, UserPlus } from 'lucide-react';
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
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-black text-emerald-700 border border-emerald-100 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              World's #1 Quran Learning Platform
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl leading-[1.1]">
              Divine Knowledge, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">The Proper Way.</span>
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-slate-500 font-medium">
              Join 50,000+ students following structured learning paths with verified scholars. Master Tajweed, Hifz, and Tafseer through traditional methodologies.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
              <button
                onClick={() => onNavigate(View.SIGNUP)}
                className="w-full sm:w-auto rounded-2xl bg-emerald-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
              >
                Join the Community <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate(View.TEACHERS)}
                className="w-full sm:w-auto px-10 py-5 text-lg font-black text-slate-900 flex items-center justify-center gap-3 hover:text-emerald-600 transition-colors group"
              >
                Explore Vetted Tutors
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start pt-8 border-t border-slate-100">
               <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" alt="Student" />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-sm">+5k</div>
               </div>
               <div>
                  <div className="flex items-center gap-1 mb-1">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-900">Standardizing Excellence</p>
               </div>
            </div>
          </div>

          <div className="relative mt-20 lg:col-span-6 lg:mt-0">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-[3rem] blur-2xl group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[2.5rem] bg-white p-4 shadow-2xl border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1576085852412-552945a0e5b4?q=80&w=2487&auto=format&fit=crop"
                  alt="Quran Student"
                  className="w-full rounded-[2rem] shadow-sm grayscale hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Floating UI Elements */}
                <div className="absolute top-12 -left-12 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-emerald-50 animate-bounce-slow hidden xl:block">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm">Proper Vetting</p>
                        <p className="text-xs text-slate-500">Scholastic verification</p>
                      </div>
                   </div>
                </div>

                <div className="absolute -bottom-10 -right-10 bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl hidden lg:block border-8 border-white">
                   <p className="text-4xl font-black text-white mb-1">4.9/5</p>
                   <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Global Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20 border-y border-slate-100">
         <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
               <Users className="w-8 h-8" />
            </div>
            <h3 className="font-black text-slate-900">50,000+ Students</h3>
         </div>
         <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
               <Globe className="w-8 h-8" />
            </div>
            <h3 className="font-black text-slate-900">80+ Countries</h3>
         </div>
         <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
               <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-black text-slate-900">1,200+ Teachers</h3>
         </div>
         <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-black text-slate-900">100% Vetted</h3>
         </div>
      </div>
    </div>
  );
};

export default Hero;
