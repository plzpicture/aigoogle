
export type Gender = 'Male' | 'Female' | 'Other' | null;
export type Goal = 'Relieve constipation' | 'Manage diarrhea' | 'Regular bowel movements' | 'Overall gut health' | 'Reduce bloating' | null;
export type Frequency = '2+ daily' | 'Once daily' | 'Every 2 days' | '1-2 weekly' | null;

export interface UserProfile {
  name: string;
  gender: Gender;
  goal: Goal;
  symptoms: string[];
  frequency: Frequency;
  reminderTime: string;
  onboarded: boolean;
  level: number;
  exp: number;
}

export interface DailyRecord {
  date: string; // ISO string
  feeling: { emoji: string; label: string };
  score: number;
  stoolCount: number;
  memo: string;
}

export enum Tab {
  Home = 'Home',
  Log = 'Log',
  History = 'History',
  Insights = 'Insights',
  Profile = 'Profile'
}
