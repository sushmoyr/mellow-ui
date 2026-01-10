// ============ User & Auth ============
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
  timezone: string;
  weekStartsOn: 0 | 1;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  habitReminders: boolean;
  journalPrompts: boolean;
  weeklyDigest: boolean;
}

// ============ Journal ============
export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: MoodLevel;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface JournalTag {
  id: string;
  name: string;
  color: string;
  count: number;
}

// ============ Mood Tracking ============
export interface MoodEntry {
  id: string;
  userId: string;
  level: MoodLevel;
  note?: string;
  factors: MoodFactor[];
  timestamp: Date;
}

export type MoodFactor =
  | 'sleep'
  | 'exercise'
  | 'social'
  | 'work'
  | 'weather'
  | 'nutrition'
  | 'stress'
  | 'creativity';

export interface MoodFactorRating {
  factor: MoodFactor;
  rating: 1 | 2 | 3 | 4 | 5;
}

// ============ Habits ============
export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  targetCount: number;
  reminderTime?: string;
  reminderDays: number[];
  createdAt: Date;
  isArchived: boolean;
}

export type HabitCategory =
  | 'health'
  | 'fitness'
  | 'mindfulness'
  | 'productivity'
  | 'learning'
  | 'social'
  | 'creativity'
  | 'self-care';

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string;
  count: number;
  note?: string;
  completedAt: Date;
}

export interface HabitStreak {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;
}

// ============ Goals ============
export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: GoalCategory;
  status: GoalStatus;
  priority: 'low' | 'medium' | 'high';
  progress: number;
  startDate: Date;
  targetDate?: Date;
  milestones: Milestone[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type GoalCategory =
  | 'health'
  | 'career'
  | 'personal'
  | 'financial'
  | 'relationships'
  | 'education'
  | 'creativity';

export type GoalStatus = 'not-started' | 'in-progress' | 'completed' | 'paused';

export interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
  targetDate?: Date;
  completedAt?: Date;
}

// ============ Sleep ============
export interface SleepEntry {
  id: string;
  userId: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  duration: number;
  quality: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  factors: SleepFactor[];
}

export type SleepFactor =
  | 'caffeine'
  | 'screen-time'
  | 'exercise'
  | 'stress'
  | 'alcohol'
  | 'late-meal';

// ============ Analytics ============
export interface WellnessScore {
  date: string;
  overall: number;
  breakdown: {
    mood: number;
    sleep: number;
    habits: number;
    goals: number;
  };
}

export interface AnalyticsData {
  moodTrends: { date: string; average: number }[];
  habitCompletion: { date: string; rate: number }[];
  sleepDuration: { date: string; hours: number }[];
  goalProgress: { category: string; progress: number }[];
  lifeBalance: { area: string; score: number }[];
  timeDistribution: { category: string; minutes: number }[];
}

// ============ Chart Data Types ============
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface TimeSeriesData {
  date: string;
  [key: string]: string | number;
}
