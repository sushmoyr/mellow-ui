import type {
  User,
  JournalEntry,
  JournalTag,
  MoodEntry,
  Habit,
  HabitCompletion,
  HabitStreak,
  Goal,
  SleepEntry,
  WellnessScore,
  TimeSeriesData,
  ChartDataPoint,
} from '@/types';

// ============ User ============
export const mockUser: User = {
  id: 'user-1',
  email: 'alex@serenity.app',
  name: 'Alex Chen',
  avatar: '/avatars/alex.jpg',
  createdAt: new Date('2024-01-15'),
  preferences: {
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      habitReminders: true,
      journalPrompts: true,
      weeklyDigest: true,
    },
    timezone: 'America/New_York',
    weekStartsOn: 1,
  },
};

// ============ Journal ============
export const mockJournalTags: JournalTag[] = [
  { id: 'tag-1', name: 'gratitude', color: '#B399FF', count: 24 },
  { id: 'tag-2', name: 'reflection', color: '#86EFAC', count: 18 },
  { id: 'tag-3', name: 'goals', color: '#FCD34D', count: 12 },
  { id: 'tag-4', name: 'wellness', color: '#FDA4AF', count: 15 },
  { id: 'tag-5', name: 'creativity', color: '#67E8F9', count: 9 },
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 'journal-1',
    userId: 'user-1',
    title: 'A peaceful morning start',
    content: 'Woke up early today and watched the sunrise. There\'s something magical about those quiet moments before the world wakes up. Feeling grateful for this small luxury.',
    mood: 8,
    tags: ['gratitude', 'wellness'],
    createdAt: new Date('2024-01-20T07:30:00'),
    updatedAt: new Date('2024-01-20T07:30:00'),
    isPrivate: false,
  },
  {
    id: 'journal-2',
    userId: 'user-1',
    title: 'Reflections on progress',
    content: 'Looking back at the past month, I\'ve made significant strides in my meditation practice. What started as 5 minutes of struggle has become a 20-minute daily ritual I look forward to.',
    mood: 9,
    tags: ['reflection', 'goals'],
    createdAt: new Date('2024-01-19T21:00:00'),
    updatedAt: new Date('2024-01-19T21:15:00'),
    isPrivate: false,
  },
  {
    id: 'journal-3',
    userId: 'user-1',
    title: 'Creative breakthrough',
    content: 'Finally cracked that design problem I\'ve been wrestling with. Sometimes stepping away and taking a walk is exactly what you need.',
    mood: 9,
    tags: ['creativity', 'wellness'],
    createdAt: new Date('2024-01-18T16:45:00'),
    updatedAt: new Date('2024-01-18T16:45:00'),
    isPrivate: false,
  },
  {
    id: 'journal-4',
    userId: 'user-1',
    title: 'Finding balance',
    content: 'Work has been intense lately, but I\'m learning to set boundaries. Turned off notifications after 7pm and the difference is remarkable.',
    mood: 7,
    tags: ['reflection', 'wellness'],
    createdAt: new Date('2024-01-17T20:30:00'),
    updatedAt: new Date('2024-01-17T20:30:00'),
    isPrivate: true,
  },
  {
    id: 'journal-5',
    userId: 'user-1',
    title: 'Small wins matter',
    content: 'Completed my habit streak for the first time. 21 days of consistent morning routines. Celebrating the small victories today.',
    mood: 10,
    tags: ['gratitude', 'goals'],
    createdAt: new Date('2024-01-16T08:00:00'),
    updatedAt: new Date('2024-01-16T08:00:00'),
    isPrivate: false,
  },
];

// ============ Mood ============
export const mockMoodEntries: MoodEntry[] = Array.from({ length: 30 }, (_, i) => ({
  id: `mood-${i + 1}`,
  userId: 'user-1',
  level: Math.floor(Math.random() * 4) + 6 as 6 | 7 | 8 | 9 | 10,
  note: i % 3 === 0 ? 'Feeling productive today' : undefined,
  factors: ['sleep', 'exercise'].slice(0, Math.floor(Math.random() * 2) + 1) as ('sleep' | 'exercise')[],
  timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
}));

