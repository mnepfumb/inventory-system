'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  fullName: string
  avatar?: string
  department?: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (resource: string, action: string) => boolean
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data
const mockUsers = [
  {
    id: '1',
    email: 'admin@inventory.com',
    password: 'admin123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
    department: 'Management',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    id: '2',
    email: 'manager@inventory.com',
    password: 'manager123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'manager',
    department: 'Operations',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  },
  {
    id: '3',
    email: 'staff@inventory.com',
    password: 'staff123',
    firstName: 'Bob',
    lastName: 'Johnson',
    role: 'staff',
    department: 'Warehouse',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  },
  {
    id: '4',
    email: 'viewer@inventory.com',
    password: 'viewer123',
    firstName: 'Alice',
    lastName: 'Williams',
    role: 'viewer',
    department: 'Finance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
]

// Role hierarchy and permissions
const roleHierarchy: Record<string, number> = {
  admin: 4,
  manager: 3,
  staff: 2,
  viewer: 1
}

const permissions: Record<string, string[]> = {
  admin: [
    'inventory:create', 'inventory:read', 'inventory:update', 'inventory:delete',
    'users:create', 'users:read', 'users:update', 'users:delete',
    'categories:create', 'categories:read', 'categories:update', 'categories:delete',
    'reports:read', 'settings:update'
  ],
  manager: [
    'inventory:create', 'inventory:read', 'inventory:update',
    'categories:create', 'categories:read', 'categories:update',
    'reports:read'
  ],
  staff: [
    'inventory:read', 'inventory:create', 'inventory:update',
    'categories:read'
  ],
  viewer: [
    'inventory:read',
    'categories:read'
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
        department: foundUser.department,
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

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      hasPermission,
      hasRole
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

// 'use client'

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
// import { AuthUser, User, UserRole } from '@/types/users'
// import { mockUsers } from '@/lib/mockUsers'

// interface AuthContextType {
//   user: AuthUser | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<boolean>
//   logout: () => void
//   register: (userData: any) => Promise<boolean>
//   updateProfile: (data: Partial<AuthUser>) => void
//   hasPermission: (resource: string, action: string) => boolean
//   hasRole: (role: UserRole) => boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// const roleHierarchy: Record<UserRole, number> = {
//   admin: 4,
//   manager: 3,
//   staff: 2,
//   viewer: 1
// }

// const permissions: Record<UserRole, string[]> = {
//   admin: [
//     'inventory:create', 'inventory:read', 'inventory:update', 'inventory:delete',
//     'users:create', 'users:read', 'users:update', 'users:delete',
//     'categories:create', 'categories:read', 'categories:update', 'categories:delete',
//     'reports:read', 'settings:update'
//   ],
//   manager: [
//     'inventory:create', 'inventory:read', 'inventory:update',
//     'categories:create', 'categories:read', 'categories:update',
//     'reports:read'
//   ],
//   staff: [
//     'inventory:read', 'inventory:create', 'inventory:update',
//     'categories:read'
//   ],
//   viewer: [
//     'inventory:read',
//     'categories:read'
//   ]
// }

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check for saved user session
//     const savedUser = localStorage.getItem('inventory_user')
//     if (savedUser) {
//       try {
//         setUser(JSON.parse(savedUser))
//       } catch (error) {
//         console.error('Failed to parse saved user:', error)
//       }
//     }
//     setIsLoading(false)
//   }, [])

//   const login = async (email: string, password: string): Promise<boolean> => {
//     setIsLoading(true)
    
//     // Mock API call - replace with real authentication
//     await new Promise(resolve => setTimeout(resolve, 1000))
    
//     // Find user in mock data
//     const mockUser = mockUsers.find(u => 
//       u.email === email && u.password === password && u.isActive
//     )
    
//     if (mockUser) {
//       const authUser: AuthUser = {
//         id: mockUser.id,
//         email: mockUser.email,
//         firstName: mockUser.firstName,
//         lastName: mockUser.lastName,
//         role: mockUser.role,
//         department: mockUser.department,
//         fullName: `${mockUser.firstName} ${mockUser.lastName}`,
//         avatar: mockUser.avatar
//       }
      
//       setUser(authUser)
//       localStorage.setItem('inventory_user', JSON.stringify(authUser))
//       setIsLoading(false)
//       return true
//     }
    
//     setIsLoading(false)
//     return false
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem('inventory_user')
//   }

//   const register = async (userData: any): Promise<boolean> => {
//     setIsLoading(true)
//     await new Promise(resolve => setTimeout(resolve, 1000))
    
//     // In real app, send to API
//     console.log('Registering user:', userData)
    
//     setIsLoading(false)
//     return true
//   }

//   const updateProfile = (data: Partial<AuthUser>) => {
//     if (user) {
//       const updatedUser = { ...user, ...data }
//       setUser(updatedUser)
//       localStorage.setItem('inventory_user', JSON.stringify(updatedUser))
//     }
//   }

//   const hasPermission = (resource: string, action: string): boolean => {
//     if (!user) return false
    
//     const permission = `${resource}:${action}`
//     return permissions[user.role]?.includes(permission) || false
//   }

//   const hasRole = (role: UserRole): boolean => {
//     if (!user) return false
//     return roleHierarchy[user.role] >= roleHierarchy[role]
//   }

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isLoading,
//       login,
//       logout,
//       register,
//       updateProfile,
//       hasPermission,
//       hasRole
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }