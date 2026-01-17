import React, { useState, useRef } from 'react';
import { Teacher } from '../types';
import { Star, Clock, Award, Video, X, Check, ArrowLeft, ShieldCheck, Plus, Upload, Image as ImageIcon, Save, Trash2, Edit2 } from 'lucide-react';

const MOCK_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Sheikh Abdullah',
    specialty: 'Tajweed & Hifz',
    experience: '15 Years',
    rating: 4.9,
    image: 'https://picsum.photos/200/200?random=1',
    price: '$20/hr',
    availability: 'Available Today',
    description: 'Sheikh Abdullah graduated from Al-Azhar University and has been teaching Quran for over 15 years. He specializes in Tajweed rules and Hifz (memorization), having helped over 50 students complete their memorization of the Holy Quran. His teaching style is patient and structured, suitable for serious students.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '2',
    name: 'Ustadha Fatima',
    specialty: 'Beginners & Kids',
    experience: '8 Years',
    rating: 5.0,
    image: 'https://picsum.photos/200/200?random=2',
    price: '$18/hr',
    availability: 'Weekends',
    description: 'Ustadha Fatima is beloved by children for her engaging and interactive teaching methods. She uses storytelling and visual aids to make learning the Quran fun and accessible for beginners. She holds an Ijazah in Hafs an Asim.',
  },
  {
    id: '3',
    name: 'Qari Ibrahim',
    specialty: 'Advanced Maqamat',
    experience: '20 Years',
    rating: 4.8,
    image: 'https://picsum.photos/200/200?random=3',
    price: '$30/hr',
    availability: 'Evening Slots',
    description: 'Qari Ibrahim is a world-renowned reciter known for his beautiful voice and mastery of the Maqamat (melodic modes). He offers advanced classes for students who have already mastered Tajweed and wish to beautify their recitation. He has judged international Quran competitions.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: '4',
    name: 'Sister Maryam',
    specialty: 'Translation & Tafseer',
    experience: '10 Years',
    rating: 4.9,
    image: 'https://picsum.photos/200/200?random=4',
    price: '$22/hr',
    availability: 'Available Now',
    description: 'Sister Maryam focuses on understanding the meaning of the Quran. Her classes combine recitation with Tafseer (exegesis) and translation, helping students connect deeply with the message of Allah. She is fluent in Arabic, English, and Urdu.',
  }
];

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Teacher | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorData, setEditorData] = useState<Partial<Teacher>>({});

  const handleBookClick = (teacher: Teacher, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedTeacher(teacher);
    setShowConfirmation(true);
  };

  const handleProfileClick = (teacher: Teacher) => {
    setViewingProfile(teacher);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setViewingProfile(null);
  };

  const handleConfirm = () => {
    alert(`Booking confirmed with ${selectedTeacher?.name}!`);
    setShowConfirmation(false);
    setSelectedTeacher(null);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedTeacher(null);
  };

  // Editor Handlers
  const handleAddNew = () => {
    setEditorData({
      id: Date.now().toString(),
      rating: 5.0,
      image: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`,
      name: '',
      specialty: '',
      experience: '',
      price: '',
      availability: '',
      description: '',
    });
    setIsEditorOpen(true);
    setViewingProfile(null); // Ensure we are not viewing a profile when adding new
  };

  const handleEdit = (teacher: Teacher) => {
    setEditorData({ ...teacher });
    setIsEditorOpen(true);
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
        if (exists) {
            return prev.map(t => t.id === newTeacher.id ? newTeacher : t);
        }
        return [...prev, newTeacher];
    });

    setIsEditorOpen(false);
    // If we were editing, show the updated profile. If new, also show the profile.
    setViewingProfile(newTeacher);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
        const url = URL.createObjectURL(file);
        setEditorData(prev => ({
            ...prev,
            [type === 'image' ? 'image' : 'videoUrl']: url
        }));
    }
  };

  // Editor View
  if (isEditorOpen) {
    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
             <button 
                onClick={() => setIsEditorOpen(false)}
                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Cancel
            </button>
            
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {editorData.id && teachers.some(t => t.id === editorData.id) ? (
                            <><Edit2 className="w-6 h-6" /> Edit Profile</>
                        ) : (
                            <><Plus className="w-6 h-6" /> Create Teacher Profile</>
                        )}
                    </h2>
                </div>

                <form onSubmit={handleSaveProfile} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={editorData.name || ''}
                                    onChange={e => setEditorData({...editorData, name: e.target.value})}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="e.g. Sheikh Abdullah"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Specialty</label>
                                <input 
                                    type="text" 
                                    required
                                    value={editorData.specialty || ''}
                                    onChange={e => setEditorData({...editorData, specialty: e.target.value})}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="e.g. Tajweed & Hifz"
                                />
                            </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                                    <input 
                                        type="text" 
                                        value={editorData.experience || ''}
                                        onChange={e => setEditorData({...editorData, experience: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="e.g. 5 Years"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                                    <input 
                                        type="text" 
                                        value={editorData.price || ''}
                                        onChange={e => setEditorData({...editorData, price: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="e.g. $20/hr"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Availability</label>
                                <input 
                                    type="text" 
                                    value={editorData.availability || ''}
                                    onChange={e => setEditorData({...editorData, availability: e.target.value})}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="e.g. Weekends, Evenings"
                                />
                            </div>
                        </div>

                        {/* Right Column: Media Uploads */}
                        <div className="space-y-6">
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Profile Image</label>
                                <div className="flex items-start gap-4">
                                    <img 
                                        src={editorData.image || 'https://via.placeholder.com/150'} 
                                        alt="Preview" 
                                        className="w-24 h-24 rounded-lg object-cover border border-slate-200"
                                    />
                                    <div className="flex-1">
                                        <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors w-fit">
                                            <ImageIcon className="w-4 h-4" />
                                            <span>Change Photo</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'image')} />
                                        </label>
                                        <p className="text-xs text-slate-500 mt-2">Recommended: Square JPG/PNG, max 2MB.</p>
                                    </div>
                                </div>
                             </div>

                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Intro Video</label>
                                {editorData.videoUrl ? (
                                    <div className="relative group">
                                         <video src={editorData.videoUrl} controls className="w-full h-40 bg-black rounded-lg object-cover" />
                                         <button 
                                            type="button"
                                            onClick={() => setEditorData({...editorData, videoUrl: undefined})}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors h-40">
                                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                        <span className="text-sm font-medium text-slate-600">Upload Video</span>
                                        <span className="text-xs text-slate-400 mt-1">MP4, WebM (Max 50MB)</span>
                                        <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} />
                                    </label>
                                )}
                             </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-700 mb-1">About Me</label>
                        <textarea 
                            rows={5}
                            value={editorData.description || ''}
                            onChange={e => setEditorData({...editorData, description: e.target.value})}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                            placeholder="Describe your teaching style, qualifications, and background..."
                        />
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-slate-100">
                        <button 
                            type="button"
                            onClick={() => setIsEditorOpen(false)}
                            className="flex-1 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
  }

  // Profile View Component
  if (viewingProfile) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-6">
            <button 
            onClick={handleBackToList}
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
            <ArrowLeft className="w-5 h-5" />
            Back to Teachers
            </button>

            <button
                onClick={() => handleEdit(viewingProfile)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
                <Edit2 className="w-4 h-4" />
                Edit Profile
            </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          {/* Header Section */}
          <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Star className="w-64 h-64" />
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
              <img 
                src={viewingProfile.image} 
                alt={viewingProfile.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-emerald-500 shadow-lg object-cover bg-slate-800"
              />
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{viewingProfile.name}</h1>
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-emerald-400 font-medium text-lg mb-4">{viewingProfile.specialty}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white">{viewingProfile.rating}</span>
                    <span>Rating</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <Award className="w-4 h-4" />
                    <span>{viewingProfile.experience}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{viewingProfile.availability}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[140px]">
                <div className="text-center">
                    <span className="text-3xl font-bold text-white">{viewingProfile.price}</span>
                    <span className="text-slate-400 text-sm">/session</span>
                </div>
                <button 
                  onClick={() => handleBookClick(viewingProfile)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-600 rounded-full"></span>
                  About Me
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {viewingProfile.description}
                </p>
              </section>

              {viewingProfile.videoUrl && (
                <section>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-600 rounded-full"></span>
                    Intro Video
                  </h3>
                  <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group cursor-pointer shadow-md">
                     <video controls className="w-full h-full object-cover">
                        <source src={viewingProfile.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                     </video>
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4">Teaching Stats</h4>
                    <ul className="space-y-3">
                        <li className="flex justify-between text-sm">
                            <span className="text-slate-500">Students</span>
                            <span className="font-medium text-slate-900">120+ Active</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-slate-500">Lessons</span>
                            <span className="font-medium text-slate-900">5,000+ Delivered</span>
                        </li>
                        <li className="flex justify-between text-sm">
                            <span className="text-slate-500">Response Time</span>
                            <span className="font-medium text-slate-900">&lt; 2 Hours</span>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-2">Satisfaction Guarantee</h4>
                    <p className="text-sm text-emerald-700">
                        Free trial lesson available for new students. If you're not satisfied with the first paid lesson, get a full refund.
                    </p>
                </div>
            </div>
          </div>
        </div>
        
        {/* Re-using the confirmation modal for the profile view */}
        {showConfirmation && selectedTeacher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Confirm Booking</h3>
                <button onClick={handleCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-6 h-6" />
                </button>
                </div>
                
                <div className="flex items-start gap-4 mb-6">
                <img src={selectedTeacher.image} alt={selectedTeacher.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                    <p className="font-semibold text-slate-900">{selectedTeacher.name}</p>
                    <p className="text-sm text-slate-500">{selectedTeacher.specialty}</p>
                    <div className="flex items-center gap-1 mt-1 text-emerald-600 font-medium text-sm">
                    <Video className="w-3 h-3" />
                    <span>Online Session</span>
                    </div>
                </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600 text-sm">Rate</span>
                    <span className="font-medium text-slate-900">{selectedTeacher.price}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Availability</span>
                    <span className="font-medium text-slate-900">{selectedTeacher.availability}</span>
                </div>
                </div>
                
                <p className="text-sm text-slate-500 mb-6">
                    By confirming, you agree to the terms of service and the cancellation policy.
                </p>

                <div className="flex gap-3">
                <button 
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Check className="w-4 h-4" />
                    Confirm Booking
                </button>
                </div>
            </div>
            </div>
        )}
      </div>
    );
  }

  // Grid View
  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
         <div className="text-left">
            <h2 className="text-3xl font-bold text-slate-900">Expert Quran Teachers</h2>
            <p className="text-slate-600 mt-1">Connect with certified tutors to perfect your recitation.</p>
         </div>
         <button 
            onClick={handleAddNew}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-colors"
         >
            <Plus className="w-5 h-5" />
            Join as Teacher
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teachers.map((teacher) => (
          <div 
            key={teacher.id} 
            onClick={() => handleProfileClick(teacher)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-slate-100 group cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold text-amber-500">
                <Star className="w-3 h-3 fill-amber-500" />
                {teacher.rating}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">View Profile</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-800 mb-1">{teacher.name}</h3>
              <p className="text-emerald-600 text-sm font-medium mb-3">{teacher.specialty}</p>
              
              <div className="space-y-2 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{teacher.experience} Exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{teacher.availability}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className="font-bold text-slate-900">{teacher.price}</span>
                <button 
                  onClick={(e) => handleBookClick(teacher, e)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 z-10 relative"
                >
                  <Video className="w-4 h-4" />
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal (shared with grid view) */}
      {showConfirmation && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Confirm Booking</h3>
              <button onClick={handleCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-start gap-4 mb-6">
              <img src={selectedTeacher.image} alt={selectedTeacher.name} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="font-semibold text-slate-900">{selectedTeacher.name}</p>
                <p className="text-sm text-slate-500">{selectedTeacher.specialty}</p>
                <div className="flex items-center gap-1 mt-1 text-emerald-600 font-medium text-sm">
                  <Video className="w-3 h-3" />
                  <span>Online Session</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 text-sm">Rate</span>
                <span className="font-medium text-slate-900">{selectedTeacher.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 text-sm">Availability</span>
                <span className="font-medium text-slate-900">{selectedTeacher.availability}</span>
              </div>
            </div>

            <p className="text-sm text-slate-500 mb-6">
              By confirming, you agree to the terms of service and the cancellation policy.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;