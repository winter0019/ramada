
import React, { useState, useMemo } from 'react';
import { UserRole, View } from '../types';
import { ApiService } from '../services/apiService';
// Added Loader2 to the imports to fix "Cannot find name 'Loader2'" error
import { Mail, User, Lock, ArrowRight, Eye, EyeOff, Check, X, ShieldAlert, Phone, BookOpen, Sparkles, Heart, Brain, ChevronLeft, Users, CheckCircle2, Loader2 } from 'lucide-react';

interface SignupProps {
  onNavigate: (view: View) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 2 State
  const [currentLevel, setCurrentLevel] = useState<string>('Beginner');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Learn to read Quran fluently']);

  // Step 3 State
  const [preferredGender, setPreferredGender] = useState<string>('No Preference');
  const [learningPrefs, setLearningPrefs] = useState<string[]>(['One-on-one sessions']);

  // Password Validation Logic
  const validationItems = useMemo(() => [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Includes a number', met: /\d/.test(password) },
    { label: 'Special character', met: /[@$!%*#?&]/.test(password) },
    { label: 'Case sensitive', met: /[a-z]/.test(password) && /[A-Z]/.test(password) }
  ], [password]);

  const strength = useMemo(() => {
    const metCount = validationItems.filter(item => item.met).length;
    if (metCount === 0) return { label: 'None', color: 'bg-slate-200', text: 'text-slate-400', width: '0%' };
    if (metCount <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500', width: '33%' };
    if (metCount === 3) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-500', width: '66%' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500', width: '100%' };
  }, [validationItems]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const togglePref = (pref: string) => {
    if (learningPrefs.includes(pref)) {
      setLearningPrefs(learningPrefs.filter(p => p !== pref));
    } else {
      setLearningPrefs([...learningPrefs, pref]);
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (password.length < 8 || validationItems.filter(v => v.met).length < 4) {
        alert("Please meet all password security requirements.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSubmitting(true);
      try {
        await ApiService.signup({
          name,
          email,
          password,
          phone,
          level: currentLevel,
          goals: selectedGoals,
          preferences: {
            gender: preferredGender,
            style: learningPrefs
          },
          role: 'STUDENT'
        });
        alert("Mabrouk! Your account has been created successfully. You can now log in.");
        onNavigate(View.LOGIN);
      } catch (err: any) {
        alert(err.message || "Failed to create account.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const steps = [
    { id: 1, label: 'Account', icon: <Mail className="w-5 h-5" /> },
    { id: 2, label: 'Goals', icon: <Sparkles className="w-5 h-5" /> },
    { id: 3, label: 'Preferences', icon: <Heart className="w-5 h-5" /> },
    { id: 4, label: 'Confirm', icon: <Check className="w-5 h-5" /> }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Top Stepper */}
      <div className="flex items-center justify-between mb-12 px-4 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -z-10 -translate-y-1/2 mx-12"></div>
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-2 flex-1 relative">
            {/* Step Line */}
            {i > 0 && (
              <div className={`absolute top-[22px] -left-1/2 w-full h-1 -z-10 transition-colors duration-500 ${step >= s.id ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
            )}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 border-4 ${
              step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600' : 'bg-slate-100 text-slate-400 border-white'
            }`}>
              {s.icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              step >= s.id ? 'text-blue-600' : 'text-slate-400'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 py-16 text-center text-white relative">
          <div className="relative z-10 flex flex-col items-center">
            <BookOpen className="w-12 h-12 mb-4 opacity-80" />
            <h1 className="text-4xl font-black mb-2 tracking-tight">
              {step === 1 ? 'Create Student Account' : step === 2 ? 'Your Learning Goals' : step === 3 ? 'Your Preferences' : 'Final Confirmation'}
            </h1>
            <p className="text-blue-100 font-medium">
              {step === 1 ? 'Begin your Quran learning journey' : step === 2 ? 'What do you want to achieve?' : step === 3 ? 'How do you prefer to learn?' : 'Ready to start your journey?'}
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)]"></div>
        </div>

        <div className="p-10 lg:p-14">
          <form onSubmit={handleContinue} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-900"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-900"
                    />
                  </div>

                  {/* Password Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create password"
                          className="w-full pl-14 pr-12 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-900"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Confirm *</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Strength Bar */}
                  {password && (
                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Security Strength</span>
                        <span className={`text-xs font-black uppercase tracking-wider ${strength.text}`}>{strength.label}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }}></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {validationItems.map((v, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${v.met ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                               {v.met && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wide ${v.met ? 'text-emerald-700' : 'text-slate-400'}`}>{v.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 h-full w-14 flex items-center justify-center border-r border-slate-200">
                        <span className="text-slate-400 font-bold text-sm">+1</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="1 234 567 8900"
                        className="w-full pl-20 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Current Level Selection */}
                <div className="space-y-5">
                  <label className="text-sm font-black text-slate-800 uppercase tracking-widest ml-1">Current Level</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { title: 'Beginner', desc: 'New to Quran reading, learning the basics' },
                      { title: 'Intermediate', desc: 'Can read but need tajweed improvement' },
                      { title: 'Advanced', desc: 'Focus on memorization and recitation' }
                    ].map((level) => (
                      <button
                        key={level.title}
                        type="button"
                        onClick={() => setCurrentLevel(level.title)}
                        className={`p-7 rounded-[2rem] border-2 text-left transition-all ${
                          currentLevel === level.title
                            ? 'bg-blue-50 border-blue-600 ring-4 ring-blue-600/10'
                            : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                        }`}
                      >
                        <h4 className={`font-black text-xl mb-1.5 ${currentLevel === level.title ? 'text-blue-700' : 'text-slate-900'}`}>{level.title}</h4>
                        <p className={`text-xs font-bold leading-relaxed ${currentLevel === level.title ? 'text-blue-600/80' : 'text-slate-400'}`}>{level.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Learning Goals Section */}
                <div className="space-y-5 pt-4">
                  <div className="flex flex-col gap-1 ml-1">
                    <label className="text-sm font-black text-slate-800 uppercase tracking-widest">Learning Goals *</label>
                    <p className="text-xs text-slate-400 font-bold">Select all that apply</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Learn to read Quran fluently',
                      'Improve Tajweed',
                      'Memorize the Quran (Hifz)',
                      'Learn Arabic language',
                      'Understand Tafsir',
                      'Daily recitation habit',
                      'Prepare for competition',
                      'Teach my children',
                      'General knowledge'
                    ].map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`px-8 py-3.5 rounded-full text-sm font-black transition-all border-2 ${
                          selectedGoals.includes(goal)
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20'
                            : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Gender Preference */}
                <div className="space-y-5">
                  <label className="text-sm font-black text-slate-800 uppercase tracking-widest ml-1">Teacher Preference</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { title: 'Male', icon: '👦' },
                      { title: 'Female', icon: '👩' },
                      { title: 'No Preference', icon: <Users className="w-8 h-8 mx-auto" /> }
                    ].map((gender) => (
                      <button
                        key={typeof gender.title === 'string' ? gender.title : 'NoPref'}
                        type="button"
                        onClick={() => setPreferredGender(gender.title)}
                        className={`p-10 rounded-[2.5rem] border-2 text-center transition-all flex flex-col items-center justify-center gap-4 ${
                          preferredGender === gender.title
                            ? 'bg-blue-50 border-blue-600 ring-4 ring-blue-600/10 shadow-lg'
                            : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                        }`}
                      >
                        <div className="text-4xl">
                          {gender.icon}
                        </div>
                        <h4 className={`font-black text-lg ${preferredGender === gender.title ? 'text-blue-700' : 'text-slate-900'}`}>{gender.title}</h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Learning Style Preferences */}
                <div className="space-y-5 pt-4">
                  <div className="flex flex-col gap-1 ml-1">
                    <label className="text-sm font-black text-slate-800 uppercase tracking-widest">Learning Style</label>
                    <p className="text-xs text-slate-400 font-bold">Customize your experience</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'One-on-one sessions',
                      'Group classes',
                      'Recorded lessons',
                      'Flexible schedule',
                      'Fixed schedule',
                      'Intensive program',
                      'Casual learning'
                    ].map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => togglePref(pref)}
                        className={`px-8 py-3.5 rounded-full text-sm font-black transition-all border-2 ${
                          learningPrefs.includes(pref)
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20'
                            : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center py-6">
                   <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                   </div>
                   <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">You're all set, {name.split(' ')[0]}!</h3>
                   <p className="text-slate-500 font-bold">Please review your profile details below.</p>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden divide-y divide-slate-100 shadow-inner">
                  <div className="p-8 flex justify-between items-center group">
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5">Account & Contact</p>
                      <p className="font-black text-slate-900 text-lg">{email}</p>
                      <p className="text-sm text-slate-400 font-bold">{phone || 'No phone provided'}</p>
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="text-blue-600 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                  </div>

                  <div className="p-8 flex justify-between items-center group">
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5">Starting Level</p>
                      <p className="font-black text-slate-900 text-lg">{currentLevel}</p>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="text-blue-600 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                  </div>

                  <div className="p-8 group">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Learning Goals</p>
                        <button type="button" onClick={() => setStep(2)} className="text-blue-600 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                       {selectedGoals.map(goal => (
                         <span key={goal} className="px-5 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm">{goal}</span>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                   <ShieldAlert className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                   <div>
                      <p className="text-base font-black text-blue-900">Platform Commitment</p>
                      <p className="text-sm text-blue-700/80 leading-relaxed mt-2 font-medium">By completing registration, you agree to follow the scholastic standards of the Nurul Quran community and its ethical guidelines.</p>
                   </div>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-10 border-t border-slate-50 mt-10">
              <button 
                type="button"
                onClick={() => step > 1 ? setStep(step - 1) : onNavigate(View.LOGIN)}
                className="text-slate-400 font-black hover:text-slate-900 transition-all flex items-center gap-2 uppercase tracking-widest text-xs"
              >
                {step > 1 ? 'Back to previous' : 'Back to Login'}
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-14 py-5 rounded-2xl font-black shadow-2xl shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    {step === 4 ? 'Complete Registration' : 'Continue'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <p className="text-center mt-12 text-slate-300 font-black text-[10px] uppercase tracking-[0.4em]">
        © 2024 Nurul Quran Platform. Built for Excellence.
      </p>
    </div>
  );
};

export default Signup;
