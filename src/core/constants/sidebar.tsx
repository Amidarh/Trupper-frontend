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
  Coins
} from "lucide-react";

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'SUB_ADMIN';

export interface MenuItem {
  href: string;
  label: string;
  icon: any;
  permission: string;
  group: string;
}

export const PERMISSIONS = {
    SUPER_ADMIN: ['dashboard', 'schools', 'users', 'analytics', 'sub-admins', 'notifications', 'newsletters', 'subscription', 'customization', 'exam-type', 'subjects', 'questions', 'exam'],
    ADMIN: ['dashboard', 'schools', 'users', 'analytics'],
    SUB_ADMIN: ['dashboard', 'schools']
} as const;

export const MENU_ITEMS: MenuItem[] = [
    // Dashboard Group
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      permission: 'dashboard',
      group: 'overview'
    },
    // User Management Group
    {
      href: '/users',
      label: 'Users',
      icon: Users,
      permission: 'users',
      group: 'management'
    },
    {
      href: '/schools',
      label: 'Categories',
      icon: AlignHorizontalJustifyCenter,
      permission: 'categories',
      group: 'management'
    },
    {
      href: '/sub-admins',
      label: 'Sub Admins',
      icon: UserCog,
      permission: 'sub-admins',
      group: 'management'
    },
    // Exam Management Group
    {
      href: '/exam-type',
      label: 'Exam Type',
      icon: Newspaper,
      permission: 'exam-type',
      group: 'exams'
    },
    {
      href: '/exams',
      label: 'Exam',
      icon: SquareLibrary,
      permission: 'exam',
      group: 'exams'
    },
    {
      href: '/subjects',
      label: 'Subjects',
      icon: FileSpreadsheet,
      permission: 'subjects',
      group: 'exams'
    },
    {
      href: '/questions',
      label: 'Questions',
      icon: FileText,
      permission: 'questions',
      group: 'exams'
    },
    // Communication Group
    {
      href: '/notifications',
      label: 'Notifications',
      icon: BellDotIcon,
      permission: 'notifications',
      group: 'communication'
    },
    {
      href: '/newsletters',
      label: 'Newsletters',
      icon: Mail,
      permission: 'newsletters',
      group: 'communication'
    },
    // Settings Group
    {
      href: '/customization',
      label: 'Customization',
      icon: Flower,
      permission: 'customization',
      group: 'settings'
    },
    {
      href: '/subscription',
      label: 'Subscription',
      icon: Coins,
      permission: 'subscription',
      group: 'settings'
    },
];

export interface AppSidebarProps {
    userRole: UserRole;
    className?: string;
}