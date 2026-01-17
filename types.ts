export enum View {
  HOME = 'HOME',
  TEACHERS = 'TEACHERS',
  RAMADAN = 'RAMADAN',
  AI_TUTOR = 'AI_TUTOR'
}

export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
  price: string;
  availability: string;
  description: string;
  videoUrl?: string;
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