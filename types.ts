export enum View {
  HOME = 'HOME',
  TEACHERS = 'TEACHERS',
  TEACHER_MATCH = 'TEACHER_MATCH',
  LEARNING_PATHS = 'LEARNING_PATHS',
  METHODOLOGY = 'METHODOLOGY',
  RAMADAN = 'RAMADAN',
  AI_TUTOR = 'AI_TUTOR',
  LIVE_CONSULTATION = 'LIVE_CONSULTATION',
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
  isOnline?: boolean;
}

export interface Teacher extends User {
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
  ijazahInfo?: string;
  methodology?: string;
  responseTime?: string;
  lessonsCompleted?: number;
}

export interface Session {
  id: string;
  teacherId: string;
  studentId: string;
  startTime: string;
  duration: number;
  status: 'paid' | 'ongoing' | 'completed' | 'cancelled';
  price?: string;
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