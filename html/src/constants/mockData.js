export const FLOAT_CARDS = [
  {
    id: 1,
    avatar: '👩',
    avatarClass: 'fc-av1',
    name: 'Kavya · 26 · CA',
    detail: 'Chennai · Tamil Brahmin · Verified ✓',
    match: '94% Match',
  },
  {
    id: 2,
    avatar: '👨',
    avatarClass: 'fc-av2',
    name: 'Arjun · 30 · IIT Engineer',
    detail: 'Bangalore · Gujarati · Premium 💎',
    match: '91% Match',
  },
  {
    id: 3,
    avatar: '👩',
    avatarClass: 'fc-av3',
    name: 'Sneha · 27 · Doctor',
    detail: 'Mumbai · Punjabi · AIIMS Graduate',
    match: '88% Match',
  },
];

export const VP_STATS = [
  { num: '3.2M+', label: 'Marriages Made' },
  { num: '47L+', label: 'Active Profiles' },
  { num: '98%', label: 'Satisfaction' },
];

export const COUNTRY_CODES = [
  { label: '🇮🇳 +91', value: '+91' },
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇦🇪 +971', value: '+971' },
  { label: '🇸🇬 +65', value: '+65' },
  { label: '🇦🇺 +61', value: '+61' },
  { label: '🇨🇦 +1', value: '+1' },
];

export const SIDEBAR_NAV = {
  main: [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard', end: true, exact: true },
    { path: '/matches', icon: '💑', label: 'My Matches', badge: 24 },
    { path: '#', icon: '💬', label: 'Messages', badge: 7 },
    { path: '#', icon: '🔔', label: 'Interests', badge: 12 },
  ],
  discover: [
    { path: '#', icon: '🔍', label: 'Search Profiles' },
    { path: '#', icon: '⭐', label: 'Shortlisted' },
    { path: '#', icon: '👁️', label: 'Who Viewed Me' },
  ],
  account: [
    { path: '/profile-registration', icon: '👤', label: 'Edit Profile' },
    { path: '#', icon: '💎', label: 'Membership' },
    { path: '#', icon: '⚙️', label: 'Settings' },
  ],
};

export const DASHBOARD_STATS = [
  { icon: '💑', iconClass: 'stat-icon-rose', num: 248, label: 'Profile Views Today', change: '↑ 18% from yesterday', changeType: 'up', delay: '0.05s' },
  { icon: '💌', iconClass: 'stat-icon-rose', num: 36, label: 'Interests Received', change: '↑ 5 new today', changeType: 'up', delay: '0.1s' },
  { icon: '⭐', iconClass: '', num: 14, iconStyle: { background: '#e8f5e9' }, label: 'Shortlisted by Others', change: '↑ 2 new today', changeType: 'up', delay: '0.15s' },
  { icon: '🤝', iconClass: 'stat-icon-gold', num: 7, label: 'Mutual Matches', change: '↑ 3 this week', changeType: 'up', delay: '0.2s' },
];

export const TODAY_MATCHES = [
  { id: '1', name: 'Kavya Iyer', detail: '26 · CA · Chennai', score: 94, photoClass: 'photo-1', badge: 'NEW', emoji: '👩' },
  { id: '2', name: 'Priya Rao', detail: '25 · Doctor · Bangalore', score: 91, photoClass: 'photo-5', badge: '✓', emoji: '👩' },
  { id: '3', name: 'Sneha Kapoor', detail: '27 · MBA · Mumbai', score: 88, photoClass: 'photo-3', badge: '⭐', emoji: '👩' },
  { id: '4', name: 'Meera Nair', detail: '26 · Architect · Pune', score: 86, photoClass: 'photo-4', badge: '💎', emoji: '👩' },
  { id: '5', name: 'Deepa Menon', detail: '24 · Engineer · Kochi', score: 83, photoClass: 'photo-2', badge: 'NEW', emoji: '👩' },
];

export const ACTIVITIES = [
  { icon: '💌', iconClass: 'actInterest', text: '<strong>Rohit Verma</strong> sent you an interest request', time: '2 minutes ago', unread: true },
  { icon: '👁️', iconClass: 'actView', text: '<strong>Arjun Mehta</strong> viewed your profile', time: '14 minutes ago' },
  { icon: '⭐', iconClass: 'actShortlist', text: '<strong>Vikram S.</strong> shortlisted your profile', time: '1 hour ago', unread: true },
  { icon: '💬', iconClass: 'actMsg', text: '<strong>Raj Patel</strong> sent you a message', time: '3 hours ago', unread: true },
  { icon: '💌', iconClass: 'actInterest', text: '<strong>Kiran Kumar</strong> accepted your interest', time: 'Yesterday' },
];

