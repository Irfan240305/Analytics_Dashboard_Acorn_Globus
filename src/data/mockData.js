// src/data/mockData.js - COMPLETE INTEGRATED VERSION

// Contributors Data
export const contributors = [
  { id: 1, name: 'Armin A', avatar: '👤', amount: 209633, percentage: 39.63 },
  { id: 2, name: 'Mikasa A', avatar: '👤', amount: 156841, percentage: 29.65 },
  { id: 3, name: 'Eren Y', avatar: '👤', amount: 117115, percentage: 22.14 },
  { id: 4, name: 'Other', avatar: '⚫', amount: 45386, percentage: 8.58 }
];

// Platform Data - Original Format
export const platformData = [
  { name: 'Dribbble', amount: 227459, percentage: 43, color: '#ea4c89' },
  { name: 'Instagram', amount: 142823, percentage: 27, color: '#E1306C' },
  { name: 'Behance', amount: 89935, percentage: 11, color: '#1769ff' },
  { name: 'Google', amount: 37028, percentage: 7, color: '#4285F4' }
];

// Platform Breakdown Data - For Pie Chart (STEP 2)
export const platformBreakdownData = [
  {
    name: 'Dribbble',
    value: 28,
    amount: 227459,
  },
  {
    name: 'Instagram',
    value: 25,
    amount: 142823,
  },
  {
    name: 'Behance',
    value: 18,
    amount: 89935,
  },
  {
    name: 'Google',
    value: 14,
    amount: 37028,
  },
  {
    name: 'LinkedIn',
    value: 10,
    amount: 58650,
  },
  {
    name: 'Other',
    value: 5,
    amount: 29325,
  },
];

// Monthly Data
export const monthlyData = [
  { month: 'Jan', revenue: 11035, leads: 245, wl: 0.45 },
  { month: 'Feb', revenue: 6901, leads: 198, wl: 0.38 },
  { month: 'Mar', revenue: 14500, leads: 312, wl: 0.52 },
  { month: 'Apr', revenue: 9800, leads: 267, wl: 0.48 },
  { month: 'May', revenue: 18552, leads: 373, wl: 0.55 },
  { month: 'Jun', revenue: 8200, leads: 189, wl: 0.42 },
  { month: 'Jul', revenue: 9288, leads: 234, wl: 0.47 },
  { month: 'Aug', revenue: 7600, leads: 201, wl: 0.44 }
];

// Sales Data - Performance Rankings (STEP 3)
export const salesData = [
  { 
    id: 1, 
    name: 'Armin A', 
    avatar: '👤', 
    revenue: 209633, 
    leads: 118, 
    kpi: 0.84, 
    wl: 31, 
    score: 12, 
    rank: 1,
    status: 'active',
    trend: 'up'
  },
  { 
    id: 2, 
    name: 'Mikasa A', 
    avatar: '👤', 
    revenue: 156841, 
    leads: 103, 
    kpi: 0.89, 
    wl: 39, 
    score: 21, 
    rank: 2,
    status: 'active',
    trend: 'up'
  },
  { 
    id: 3, 
    name: 'Eren Y', 
    avatar: '👤', 
    revenue: 117115, 
    leads: 84, 
    kpi: 0.79, 
    wl: 32, 
    score: 7, 
    rank: 3,
    status: 'active',
    trend: 'down'
  }
];

// Work Platforms
export const workPlatforms = [
  { name: 'Dribbble', percentage: 45.3, amount: 71048, badge: 3 },
  { name: 'Instagram', percentage: 28.1, amount: 44072 },
  { name: 'Google', percentage: 14.1, amount: 22116 },
  { name: 'Other', percentage: 7.1, amount: 11135, icon: '📊' }
];

// Menu Items
export const menuItems = [
  { id: 'starred', icon: '⭐', label: 'Starred' },
  { id: 'recent', icon: '🕐', label: 'Recent' },
  { id: 'sales-list', icon: '📋', label: 'Sales list' }
];

// Goals
export const goals = [
  { id: 'dashboard', label: 'Dashboard', badge: null },
  { id: 'codename', label: 'Codename' },
  { id: 'cloud23r', label: 'Cloud23r', badge: '!' },
  { id: 'idioma', label: 'Idioma' },
  { id: 'syllables', label: 'Syllables' },
  { id: 'x-0b', label: 'x-0b' }
];

// Reports
export const reports = [
  { id: 'deals-by-user', label: 'Deals by user' },
  { id: 'deal-duration', label: 'Deal duration' }
];

// My Reports
export const myReports = [
  { id: 'emails-received', label: 'Emails received' },
  { id: 'deal-duration-2', label: 'Deal duration' },
  { id: 'new-report', label: 'New report' },
  { id: 'analytics', label: 'Analytics', badge: '!' }
];
export const revenueHistory = [
  { date: 'Mon', current: 120, previous: 110 },
  { date: 'Tue', current: 132, previous: 125 },
  { date: 'Wed', current: 101, previous: 140 },
  { date: 'Thu', current: 134, previous: 120 },
  { date: 'Fri', current: 190, previous: 160 },
  { date: 'Sat', current: 230, previous: 200 },
  { date: 'Sun', current: 210, previous: 190 },
];