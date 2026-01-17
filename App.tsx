import React, { useState } from 'react';
import { View } from './types';
import Hero from './components/Hero';
import TeacherList from './components/TeacherList';
import RamadanDashboard from './components/RamadanDashboard';
import AITutor from './components/AITutor';
import { Moon, BookOpen, User, Menu, X, LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate(View.HOME)}>
              <Moon className="w-8 h-8 text-emerald-600 fill-emerald-600" />
              <span className="ml-3 text-xl font-bold text-slate-900 tracking-tight">Nurul Quran</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavButton active={currentView === View.HOME} onClick={() => navigate(View.HOME)}>Home</NavButton>
                <NavButton active={currentView === View.TEACHERS} onClick={() => navigate(View.TEACHERS)}>Find Teachers</NavButton>
                <NavButton active={currentView === View.RAMADAN} onClick={() => navigate(View.RAMADAN)}>Ramadan Guide</NavButton>
                <NavButton active={currentView === View.AI_TUTOR} onClick={() => navigate(View.AI_TUTOR)} highlight>AI Tutor</NavButton>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-emerald-600"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavButton onClick={() => navigate(View.HOME)}>Home</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.TEACHERS)}>Find Teachers</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.RAMADAN)}>Ramadan Guide</MobileNavButton>
              <MobileNavButton onClick={() => navigate(View.AI_TUTOR)} highlight>AI Tutor</MobileNavButton>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === View.HOME && <Hero onNavigate={navigate} />}
        {currentView === View.TEACHERS && <TeacherList />}
        {currentView === View.RAMADAN && <RamadanDashboard />}
        {currentView === View.AI_TUTOR && <AITutor />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-600">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-6 h-6 text-emerald-600" />
                <span className="font-bold text-lg text-slate-900">Nurul Quran</span>
              </div>
              <p className="text-sm">Illuminating hearts through the Holy Quran and guiding you towards a successful Ramadan.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li onClick={() => navigate(View.TEACHERS)} className="cursor-pointer hover:text-emerald-600">Tutors</li>
                <li onClick={() => navigate(View.RAMADAN)} className="cursor-pointer hover:text-emerald-600">Ramadan Schedule</li>
                <li onClick={() => navigate(View.AI_TUTOR)} className="cursor-pointer hover:text-emerald-600">AI Practice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
              <p className="text-sm">support@nurulquran.app</p>
              <p className="text-sm">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
            © 2024 Nurul Quran. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavButton: React.FC<{ children: React.ReactNode; active?: boolean; onClick: () => void; highlight?: boolean }> = ({ children, active, onClick, highlight }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      highlight 
      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm' 
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
    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
       highlight ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
    }`}
  >
    {children}
  </button>
);

export default App;
