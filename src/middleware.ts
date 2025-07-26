import { NextRequest, NextResponse } from 'next/server';

const VALID_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUB_ADMIN: 'SUB_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

const PERMISSIONS: Record<keyof typeof VALID_ROLES, string[]> = {
  USER: [
    'dashboard',
    'my-exams',
    'mock-exams',
    'ai-examiner',
    'my-performance',
    'my-notifications',
    'my-profile',
    'result',
    'exam',
  ],
  ADMIN: [
    'dashboard',
    'users',
    'categories',
    'sub-admins',
    'exam-type',
    'exams',
    'subjects',
    'questions',
    'notifications',
    'newsletters',
    'codes',
    'customization',
    'subscription',
    'roles',
    'results',
  ],
  SUB_ADMIN: [
    'dashboard',
    'users',
    'categories',
    'exam-type',
    'exams',
    'subjects',
    'questions',
  ],
  SUPER_ADMIN: [
    'dashboard',
    'users',
    'categories',
    'sub-admins',
    'exam-type',
    'exams',
    'subjects',
    'questions',
    'notifications',
    'newsletters',
    'codes',
    'customization',
    'subscription',
  ],
};

const ROUTE_PERMISSIONS: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/users': 'users',
  '/categories': 'categories',
  '/sub-admins': 'sub-admins',
  '/exam-type': 'exam-type',
  '/exams': 'exams',
  '/subjects': 'subjects',
  '/questions': 'questions',
  '/notifications': 'notifications',
  '/newsletters': 'newsletters',
  '/codes': 'codes',
  '/customization': 'customization',
  '/subscription': 'subscription',
  '/my-exams': 'my-exams',
  '/mock-exams': 'mock-exams',
  '/ai-examiner': 'ai-examiner',
  '/my-performance': 'my-performance',
  '/my-notifications': 'my-notifications',
  '/my-profile': 'my-profile',
  '/user-result': 'results',
  '/exam': 'exam',
};

const AUTH_ROUTES = [
  '/login',
  '/register',
  '/sign-up',
  '/2fa',
  '/forget-password',
  '/password-reset',
  '/verify-otp',
  '/password',
  '/',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get('role')?.value as
    | keyof typeof VALID_ROLES
    | undefined;

  // Allow unauthenticated access to /kyc-complete and its subroutes
  if (pathname.startsWith('/kyc-complete')) {
    console.log(`Allowing access to ${pathname} without authentication`);
    return NextResponse.next();
  }

  // Redirect unauthenticated users on protected routes
  const isProtected = Object.keys(ROUTE_PERMISSIONS).some((route) =>
    pathname.startsWith(route)
  );
  if (!userRole || !VALID_ROLES[userRole]) {
    if (isProtected) {
      console.log(
        `Redirecting unauthenticated user from ${pathname} to /login`
      );
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', encodeURIComponent(request.url));
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth routes
  if (AUTH_ROUTES.includes(pathname)) {
    console.log(
      `Redirecting authenticated user from ${pathname} to /dashboard`
    );
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Authorization check
  const permissionKey = Object.keys(ROUTE_PERMISSIONS).find((route) =>
    pathname.startsWith(route)
  );
  if (permissionKey) {
    const requiredPermission = ROUTE_PERMISSIONS[permissionKey];
    const allowedPermissions = PERMISSIONS[userRole] || [];
    if (!allowedPermissions.includes(requiredPermission)) {
      console.log(
        `User role ${userRole} lacks permission ${requiredPermission} for ${pathname}`
      );
      return NextResponse.rewrite(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
