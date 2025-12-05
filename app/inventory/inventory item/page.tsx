'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Package, ArrowLeft, Edit, Trash2, Calendar, 
  DollarSign, BarChart3, Tag, MapPin, Truck,
  AlertTriangle, CheckCircle, Clock, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Mock data for demonstration
const mockInventoryItems = [
  {
    id: '1',
    sku: 'ELEC-001',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver, 2.4GHz connectivity, and 12-month battery life',
    category: 'Electronics',
    quantity: 45,
    price: 29.99,
    cost: 15.50,
    minStockLevel: 10,
    maxStockLevel: 100,
    location: 'A-12',
    supplier: 'TechSuppliers Inc.',
    barcode: '123456789012',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    lastRestocked: new Date('2024-01-15'),
  },
  {
    id: '2',
    sku: 'ELEC-002',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches and customizable lighting',
    category: 'Electronics',
    quantity: 25,
    price: 89.99,
    cost: 45.00,
    minStockLevel: 5,
    maxStockLevel: 50,
    location: 'B-07',
    supplier: 'KeyTech Ltd.',
    barcode: '234567890123',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    lastRestocked: new Date('2024-01-10'),
  },
  {
    id: '3',
    sku: 'FURN-001',
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support and adjustable height',
    category: 'Furniture',
    quantity: 8,
    price: 299.99,
    cost: 150.00,
    minStockLevel: 3,
    maxStockLevel: 20,
    location: 'WH-01',
    supplier: 'OfficePro Inc.',
    barcode: '345678901234',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    lastRestocked: new Date('2024-01-05'),
  },
]

export default function InventoryItemPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [item, setItem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch item
    const fetchItem = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundItem = mockInventoryItems.find(i => i.id === params.id)
      setItem(foundItem)
      setIsLoading(false)
    }
    
    fetchItem()
  }, [params.id])

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' }
    if (quantity <= minStock) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' }
    if (quantity <= minStock * 2) return { status: 'Medium Stock', color: 'bg-blue-100 text-blue-800' }
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' }
  }

  const calculateProfit = () => {
    if (!item) return 0
    return item.price - item.cost
  }

  const calculateProfitMargin = () => {
    if (!item) return 0
    return ((item.price - item.cost) / item.cost) * 100
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading item details...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Package className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Item Not Found</h2>
        <p className="text-gray-600 mt-2">The inventory item you're looking for doesn't exist</p>
        <Button onClick={() => router.push('/inventory')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Inventory
        </Button>
      </div>
    )
  }

  const stockStatus = getStockStatus(item.quantity, item.minStockLevel)

  return (
    <ProtectedRoute requiredPermission="inventory:read">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Inventory
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-mono text-gray-600">{item.sku}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.status}
              </span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button variant="outline" onClick={() => router.push(`/inventory/${item.id}/edit`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Item
            </Button>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stock Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Stock Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Stock</p>
                      <p className="text-3xl font-bold mt-1">{item.quantity} units</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Stock Value</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Minimum Stock Level</span>
                        <span className="font-medium">{item.minStockLevel} units</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${Math.min((item.quantity / item.maxStockLevel) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Maximum Stock Level</span>
                        <span className="font-medium">{item.maxStockLevel} units</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${Math.min((item.quantity / item.maxStockLevel) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Stock Alert</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity <= item.minStockLevel 
                            ? `Low stock! Only ${item.quantity} units remaining` 
                            : 'Stock levels are good'}
                        </p>
                      </div>
                    </div>
                    {item.quantity <= item.minStockLevel && (
                      <Button className="w-full">
                        Order More Stock
                      </Button>
                    )}
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Last Restocked</p>
                        <p className="font-medium">
                          {item.lastRestocked 
                            ? new Date(item.lastRestocked).toLocaleDateString() 
                            : 'Never'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Restock Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing & Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Selling Price</p>
                      <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cost Price</p>
                      <p className="text-2xl font-bold">${item.cost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className="text-2xl font-bold text-green-600">
                        {calculateProfitMargin().toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Profit per Unit</p>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      ${calculateProfit().toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Profit Potential</p>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      ${(calculateProfit() * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{item.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Item Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Tag className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Truck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Supplier</p>
                    <p className="font-medium">{item.supplier}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Added On</p>
                    <p className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {item.barcode && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Barcode</p>
                      <p className="font-mono font-medium">{item.barcode}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Update Stock
                </Button>
                <Button variant="outline" className="w-full">
                  <Truck className="w-4 h-4 mr-2" />
                  Order from Supplier
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Stock Updated</p>
                    <p className="text-sm text-gray-500">+25 units added</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-500">2 days ago</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Edit className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Price Updated</p>
                    <p className="text-sm text-gray-500">Price changed to ${item.price}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-500">1 week ago</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Item Created</p>
                    <p className="text-sm text-gray-500">Added to inventory</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}