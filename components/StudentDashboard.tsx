
import React from 'react';
import { 
  Clock, BookOpen, Target, Award, CheckCircle2, 
  Circle, ChevronRight, Users, BookMarked, 
  Brain, History, Bell, Flame, LayoutGrid,
  BarChart2, Book, Calendar, Settings, LogOut
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex animate-in fade-in duration-700">
      {/* Main Content Area (Assuming Sidebar is handled by App.tsx) */}
      <div className="flex-1 p-6 md:p-10 space-y-8 max-w-5xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div className="flex items-center gap-4">
             <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
               <ChevronRight className="w-6 h-6 rotate-180" />
             </button>
             <div>
                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-slate-400 lg:hidden" />
                  Dashboard Overview
                </h1>
                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Welcome back, AISHA IDRIS DANGALAN!</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="bg-amber-50 text-amber-600 px-4 py-2 rounded-full font-black text-sm flex items-center gap-2 border border-amber-100 shadow-sm">
               <Flame className="w-4 h-4 fill-amber-600" /> 0 Day Streak
             </button>
             <div className="relative">
                <button className="p-2.5 bg-white border border-slate-200 rounded-full shadow-sm text-slate-400 hover:text-emerald-600 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-50">2</span>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            icon={<Clock className="w-5 h-5 text-white" />} 
            bg="bg-blue-600" 
            value="0 hrs" 
            label="Learning Hours" 
          />
          <StatCard 
            icon={<BookOpen className="w-5 h-5 text-white" />} 
            bg="bg-emerald-500" 
            value="0" 
            label="Lessons Completed" 
          />
          <StatCard 
            icon={<Target className="w-5 h-5 text-white" />} 
            bg="bg-amber-500" 
            value="0 days" 
            label="Current Streak" 
          />
          <StatCard 
            icon={<Award className="w-5 h-5 text-white" />} 
            bg="bg-rose-500" 
            value="4" 
            label="Achievements" 
          />
        </div>

        {/* Today's Goals */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900">Today's Goals</h3>
            <span className="text-slate-400 text-sm font-bold">January 21, 2025</span>
          </div>
          
          <div className="space-y-4">
            <GoalItem text="Read 2 pages of Quran" status="Done" />
            <GoalItem text="Practice tajweed for 15 min" status="Done" />
            <GoalItem text="Complete vocabulary quiz" status="Pending" />
            <GoalItem text="Listen to tafsir recording" status="Pending" />
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Daily Progress</span>
              <span className="text-xs font-black text-emerald-600">50%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton icon={<Users className="w-6 h-6" />} label="Find Teachers" />
          <ActionButton icon={<Book className="w-6 h-6" />} label="Log Reading" />
          <ActionButton icon={<Brain className="w-6 h-6" />} label="AI Tutor" />
          <ActionButton icon={<History className="w-6 h-6" />} label="View History" />
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-slate-900">Upcoming Sessions</h3>
            <button className="text-blue-600 text-sm font-bold">View All</button>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
               <Calendar className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold mb-2">No upcoming sessions</p>
            <button className="text-blue-600 font-black text-sm hover:underline">Book a session</button>
          </div>
        </div>

        {/* Recent Progress */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-xl font-black text-slate-900 mb-8">Recent Progress</h3>
          <div className="space-y-8">
            <ProgressItem surah="Surah Al-Baqarah" time="2 hours ago" percent={75} color="bg-blue-600" />
            <ProgressItem surah="Surah Ali-Imran" time="Yesterday" percent={45} color="bg-blue-600" />
            <ProgressItem surah="Surah An-Nisa" time="3 days ago" percent={20} color="bg-blue-600" />
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; bg: string; value: string; label: string }> = ({ icon, bg, value, label }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/10 transition-transform group-hover:scale-110`}>
      {icon}
    </div>
    <p className="text-3xl font-black text-slate-900 mb-1">{value}</p>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);

const GoalItem: React.FC<{ text: string; status: 'Done' | 'Pending' }> = ({ text, status }) => (
  <div className={`flex items-center justify-between p-4 rounded-xl border ${status === 'Done' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
    <div className="flex items-center gap-4">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${status === 'Done' ? 'bg-emerald-500 text-white' : 'border-2 border-slate-200 bg-white'}`}>
        {status === 'Done' ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 text-transparent" />}
      </div>
      <span className={`text-sm font-bold ${status === 'Done' ? 'text-slate-700' : 'text-slate-500'}`}>{text}</span>
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Done' ? 'text-emerald-600' : 'text-slate-400'}`}>{status}</span>
  </div>
);

const ActionButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 group">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-50 transition-colors">
      {icon}
    </div>
    <span className="text-xs font-black text-slate-700 whitespace-nowrap">{label}</span>
  </button>
);

const ProgressItem: React.FC<{ surah: string; time: string; percent: number; color: string }> = ({ surah, time, percent, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <div>
        <h4 className="font-black text-slate-900 text-sm mb-1">{surah}</h4>
        <p className="text-xs text-slate-400 font-bold">Last studied: {time}</p>
      </div>
      <span className="text-xs font-black text-blue-600">{percent}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default StudentDashboard;
