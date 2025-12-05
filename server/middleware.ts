// NOTE: moved out of project root because `middleware.ts` is incompatible with `output: 'export'`.
// This file is preserved for reference and local/server deployments.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes and required roles
const protectedRoutes = [
  { path: '/inventory', roles: ['viewer', 'staff', 'manager', 'admin'] },
  { path: '/categories', roles: ['viewer', 'staff', 'manager', 'admin'] },
  { path: '/users', roles: ['admin'] },
  { path: '/settings', roles: ['admin'] },
  { path: '/reports', roles: ['manager', 'admin'] },
]

export function middleware(request: NextRequest) {
  // For now, we'll rely on client-side protection
  // In a real app, you would verify JWT tokens or sessions here
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}
