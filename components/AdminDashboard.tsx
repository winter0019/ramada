
import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/apiService';
import { Users, CreditCard, Activity, CheckCircle, TrendingUp, Loader2, AlertCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('auth_token') || '';
        const data = await ApiService.getAdminStats(token);
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-slate-500 font-medium">Loading platform analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-rose-50 rounded-[3rem] border border-rose-100 max-w-2xl mx-auto">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-6" />
        <h3 className="text-2xl font-black text-rose-900 mb-2">Access Forbidden</h3>
        <p className="text-rose-700 font-medium">{error}</p>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Teachers', value: stats?.teachers || '0', icon: <Users className="w-6 h-6 text-emerald-600" />, trend: '+4 this week' },
    { title: 'Total Students', value: stats?.students || '0', icon: <Users className="w-6 h-6 text-blue-600" />, trend: '+12% growth' },
    { title: 'Paid Bookings', value: stats?.paid_sessions || '0', icon: <CreditCard className="w-6 h-6 text-amber-600" />, trend: 'Healthy rev' },
    { title: 'Active Sessions', value: stats?.ongoing_sessions || '0', icon: <Activity className="w-6 h-6 text-indigo-600" />, trend: 'Ongoing now' },
    { title: 'Completed Sessions', value: stats?.completed_sessions || '0', icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, trend: 'Lifetime' },
    { title: 'Online Tutors', value: stats?.online_teachers || '0', icon: <TrendingUp className="w-6 h-6 text-rose-600" />, trend: 'Ready to help' },
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
        {statCards.map((stat, idx) => (
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
    </div>
  );
};

export default AdminDashboard;
