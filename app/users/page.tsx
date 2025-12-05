'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Users, Search, Plus, Edit, Trash2, Shield, 
  UserCheck, UserX, Mail, Phone, Building 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockUsers } from '@/lib/mockUsers'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function UsersPage() {
  
  const { user, hasPermission } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState(mockUsers)

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'manager': return 'bg-blue-100 text-blue-800'
      case 'staff': return 'bg-green-100 text-green-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator'
      case 'manager': return 'Manager'
      case 'staff': return 'Staff'
      case 'viewer': return 'Viewer'
      default: return role
    }
  }

  const canEditUsers = hasPermission('users', 'update')
  const canDeleteUsers = hasPermission('users', 'delete')
  const canCreateUsers = hasPermission('users', 'create')

  if (!user) return null

  return (
    <ProtectedRoute requiredPermission="users:read">
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage system users and their permissions</p>
        </div>
        {canCreateUsers && (
          <Button className="mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold mt-2">{users.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold mt-2">
                  {users.filter(u => u.isActive).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold mt-2">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-2xl font-bold mt-2">
                  {Array.from(new Set(users.map(u => u.department).filter(Boolean))).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Department</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Last Login</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userItem) => (
                    <tr key={userItem.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            {userItem.avatar ? (
                              <img 
                                src={userItem.avatar} 
                                alt={`${userItem.firstName} ${userItem.lastName}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {userItem.firstName} {userItem.lastName}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Mail className="w-3 h-3" />
                              {userItem.email}
                            </div>
                            {userItem.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Phone className="w-3 h-3" />
                                {userItem.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(userItem.role)}`}>
                          {getRoleLabel(userItem.role)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {userItem.department || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${userItem.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span>{userItem.isActive ? 'Active' : 'Inactive'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {userItem.lastLogin
                          ? new Date(userItem.lastLogin).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Never'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {(canEditUsers || canDeleteUsers) && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {canEditUsers && (
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                )}
                                {canEditUsers && (
                                  <DropdownMenuItem>
                                    <Shield className="w-4 h-4 mr-2" />
                                    Change Role
                                  </DropdownMenuItem>
                                )}
                                {canDeleteUsers && (
                                  <DropdownMenuItem className="text-red-600">
                                    <UserX className="w-4 h-4 mr-2" />
                                    Deactivate
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No users found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Administrator</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor('admin')}`}>
                    Full Access
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Can manage everything including users, settings, and all inventory operations.
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Manager</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor('manager')}`}>
                    Inventory Management
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Can manage inventory, categories, and view reports. Cannot manage users.
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Staff</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor('staff')}`}>
                    Limited Access
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Can view inventory, create and update items. Cannot delete or manage categories.
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Viewer</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor('viewer')}`}>
                    Read Only
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Can only view inventory and categories. Cannot make any changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users
                .filter(u => u.lastLogin)
                .sort((a, b) => new Date(b.lastLogin!).getTime() - new Date(a.lastLogin!).getTime())
                .slice(0, 5)
                .map((userItem) => (
                  <div key={userItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        {userItem.avatar ? (
                          <img 
                            src={userItem.avatar} 
                            alt={userItem.firstName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {userItem.firstName} {userItem.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userItem.department || 'No department'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Last login
                      </p>
                      <p className="text-xs text-gray-500">
                        {userItem.lastLogin
                          ? new Date(userItem.lastLogin).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  
  </ProtectedRoute>
  )
}