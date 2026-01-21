import React, { useState, useEffect } from 'react';
import { User, Session } from '../types';
import { 
  Calendar, Clock, Users, Edit2, Play, 
  CheckCircle, Globe, Video, MessageCircle,
  BarChart, Star, Power
} from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  const [isOnline, setIsOnline] = useState(user.isOnline || false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 12,
    hoursTaught: 145,
    rating: 4.9,
    nextSession: "Today, 5:00 PM"
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('/api/teacher/dashboard');
        const data = await response.json();
        if (data.sessions) setSessions(data.sessions);
      } catch (err) {
        console.error("Failed to fetch teacher dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  const toggleStatus = async () => {
    try {
      const response = await fetch('/api/teacher/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_online: !isOnline }),
      });
      if (response.ok) setIsOnline(!isOnline);
    } catch (err) {
      console.error("Failed to toggle status");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Assalamu Alaikum, {user.name}</h2>
          <p className="text-slate-500 mt-1">Manage your sessions and update your availability.</p>
        </div>
        <button 
          onClick={toggleStatus}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-lg transition-all active:scale-95 ${isOnline ? 'bg-emerald-100 text-emerald-700 shadow-emerald-500/10' : 'bg-slate-100 text-slate-500'}`}
        >
          <Power className={`w-5 h-5 ${isOnline ? 'animate-pulse' : ''}`} />
          {isOnline ? 'Available for Live Help' : 'Go Online'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Students', value: stats.totalStudents, icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Hours Taught', value: stats.hoursTaught, icon: <BarChart className="text-emerald-600" />, bg: 'bg-emerald-50' },
          { label: 'Avg Rating', value: stats.rating, icon: <Star className="text-amber-500 fill-amber-500" />, bg: 'bg-amber-50' },
          { label: 'Next Session', value: '5:00 PM', icon: <Clock className="text-rose-600" />, bg: 'bg-rose-50' }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-4`}>
              {item.icon}
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Upcoming Schedule</h3>
              <button className="text-emerald-600 text-sm font-bold hover:underline">View Calendar</button>
            </div>
            <div className="divide-y divide-slate-50">
              {sessions.length > 0 ? sessions.map((s) => (
                <div key={s.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Student #{s.studentId}</p>
                      <p className="text-xs text-slate-500">{s.startTime} • {s.duration} mins</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center text-slate-400">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No sessions scheduled for today.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-lg font-bold mb-4">Profile Quality</h4>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-3xl font-black">85%</span>
                  <span className="text-emerald-400 text-xs font-bold uppercase">Great</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
                </div>
                <p className="text-slate-400 text-xs mt-4">Tip: Add a video introduction to reach more students!</p>
                <button className="w-full mt-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all text-sm">
                  Edit Profile
                </button>
             </div>
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Globe className="w-32 h-32" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;