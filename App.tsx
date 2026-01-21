
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
  Menu, X, LayoutDashboard, LogOut, Map, ShieldCheck,
  LayoutGrid, BarChart2, Book, Calendar, Settings,
  MessageCircle, Users, Award, BookOpen, Clock, History,
  // Added Heart to imports to fix "Cannot find name 'Heart'" error
  Heart
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

  const isDashboardView = [View.STUDENT_DASHBOARD, View.TEACHER_DASHBOARD, View.ADMIN_DASHBOARD].includes(currentView);

  // Custom Sidebar for Student Dashboard
  const DashboardSidebar = () => (
    <div className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-8 flex items-center gap-3 border-b border-slate-50 mb-6">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
          <Logo className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black text-slate-900 tracking-tight leading-none">Nurul<span className="text-emerald-600">Quran</span></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Student Portal</span>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-1">
        <SidebarItem icon={<LayoutGrid className="w-5 h-5" />} label="Overview" active={currentView === View.STUDENT_DASHBOARD} onClick={() => navigate(View.STUDENT_DASHBOARD)} />
        <SidebarItem icon={<BarChart2 className="w-5 h-5" />} label="Progress" />
        <SidebarItem icon={<BookOpen className="w-5 h-5" />} label="Quran Reading" />
        <SidebarItem icon={<History className="w-5 h-5" />} label="Lesson History" />
        <SidebarItem icon={<Calendar className="w-5 h-5" />} label="Bookings" />
        <SidebarItem icon={<Users className="w-5 h-5" />} label="Teachers" />
        <SidebarItem icon={<Award className="w-5 h-5" />} label="Achievements" />
        <div className="pt-6 mt-6 border-t border-slate-50">
          <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
        </div>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100 mb-4">
           <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-sm">AD</div>
           <div className="flex-1 overflow-hidden">
             <p className="text-sm font-black text-slate-900 truncate">AISHA IDRIS DANGA...</p>
             <p className="text-[10px] text-slate-400 font-bold truncate">dangalan20@gmail.com</p>
           </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans flex ${isDashboardView ? 'flex-row' : 'flex-col'}`}>
      
      {/* Sidebar for Dashboards */}
      {isDashboardView && currentUser?.role === 'STUDENT' && <DashboardSidebar />}

      <div className="flex-1 flex flex-col">
        {/* Navigation Bar (only for Landing/Public Views) */}
        {!isDashboardView && (
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
                  <NavButton active={currentView === View.TEACHERS} onClick={() => navigate(View.TEACHERS)}>Find Teachers</NavButton>
                  <NavButton active={currentView === View.RAMADAN} onClick={() => navigate(View.RAMADAN)}>Ramadan Guide</NavButton>
                  <NavButton active={currentView === View.AI_TUTOR} onClick={() => navigate(View.AI_TUTOR)}>AI Tutor</NavButton>
                  
                  <div className="w-px h-6 bg-slate-200 mx-4"></div>
                  
                  {currentUser ? (
                    <NavButton active={isDashboardView} onClick={() => navigate(currentUser.role === 'ADMIN' ? View.ADMIN_DASHBOARD : currentUser.role === 'TEACHER' ? View.TEACHER_DASHBOARD : View.STUDENT_DASHBOARD)} highlight>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </NavButton>
                  ) : (
                    <NavButton active={currentView === View.LOGIN} onClick={() => navigate(View.LOGIN)} highlight>Join Community</NavButton>
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
                  <MobileNavButton onClick={() => navigate(View.TEACHERS)}>Find Teachers</MobileNavButton>
                  <MobileNavButton onClick={() => navigate(View.RAMADAN)}>Ramadan Guide</MobileNavButton>
                  <MobileNavButton onClick={() => navigate(View.AI_TUTOR)}>AI Tutor</MobileNavButton>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    {currentUser ? (
                      <MobileNavButton onClick={() => navigate(currentUser.role === 'ADMIN' ? View.ADMIN_DASHBOARD : currentUser.role === 'TEACHER' ? View.TEACHER_DASHBOARD : View.STUDENT_DASHBOARD)} highlight>Dashboard</MobileNavButton>
                    ) : (
                      <MobileNavButton onClick={() => navigate(View.LOGIN)} highlight>Join Community</MobileNavButton>
                    )}
                  </div>
                </div>
              </div>
            )}
          </nav>
        )}

        <main className={`flex-1 ${isDashboardView ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full'}`}>
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

        {!isDashboardView && (
          <footer className="bg-slate-900 text-white pt-24 pb-12 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-1 md:col-span-1">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center">
                      <Logo className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-2xl font-black">Nurul Quran</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Connecting the Ummah with divine wisdom through technology and tradition. Helping you master the Quran anywhere, anytime.
                  </p>
                </div>
                <div>
                  <h4 className="font-black text-lg mb-8">Learning</h4>
                  <ul className="space-y-4 text-slate-400 font-medium">
                    <li><button className="hover:text-emerald-400 transition-colors">Find a Tutor</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">AI Recitation Coach</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Tajweed Basics</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Hifz Tracking</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-lg mb-8">Community</h4>
                  <ul className="space-y-4 text-slate-400 font-medium">
                    <li><button className="hover:text-emerald-400 transition-colors">Ramadan Hub</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Success Stories</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Teacher Portal</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Events</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black text-lg mb-8">Support</h4>
                  <ul className="space-y-4 text-slate-400 font-medium">
                    <li><button className="hover:text-emerald-400 transition-colors">Help Center</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Contact Us</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Privacy Policy</button></li>
                    <li><button className="hover:text-emerald-400 transition-colors">Terms of Service</button></li>
                  </ul>
                </div>
              </div>
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-sm font-bold">© 2024 Nurul Quran Platform. All rights reserved.</p>
                <div className="flex items-center gap-8 text-slate-500 text-sm font-bold">
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Available Globally
                   </div>
                   <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      Made for the Ummah
                   </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-black text-sm ${
      active 
        ? 'bg-blue-50 text-blue-600 shadow-sm' 
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
    }`}
  >
    {icon}
    {label}
  </button>
);

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
