
import React, { useState } from 'react';
import { View, User } from './types';
import Hero from './components/Hero';
import TeacherList from './components/TeacherList';
import TeacherMatch from './components/TeacherMatch';
import LearningPaths from './components/LearningPaths';
import Methodology from './components/Methodology';
import RamadanDashboard from './components/RamadanDashboard';
import AITutor from './components/AITutor';
import LiveConsultation from './components/LiveConsultation';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Logo from './components/Logo';
import { 
  Menu, X, LayoutDashboard, LogOut, Map, ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (view: View) => {
    // Route Protection Logic
    if (view === View.ADMIN_DASHBOARD && currentUser?.role !== 'ADMIN') {
      alert("Access Denied: You do not have administrator privileges.");
      setCurrentView(View.LOGIN);
      return;
    }
    
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'ADMIN') navigate(View.ADMIN_DASHBOARD);
    else if (user.role === 'TEACHER') navigate(View.TEACHER_DASHBOARD); 
    else navigate(View.STUDENT_DASHBOARD);
  };

  const handleLogout = async () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_token');
    navigate(View.HOME);
  };

  const getDashboardView = () => {
    if (!currentUser) return View.LOGIN;
    if (currentUser.role === 'ADMIN') return View.ADMIN_DASHBOARD;
    if (currentUser.role === 'TEACHER') return View.TEACHER_DASHBOARD;
    return View.STUDENT_DASHBOARD;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <div className="flex items-center cursor-pointer group" onClick={() => navigate(View.HOME)}>
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-600/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Logo className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4 flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tight leading-none">Nurul<span className="text-emerald-600">Quran</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Platform Hub</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-1">
              <NavButton active={currentView === View.HOME} onClick={() => navigate(View.HOME)}>Home</NavButton>
              <NavButton active={currentView === View.METHODOLOGY} onClick={() => navigate(View.METHODOLOGY)}>Our Way</NavButton>
              <NavButton active={currentView === View.TEACHERS} onClick={() => navigate(View.TEACHERS)}>Find Tutors</NavButton>
              <NavButton active={currentView === View.RAMADAN} onClick={() => navigate(View.RAMADAN)}>Ramadan</NavButton>
              <NavButton active={currentView === View.AI_TUTOR} onClick={() => navigate(View.AI_TUTOR)}>AI Coach</NavButton>
              
              <div className="w-px h-6 bg-slate-200 mx-4"></div>
              
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <NavButton active={[View.ADMIN_DASHBOARD, View.STUDENT_DASHBOARD, View.TEACHER_DASHBOARD].includes(currentView)} onClick={() => navigate(getDashboardView())} highlight>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </NavButton>
                  <button onClick={handleLogout} className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <NavButton active={currentView === View.LOGIN} onClick={() => navigate(View.LOGIN)} highlight>Login / Signup</NavButton>
              )}
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 rounded-2xl text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-8 space-y-2">
              <MobileNavButton onClick={() => navigate(View.HOME)}>Home</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.METHODOLOGY)}>Our Methodology</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.TEACHERS)}>Find Teachers</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.RAMADAN)}>Ramadan Guide</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.AI_TUTOR)}>AI Coach</MobileNavButton>
              <div className="pt-4 border-t border-slate-100 mt-4 space-y-2">
                {currentUser ? (
                  <>
                    <MobileNavButton onClick={() => navigate(getDashboardView())} highlight>Dashboard</MobileNavButton>
                    <MobileNavButton onClick={handleLogout}>Logout Account</MobileNavButton>
                  </>
                ) : (
                  <MobileNavButton onClick={() => navigate(View.LOGIN)} highlight>Join the Community</MobileNavButton>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {currentView === View.HOME && <Hero onNavigate={navigate} />}
          {currentView === View.TEACHERS && <TeacherList userRole={currentUser?.role} onNavigate={navigate} />}
          {currentView === View.TEACHER_MATCH && <TeacherMatch onNavigate={navigate} />}
          {currentView === View.LEARNING_PATHS && <LearningPaths onNavigate={navigate} />}
          {currentView === View.METHODOLOGY && <Methodology />}
          {currentView === View.RAMADAN && <RamadanDashboard />}
          {currentView === View.AI_TUTOR && <AITutor />}
          {currentView === View.LIVE_CONSULTATION && <LiveConsultation />}
          {currentView === View.LOGIN && <Login onLogin={handleLogin} onNavigate={navigate} />}
          {currentView === View.SIGNUP && <Signup onNavigate={navigate} />}
          {currentView === View.ADMIN_DASHBOARD && <AdminDashboard />}
          {currentView === View.STUDENT_DASHBOARD && <StudentDashboard />}
          {currentView === View.TEACHER_DASHBOARD && currentUser && <TeacherDashboard user={currentUser} />}
        </div>
      </main>

      <footer className="bg-slate-900 text-white pt-24 pb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <p className="text-slate-400 font-bold mb-6">Built with Ihsan for the global Ummah.</p>
        </div>
      </footer>
    </div>
  );
};

const NavButton: React.FC<{ children: React.ReactNode; active?: boolean; onClick: () => void; highlight?: boolean }> = ({ children, active, onClick, highlight }) => (
  <button onClick={onClick} className={`px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2 ${highlight ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 active:scale-95' : active ? 'text-emerald-600 bg-emerald-50 shadow-sm' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'}`}>
    {children}
  </button>
);

const MobileNavButton: React.FC<{ children: React.ReactNode; onClick: () => void; highlight?: boolean }> = ({ children, onClick, highlight }) => (
  <button onClick={onClick} className={`block w-full text-left px-6 py-4 rounded-2xl text-lg font-black transition-all ${highlight ? 'text-white bg-emerald-600 shadow-lg shadow-emerald-600/20' : 'text-slate-700 hover:bg-slate-50'}`}>
    {children}
  </button>
);

export default App;
