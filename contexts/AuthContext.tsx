'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  organization: string
  fullName: string
  avatar?: string
  department?: string
  locationCode?: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (resource: string, action: string) => boolean
  hasRole: (role: string) => boolean
  hasOrganization: (org: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data - organized by location
const mockUsers = [
  // Head Office Users
  {
    id: '1',
    email: 'ceo@headoffice.com',
    password: 'ceo123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    organization: 'head_office',
    department: 'Executive',
    locationCode: 'HO-001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '2',
    email: 'inventory-manager@headoffice.com',
    password: 'manager123',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'head_office',
    organization: 'head_office',
    department: 'Supply Chain',
    locationCode: 'HO-002',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
  },
  // Warehouse Users
  {
    id: '3',
    email: 'warehouse-lead@warehouse.com',
    password: 'warehouse123',
    firstName: 'David',
    lastName: 'Thompson',
    role: 'warehouse',
    organization: 'warehouse',
    department: 'Logistics',
    locationCode: 'WH-001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    id: '4',
    email: 'warehouse-staff@warehouse.com',
    password: 'staff123',
    firstName: 'Emma',
    lastName: 'Davis',
    role: 'warehouse',
    organization: 'warehouse',
    department: 'Operations',
    locationCode: 'WH-001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  },
  // Store Users
  {
    id: '5',
    email: 'store-manager@store.com',
    password: 'store123',
    firstName: 'Alice',
    lastName: 'Wilson',
    role: 'store',
    organization: 'store',
    department: 'Store Management',
    locationCode: 'ST-001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
  {
    id: '6',
    email: 'cashier@store.com',
    password: 'cashier123',
    firstName: 'Robert',
    lastName: 'Brown',
    role: 'store',
    organization: 'store',
    department: 'Sales',
    locationCode: 'ST-001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
  },
]

// Role hierarchy
const roleHierarchy: Record<string, number> = {
  admin: 5,
  head_office: 4,
  warehouse: 3,
  store: 2
}

// Role-based permissions
const permissions: Record<string, string[]> = {
  admin: [
    // Full access
    'inventory:create', 'inventory:read', 'inventory:update', 'inventory:delete',
    'users:create', 'users:read', 'users:update', 'users:delete',
    'categories:create', 'categories:read', 'categories:update', 'categories:delete',
    'reports:read', 'reports:export',
    'settings:update', 'settings:configure',
    'suppliers:create', 'suppliers:read', 'suppliers:update', 'suppliers:delete', 'suppliers:approve',
  ],
  head_office: [
    // Head office can manage all inventory and view all locations
    'inventory:read', 'inventory:update',
    'categories:read', 'categories:create',
    'reports:read', 'reports:export',
    'suppliers:read', 'suppliers:update', 'suppliers:approve',
    'locations:read', 'locations:manage'
  ],
  warehouse: [
    // Warehouse can manage local inventory and process suppliers
    'inventory:read', 'inventory:update', 'inventory:create',
    'categories:read',
    'suppliers:read', 'suppliers:create', 'suppliers:update',
    'reports:read'
  ],
  store: [
    // Store can only view and update local inventory
    'inventory:read', 'inventory:update',
    'categories:read',
    'suppliers:read',
    'reports:read'
  ]
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user session on mount
    const savedUser = localStorage.getItem('inventory_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Find user in mock data
    const foundUser = mockUsers.find(u => 
      u.email === email && u.password === password
    )
    
    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
        organization: foundUser.organization,
        department: foundUser.department,
        locationCode: foundUser.locationCode,
        fullName: `${foundUser.firstName} ${foundUser.lastName}`,
        avatar: foundUser.avatar
      }
      
      setUser(authUser)
      localStorage.setItem('inventory_user', JSON.stringify(authUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('inventory_user')
  }

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false
    
    const permission = `${resource}:${action}`
    return permissions[user.role]?.includes(permission) || false
  }

  const hasRole = (role: string): boolean => {
    if (!user) return false
    return roleHierarchy[user.role] >= roleHierarchy[role]
  }

  const hasOrganization = (org: string): boolean => {
    if (!user) return false
    return user.organization === org
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      hasPermission,
      hasRole,
      hasOrganization
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
