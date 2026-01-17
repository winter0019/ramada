export enum View {
  HOME = 'HOME',
  TEACHERS = 'TEACHERS',
  RAMADAN = 'RAMADAN',
  AI_TUTOR = 'AI_TUTOR',
  TEACHER_DASHBOARD = 'TEACHER_DASHBOARD'
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