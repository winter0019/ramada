import React from 'react';
import { Calendar, Clock, Video, BookOpen, Star } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black text-slate-900">Welcome Back, Student!</h2>
        <p className="text-slate-500 mt-1">Your upcoming Quran lessons and progress tracker.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Upcoming Lessons
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200&h=200" alt="Teacher" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Sheikh Abdullah</h4>
                    <p className="text-sm text-emerald-600 font-medium">Advanced Tajweed</p>
                    <div className="flex items-center gap-3 mt-1 text-slate-500 text-xs">
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> Tomorrow, 5:00 PM</div>
                      <div className="flex items-center gap-1"><Video className="w-3 h-3" /> 60 mins</div>
                    </div>
                  </div>
                </div>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  <Video className="w-5 h-5" />
                  Join Lesson
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Learning Path
            </h3>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
               <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-slate-700">Surah Al-Baqarah Memorization</span>
                  <span className="text-emerald-600 font-black">65%</span>
               </div>
               <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
               </div>
               <p className="text-xs text-slate-400 mt-4">Next Goal: Finish the 3rd Juz by end of Ramadan.</p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              Favorite Teachers
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"></div>
                 <div>
                    <p className="text-sm font-bold">Ustadha Fatima</p>
                    <p className="text-[10px] text-slate-500">Kids & Beginners</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"></div>
                 <div>
                    <p className="text-sm font-bold">Qari Ibrahim</p>
                    <p className="text-[10px] text-slate-500">Advanced Maqamat</p>
                 </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Find More Teachers</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;