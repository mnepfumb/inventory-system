'use client'

import { useAuth } from '@/contexts/AuthContext'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import ManagerDashboard from '@/components/dashboard/ManagerDashboard'
import StaffDashboard from '@/components/dashboard/StaffDashboard'
import ViewerDashboard from '@/components/dashboard/ViewerDashboard'
import { Shield, User, BarChart3, Package } from 'lucide-react'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">Please sign in to view the dashboard</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  // Render different dashboard based on role
  const getDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} />
      case 'manager':
        return <ManagerDashboard user={user} />
      case 'staff':
        return <StaffDashboard user={user} />
      case 'viewer':
        return <ViewerDashboard user={user} />
      default:
        return <ViewerDashboard user={user} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.firstName}! Here's what's happening today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.role === 'admin' ? 'bg-red-100 text-red-800' :
            user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
            user.role === 'staff' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {user.role === 'admin' ? 'Administrator' :
             user.role === 'manager' ? 'Manager' :
             user.role === 'staff' ? 'Staff' : 'Viewer'}
          </span>
        </div>
      </div>

      {getDashboard()}
    </div>
  )
}