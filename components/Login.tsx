import React, { useState } from 'react';
import { User, View } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (view: View) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock logic: admin@quranhub.com is admin, others based on choice
    const role = email.includes('admin') ? 'ADMIN' : email.includes('teacher') ? 'TEACHER' : 'STUDENT';
    const mockUser: User = {
      id: Math.random().toString(),
      name: email.split('@')[0],
      email,
      role: role as any,
    };
    onLogin(mockUser);
  };

  return (
    <div className="max-w-md mx-auto my-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white shadow-2xl rounded-3xl p-8 border border-slate-100">
        <h1 className="text-3xl font-black text-center text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-center text-slate-500 mb-8">Login to manage your sessions and studies.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-8 text-slate-600">
          Don’t have an account?{' '}
          <button 
            onClick={() => onNavigate(View.SIGNUP)}
            className="text-emerald-600 font-bold hover:underline"
          >
            Sign up
          </button>
        </p>
        
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-center text-slate-400 font-medium uppercase tracking-widest">Demo Credentials</p>
          <div className="flex justify-center gap-4 mt-2">
            <button onClick={() => {setEmail('admin@nurulquran.com'); setPassword('123');}} className="text-[10px] bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">Admin</button>
            <button onClick={() => {setEmail('teacher@nurulquran.com'); setPassword('123');}} className="text-[10px] bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">Teacher</button>
            <button onClick={() => {setEmail('student@nurulquran.com'); setPassword('123');}} className="text-[10px] bg-slate-100 px-2 py-1 rounded hover:bg-slate-200">Student</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;