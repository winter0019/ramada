
import React, { useState } from 'react';
import { View, UserRole } from '../types';
import { ApiService } from '../services/apiService';
import { Mail, User, Lock, ArrowRight, BookOpen, GraduationCap, ShieldCheck, Check, Loader2 } from 'lucide-react';

interface SignupProps {
  onNavigate: (view: View) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await ApiService.signup({ name, email, password, role });
      alert("Mabrouk! Your account has been created.");
      onNavigate(View.LOGIN);
    } catch (err: any) {
      alert(err.message || "Signup failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 lg:my-12 overflow-hidden bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Header Section */}
      <div className="bg-[#4f46e5] p-12 text-center text-white">
        <h1 className="text-5xl font-black mb-4 tracking-tight">Create Account</h1>
        <p className="text-indigo-100 text-lg font-medium opacity-80">Start your Quran learning journey today</p>
      </div>

      <div className="p-10 lg:p-16">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-8">
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-700 ml-1">I want to join as</p>
            <div className="grid grid-cols-3 gap-4">
              <RoleButton 
                active={role === 'STUDENT'} 
                onClick={() => setRole('STUDENT')} 
                icon={<BookOpen className="w-5 h-5" />} 
                label="Student" 
              />
              <RoleButton 
                active={role === 'TEACHER'} 
                onClick={() => setRole('TEACHER')} 
                icon={<GraduationCap className="w-5 h-5" />} 
                label="Teacher" 
              />
              <RoleButton 
                active={role === 'ADMIN'} 
                onClick={() => setRole('ADMIN')} 
                icon={<ShieldCheck className="w-5 h-5" />} 
                label="Admin" 
              />
            </div>
          </div>

          {/* Password Row */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-1">
             <input type="checkbox" required className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" />
             <span className="text-sm font-medium text-slate-500 leading-tight">
               I agree to the <button type="button" className="text-indigo-600 hover:underline">Terms of Service</button> and <button type="button" className="text-indigo-600 hover:underline">Privacy Policy</button>
             </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4263eb] hover:bg-[#3652d1] disabled:bg-slate-300 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
          </button>

          <p className="text-center mt-8 text-slate-500 font-medium">
            Already have an account? <button onClick={() => onNavigate(View.LOGIN)} className="text-indigo-600 font-black hover:underline">Sign in</button>
          </p>
        </form>
      </div>
    </div>
  );
};

const RoleButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
      active 
        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-md ring-4 ring-indigo-500/10' 
        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'
    }`}
  >
    {icon}
    <span className="text-xs font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default Signup;
