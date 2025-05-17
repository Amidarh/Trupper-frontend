import { NextRequest, NextResponse } from 'next/server';
import { useAltStore } from '@/lib/zustand/userStore';
import { UserRole } from './core/constants/sidebar';

// Define valid roles as a runtime constant
const VALID_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUB_ADMIN: 'SUB_ADMIN',
  SUPPER_ADMIN: 'SUPER_ADMIN',
} as const;

// Extract role values for runtime checks
const VALID_ROLE_VALUES = Object.values(VALID_ROLES);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userRoutes = ['/dashboard', '/profile'];
  const adminRoutes = ['/admin', '/admin/settings'];
  const superAdminRoutes = ['/super-admin', '/super-admin/users'];

  // Get user role from store
  let userRole: UserRole | null = null;
  try {
    const { user } = useAltStore.getState();
    userRole = user?.role && VALID_ROLE_VALUES.includes(user.role as typeof VALID_ROLE_VALUES[number]) ? user.role as typeof VALID_ROLE_VALUES[number] : null;
  } catch (error) {
    console.error('Failed to access user store:', error);
  }

  // Redirect unauthenticated users to login
  if (!userRole) {
    if (
      userRoutes.includes(pathname) ||
      adminRoutes.includes(pathname) ||
      superAdminRoutes.includes(pathname)
    ) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Role-based access control
  if (userRoutes.includes(pathname) && !VALID_ROLE_VALUES.includes(userRole)) {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if (adminRoutes.includes(pathname) && ![VALID_ROLES.ADMIN, VALID_ROLES.SUB_ADMIN].includes(userRole as 'ADMIN' | 'SUB_ADMIN')) {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if (superAdminRoutes.includes(pathname) && userRole !== VALID_ROLES.ADMIN) {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  // Redirect authenticated users from login/register pages
  if (['/login', '/register', '/sign-up', '/2fa'].includes(pathname)) {
    return NextResponse.redirect(
      new URL(
        userRole === VALID_ROLES.ADMIN || userRole === VALID_ROLES.SUB_ADMIN ? '/admin' : '/dashboard',
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile',
    '/admin/:path*',
    '/super-admin/:path*',
    '/login',
    '/register',
    '/2fa',
    '/ai-examiner',
    '/codes',
    '/dashboard',
    '/my-dashboard',
    '/exams',
    '/forget-password',
    '/mock-exams',
    '/notifications',
    '/newsletters',
    '/subjects',
    '/password-reset',
    '/categories',
    '/exam-type',
    '/users',
    '/subscription',
    '/verify-otp',
    '/sub-admins',
    '/sign-up',
    '/question',
    '/password'
  ],
};