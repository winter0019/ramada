import React, { useState, useMemo } from 'react';
import { Teacher, View, UserRole } from '../types';
import { 
  Star, Clock, Award, Video, X, Check, ArrowLeft, 
  ShieldCheck, Search, Filter, 
  ChevronRight, Calendar, Sparkles, BookOpen,
  CheckCircle2, Info, GraduationCap, Quote
} from 'lucide-react';

const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Sheikh Abdullah Al-Mansur',
    email: 'abdullah@example.com',
    role: 'TEACHER',
    specialty: 'Tajweed Mastery & Hifz Preservation',
    category: 'Hifz',
    experience: '15 Years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400&h=400',
    price: '$25/hr',
    availability: 'Available Mon-Fri (9AM-5PM)',
    description: 'Sheikh Abdullah graduated from Al-Azhar University and has been teaching Quran for over 15 years. He specializes in Tajweed rules and Hifz (memorization), having helped over 50 students complete their ijazah.',
    ijazahInfo: 'Holds Ijazah in the 10 Qira\'at from Al-Azhar Institute, Cairo.',
    methodology: 'Emphasis on Tarkiz (concentration) and repeated revision. My sessions start with a review of previous verses followed by new recitation guidance focusing on makharij.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isVetted: true,
    responseTime: '< 1 hour',
    lessonsCompleted: 1420
  },
  {
    id: '2',
    name: 'Ustadha Fatima Zahra',
    email: 'fatima@example.com',
    role: 'TEACHER',
    specialty: 'Beginners Quran & Kids Foundation',
    category: 'Beginners',
    experience: '8 Years',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400&h=400',
    price: '$18/hr',
    availability: 'Weekends & Evenings',
    description: 'Ustadha Fatima is beloved by children for her engaging and interactive teaching methods. She uses storytelling and visual aids to make learning the Quran fun.',
    ijazahInfo: 'Ijazah in Hafs \'an \'Asim and Certification in Early Childhood Education.',
    methodology: 'Play-based learning for children. We use the Nurania methodology to build a strong foundation of letter recognition and pronunciation.',
    isVetted: true,
    responseTime: '< 2 hours',
    lessonsCompleted: 850
  },
  {
    id: '3',
    name: 'Qari Ibrahim Khalil',
    email: 'ibrahim@example.com',
    role: 'TEACHER',
    specialty: 'Advanced Maqamat & Melodic Recitation',
    category: 'Tajweed',
    experience: '20 Years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    price: '$35/hr',
    availability: 'Flexible (By Appointment)',
    description: 'Qari Ibrahim is a world-renowned reciter known for his mastery of the Maqamat (melodic modes).',
    ijazahInfo: 'Senior Reciter at the Holy Mosque, Medina. Global Maqamat Specialist.',
    methodology: 'Advanced vocal training and melodic application. My students learn how to apply the proper Maqam to the emotional context of the verses.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isVetted: true,
    responseTime: '< 4 hours',
    lessonsCompleted: 2100
  },
  {
    id: '4',
    name: 'Sister Maryam Siddiqui',
    email: 'maryam@example.com',
    role: 'TEACHER',
    specialty: 'Quranic Translation & Tafseer',
    category: 'Tafseer',
    experience: '10 Years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400',
    price: '$22/hr',
    availability: 'Available Daily (6PM-10PM)',
    description: 'Sister Maryam focuses on the spiritual and intellectual understanding of the Quran.',
    ijazahInfo: 'Masters in Islamic Studies (Tafseer) from International Islamic University.',
    methodology: 'Textual analysis combined with spiritual reflection. We dive deep into the context of revelation and how to live the Quran in the 21st century.',
    isVetted: true,
    responseTime: '< 1 hour',
    lessonsCompleted: 920
  }
];

const CATEGORIES: Teacher['category'][] = ['Tajweed', 'Hifz', 'Tafseer', 'Beginners', 'Arabic'];

