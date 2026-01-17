import React from 'react';
import { Users, BookOpen, CreditCard, Activity, CheckCircle, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Teachers', value: '42', icon: <Users className="w-6 h-6 text-emerald-600" />, trend: '+4 this week' },
    { title: 'Total Students', value: '1,284', icon: <Users className="w-6 h-6 text-blue-600" />, trend: '+12% growth' },
    { title: 'Paid Bookings', value: '312', icon: <CreditCard className="w-6 h-6 text-amber-600" />, trend: '$12,400 rev' },
    { title: 'Active Sessions', value: '18', icon: <Activity className="w-6 h-6 text-indigo-600" />, trend: 'Ongoing now' },
    { title: 'Completed Sessions', value: '5,420', icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, trend: 'Lifetime' },
    { title: 'Avg. Rating', value: '4.85', icon: <TrendingUp className="w-6 h-6 text-rose-600" />, trend: 'Student satisfaction' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Admin Dashboard</h2>
          <p className="text-slate-500 mt-1">Global platform overview and statistics.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold text-slate-600">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-slate-500 font-medium text-sm">{stat.title}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Bookings</h3>
              <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">Student {i}</p>
                                <p className="text-xs text-slate-500">Booked Sheikh Abdullah</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-emerald-600 text-sm">$25.00</p>
                            <p className="text-[10px] text-slate-400">2 mins ago</p>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Platform Activity</h3>
              <div className="h-64 flex items-end gap-2 px-4">
                  {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-100 rounded-t-lg transition-all hover:bg-emerald-500 group relative" style={{ height: `${h}%` }}>
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {h}%
                          </span>
                      </div>
                  ))}
              </div>
              <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;