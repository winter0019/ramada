import React, { useEffect, useState } from 'react';
import { getRamadanTip } from '../services/geminiService';
import { Moon, Sun, Coffee, BookHeart, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Day 1', energy: 60 },
  { day: 'Day 5', energy: 75 },
  { day: 'Day 10', energy: 85 },
  { day: 'Day 15', energy: 90 },
  { day: 'Day 20', energy: 80 },
  { day: 'Day 25', energy: 95 },
  { day: 'Day 30', energy: 100 },
];

const RamadanDashboard: React.FC = () => {
  const [dailyContent, setDailyContent] = useState<{tip: string, dua: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const content = await getRamadanTip();
      setDailyContent(content);
      setLoading(false);
    };
    fetchContent();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div>
            <h2 className="text-3xl font-bold text-slate-900">Ramadan Companion</h2>
            <p className="text-slate-600">Track your progress and maximize your blessings.</p>
         </div>
         <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Ramadan Day 12</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timing Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-medium text-slate-300 mb-6">Prayer Times (London, UK)</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-sm text-slate-400">Suhoor Ends</p>
                  <p className="text-2xl font-bold">04:12 AM</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">Upcoming</span>
              </div>
            </div>
            
            <div className="h-px bg-slate-700"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-8 h-8 text-amber-500" />
                <div>
                  <p className="text-sm text-slate-400">Iftar Time</p>
                  <p className="text-2xl font-bold">07:54 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tip Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
             <BookHeart className="w-32 h-32" />
          </div>
          <h3 className="text-lg font-medium text-emerald-100 mb-4 flex items-center gap-2">
            <Coffee className="w-5 h-5" />
            Daily Wisdom
          </h3>
          
          {loading ? (
             <div className="animate-pulse space-y-3">
               <div className="h-4 bg-emerald-500/50 rounded w-3/4"></div>
               <div className="h-4 bg-emerald-500/50 rounded w-1/2"></div>
             </div>
          ) : (
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <p className="font-medium text-lg mb-2">💡 Tip of the Day</p>
                <p className="text-emerald-50 leading-relaxed">{dailyContent?.tip}</p>
              </div>
              
              <div className="bg-amber-500/20 p-4 rounded-xl backdrop-blur-sm border border-amber-500/30">
                <p className="font-medium text-amber-200 text-sm mb-1">Dua for Today</p>
                <p className="font-arabic text-2xl text-white mb-2 text-right dir-rtl">{dailyContent?.dua.split('(')[0]}</p>
                <p className="text-emerald-100 text-sm italic">{dailyContent?.dua.match(/\((.*?)\)/)?.[0] || dailyContent?.dua}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
         <h3 className="text-lg font-bold text-slate-900 mb-6">Spiritual Energy Tracker</h3>
         <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="energy" stroke="#059669" fillOpacity={1} fill="url(#colorEnergy)" />
              </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};

export default RamadanDashboard;