export const mockMoodTrends: TimeSeriesData[] = [
  { date: 'Mon', mood: 7, energy: 6 },
  { date: 'Tue', mood: 6, energy: 5 },
  { date: 'Wed', mood: 8, energy: 7 },
  { date: 'Thu', mood: 7, energy: 8 },
  { date: 'Fri', mood: 9, energy: 8 },
  { date: 'Sat', mood: 8, energy: 7 },
  { date: 'Sun', mood: 8, energy: 6 },
];

export const mockMoodDistribution: ChartDataPoint[] = [
  { name: 'Great (9-10)', value: 12, color: '#86EFAC' },
  { name: 'Good (7-8)', value: 18, color: '#B399FF' },
  { name: 'Okay (5-6)', value: 8, color: '#FCD34D' },
  { name: 'Low (3-4)', value: 2, color: '#FDA4AF' },
];

export const mockMoodFactors = [
  { factor: 'Sleep', score: 75 },
  { factor: 'Exercise', score: 82 },
  { factor: 'Social', score: 68 },
  { factor: 'Work', score: 60 },
  { factor: 'Nutrition', score: 70 },
  { factor: 'Stress', score: 45 },
];

export const mockMoodCorrelation = [
  { sleepHours: 6, moodScore: 5 },
  { sleepHours: 7, moodScore: 7 },
  { sleepHours: 8, moodScore: 8 },
  { sleepHours: 7.5, moodScore: 7 },
  { sleepHours: 6.5, moodScore: 6 },
  { sleepHours: 8.5, moodScore: 9 },
  { sleepHours: 5.5, moodScore: 4 },
  { sleepHours: 7, moodScore: 8 },
  { sleepHours: 8, moodScore: 9 },
  { sleepHours: 6, moodScore: 6 },
];

// ============ Habits ============
export const mockHabits: Habit[] = [
  {
    id: 'habit-1',
    userId: 'user-1',
    name: 'Morning Meditation',
    description: '10 minutes of mindfulness',
    icon: '🧘',
    color: '#B399FF',
    category: 'mindfulness',
    frequency: 'daily',
    targetCount: 1,
    reminderTime: '07:00',
    reminderDays: [1, 2, 3, 4, 5],
    createdAt: new Date('2024-01-01'),
    isArchived: false,
  },
  {
    id: 'habit-2',
    userId: 'user-1',
    name: 'Drink Water',
    description: '8 glasses per day',
    icon: '💧',
    color: '#67E8F9',
    category: 'health',
    frequency: 'daily',
    targetCount: 8,
    reminderTime: '09:00',
    reminderDays: [0, 1, 2, 3, 4, 5, 6],
    createdAt: new Date('2024-01-01'),
    isArchived: false,
  },
  {
    id: 'habit-3',
    userId: 'user-1',
    name: 'Read 30 minutes',
    description: 'Daily reading habit',
    icon: '📚',
    color: '#86EFAC',
    category: 'learning',
    frequency: 'daily',
    targetCount: 1,
    reminderTime: '21:00',
    reminderDays: [0, 1, 2, 3, 4, 5, 6],
    createdAt: new Date('2024-01-05'),
    isArchived: false,
  },
  {
    id: 'habit-4',
    userId: 'user-1',
    name: 'Exercise',
    description: '30 min workout',
    icon: '🏃',
    color: '#FCD34D',
    category: 'fitness',
    frequency: 'daily',
    targetCount: 1,
    reminderTime: '06:30',
    reminderDays: [1, 2, 3, 4, 5],
    createdAt: new Date('2024-01-01'),
    isArchived: false,
  },
  {
    id: 'habit-5',
    userId: 'user-1',
    name: 'Gratitude Journal',
    description: 'Write 3 things',
    icon: '✨',
    color: '#FDA4AF',
    category: 'mindfulness',
    frequency: 'daily',
    targetCount: 1,
    reminderTime: '22:00',
    reminderDays: [0, 1, 2, 3, 4, 5, 6],
    createdAt: new Date('2024-01-10'),
    isArchived: false,
  },
];

