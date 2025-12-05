export type UserRole = 'head_office' | 'warehouse' | 'store' | 'admin'

export type Organization = 'head_office' | 'warehouse' | 'store'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  organization: Organization
  department?: string
  phone?: string
  avatar?: string
  locationCode?: string // for warehouse/store identification
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
  organization: Organization
  department?: string
  phone?: string
  locationCode?: string
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  organization: Organization
  department?: string
  locationCode?: string
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