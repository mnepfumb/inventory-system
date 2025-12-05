'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/types/users'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  requiredPermission?: string // Format: "resource:action"
}

export default function ProtectedRoute({ 
  children, 
  requiredRole,
  requiredPermission 
}: ProtectedRouteProps) {
  const { user, isLoading, hasPermission, hasRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      // Check role requirement
      if (requiredRole && !hasRole(requiredRole)) {
        router.push('/')
        return
      }

      // Check permission requirement
      if (requiredPermission) {
        const [resource, action] = requiredPermission.split(':')
        if (!hasPermission(resource, action)) {
          router.push('/')
          return
        }
      }
    }
  }, [user, isLoading, requiredRole, requiredPermission, router, hasPermission, hasRole])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}