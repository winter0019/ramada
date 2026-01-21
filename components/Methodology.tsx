import React from 'react';
import { ShieldCheck, BookOpen, Award, CheckCircle2, Star, UserCheck, Zap, Heart } from 'lucide-react';

const Methodology: React.FC = () => {
  return (
    <div className="space-y-24 pb-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
          <ShieldCheck className="w-4 h-4" /> Scholastic Standards
        </div>
        <h2 className="text-5xl font-black text-slate-900 leading-tight">Teaching the <span className="text-emerald-600">Proper Way</span></h2>
        <p className="text-slate-500 text-lg font-medium">We combine traditional Ijazah-based learning with modern pedagogical science to ensure every student receives an authentic and effective education.</p>
      </div>

      {/* Pillars of Our Methodology */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Traditional Sanad",
            desc: "Every master teacher on our platform holds a verifiable Sanad (chain of narration) reaching back to the Prophet (PBUH).",
            icon: <Award className="w-8 h-8 text-amber-500" />,
            bg: "bg-amber-50"
          },
          {
            title: "Structured Curriculum",
            desc: "Learning is not random. We follow a milestone-based curriculum designed by leading Islamic scholars from Al-Azhar and Medina.",
            icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
            bg: "bg-emerald-50"
          },
          {
            title: "Individualized Attention",
            desc: "Our 1-on-1 sessions focus on your unique makharij (articulation) and understanding, ensuring no rule is missed.",
            icon: <UserCheck className="w-8 h-8 text-blue-500" />,
            bg: "bg-blue-50"
          }
        ].map((pillar, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-16 h-16 ${pillar.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              {pillar.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* The Vetting Process */}
      <div className="bg-slate-900 rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-4xl font-black">Our Rigorous <span className="text-emerald-400">Vetting Process</span></h3>
            <p className="text-slate-400 text-lg leading-relaxed">Only 4% of teachers who apply are accepted. We ensure your education is in the best hands through a 4-step verification system.</p>
            
            <div className="space-y-6">
              {[
                "Verification of Academic Degrees & Ijazahs",
                "Live Recitation & Teaching Demonstration",
                "Background & Character Assessment",
                "Continuous Quality Audits by our Scholars"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-3xl group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] space-y-8">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl">Proper Guidance</h4>
                    <p className="text-slate-400 text-sm">Every lesson matters.</p>
                  </div>
               </div>
               <p className="text-slate-300 leading-relaxed font-medium italic">"The best of you are those who learn the Quran and teach it." - Prophet Muhammad (PBUH)</p>
               <div className="pt-8 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-slate-500">
                    <span>Authenticity Rate</span>
                    <span className="text-emerald-400">100%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Closing CTA */}
      <div className="text-center space-y-8 bg-emerald-50 p-16 rounded-[3rem] border border-emerald-100">
        <Heart className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-3xl font-black text-slate-900">Start your proper journey today.</h3>
        <p className="text-slate-500 max-w-xl mx-auto font-medium">Whether you're a child starting Alif-Ba-Ta or an adult seeking Ijazah, our teachers are here to help you succeed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all active:scale-95">Find a Vetted Teacher</button>
          <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black shadow-sm border border-slate-200 hover:bg-slate-50 transition-all">Browse Methodology</button>
        </div>
      </div>
    </div>
  );
};

export default Methodology;