export const mockHabitCompletions: HabitCompletion[] = mockHabits.flatMap((habit) =>
  Array.from({ length: 7 }, (_, i) => ({
    id: `completion-${habit.id}-${i}`,
    habitId: habit.id,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: habit.id === 'habit-2' ? Math.floor(Math.random() * 3) + 5 : Math.random() > 0.3 ? 1 : 0,
    completedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
  }))
);

export const mockHabitStreaks: HabitStreak[] = [
  { habitId: 'habit-1', currentStreak: 21, longestStreak: 21, totalCompletions: 45, completionRate: 90 },
  { habitId: 'habit-2', currentStreak: 14, longestStreak: 30, totalCompletions: 60, completionRate: 85 },
  { habitId: 'habit-3', currentStreak: 7, longestStreak: 14, totalCompletions: 28, completionRate: 75 },
  { habitId: 'habit-4', currentStreak: 5, longestStreak: 18, totalCompletions: 35, completionRate: 70 },
  { habitId: 'habit-5', currentStreak: 10, longestStreak: 10, totalCompletions: 20, completionRate: 80 },
];

export const mockWeeklyHabitData = [
  { day: 'Mon', completed: 4, total: 5 },
  { day: 'Tue', completed: 5, total: 5 },
  { day: 'Wed', completed: 3, total: 5 },
  { day: 'Thu', completed: 5, total: 5 },
  { day: 'Fri', completed: 4, total: 5 },
  { day: 'Sat', completed: 3, total: 4 },
  { day: 'Sun', completed: 4, total: 4 },
];

