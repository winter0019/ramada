import React, { useState } from 'react';
import { UserRole, View } from '../types';

interface SignupProps {
  onNavigate: (view: View) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account created successfully (Mock). You can now login.");
    onNavigate(View.LOGIN);
  };

  return (
    <div className="max-w-md mx-auto my-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white shadow-2xl rounded-3xl p-8 border border-slate-100">
        <h1 className="text-3xl font-black text-center text-slate-900 mb-2">Create Account</h1>
        <p className="text-center text-slate-500 mb-8">Join the Nurul Quran community today.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="Sheikh/Student Name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
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
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">I am a...</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button 
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`py-3 rounded-2xl font-bold border-2 transition-all ${role === 'STUDENT' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
              >
                Student
              </button>
              <button 
                type="button"
                onClick={() => setRole('TEACHER')}
                className={`py-3 rounded-2xl font-bold border-2 transition-all ${role === 'TEACHER' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
              >
                Teacher
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-8 text-slate-600">
          Already have an account?{' '}
          <button 
            onClick={() => onNavigate(View.LOGIN)}
            className="text-emerald-600 font-bold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;