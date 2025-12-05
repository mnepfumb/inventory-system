'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, ArrowRight, Users, BarChart3, Shield } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by looking at localStorage
    const user = localStorage.getItem('inventory_user')
    if (user) {
      router.push('/dashboard')
    }
  }, [router])

  const features = [
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels, manage products, and monitor inventory in real-time.',
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Admin, Manager, Staff, and Viewer roles with different permission levels.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get insights with detailed reports and inventory analytics.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with role-based permissions.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StockMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-blue-600 hover:text-blue-800"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Inventory Management
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Streamline your inventory operations with our comprehensive solution. 
            Track stock, manage suppliers, and gain insights with role-based dashboards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              Sign In to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Try Demo Accounts
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our inventory system provides all the tools you need to manage your stock efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Demo Accounts Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Try Demo Accounts</h2>
            <p className="text-gray-600">
              Experience the system with different user roles. Use the credentials below to sign in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'Admin', email: 'admin@inventory.com', password: 'admin123', color: 'bg-red-100 text-red-800' },
              { role: 'Manager', email: 'manager@inventory.com', password: 'manager123', color: 'bg-blue-100 text-blue-800' },
              { role: 'Staff', email: 'staff@inventory.com', password: 'staff123', color: 'bg-green-100 text-green-800' },
              { role: 'Viewer', email: 'viewer@inventory.com', password: 'viewer123', color: 'bg-gray-100 text-gray-800' },
            ].map((account) => (
              <div key={account.role} className="bg-white border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">{account.role}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${account.color}`}>
                    {account.role}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-mono text-sm">{account.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Password</p>
                    <p className="font-mono text-sm">{account.password}</p>
                  </div>
                  <button
                    onClick={() => {
                      // Auto-fill the login form
                      localStorage.setItem('demo_email', account.email)
                      localStorage.setItem('demo_password', account.password)
                      router.push('/login')
                    }}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Use This Account
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              All accounts have different permission levels to showcase role-based access control.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">StockMaster</span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional inventory management system with role-based access control, 
              real-time tracking, and comprehensive analytics.
            </p>
            <div className="mt-8">
              <button
                onClick={() => router.push('/login')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Get Started Free
              </button>
            </div>
            <p className="mt-8 text-gray-500 text-sm">
              © 2024 Inventory Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}