// ============ Goals ============
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    userId: 'user-1',
    title: 'Complete meditation certification',
    description: 'Finish the 200-hour mindfulness teacher training',
    category: 'personal',
    status: 'in-progress',
    priority: 'high',
    progress: 65,
    startDate: new Date('2024-01-01'),
    targetDate: new Date('2024-06-30'),
    milestones: [
      { id: 'm1', title: 'Complete Module 1', isCompleted: true, completedAt: new Date('2024-01-15') },
      { id: 'm2', title: 'Complete Module 2', isCompleted: true, completedAt: new Date('2024-02-01') },
      { id: 'm3', title: 'Practice teaching sessions', isCompleted: false, targetDate: new Date('2024-03-15') },
      { id: 'm4', title: 'Final assessment', isCompleted: false, targetDate: new Date('2024-06-15') },
    ],
    tags: ['mindfulness', 'education'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'goal-2',
    userId: 'user-1',
    title: 'Run a half marathon',
    description: 'Train for and complete a half marathon',
    category: 'health',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    startDate: new Date('2024-01-15'),
    targetDate: new Date('2024-05-01'),
    milestones: [
      { id: 'm1', title: 'Run 5K comfortably', isCompleted: true, completedAt: new Date('2024-02-01') },
      { id: 'm2', title: 'Run 10K', isCompleted: false, targetDate: new Date('2024-03-01') },
      { id: 'm3', title: 'Run 15K', isCompleted: false, targetDate: new Date('2024-04-01') },
      { id: 'm4', title: 'Complete half marathon', isCompleted: false, targetDate: new Date('2024-05-01') },
    ],
    tags: ['fitness', 'health'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'goal-3',
    userId: 'user-1',
    title: 'Learn Spanish basics',
    description: 'Reach A2 level in Spanish',
    category: 'education',
    status: 'in-progress',
    priority: 'low',
    progress: 25,
    startDate: new Date('2024-02-01'),
    targetDate: new Date('2024-12-31'),
    milestones: [
      { id: 'm1', title: 'Complete Duolingo Unit 1', isCompleted: true },
      { id: 'm2', title: 'Basic conversations', isCompleted: false },
      { id: 'm3', title: 'Read simple texts', isCompleted: false },
    ],
    tags: ['learning', 'language'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'goal-4',
    userId: 'user-1',
    title: 'Build emergency fund',
    description: 'Save 3 months of expenses',
    category: 'financial',
    status: 'in-progress',
    priority: 'high',
    progress: 70,
    startDate: new Date('2023-06-01'),
    targetDate: new Date('2024-03-01'),
    milestones: [
      { id: 'm1', title: 'Save 1 month expenses', isCompleted: true },
      { id: 'm2', title: 'Save 2 months expenses', isCompleted: true },
      { id: 'm3', title: 'Save 3 months expenses', isCompleted: false },
    ],
    tags: ['savings', 'security'],
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const mockGoalFunnel: ChartDataPoint[] = [
  { name: 'Goals Set', value: 12 },
  { name: 'In Progress', value: 8 },
  { name: 'Milestones Hit', value: 18 },
  { name: 'Completed', value: 4 },
];

// ============ Sleep ============
export const mockSleepEntries: SleepEntry[] = Array.from({ length: 14 }, (_, i) => ({
  id: `sleep-${i + 1}`,
  userId: 'user-1',
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  bedtime: `${22 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'}`,
  wakeTime: `${6 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'}`,
  duration: 6 + Math.random() * 2.5,
  quality: (Math.floor(Math.random() * 3) + 3) as 3 | 4 | 5,
  factors: Math.random() > 0.7 ? ['screen-time'] : [],
}));

export const mockSleepTrends: TimeSeriesData[] = [
  { date: 'Mon', hours: 7.5, quality: 4 },
  { date: 'Tue', hours: 6.5, quality: 3 },
  { date: 'Wed', hours: 8, quality: 5 },
  { date: 'Thu', hours: 7, quality: 4 },
  { date: 'Fri', hours: 6, quality: 3 },
  { date: 'Sat', hours: 8.5, quality: 5 },
  { date: 'Sun', hours: 8, quality: 4 },
];

// ============ Analytics ============
export const mockWellnessScores: WellnessScore[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  overall: 65 + Math.floor(Math.random() * 25),
  breakdown: {
    mood: 60 + Math.floor(Math.random() * 30),
    sleep: 55 + Math.floor(Math.random() * 35),
    habits: 70 + Math.floor(Math.random() * 25),
    goals: 50 + Math.floor(Math.random() * 40),
  },
}));

export const mockLifeBalance = [
  { area: 'Health', score: 75 },
  { area: 'Relationships', score: 82 },
  { area: 'Career', score: 68 },
  { area: 'Finances', score: 60 },
  { area: 'Personal Growth', score: 85 },
  { area: 'Fun & Recreation', score: 70 },
];

export const mockTimeDistribution: ChartDataPoint[] = [
  { name: 'Work', value: 480, color: '#B399FF' },
  { name: 'Sleep', value: 420, color: '#67E8F9' },
  { name: 'Exercise', value: 60, color: '#86EFAC' },
  { name: 'Learning', value: 45, color: '#FCD34D' },
  { name: 'Social', value: 90, color: '#FDA4AF' },
  { name: 'Self-care', value: 30, color: '#C4B5FD' },
];

export const mockMonthlyTrends: TimeSeriesData[] = [
  { month: 'Jan', mood: 72, sleep: 68, habits: 75, goals: 60 },
  { month: 'Feb', mood: 75, sleep: 72, habits: 78, goals: 65 },
  { month: 'Mar', mood: 78, sleep: 75, habits: 82, goals: 70 },
  { month: 'Apr', mood: 74, sleep: 70, habits: 80, goals: 72 },
  { month: 'May', mood: 80, sleep: 78, habits: 85, goals: 75 },
  { month: 'Jun', mood: 82, sleep: 80, habits: 88, goals: 78 },
];

export const mockCategoryProgress: ChartDataPoint[] = [
  { name: 'Health', current: 75, target: 100 },
  { name: 'Career', current: 60, target: 100 },
  { name: 'Personal', current: 85, target: 100 },
  { name: 'Financial', current: 70, target: 100 },
  { name: 'Education', current: 45, target: 100 },
];

export const mockTreemapData = [
  { name: 'Mindfulness', value: 120, category: 'wellness' },
  { name: 'Exercise', value: 180, category: 'health' },
  { name: 'Reading', value: 90, category: 'learning' },
  { name: 'Work Projects', value: 300, category: 'career' },
  { name: 'Social Time', value: 150, category: 'relationships' },
  { name: 'Creative Projects', value: 75, category: 'creativity' },
  { name: 'Financial Planning', value: 45, category: 'financial' },
];

// ============ Navigation & Features ============
export const mockFeatures = [
  {
    icon: '📝',
    title: 'Mindful Journaling',
    description: 'Capture your thoughts with our calming journal experience',
  },
  {
    icon: '😊',
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns with beautiful visualizations',
  },
  {
    icon: '✅',
    title: 'Habit Building',
    description: 'Build lasting habits with satisfying streak tracking',
  },
  {
    icon: '🎯',
    title: 'Goal Setting',
    description: 'Set meaningful goals and track your progress',
  },
  {
    icon: '😴',
    title: 'Sleep Insights',
    description: 'Optimize your rest with detailed sleep analytics',
  },
  {
    icon: '📊',
    title: 'Wellness Analytics',
    description: 'See the bigger picture of your wellbeing journey',
  },
];

export const mockTestimonials = [
  {
    name: 'Sarah M.',
    role: 'Yoga Instructor',
    avatar: '/avatars/sarah.jpg',
    content: 'Serenity has transformed how I track my wellness journey. The calm interface makes daily check-ins something I look forward to.',
  },
  {
    name: 'James K.',
    role: 'Software Developer',
    avatar: '/avatars/james.jpg',
    content: 'Finally, a wellness app that doesn\'t feel clinical. The animations and colors make self-improvement feel joyful.',
  },
  {
    name: 'Maya R.',
    role: 'Creative Director',
    avatar: '/avatars/maya.jpg',
    content: 'Beautiful design meets thoughtful functionality. I\'ve tried dozens of habit trackers, and Serenity is the only one that stuck.',
  },
];

export const mockPricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: ['Basic mood tracking', '3 habits', 'Weekly insights', 'Journal (5 entries/month)'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 9,
    description: 'For dedicated wellness seekers',
    features: ['Unlimited mood tracking', 'Unlimited habits', 'Advanced analytics', 'Unlimited journal', 'Export data', 'Priority support'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: 19,
    description: 'For families & small groups',
    features: ['Everything in Pro', 'Up to 5 members', 'Shared goals', 'Group challenges', 'Admin dashboard'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const mockFAQ = [
  {
    question: 'Is my data private?',
    answer: 'Absolutely. Your data is encrypted and never shared with third parties. You can export or delete your data at any time.',
  },
  {
    question: 'Can I use Serenity offline?',
    answer: 'Yes! The app works offline and syncs when you\'re back online. Your wellness journey doesn\'t need WiFi.',
  },
  {
    question: 'How does the mood tracking work?',
    answer: 'Simply rate your mood on a scale of 1-10 and optionally add notes or factors. Our AI helps identify patterns over time.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime from your account settings. Your data remains accessible even on the free plan.',
  },
];

export const mockKeyboardShortcuts = [
  { keys: ['Ctrl', 'N'], action: 'New journal entry' },
  { keys: ['Ctrl', 'M'], action: 'Log mood' },
  { keys: ['Ctrl', 'H'], action: 'View habits' },
  { keys: ['Ctrl', '/'], action: 'Open command palette' },
  { keys: ['Esc'], action: 'Close modal' },
];

// ============ Stats for Dashboard ============
export const mockDashboardStats = {
  currentStreak: 21,
  totalEntries: 156,
  avgMood: 7.8,
  habitsCompleted: 4,
  habitsTotal: 5,
  goalsInProgress: 4,
  wellnessScore: 78,
};
