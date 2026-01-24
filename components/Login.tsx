
import React, { useState } from 'react';
import { User, View, UserRole } from '../types';
import { ApiService } from '../services/apiService';
import { Loader2, AlertCircle, Mail, ArrowRight, ShieldCheck, User as UserIcon, GraduationCap, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (view: View) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await ApiService.login(email, password);
      localStorage.setItem('auth_token', response.token);
      onLogin(response.user);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
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
    <div className="max-w-6xl mx-auto my-8 lg:my-12 flex flex-col lg:flex-row overflow-hidden bg-white rounded-[3rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-[700px]">
      
      {/* Visual Side (Desktop only) */}
      <div className="hidden lg:flex flex-col justify-between bg-[#00a86b] w-2/5 p-12 text-white relative">
        <div className="relative z-10">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-black leading-tight mb-6">Experience Quranic Learning <span className="opacity-70 font-bold">the proper way.</span></h2>
          <p className="text-emerald-50 text-lg opacity-80 leading-relaxed">
            Join thousands of students and certified teachers in a secure environment built for spiritual excellence.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
             {[21, 22, 23].map(i => (
               <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} className="w-10 h-10 rounded-full border-2 border-emerald-600 shadow-md" alt="" />
             ))}
             <div className="w-10 h-10 bg-emerald-500 rounded-full border-2 border-emerald-600 flex items-center justify-center text-[10px] font-black">+50k</div>
          </div>
          <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Growing Daily</span>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </div>

      {/* Form Side */}
      <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Sign in to continue your Quran journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in zoom-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto w-full">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#00a86b] transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#00a86b] focus:bg-white outline-none transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#00a86b] transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#00a86b] focus:bg-white outline-none transition-all font-medium text-slate-900"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-1">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-[#00a86b] focus:ring-[#00a86b]" />
                 <span className="text-xs font-bold text-slate-500">Remember me</span>
               </label>
               <button type="button" className="text-xs font-bold text-[#00a86b] hover:underline">Forgot password?</button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00a86b] hover:bg-[#008f5a] disabled:bg-slate-300 text-white py-4.5 rounded-2xl font-black shadow-xl shadow-emerald-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In"}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-slate-400"><span className="bg-white px-4">or continue with</span></div>
          </div>

          <div className="space-y-4">
             <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Demo Accounts (click to fill)</p>
             <div className="space-y-2">
                <DemoItem 
                  icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />} 
                  label="Admin" 
                  email="admin@nurulquran.com" 
                  onClick={() => quickLogin('ADMIN')}
                />
                <DemoItem 
                  icon={<GraduationCap className="w-5 h-5 text-blue-600" />} 
                  label="Teacher" 
                  email="teacher@nurulquran.com" 
                  onClick={() => quickLogin('TEACHER')}
                />
                <DemoItem 
                  icon={<UserIcon className="w-5 h-5 text-amber-600" />} 
                  label="Student" 
                  email="student@nurulquran.com" 
                  onClick={() => quickLogin('STUDENT')}
                />
             </div>
          </div>

          <p className="text-center mt-8 text-slate-500 font-medium">
            Don't have an account? <button onClick={() => onNavigate(View.SIGNUP)} className="text-[#00a86b] font-black hover:underline">Sign up</button>
          </p>
        </form>
      </div>
    </div>
  );
};

const DemoItem: React.FC<{ icon: React.ReactNode; label: string; email: string; onClick: () => void }> = ({ icon, label, email, onClick }) => (
  <button 
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
  >
    <div className="p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
    <div className="text-left">
      <p className="text-sm font-black text-slate-900 leading-none mb-1">{label}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{email}</p>
    </div>
  </button>
);

export default Login;
