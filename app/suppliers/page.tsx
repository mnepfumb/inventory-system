'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Truck, Search, Plus, Edit, Trash2, 
  Phone, Mail, Globe, Package, Clock 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const suppliers = [
  {
    id: '1',
    name: 'TechSuppliers Inc.',
    contact: 'John Smith',
    email: 'john@techsuppliers.com',
    phone: '+1 (555) 123-4567',
    website: 'www.techsuppliers.com',
    itemsSupplied: 45,
    lastOrder: '2024-01-20',
    status: 'active',
  },
  {
    id: '2',
    name: 'ElectroParts Co.',
    contact: 'Sarah Johnson',
    email: 'sarah@electroparts.com',
    phone: '+1 (555) 234-5678',
    website: 'www.electroparts.com',
    itemsSupplied: 89,
    lastOrder: '2024-01-18',
    status: 'active',
  },
  {
    id: '3',
    name: 'OfficePro Supplies',
    contact: 'Mike Wilson',
    email: 'mike@officepro.com',
    phone: '+1 (555) 345-6789',
    website: 'www.officepro.com',
    itemsSupplied: 23,
    lastOrder: '2024-01-15',
    status: 'active',
  },
  {
    id: '4',
    name: 'Furniture Masters',
    contact: 'Emma Davis',
    email: 'emma@furnituremasters.com',
    phone: '+1 (555) 456-7890',
    website: 'www.furnituremasters.com',
    itemsSupplied: 12,
    lastOrder: '2024-01-10',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Cable Solutions Ltd.',
    contact: 'Robert Brown',
    email: 'robert@cablesolutions.com',
    phone: '+1 (555) 567-8901',
    website: 'www.cablesolutions.com',
    itemsSupplied: 156,
    lastOrder: '2024-01-22',
    status: 'active',
  },
]

export default function SuppliersPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-2">Manage your suppliers and procurement partners</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Suppliers</p>
                <p className="text-2xl font-bold mt-2">{suppliers.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold mt-2">
                  {suppliers.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Items Supplied</p>
                <p className="text-2xl font-bold mt-2">
                  {suppliers.reduce((sum, s) => sum + s.itemsSupplied, 0)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month Orders</p>
                <p className="text-2xl font-bold mt-2">18</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search suppliers by name, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Supplier</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Contact Info</th>
                    <th className="text-left py-3 px-4">Items</th>
                    <th className="text-left py-3 px-4">Last Order</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Globe className="w-3 h-3" />
                            {supplier.website}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">{supplier.contact}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3 text-gray-500" />
                            {supplier.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3 text-gray-500" />
                            {supplier.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-500" />
                          {supplier.itemsSupplied} items
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {supplier.lastOrder}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          supplier.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {supplier.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No suppliers found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers
                .sort((a, b) => b.itemsSupplied - a.itemsSupplied)
                .slice(0, 4)
                .map((supplier) => (
                  <div key={supplier.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{supplier.name}</p>
                      <p className="text-sm text-gray-500">{supplier.itemsSupplied} items</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(supplier.itemsSupplied / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { supplier: 'TechSuppliers Inc.', items: 45, date: 'Today', status: 'Delivered' },
                { supplier: 'Cable Solutions Ltd.', items: 120, date: 'Yesterday', status: 'Processing' },
                { supplier: 'ElectroParts Co.', items: 23, date: '2 days ago', status: 'Shipped' },
                { supplier: 'OfficePro Supplies', items: 89, date: '3 days ago', status: 'Delivered' },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.supplier}</p>
                    <p className="text-sm text-gray-500">{order.items} items • {order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}