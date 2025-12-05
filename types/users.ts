export type UserRole = 'admin' | 'manager' | 'staff' | 'viewer'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  department?: string
  phone?: string
  avatar?: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  firstName: string
  lastName: string
  role: UserRole
  department?: string
  phone?: string
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  department?: string
  fullName: string
  avatar?: string
}

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: 'create' | 'read' | 'update' | 'delete'
}

export interface RolePermissions {
  role: UserRole
  permissions: string[] // permission IDs
}