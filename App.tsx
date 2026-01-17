import React, { useState } from 'react';
import { View, User } from './types';
import Hero from './components/Hero';
import TeacherList from './components/TeacherList';
import RamadanDashboard from './components/RamadanDashboard';
import AITutor from './components/AITutor';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import { Moon, BookOpen, User as UserIcon, Menu, X, Globe, Heart, Instagram, Twitter, Facebook, LayoutDashboard, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'ADMIN') navigate(View.ADMIN_DASHBOARD);
    else if (user.role === 'TEACHER') navigate(View.TEACHERS); // Assuming teacher wants to see the list or their profile
    else navigate(View.STUDENT_DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate(View.HOME);
  };

  const getDashboardView = () => {
    if (!currentUser) return View.LOGIN;
    if (currentUser.role === 'ADMIN') return View.ADMIN_DASHBOARD;
    if (currentUser.role === 'TEACHER') return View.TEACHERS;
    return View.STUDENT_DASHBOARD;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center cursor-pointer group" onClick={() => navigate(View.HOME)}>
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="ml-3 text-2xl font-black text-slate-900 tracking-tight">Nurul<span className="text-emerald-600">Quran</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <NavButton active={currentView === View.HOME} onClick={() => navigate(View.HOME)}>Home</NavButton>
              <NavButton active={currentView === View.TEACHERS} onClick={() => navigate(View.TEACHERS)}>Find Teachers</NavButton>
              <NavButton active={currentView === View.RAMADAN} onClick={() => navigate(View.RAMADAN)}>Ramadan Guide</NavButton>
              <NavButton active={currentView === View.AI_TUTOR} onClick={() => navigate(View.AI_TUTOR)}>AI Tutor</NavButton>
              
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              
              {currentUser ? (
                <div className="flex items-center gap-2 ml-2">
                  <NavButton active={[View.ADMIN_DASHBOARD, View.STUDENT_DASHBOARD, View.TEACHER_DASHBOARD].includes(currentView)} onClick={() => navigate(getDashboardView())} highlight>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </NavButton>
                  <button 
                    onClick={handleLogout}
                    className="p-2.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <NavButton active={currentView === View.LOGIN} onClick={() => navigate(View.LOGIN)} highlight>Login / Signup</NavButton>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2.5 rounded-xl text-slate-600 bg-slate-100 hover:text-emerald-600">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <MobileNavButton onClick={() => navigate(View.HOME)}>Home</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.TEACHERS)}>Find Teachers</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.RAMADAN)}>Ramadan Guide</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.AI_TUTOR)}>AI Tutor</MobileNavButton>
              {currentUser ? (
                <>
                  <MobileNavButton onClick={() => navigate(getDashboardView())} highlight>Dashboard</MobileNavButton>
                  <MobileNavButton onClick={handleLogout}>Logout</MobileNavButton>
                </>
              ) : (
                <MobileNavButton onClick={() => navigate(View.LOGIN)} highlight>Login / Signup</MobileNavButton>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {currentView === View.HOME && <Hero onNavigate={navigate} />}
        {currentView === View.TEACHERS && <TeacherList userRole={currentUser?.role} onNavigate={navigate} />}
        {currentView === View.RAMADAN && <RamadanDashboard />}
        {currentView === View.AI_TUTOR && <AITutor />}
        {currentView === View.LOGIN && <Login onLogin={handleLogin} onNavigate={navigate} />}
        {currentView === View.SIGNUP && <Signup onNavigate={navigate} />}
        {currentView === View.ADMIN_DASHBOARD && <AdminDashboard />}
        {currentView === View.STUDENT_DASHBOARD && <StudentDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Moon className="w-8 h-8 text-emerald-400 fill-emerald-400" />
                <span className="font-bold text-2xl text-white tracking-tight">Nurul Quran</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">Connecting the Ummah with divine wisdom through technology and tradition. Helping you master the Quran anywhere, anytime.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Learning</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigate(View.TEACHERS)} className="hover:text-emerald-400 transition-colors">Find a Tutor</button></li>
                <li><button onClick={() => navigate(View.AI_TUTOR)} className="hover:text-emerald-400 transition-colors">AI Recitation Coach</button></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Tajweed Basics</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Hifz Tracking</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Community</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigate(View.RAMADAN)} className="hover:text-emerald-400 transition-colors">Ramadan Hub</button></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Teacher Portal</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2024 Nurul Quran Platform. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Available Globally</span>
              <span className="mx-2">•</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Made for the Ummah</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavButton: React.FC<{ children: React.ReactNode; active?: boolean; onClick: () => void; highlight?: boolean }> = ({ children, active, onClick, highlight }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center ${
      highlight 
      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-95' 
      : active 
        ? 'text-emerald-600 bg-emerald-50' 
        : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
    }`}
  >
    {children}
  </button>
);

const MobileNavButton: React.FC<{ children: React.ReactNode; onClick: () => void; highlight?: boolean }> = ({ children, onClick, highlight }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-5 py-4 rounded-2xl text-base font-bold transition-colors ${
       highlight ? 'text-white bg-emerald-600' : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    {children}
  </button>
);

export default App;