export const SHORTLIST = [
  { id: '1', name: 'Kavya Iyer', detail: '26 · CA · Chennai · Tamil Brahmin', match: '94% Match', photoClass: 'photo-1', emoji: '👩' },
  { id: '2', name: 'Priya Rao', detail: '25 · Doctor · Bangalore · Iyengar', match: '91% Match', photoClass: 'photo-5', emoji: '👩' },
  { id: '3', name: 'Sneha Kapoor', detail: '27 · MBA · Mumbai · Punjabi', match: '88% Match', photoClass: 'photo-3', emoji: '👩' },
  { id: '4', name: 'Meera Nair', detail: '26 · Architect · Pune · Nair', match: '86% Match', photoClass: 'photo-4', emoji: '👩' },
];

export const COMPAT_FACTORS = [
  { label: 'Education', pct: 92 },
  { label: 'Values', pct: 87 },
  { label: 'Location', pct: 78 },
  { label: 'Lifestyle', pct: 83 },
  { label: 'Horoscope', pct: 70 },
];

export const QUICK_ACTIONS = [
  { icon: '📷', label: 'Add Photos', sublabel: 'Boost visibility' },
  { icon: '🔍', label: 'Advanced Search', sublabel: 'Filter profiles' },
  { icon: '⭐', label: 'Horoscope Match', sublabel: 'Kundli analysis' },
  { icon: '💎', label: 'Upgrade Plan', sublabel: 'Get more matches' },
];

export const MATCH_PROFILES = [
  { id: '1', name: 'Kavya Iyer', meta: '26 yrs · 5\'4" · Chartered Accountant\nChennai, TN · Tamil Brahmin', chips: ['Vegetarian', 'Non-smoker', 'Family values'], score: 94, photoClass: 'pcbg1', badges: [{ type: 'new', text: 'New' }, { type: 'verified', text: '✓ Verified' }], liked: true, emoji: '👩' },
  { id: '2', name: 'Priya Rao', meta: '25 yrs · 5\'6" · MBBS Doctor\nBangalore, KA · Iyengar Brahmin', chips: ['AIIMS Graduate', 'Manglik'], score: 91, photoClass: 'pcbg5', badges: [{ type: 'premium', text: '✦ Premium' }, { type: 'verified', text: '✓ Verified' }], liked: false, emoji: '👩' },
  { id: '3', name: 'Meera Nair', meta: '26 yrs · 5\'5" · Architect\nPune, MH · Nair Community', chips: ['IIT Bombay', 'Creative'], score: 88, photoClass: 'pcbg3', badges: [{ type: 'new', text: 'New' }], liked: false, emoji: '👩' },
  { id: '4', name: 'Sneha Kapoor', meta: '27 yrs · 5\'7" · MBA Finance\nMumbai, MH · Punjabi Khatri', chips: ['IIM Grad', 'NRI Ready'], score: 86, photoClass: 'pcbg4', badges: [{ type: 'premium', text: '✦ Premium' }, { type: 'verified', text: '✓ Verified' }], liked: false, emoji: '👩' },
  { id: '5', name: 'Deepa Menon', meta: '24 yrs · 5\'3" · Software Engineer\nKochi, KL · Nair Community', chips: ['NITK Graduate', 'Reader'], score: 84, photoClass: 'pcbg2', badges: [{ type: 'verified', text: '✓ Verified' }], liked: false, emoji: '👩' },
  { id: '6', name: 'Anjali Singh', meta: '28 yrs · 5\'5" · Civil Services (IAS)\nJaipur, RJ · Rajput', chips: ['UPSC 2022', 'Traditional'], score: 81, photoClass: 'pcbg6', badges: [{ type: 'premium', text: '✦ Premium' }], liked: false, emoji: '👩' },
];

