import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('jwt')?.value;

  const userRoutes = ['/dashboard', '/profile'];
  const adminRoutes = ['/admin', '/admin/settings'];
  const superAdminRoutes = ['/super-admin', '/super-admin/users'];

  // Validate token server-side
  let userRole: string | null = null;
  if (token) {
    try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET) as { role: string };
    //   userRole = decoded.role;
    } catch (error) {
      // Invalid or expired token
    }
  }

  // Redirect unauthenticated users to login
  if (!token || !userRole) {
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
  if (userRoutes.includes(pathname) && !['user', 'admin', 'super_admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if (adminRoutes.includes(pathname) && !['admin', 'super_admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if (superAdminRoutes.includes(pathname) && userRole !== 'super_admin') {
    return NextResponse.redirect(new URL('/403', request.url));
  }

  // Redirect authenticated users from login/register pages
  if (['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(
      new URL(
        userRole === 'super_admin' || userRole === 'admin' ? '/admin' : '/dashboard',
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/profile',
    '/admin/:path*',
    '/super-admin/:path*',
    '/login',
    '/register',
    '/logout',
  ],
};