export enum View {
  HOME = 'HOME',
  TEACHERS = 'TEACHERS',
  RAMADAN = 'RAMADAN',
  AI_TUTOR = 'AI_TUTOR',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  TEACHER_DASHBOARD = 'TEACHER_DASHBOARD',
  STUDENT_DASHBOARD = 'STUDENT_DASHBOARD',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP'
}

export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  bio?: string;
  youtubeLink?: string;
}

export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  category: 'Tajweed' | 'Hifz' | 'Tafseer' | 'Beginners' | 'Arabic';
  experience: string;
  rating: number;
  image: string;
  price: string;
  availability: string;
  description: string;
  videoUrl?: string;
  isVetted?: boolean;
  responseTime?: string;
}

export interface Booking {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paid: boolean;
}

export interface RamadanDay {
  day: number;
  date: string;
  suhoor: string;
  iftar: string;
  tip: string;
  dua: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}