import {
  LayoutDashboard,
  Users,
  UserCog,
  Mail,
  BellDotIcon,
  AlignHorizontalJustifyCenter,
  Newspaper,
  FileText,
  FileSpreadsheet,
  Flower,
  SquareLibrary,
  Coins,
  BringToFront,
  Sparkles,
  PenSquare,
  ChartLine,
  LibrarySquare,
  GalleryVerticalEnd,
} from 'lucide-react';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'SUB_ADMIN'
  | 'USER'
  | 'user'
  | 'admin'
  | 'sub-admin';

export interface MenuItem {
  href: string;
  label: string;
  icon: React.ElementType;
  permission: string | null;
  group: string;
}

export const PERMISSIONS = {
  SUPER_ADMIN: [
    'dashboard',
    'schools',
    'users',
    'analytics',
    'sub-admins',
    'notifications',
    'newsletters',
    'subscription',
    'customization',
    'exam-type',
    'subjects',
    'questions',
    'exam',
    'categories',
    'codes',
    'results',
  ],
  ADMIN: [
    'dashboard',
    'schools',
    'users',
    'analytics',
    'sub-admins',
    'notifications',
    'newsletters',
    'subscription',
    'customization',
    'exam-type',
    'subjects',
    'questions',
    'exam',
    'categories',
    'codes',
    'results',
  ],
  SUB_ADMIN: ['dashboard', 'schools'],
  USER: [
    'dashboard',
    'ai-examiner',
    'my-profile',
    'my-exams',
    'result',
    'mock-exams',
    'performance',
    'my-notifications',
  ],
} as const;

export const MENU_ITEMS: MenuItem[] = [
  // Dashboard Group
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    permission: 'dashboard',
    group: 'overview',
  },
  {
    href: '/my-dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    permission: 'my-dashboard',
    group: '',
  },
  // User Management Group
  {
    href: '/users',
    label: 'Users',
    icon: Users,
    permission: 'users',
    group: 'management',
  },
  {
    href: '/categories',
    label: 'Categories',
    icon: AlignHorizontalJustifyCenter,
    permission: 'categories',
    group: 'management',
  },
  {
    href: '/sub-admins',
    label: 'Sub Admins',
    icon: UserCog,
    permission: 'sub-admins',
    group: 'management',
  },
  // Exam Management Group
  {
    href: '/exam-types',
    label: 'Exam Types',
    icon: Newspaper,
    permission: 'exam-type',
    group: 'exams',
  },
  {
    href: '/exams',
    label: 'Exam',
    icon: SquareLibrary,
    permission: 'exam',
    group: 'exams',
  },
  {
    href: '/subjects',
    label: 'Subjects',
    icon: FileSpreadsheet,
    permission: 'subjects',
    group: 'exams',
  },
  {
    href: '/questions',
    label: 'Questions',
    icon: FileText,
    permission: 'questions',
    group: 'exams',
  },
  {
    href: '/user-results',
    label: 'Results',
    icon: GalleryVerticalEnd,
    permission: 'results',
    group: 'exams',
  },
  // Communication Group
  {
    href: '/notifications',
    label: 'Notifications',
    icon: BellDotIcon,
    permission: 'notifications',
    group: 'communication',
  },
  {
    href: '/newsletters',
    label: 'Newsletters',
    icon: Mail,
    permission: 'newsletters',
    group: 'communication',
  },
  // Settings Group
  {
    href: '/codes',
    label: 'Codes',
    icon: BringToFront,
    permission: 'codes',
    group: 'management',
  },
  {
    href: '/customization',
    label: 'Customization',
    icon: Flower,
    permission: 'customization',
    group: 'settings',
  },
  {
    href: '/subscription',
    label: 'Subscription',
    icon: Coins,
    permission: 'subscription',
    group: 'settings',
  },
  // Organization User Group
  {
    href: '/my-exams',
    label: 'My Exams',
    icon: LibrarySquare,
    permission: 'my-exams',
    group: '',
  },
  {
    href: '/mock-exams',
    label: 'Mock Exam',
    icon: PenSquare,
    permission: 'mock-exams',
    group: '',
  },
  {
    href: '/ai-examiner',
    label: 'AI Examiner',
    icon: Sparkles,
    permission: 'ai-examiner',
    group: '',
  },
  {
    href: '/my-performance',
    label: 'My Performance',
    icon: ChartLine,
    permission: 'performance',
    group: '',
  },
];

export interface AppSidebarProps {
  userRole: UserRole | undefined | null;
  className?: string;
}