export const PROFILE_DETAIL = {
  id: '1',
  profileId: 'SHG8824501',
  name: 'Kavya Iyer',
  emoji: '👩',
  age: 26,
  height: "5'4\"",
  occupation: 'Chartered Accountant',
  location: 'Chennai, Tamil Nadu',
  community: 'Tamil Brahmin',
  religion: 'Hindu',
  maritalStatus: 'Never Married',
  matchScore: 94,
  about: [
    "I'm a cheerful, family-oriented person with a deep love for music, books, and travel. I believe in a blend of tradition and modernity — I respect our cultural roots while embracing contemporary values. My mornings start with yoga and evenings with a good book or cooking something new.",
    "I'm looking for a life partner who is kind, emotionally mature, and values family. Someone with whom I can have meaningful conversations, share laughter, and build a beautiful life together. Our families should ideally get along well — that warmth matters deeply to me.",
  ],
  hobbies: ['📚 Reader', '✈️ Traveller', '🎵 Carnatic Music', '🍳 Cook', '🧘 Yoga', '📸 Photography'],
  basicInfo: [
    { icon: '📅', label: 'Date of Birth', value: '14 March 1999 (26 yrs)' },
    { icon: '📐', label: 'Height', value: '5 feet 4 inches (162 cm)' },
    { icon: '⚖️', label: 'Weight', value: '52 kg' },
    { icon: '🩸', label: 'Blood Group', value: 'O+ Positive' },
    { icon: '🙏', label: 'Religion', value: 'Hindu · Tamil Brahmin' },
    { icon: '⭐', label: 'Raashi / Nakshatra', value: 'Mithuna · Rohini' },
    { icon: '🗣️', label: 'Mother Tongue', value: 'Tamil' },
    { icon: '💍', label: 'Marital Status', value: 'Never Married' },
    { icon: '🥗', label: 'Diet', value: 'Vegetarian' },
    { icon: '🚬', label: 'Smoking / Drinking', value: 'Non-smoker · Non-drinker' },
  ],
  education: [
    { icon: '📚', label: 'Education', value: 'Chartered Accountant (CA)' },
    { icon: '🏫', label: 'College / Institute', value: 'ICAI, Chennai Chapter' },
    { icon: '💼', label: 'Occupation', value: 'Finance & Accounts Manager' },
    { icon: '🏢', label: 'Employer', value: 'Deloitte India (Private)' },
    { icon: '💰', label: 'Annual Income', value: '₹12–15 Lakh per annum' },
    { icon: '📍', label: 'Work Location', value: 'Chennai, Tamil Nadu' },
  ],
  family: [
    { icon: '👨', label: 'Father', value: 'Retired IAS Officer' },
    { icon: '👩', label: 'Mother', value: 'Homemaker (School Teacher, Retd.)' },
    { icon: '👨‍👧', label: 'Siblings', value: '1 Older Brother (Married)' },
    { icon: '🏠', label: 'Family Type', value: 'Joint Family · Upper Middle Class' },
    { icon: '🌍', label: 'Native Place', value: 'Thanjavur, Tamil Nadu' },
    { icon: '🙏', label: 'Family Values', value: 'Traditional with Modern Outlook' },
  ],
  compatibility: [
    { icon: '📚', label: 'Education', pct: 96 },
    { icon: '🙏', label: 'Religion & Values', pct: 98 },
    { icon: '💰', label: 'Financial', pct: 88 },
    { icon: '🌍', label: 'Location', pct: 80 },
    { icon: '🏃', label: 'Lifestyle', pct: 92 },
    { icon: '⭐', label: 'Horoscope', pct: 75 },
  ],
  similar: [
    { id: '2', name: 'Priya Rao', detail: '25 · Doctor · Bangalore\nIyengar Brahmin · Hindu', match: '91% Match ✨', photoClass: 'sp1', emoji: '👩' },
    { id: '3', name: 'Meera Nair', detail: '26 · Architect · Pune\nNair Community · Hindu', match: '88% Match ✨', photoClass: 'sp2', emoji: '👩' },
    { id: '4', name: 'Sneha Kapoor', detail: '27 · MBA · Mumbai\nPunjabi Khatri · Hindu', match: '86% Match ✨', photoClass: 'sp3', emoji: '👩' },
  ],
};

export const REGISTRATION_STEPS = [
  { id: 1, label: 'Basic Details', desc: 'Name, age, religion', status: 'done' },
  { id: 2, label: 'Personal Info', desc: 'Education, career, lifestyle', status: 'active' },
  { id: 3, label: 'Family Background', desc: 'Parents, siblings, values', status: 'pending' },
  { id: 4, label: 'Partner Preferences', desc: "What you're looking for", status: 'pending' },
  { id: 5, label: 'Photos & Horoscope', desc: 'Upload photos, kundli details', status: 'pending' },
];
