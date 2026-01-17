import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { View } from '../types';

interface HeroProps {
  onNavigate: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-white pb-16 pt-8 sm:pb-24 sm:pt-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 mb-6">
              <Star className="w-4 h-4 fill-emerald-700" />
              New: AI Recitation Coach
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Master the Quran & <span className="text-emerald-600">Elevate Your Ramadan</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Connect with world-class teachers for personalized Quran lessons and access our complete guide for a spiritually fulfilling Ramadan.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <button
                onClick={() => onNavigate(View.TEACHERS)}
                className="rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all flex items-center gap-2"
              >
                Find a Teacher <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate(View.AI_TUTOR)}
                className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-2 hover:text-emerald-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-emerald-600 text-emerald-600 ml-1" />
                </div>
                Try AI Tutor
              </button>
            </div>
          </div>
          <div className="relative mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
            <div className="relative -m-2 rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="https://images.unsplash.com/photo-1576085852412-552945a0e5b4?q=80&w=2487&auto=format&fit=crop"
                alt="Quran Reading"
                className="w-full rounded-md shadow-2xl ring-1 ring-slate-900/10"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-emerald-50 flex items-center gap-4 animate-bounce-slow hidden sm:flex">
                 <div className="bg-emerald-100 p-3 rounded-full">
                    <Star className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                 </div>
                 <div>
                    <p className="font-bold text-slate-900">4.9/5 Rating</p>
                    <p className="text-xs text-slate-500">From 10k+ Students</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
