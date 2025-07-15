import image1 from '../../public/assets/image1.jpg';
import image2 from '../../public/assets/image2.jpg';
import image3 from '../../public/assets/image3.jpg';
import image4 from '../../public/assets/image4.jpg';
import image5 from '../../public/assets/image5.jpg';
import image6 from '../../public/assets/image6.jpg';

export const ExamData = [
  {
    id: 1,
    name: 'Mathematics',
    fullName: 'Mathematics Exam',
    examType: 'Waec',
    actions: 'View Results',
  },
  {
    id: 2,
    name: 'Physics',
    fullName: 'Physics Exam',
    examType: 'Neco',
    actions: 'View Results',
  },
  {
    id: 3,
    name: 'Chemistry',
    fullName: 'Chemistry Exam',
    examType: 'Waec',
    actions: 'View Results',
  },
  {
    id: 4,
    name: 'Biology',
    fullName: 'Biology Exam',
    examType: 'Essay',
    actions: 'View Results',
  },
  {
    id: 5,
    name: 'History',
    fullName: 'History Exam',
    examType: 'Waec',
    actions: 'View Results',
  },
  {
    id: 6,
    name: 'History',
    fullName: 'History Exam',
    examType: 'Waec',
    actions: 'View Results',
  },
  {
    id: 7,
    name: 'History',
    fullName: 'History Exam',
    examType: 'Waec',
    actions: 'View Results',
  },
];

export const UserCategoryData = [
  {
    id: 1,
    name: 'Waec',
    fullName: 'West African Examination Council',
    status: 'Active',
    noUsers: 100,
    actions: 'View Results',
  },
  {
    id: 2,
    name: 'Neco',
    fullName: 'National Examination Council',
    status: 'Active',
    noUsers: 200,
    actions: 'View Results',
  },
  {
    id: 3,
    name: 'Jamb',
    fullName: 'Joint Admission and Matriculation Board',
    status: 'Inactive',
    noUsers: 300,
    actions: 'View Results',
  },
  {
    id: 4,
    name: 'Post Utme',
    fullName: 'Post Unified Tertiary Matriculation Examination',
    status: 'Active',
    noUsers: 400,
    actions: 'View Results',
  },
  {
    id: 5,
    name: 'Post Utme',
    fullName: 'Post Unified Tertiary Matriculation Examination',
    status: 'Active',
    noUsers: 400,
    actions: 'View Results',
  },
];

export const DurationData = [
  {
    id: 1,
    name: '5 Minutes',
    value: '5',
    label: '5 Minutes',
  },
  {
    id: 2,
    name: '10 Minutes',
    value: '10',
    label: '10 Minutes',
  },
  {
    id: 3,
    name: '15 Minutes',
    value: '15',
    label: '15 Minutes',
  },
  {
    id: 4,
    name: '20 Minutes',
    value: '20',
    label: '20 Minutes',
  },
  {
    id: 5,
    name: '25 Minutes',
    value: '25',
    label: '25 Minutes',
  },
  {
    id: 6,
    name: '30 Minutes',
    value: '30',
    label: '30 Minutes',
  },
  {
    id: 7,
    name: '35 Minutes',
    value: '35',
    label: '35 Minutes',
  },
  {
    id: 8,
    name: '40 Minutes',
    value: '40',
    label: '40 Minutes',
  },
  {
    id: 9,
    name: '45 Minutes',
    value: '45',
    label: '45 Minutes',
  },
  {
    id: 10,
    name: '50 Minutes',
    value: '50',
    label: '50 Minutes',
  },
  {
    id: 11,
    name: '55 Minutes',
    value: '55',
    label: '55 Minutes',
  },
  {
    id: 12,
    name: '60 Minutes',
    value: '60',
    label: '60 Minutes',
  },
  {
    id: 13,
    name: '65 Minutes',
    value: '65',
    label: '65 Minutes',
  },
  {
    id: 14,
    name: '70 Minutes',
    value: '70',
    label: '70 Minutes',
  },
  {
    id: 15,
    name: '75 Minutes',
    value: '75',
    label: '75 Minutes',
  },
];

export const newsletterUserType = [
  { label: 'Users', key: 'users' },
  { label: 'Admins', key: 'admins' },
];

export const latestNews = [
  {
    id: '1a2b3c4d5e6f',
    title: 'Naira Depreciates as Inflation Hits Record High',
    description:
      "Nigeria's inflation rate surged to a 20-year high in June, pushing the naira to historic lows against the dollar. Analysts warn that without immediate policy interventions, the economic strain on households will intensify.",
    subCategory: 'economy',
    image: image1,
  },
  {
    id: '7g8h9i0j1k2l',
    title: 'ASUU Demands Improved Funding for Public Universities',
    description:
      'The Academic Staff Union of Universities (ASUU) has reiterated its call for better funding of tertiary institutions. This follows recent reports highlighting deteriorating infrastructure and unpaid salaries across several federal universities.',
    subCategory: 'education',
    image: image2,
  },
  {
    id: '3m4n5o6p7q8r',
    title: 'Tech Startups in Lagos Attract $120M in Q2 Funding',
    description:
      "Lagos continues to dominate Africa's tech scene, with local startups raising over $120 million in venture capital funding in the second quarter alone. Fintech and edtech remain the leading sectors.",
    subCategory: 'technology',
    image: image3,
  },
  {
    id: '9s0t1u2v3w4x',
    title: 'Power Grid Collapse Causes Nationwide Blackout',
    description:
      'A major collapse of the national power grid left millions without electricity across Nigeria on Thursday. The Ministry of Power has assured citizens that restoration efforts are underway.',
    subCategory: 'infrastructure',
    image: image4,
  },
  {
    id: '5y6z7a8b9c0d',
    title: 'CBN Raises Interest Rate to 22.5% to Tame Inflation',
    description:
      'The Central Bank of Nigeria has increased the benchmark interest rate to 22.5% in a bid to curb rising inflation. Economists say the move may further strain borrowing for SMEs.',
    subCategory: 'finance',
    image: image5,
  },
  {
    id: 'd1e2f3g4h5i6',
    title: 'Floods Displace Over 50,000 in Northern Nigeria',
    description:
      'Severe flooding caused by torrential rains has displaced over 50,000 people in the northern states of Nigeria. Relief agencies are calling for urgent support to prevent a humanitarian crisis.',
    subCategory: 'climate',
    image: image6,
  },
];
