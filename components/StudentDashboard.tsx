
import React from 'react';
import { 
  Calendar, Clock, Video, BookOpen, Star, 
  ChevronRight, Activity, Award, CheckCircle2,
  TrendingUp, MessageSquare, BookMarked
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider mb-4">
             Ramadan Day 12 • 1446 AH
          </div>
          <h2 className="text-4xl font-black text-slate-900">Assalamu Alaikum, Omar!</h2>
          <p className="text-slate-500 mt-2 text-lg font-medium">You have <span className="text-emerald-600 font-bold">1 session</span> today with Sheikh Abdullah.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-slate-200 text-slate-900 px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all">
            <MessageSquare className="w-5 h-5" /> Messages
          </button>
          <button className="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
            Book New Lesson
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Lessons Done', value: '24', icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />, bg: 'bg-emerald-50' },
          { label: 'Hours Studied', value: '18.5', icon: <Activity className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Tajweed Level', value: 'Int.', icon: <Award className="w-6 h-6 text-amber-600" />, bg: 'bg-amber-50' },
          { label: 'Memorized', value: '4 Juz', icon: <BookMarked className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
              {stat.icon}
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
          {/* Upcoming Class */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Upcoming Sessions
              </h3>
              <button className="text-emerald-600 font-bold text-sm">View Schedule</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200&h=200" alt="Teacher" className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">Sheikh Abdullah Al-Mansur</h4>
                    <p className="text-emerald-600 font-bold text-sm">Hifz Preservation • Surah Maryam</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-slate-500 text-sm font-medium">
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> Today, 5:00 PM</div>
                      <div className="flex items-center gap-1.5"><Video className="w-4 h-4 text-slate-400" /> 60 mins</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex-1 md:flex-none bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <Video className="w-5 h-5" /> Join Virtual Class
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Progress */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                Learning Progress
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                 <div className="flex justify-between items-center mb-6">
                    <div className="p-3 bg-emerald-50 rounded-2xl">
                      <BookOpen className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-emerald-600 font-black text-xl">65%</span>
                 </div>
                 <h4 className="font-black text-slate-900 mb-2">Surah Al-Baqarah Memorization</h4>
                 <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                 </div>
                 <p className="text-xs text-slate-400 mt-6 font-bold uppercase tracking-wider">Goal: Complete by end of Shawwal</p>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                 <div className="flex justify-between items-center mb-6">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-blue-600 font-black text-xl">82%</span>
                 </div>
                 <h4 className="font-black text-slate-900 mb-2">Tajweed: Sifat al-Huruf</h4>
                 <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: '82%' }}></div>
                 </div>
                 <p className="text-xs text-slate-400 mt-6 font-bold uppercase tracking-wider">Status: Advanced Level Reached</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-xl font-black mb-8 flex items-center gap-3">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                Your Tutors
              </h4>
              <div className="space-y-6">
                {[
                  { name: "Ustadha Fatima", cat: "Kids Foundation", img: "https://i.pravatar.cc/100?img=1" },
                  { name: "Qari Ibrahim", cat: "Advanced Maqamat", img: "https://i.pravatar.cc/100?img=2" },
                  { name: "Sister Maryam", cat: "Tafseer Scholar", img: "https://i.pravatar.cc/100?img=3" }
                ].map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                       <img src={t.img} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-emerald-500 transition-all" alt="" />
                       <div>
                          <p className="text-sm font-black group-hover:text-emerald-400 transition-colors">{t.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.cat}</p>
                       </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-emerald-400 transition-colors" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 text-xs font-black border-2 border-white/5 rounded-2xl hover:bg-white/5 transition-all uppercase tracking-[0.2em]">Explore More</button>
            </div>
            
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] scale-150">
               <BookOpen className="w-48 h-48" />
            </div>
          </div>

          <div className="bg-emerald-600 p-10 rounded-[2.5rem] shadow-2xl text-white">
             <h4 className="text-xl font-black mb-4">Ramadan Challenge</h4>
             <p className="text-emerald-100 text-sm leading-relaxed mb-6">Complete 10 lessons this month to unlock the "Ramadan Scholar" badge!</p>
             <div className="flex items-center justify-between text-xs font-black uppercase mb-2">
                <span>Progress</span>
                <span>7/10</span>
             </div>
             <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
