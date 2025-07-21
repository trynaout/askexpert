import { atom } from 'recoil';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'expert';
}

interface Expert {
  id: string;
  user: User;
  expertise: string;
  description: string;
  experienceYears: number;
  rating: number;
  consultationCount: number;
  commonQuestions: Array<{
    question: string;
    answer: string;
  }>;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const expertsState = atom<Expert[]>({
  key: 'expertsState',
  default: [],
});

export const selectedExpertState = atom<Expert | null>({
  key: 'selectedExpertState',
  default: null,
}); 