interface TeacherListProps {
  userRole?: UserRole;
  onNavigate: (view: View) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({ userRole, onNavigate }) => {
  const [teachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Teacher | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Teacher['category'] | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'About' | 'Methodology' | 'Reviews'>('About');
  
  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [teachers, searchQuery, activeCategory]);

  const handleBookClick = (teacher: Teacher, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!userRole) {
      onNavigate(View.LOGIN);
      return;
    }
    setSelectedTeacher(teacher);
    setShowBookingForm(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mabrouk! Your booking with ${selectedTeacher?.name} is pending confirmation.`);
    setShowBookingForm(false);
    setSelectedTeacher(null);
    onNavigate(View.STUDENT_DASHBOARD);
  };

  if (viewingProfile) {
    return (
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-500 pb-20">
        <button 
          onClick={() => setViewingProfile(null)} 
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold group transition-colors"
        >
          <div className="p-2 rounded-full group-hover:bg-emerald-50 transition-colors">
            <ArrowLeft className="w-5 h-5" /> 
          </div>
          Back to marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Profile Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-emerald-600 to-teal-700"></div>
              <div className="px-10 pb-10 -mt-20">
                <div className="flex flex-col md:flex-row gap-8 items-end">
                  <div className="relative">
                    <img 
                      src={viewingProfile.image} 
                      alt={viewingProfile.name} 
                      className="w-44 h-44 rounded-3xl border-8 border-white shadow-2xl object-cover bg-white" 
                    />
                    {viewingProfile.isVetted && (
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                       <h1 className="text-4xl font-black text-slate-900">{viewingProfile.name}</h1>
                       <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold border border-amber-100">
                         <Star className="w-4 h-4 fill-amber-700" /> {viewingProfile.rating}
                       </div>
                    </div>
                    <p className="text-emerald-600 font-bold text-xl">{viewingProfile.specialty}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                       <span className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                         <Award className="w-4 h-4" /> {viewingProfile.experience} Experience
                       </span>
                       <span className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                         <CheckCircle2 className="w-4 h-4" /> {viewingProfile.lessonsCompleted}+ Lessons
                       </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  {/* Tabs */}
                  <div className="flex gap-8 border-b border-slate-100 mb-8">
                    {['About', 'Methodology', 'Reviews'].map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full"></div>}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'About' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      <section>
                        <h3 className="text-2xl font-black text-slate-900 mb-4">About the Teacher</h3>
                        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">{viewingProfile.description}</p>
                      </section>
                      {viewingProfile.ijazahInfo && (
                        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex items-start gap-6">
                           <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600">
                             <GraduationCap className="w-8 h-8" />
                           </div>
                           <div>
                             <h4 className="font-black text-emerald-900 text-xl mb-1">Traditional Ijazah</h4>
                             <p className="text-emerald-700 font-medium">{viewingProfile.ijazahInfo}</p>
                           </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'Methodology' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      <div className="relative">
                        <Quote className="absolute -top-6 -left-6 w-12 h-12 text-emerald-100 -z-10" />
                        <h3 className="text-2xl font-black text-slate-900 mb-6">How I Teach (The Proper Way)</h3>
                        <p className="text-slate-600 leading-relaxed text-lg italic">"{viewingProfile.methodology || "I follow traditional scholastic standards focusing on precision and spiritual connection."}"</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <span className="font-bold text-slate-700">Verified Curriculum</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <span className="font-bold text-slate-700">Pronunciation Checks</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Reviews' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl font-black text-slate-900">{viewingProfile.rating}</div>
                        <div>
                          <div className="flex gap-1 text-amber-500">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                          </div>
                          <p className="text-slate-500 font-bold">Based on {viewingProfile.lessonsCompleted} sessions</p>
                        </div>
                      </div>
                      <p className="text-slate-500 italic">No public reviews yet. Be the first to rate!</p>
                    </div>
                  )}

                  {viewingProfile.videoUrl && activeTab === 'About' && (
                    <section className="mt-12">
                      <h3 className="text-2xl font-black text-slate-900 mb-4">Video Introduction</h3>
                      <div className="aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl relative group">
                        <video controls className="w-full h-full object-cover">
                          <source src={viewingProfile.videoUrl} type="video/mp4" />
                        </video>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sticky top-28">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-slate-900">{viewingProfile.price}</span>
                <span className="text-slate-400 font-bold">/ hour</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <Clock className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-900 text-sm">Response Time</p>
                    <p className="text-emerald-700 text-xs">Usually responds in {viewingProfile.responseTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Availability</p>
                    <p className="text-slate-500 text-xs">{viewingProfile.availability}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleBookClick(viewingProfile)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <Video className="w-6 h-6" /> Book Trial Lesson
              </button>
              
              <p className="text-center text-slate-400 text-xs mt-6 px-4">
                No commitment needed. You can book a single lesson to see if the teacher is a good fit.
              </p>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
               <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold">Safe Learning</h4>
               </div>
               <ul className="space-y-3 text-sm text-slate-400">
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Secure payments</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Verified certifications</li>
                 <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 100% Satisfaction guarantee</li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Search & Stats Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <BookOpen className="w-64 h-64 rotate-12" />
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative z-10">
             <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                   <Sparkles className="w-3 h-3" /> Professional Marketplace
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Learn Quran from Experts</h2>
                <p className="text-slate-500 text-lg">Connect with highly qualified, vetted teachers for Tajweed, Hifz, Tafseer and more.</p>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                 <div className="relative flex-1 sm:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Search by name, subject or keyword..." 
                      className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50 transition-all shadow-inner"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg">
                    <Filter className="w-5 h-5" /> Filters
                 </button>
             </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-slate-50">
             {['All', ...CATEGORIES].map(cat => (
               <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat as any)} 
                  className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border ${activeCategory === cat ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-600/20' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-500 hover:text-emerald-600'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
      </div>

      {/* Teacher Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTeachers.map((teacher) => (
          <div 
            key={teacher.id} 
            onClick={() => setViewingProfile(teacher)} 
            className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 group cursor-pointer flex flex-col h-full overflow-hidden"
          >
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Info className="w-5 h-5" /> View Full Profile
                  </button>
              </div>
              
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black text-slate-900 shadow-xl border border-white/50">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {teacher.rating}
              </div>
              
              {teacher.isVetted && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="p-7 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1 block">
                  {teacher.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">{teacher.name}</h3>
              </div>
              
              <p className="text-slate-500 font-medium mb-6 text-sm line-clamp-2 leading-relaxed">
                {teacher.specialty}
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                    <Award className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="font-semibold">{teacher.experience} Experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="font-semibold">{teacher.availability}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Hourly Rate</span>
                    <span className="text-lg font-black text-slate-900">{teacher.price}</span>
                 </div>
                 <button 
                  onClick={(e) => handleBookClick(teacher, e)} 
                  className="bg-emerald-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showBookingForm && selectedTeacher && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full p-10 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900">Schedule Lesson</h3>
              <button onClick={() => setShowBookingForm(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 flex items-center gap-4">
                <img src={selectedTeacher.image} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt="" />
                <div>
                   <p className="font-black text-slate-900">{selectedTeacher.name}</p>
                   <p className="text-sm font-bold text-emerald-600">{selectedTeacher.price}/session</p>
                </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="date" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="time" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Duration</label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="py-4 border-2 border-emerald-500 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-sm">30 Minutes</button>
                  <button type="button" className="py-4 border-2 border-slate-100 bg-slate-50 text-slate-400 rounded-2xl font-black text-sm hover:border-slate-300">60 Minutes</button>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95">
                Confirm & Request Session
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;