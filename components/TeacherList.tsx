import React, { useState, useMemo } from 'react';
import { Teacher, View } from '../types';
import { 
  Star, Clock, Award, Video, X, Check, ArrowLeft, 
  ShieldCheck, Plus, Upload, Image as ImageIcon, 
  Save, Trash2, Edit2, Search, Filter, PlayCircle,
  MessageSquare, ChevronRight
} from 'lucide-react';

const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Sheikh Abdullah',
    specialty: 'Tajweed & Hifz',
    category: 'Hifz',
    experience: '15 Years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200&h=200',
    price: '$20/hr',
    availability: 'Available Today',
    description: 'Sheikh Abdullah graduated from Al-Azhar University and has been teaching Quran for over 15 years. He specializes in Tajweed rules and Hifz (memorization), having helped over 50 students complete their memorization of the Holy Quran.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isVetted: true,
    responseTime: '< 1 hour'
  },
  {
    id: '2',
    name: 'Ustadha Fatima',
    specialty: 'Beginners & Kids',
    category: 'Beginners',
    experience: '8 Years',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200',
    price: '$18/hr',
    availability: 'Weekends',
    description: 'Ustadha Fatima is beloved by children for her engaging and interactive teaching methods. She uses storytelling and visual aids to make learning the Quran fun and accessible for beginners.',
    isVetted: true,
    responseTime: '< 2 hours'
  },
  {
    id: '3',
    name: 'Qari Ibrahim',
    specialty: 'Advanced Maqamat',
    category: 'Tajweed',
    experience: '20 Years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    price: '$30/hr',
    availability: 'Evening Slots',
    description: 'Qari Ibrahim is a world-renowned reciter known for his beautiful voice and mastery of the Maqamat (melodic modes). He offers advanced classes for students who master Tajweed.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isVetted: false,
    responseTime: '< 5 hours'
  },
  {
    id: '4',
    name: 'Sister Maryam',
    specialty: 'Translation & Tafseer',
    category: 'Tafseer',
    experience: '10 Years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    price: '$22/hr',
    availability: 'Available Now',
    description: 'Sister Maryam focuses on understanding the meaning of the Quran. Her classes combine recitation with Tafseer and translation, helping students connect deeply with the message.',
    isVetted: true,
    responseTime: '< 1 hour'
  }
];

