'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ShoppingCart, Search, Plus, Package, 
  Truck, CheckCircle, Clock, XCircle,
  Filter, Download, Eye, Edit 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

const orders = [
  {
    id: 'ORD-001',
    customer: 'ABC Corporation',
    items: 5,
    total: 'R1,245.99',
    date: '2024-01-22',
    status: 'processing',
    statusText: 'Processing',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: 'ORD-002',
    customer: 'XYZ Ltd.',
    items: 12,
    total: 'R3,567.50',
    date: '2024-01-21',
    status: 'shipped',
    statusText: 'Shipped',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'ORD-003',
    customer: 'Tech Solutions Inc.',
    items: 3,
    total: 'R789.25',
    date: '2024-01-20',
    status: 'delivered',
    statusText: 'Delivered',
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 'ORD-004',
    customer: 'Global Enterprises',
    items: 8,
    total: 'R2,134.75',
    date: '2024-01-19',
    status: 'pending',
    statusText: 'Pending',
    color: 'bg-gray-100 text-gray-800',
  },
  {
    id: 'ORD-005',
    customer: 'Innovate Co.',
    items: 1,
    total: 'R149.99',
    date: '2024-01-18',
    status: 'cancelled',
    statusText: 'Cancelled',
    color: 'bg-red-100 text-red-800',
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

  const stats = [
    { title: 'Total Orders', value: '156', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
    { title: 'Processing', value: '12', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Shipped', value: '8', icon: Truck, color: 'bg-purple-100 text-purple-600' },
    { title: 'Delivered Today', value: '5', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return Clock
      case 'shipped': return Truck
      case 'delivered': return CheckCircle
      case 'cancelled': return XCircle
      default: return Clock
    }
  }

  return (
    <ProtectedRoute requiredPermission="orders:read">
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-2">Manage customer orders and track shipments</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders by ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status)
                    return (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="font-mono font-medium">{order.id}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">{order.customer}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-500" />
                            {order.items} items
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium">{order.total}</p>
                        </td>
                        <td className="py-4 px-4">
                          {order.date}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4" />
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.color}`}>
                              {order.statusText}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Order ORD-006 created', time: '2 hours ago', user: 'John Doe' },
                { action: 'Order ORD-002 shipped', time: '4 hours ago', user: 'Jane Smith' },
                { action: 'Payment received for ORD-003', time: '6 hours ago', user: 'System' },
                { action: 'Order ORD-005 cancelled', time: '1 day ago', user: 'Mike Wilson' },
                { action: 'New customer registered', time: '2 days ago', user: 'System' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="w-4 h-4 mr-2" />
                Bulk Update
              </Button>
              <Button className="w-full justify-start">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  )
}