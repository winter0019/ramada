
import React, { useState } from 'react';
import { User, View, UserRole } from '../types';
import { ApiService } from '../services/apiService';
import { Loader2, AlertCircle, Mail, ArrowRight, ShieldCheck, User as UserIcon, GraduationCap, Lock, UserPlus } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (view: View) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await ApiService.login(email, password);
      localStorage.setItem('auth_token', response.token);
      onLogin(response.user);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (role: UserRole) => {
    const emailMap = {
      ADMIN: 'admin@nurulquran.com',
      TEACHER: 'teacher@nurulquran.com',
      STUDENT: 'student@nurulquran.com'
    };
    setEmail(emailMap[role]);
    setPassword(role === 'ADMIN' ? 'admin-password-2025' : 'password123');
  };

  return (
    <div className="max-w-6xl mx-auto my-8 lg:my-16 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Visual Side */}
      <div className="hidden lg:flex flex-col justify-between bg-emerald-600 p-16 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/30">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-black leading-tight mb-6">Experience Quranic Learning <span className="text-emerald-200">the proper way.</span></h2>
          <p className="text-emerald-50 text-xl font-medium leading-relaxed max-w-md opacity-90">
            Join thousands of students and certified teachers in a secure, structured environment built for spiritual excellence.
          </p>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[20, 21, 22].map(id => (
                <img key={id} src={`https://i.pravatar.cc/100?img=${id}`} className="w-12 h-12 rounded-full border-4 border-emerald-600 shadow-xl" alt="User" />
              ))}
              <div className="w-12 h-12 bg-emerald-500 rounded-full border-4 border-emerald-600 flex items-center justify-center text-[10px] font-black shadow-xl">+50k</div>
            </div>
            <p className="text-sm font-bold text-emerald-100">Joined by students worldwide</p>
          </div>
        </div>

        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Form Side */}
      <div className="p-10 lg:p-20 flex flex-col justify-center">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Continue your journey of divine knowledge.</p>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm font-bold leading-snug">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
              <button type="button" className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest transition-colors">Forgot Password?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-5 rounded-2xl font-black shadow-xl shadow-emerald-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
            <p className="text-slate-500 font-medium">
              New to Nurul Quran?{' '}
              <button 
                onClick={() => onNavigate(View.SIGNUP)}
                className="text-emerald-600 font-black hover:underline inline-flex items-center gap-1.5"
              >
                Create an account <UserPlus className="w-4 h-4" />
              </button>
            </p>
        </div>

        <div className="mt-14 pt-10 border-t border-slate-100">
          <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] text-center mb-8">Quick Access for Testing</p>
          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => quickLogin('STUDENT')} className="flex flex-col items-center gap-2 p-4 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group shadow-sm hover:shadow-md">
              <UserIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
              <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-emerald-700 tracking-wider">Student</span>
            </button>
            <button onClick={() => quickLogin('TEACHER')} className="flex flex-col items-center gap-2 p-4 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group shadow-sm hover:shadow-md">
              <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
              <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-emerald-700 tracking-wider">Teacher</span>
            </button>
            <button onClick={() => quickLogin('ADMIN')} className="flex flex-col items-center gap-2 p-4 rounded-3xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group shadow-sm hover:shadow-md">
              <ShieldCheck className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
              <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-emerald-700 tracking-wider">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