const CATEGORIES: Teacher['category'][] = ['Tajweed', 'Hifz', 'Tafseer', 'Beginners', 'Arabic'];

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Teacher | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Teacher['category'] | 'All'>('All');
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorData, setEditorData] = useState<Partial<Teacher>>({});

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
    setSelectedTeacher(teacher);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    alert(`Booking request sent to ${selectedTeacher?.name}! They will confirm shortly.`);
    setShowConfirmation(false);
    setSelectedTeacher(null);
  };

  const handleAddNew = () => {
    setEditorData({
      id: Date.now().toString(),
      rating: 5.0,
      image: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`,
      name: '',
      specialty: '',
      category: 'Tajweed',
      experience: '',
      price: '',
      availability: '',
      description: '',
      isVetted: false,
      responseTime: '< 1 hour'
    });
    setIsEditorOpen(true);
    setViewingProfile(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorData.name || !editorData.specialty) {
        alert("Please fill in at least the Name and Specialty fields.");
        return;
    }
    const newTeacher = editorData as Teacher;
    setTeachers(prev => {
        const exists = prev.find(t => t.id === newTeacher.id);
        if (exists) return prev.map(t => t.id === newTeacher.id ? newTeacher : t);
        return [...prev, newTeacher];
    });
    setIsEditorOpen(false);
    setViewingProfile(newTeacher);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
        const url = URL.createObjectURL(file);
        setEditorData(prev => ({ ...prev, [type === 'image' ? 'image' : 'videoUrl']: url }));
    }
  };

  if (isEditorOpen) {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
             <button onClick={() => setIsEditorOpen(false)} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                <ArrowLeft className="w-5 h-5" /> Cancel
            </button>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {editorData.id && teachers.some(t => t.id === editorData.id) ? <><Edit2 className="w-6 h-6" /> Edit Profile</> : <><Plus className="w-6 h-6" /> Teacher Registration</>}
                    </h2>
                </div>
                <form onSubmit={handleSaveProfile} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input type="text" required value={editorData.name || ''} onChange={e => setEditorData({...editorData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Sheikh/Ustadha Name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select value={editorData.category} onChange={e => setEditorData({...editorData, category: e.target.value as any})} className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none">
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                                    <input type="text" value={editorData.price || ''} onChange={e => setEditorData({...editorData, price: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="$20/hr" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Specialty Header</label>
                                <input type="text" required value={editorData.specialty || ''} onChange={e => setEditorData({...editorData, specialty: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Expert Tajweed Instructor" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Availability</label>
                                <input type="text" value={editorData.availability || ''} onChange={e => setEditorData({...editorData, availability: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Weekdays 5PM-9PM" />
                            </div>
                        </div>
                        <div className="space-y-6">
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Profile Image</label>
                                <div className="flex items-start gap-4">
                                    <img src={editorData.image || 'https://via.placeholder.com/150'} alt="Preview" className="w-24 h-24 rounded-lg object-cover border border-slate-200" />
                                    <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors w-fit">
                                        <ImageIcon className="w-4 h-4" /> Change Photo
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'image')} />
                                    </label>
                                </div>
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Intro Video (Recommended)</label>
                                {editorData.videoUrl ? (
                                    <div className="relative">
                                         <video src={editorData.videoUrl} controls className="w-full h-40 bg-black rounded-lg object-cover" />
                                         <button type="button" onClick={() => setEditorData({...editorData, videoUrl: undefined})} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                ) : (
                                    <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors h-40">
                                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                        <span className="text-sm font-medium text-slate-600">Upload Intro Video</span>
                                        <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} />
                                    </label>
                                )}
                             </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Bio</label>
                        <textarea rows={4} value={editorData.description || ''} onChange={e => setEditorData({...editorData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="Tell students about your background..." />
                    </div>
                    <div className="flex gap-4 pt-4 border-t">
                        <button type="button" onClick={() => setIsEditorOpen(false)} className="flex-1 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50">Cancel</button>
                        <button type="submit" className="flex-1 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg flex items-center justify-center gap-2"><Save className="w-5 h-5" /> Save Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }

  if (viewingProfile) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => setViewingProfile(null)} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium"><ArrowLeft className="w-5 h-5" /> Back to Teachers</button>
            <button onClick={() => { setEditorData({...viewingProfile}); setIsEditorOpen(true); }} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"><Edit2 className="w-4 h-4" /> Edit Profile</button>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 text-white p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Star className="w-64 h-64" /></div>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
              <img src={viewingProfile.image} alt={viewingProfile.name} className="w-40 h-40 rounded-2xl border-4 border-emerald-500 shadow-lg object-cover" />
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h1 className="text-4xl font-bold">{viewingProfile.name}</h1>
                  {viewingProfile.isVetted && <ShieldCheck className="w-7 h-7 text-emerald-400" />}
                </div>
                <p className="text-emerald-400 font-medium text-xl mb-4">{viewingProfile.specialty}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="font-bold text-white">{viewingProfile.rating}</span></div>
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full"><Award className="w-4 h-4" /><span>{viewingProfile.experience}</span></div>
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full"><MessageSquare className="w-4 h-4" /><span>Response: {viewingProfile.responseTime}</span></div>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[160px]">
                <div className="text-center mb-2"><span className="text-3xl font-bold text-white">{viewingProfile.price}</span><span className="text-slate-400 text-sm">/hr</span></div>
                <button onClick={() => handleBookClick(viewingProfile)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"><Video className="w-5 h-5" /> Book Session</button>
              </div>
            </div>
          </div>
          <div className="p-10 grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"><span className="w-1.5 h-8 bg-emerald-600 rounded-full"></span> About the Teacher</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{viewingProfile.description}</p>
              </section>
              {viewingProfile.videoUrl && (
                <section>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"><span className="w-1.5 h-8 bg-emerald-600 rounded-full"></span> Intro Video</h3>
                  <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"><video controls className="w-full h-full object-cover"><source src={viewingProfile.videoUrl} type="video/mp4" /></video></div>
                </section>
              )}
            </div>
            <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4">Availability</h4>
                    <p className="text-sm text-slate-600 mb-4">{viewingProfile.availability}</p>
                    <div className="pt-4 border-t border-slate-200 space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Students</span><span className="font-bold text-slate-900">80+</span></div>
                        <div className="flex justify-between text-sm"><span className="text-slate-500">Sessions</span><span className="font-bold text-slate-900">1.2k+</span></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
             <div className="max-w-xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Connect with Expert Teachers</h2>
                <p className="text-slate-600">Find vetted Quran tutors for Tajweed, Hifz, and Arabic for all ages.</p>
             </div>
             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                 <div className="relative flex-1 sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Search by name or specialty..." 
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <button onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"><Plus className="w-5 h-5" /> Join as Teacher</button>
             </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-50">
             <button 
                onClick={() => setActiveCategory('All')} 
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === 'All' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
             >All Specialties</button>
             {CATEGORIES.map(cat => (
               <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)} 
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
               >{cat}</button>
             ))}
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} onClick={() => setViewingProfile(teacher)} className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-all border border-slate-100 group cursor-pointer flex flex-col h-full">
            <div className="relative h-56 overflow-hidden">
              <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex items-center gap-2 text-white font-bold"><PlayCircle className="w-6 h-6" /> Watch Introduction</div>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1 text-sm font-bold text-amber-600 shadow-sm"><Star className="w-4 h-4 fill-amber-600" />{teacher.rating}</div>
              {teacher.isVetted && <div className="absolute top-4 right-4 bg-emerald-600 text-white p-2 rounded-xl shadow-lg"><ShieldCheck className="w-5 h-5" /></div>}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-slate-900">{teacher.name}</h3>
                <span className="text-emerald-600 font-bold">{teacher.price}</span>
              </div>
              <p className="text-slate-500 font-medium mb-4 text-sm">{teacher.specialty}</p>
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-slate-600"><Award className="w-4 h-4 text-emerald-500" /><span>{teacher.experience} Teaching Exp.</span></div>
                <div className="flex items-center gap-2 text-slate-600"><Clock className="w-4 h-4 text-emerald-500" /><span>{teacher.availability}</span></div>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{teacher.category}</span>
                 <button onClick={(e) => handleBookClick(teacher, e)} className="bg-slate-900 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">Book Class <ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-xl font-bold text-slate-900">No teachers found</p>
              <p className="text-slate-500 mt-2">Try adjusting your search or category filters.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-6 text-emerald-600 font-bold hover:underline">Clear all filters</button>
          </div>
      )}

      {showConfirmation && selectedTeacher && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Request a Class</h3>
              <button onClick={() => setShowConfirmation(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="w-7 h-7" /></button>
            </div>
            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <img src={selectedTeacher.image} alt={selectedTeacher.name} className="w-20 h-20 rounded-xl object-cover" />
              <div><p className="font-bold text-lg text-slate-900">{selectedTeacher.name}</p><p className="text-slate-500">{selectedTeacher.specialty}</p></div>
            </div>
            <div className="space-y-4 mb-8">
                <div className="flex justify-between font-medium"><span>Rate:</span><span className="text-emerald-600">{selectedTeacher.price}</span></div>
                <div className="flex justify-between font-medium"><span>Platform Fee:</span><span className="text-slate-400">$0.00</span></div>
                <div className="pt-4 border-t flex justify-between font-bold text-lg"><span>Total:</span><span className="text-emerald-600">{selectedTeacher.price}</span></div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowConfirmation(false)} className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50">Cancel</button>
              <button onClick={handleConfirm} className="flex-1 px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">Confirm Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;