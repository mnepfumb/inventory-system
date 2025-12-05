'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Home, 
  Package, 
  Tag, 
  BarChart3, 
  Settings, 
  Users,
  Truck,
  FileText,
  Bell,
  Shield,
  User,
  ShoppingCart,
  Menu,
  X
} from 'lucide-react'

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, hasPermission } = useAuth()

  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: Home, 
      requiredPermission: null 
    },
    { 
      name: 'Inventory', 
      href: '/inventory', 
      icon: Package, 
      requiredPermission: 'inventory:read' 
    },
    { 
      name: 'Categories', 
      href: '/categories', 
      icon: Tag, 
      requiredPermission: 'categories:read' 
    },
    { 
      name: 'Transfers', 
      href: '/transfers', 
      icon: Truck, 
      requiredPermission: 'transfers:read',
      visibleFor: ['head_office', 'warehouse', 'admin']
    },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: BarChart3, 
      requiredPermission: 'reports:read',
      visibleFor: ['head_office', 'warehouse', 'admin']
    },
    { 
      name: 'Users', 
      href: '/users', 
      icon: Users, 
      requiredPermission: 'users:read',
      visibleFor: ['admin']
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Settings, 
      requiredPermission: 'settings:update',
      visibleFor: ['admin', 'head_office']
    },
  ]

  const filteredNavItems = navItems.filter(item => {
    // Check if user has required permission
    if (item.requiredPermission && !hasPermission(
      item.requiredPermission.split(':')[0],
      item.requiredPermission.split(':')[1]
    )) {
      return false
    }
    
    // Check if role is allowed to see this item
    if (item.visibleFor && !item.visibleFor.includes(user?.role || '')) {
      return false
    }
    
    return true
  })

  // Quick links for easier access
  const quickLinks = [
    { name: 'Add Inventory', href: '/inventory/add', icon: Plus },
    { name: 'View Profile', href: '/profile', icon: User },
  ]

  return (
    <>
      {/* Mobile menu button - only on mobile */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg hover:bg-gray-100 active:bg-gray-200"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile overlay - only on mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile, visible on md+ */}
      <div className={`${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static fixed top-0 left-0 inset-y-0 z-40 w-72 flex flex-col transition-transform duration-300 ease-in-out md:transition-none md:relative md:border-r md:border-gray-200`}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4 md:px-6 pb-4 pt-16 md:pt-0">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">StockMaster</h1>
              <p className="text-xs text-gray-500">Inventory System</p>
            </div>
          </Link>
        </div>
        
        {/* User Profile */}
        {user && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm">{user.fullName}</p>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider mb-2">
                Navigation
              </div>
              <ul role="list" className="-mx-2 space-y-1">
                {filteredNavItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex gap-x-3 rounded-md p-3 md:p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100 md:active:bg-transparent"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
            
            {/* Quick Actions */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider mb-2">
                Quick Actions
              </div>
              <ul role="list" className="-mx-2 space-y-1">
                <li>
                  <Link
                    href="/inventory/add"
                    onClick={() => setMobileOpen(false)}
                    className="group flex gap-x-3 rounded-md p-3 md:p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100 md:active:bg-transparent"
                  >
                    <Package className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600" />
                    Add New Item
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="group flex gap-x-3 rounded-md p-3 md:p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 active:bg-gray-100 md:active:bg-transparent"
                  >
                    <User className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600" />
                    My Profile
                  </Link>
                </li>
              </ul>
            </li>
            
            {/* Notifications */}
            <li className="mt-auto">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Notifications</p>
                    <p className="text-xs text-gray-500">Low stock alerts</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
      </>
  )
}

// Add the missing Plus icon import
const Plus = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 20 20" 
    fill="currentColor"
  >
    <path 
      fillRule="evenodd" 
      d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" 
      clipRule="evenodd" 
    />
  </svg>
)