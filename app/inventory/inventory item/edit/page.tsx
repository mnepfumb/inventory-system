'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowLeft, Save, Package, DollarSign, 
  AlertTriangle, CheckCircle 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Mock data for demonstration
const mockInventoryItems = [
  {
    id: '1',
    sku: 'ELEC-001',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    category: 'Electronics',
    quantity: 45,
    price: 29.99,
    cost: 15.50,
    minStockLevel: 10,
    maxStockLevel: 100,
    location: 'A-12',
    supplier: 'TechSuppliers Inc.',
    barcode: '123456789012',
  },
  {
    id: '2',
    sku: 'ELEC-002',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    category: 'Electronics',
    quantity: 25,
    price: 89.99,
    cost: 45.00,
    minStockLevel: 5,
    maxStockLevel: 50,
    location: 'B-07',
    supplier: 'KeyTech Ltd.',
    barcode: '234567890123',
  },
]

const categories = ['Electronics', 'Furniture', 'Office Supplies', 'Software', 'Hardware', 'Networking']

export default function EditInventoryPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    cost: 0,
    minStockLevel: 0,
    maxStockLevel: 100,
    location: '',
    supplier: '',
    barcode: '',
  })

  useEffect(() => {
    // Simulate API call to fetch item
    const fetchItem = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundItem = mockInventoryItems.find(i => i.id === params.id)
      if (foundItem) {
        setFormData({
          sku: foundItem.sku,
          name: foundItem.name,
          description: foundItem.description,
          category: foundItem.category,
          quantity: foundItem.quantity,
          price: foundItem.price,
          cost: foundItem.cost,
          minStockLevel: foundItem.minStockLevel,
          maxStockLevel: foundItem.maxStockLevel,
          location: foundItem.location,
          supplier: foundItem.supplier,
          barcode: foundItem.barcode || '',
        })
      }
      setIsLoading(false)
    }
    
    fetchItem()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('quantity') || name.includes('price') || name.includes('cost') || name.includes('Level') 
        ? parseFloat(value) || 0 
        : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Updating item:', formData)
    
    // Redirect back to item detail page
    router.push(`/inventory/${params.id}`)
  }

  const calculateProfit = () => {
    return formData.price - formData.cost
  }

  const calculateProfitMargin = () => {
    if (formData.cost === 0) return 0
    return ((formData.price - formData.cost) / formData.cost) * 100
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading item data...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute requiredPermission="inventory:update">
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Item
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Inventory Item</h1>
        <p className="text-gray-600 mt-2">Update the details for {formData.name}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SKU *</label>
                    <Input
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="e.g., ELEC-001"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Product Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Wireless Mouse"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location *</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Warehouse A, Shelf B3"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Product description..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stock Information */}
            <Card>
              <CardHeader>
                <CardTitle>Stock Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Quantity</label>
                    <Input
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Minimum Stock Level</label>
                    <Input
                      name="minStockLevel"
                      type="number"
                      value={formData.minStockLevel}
                      onChange={handleChange}
                      min="0"
                    />
                    <p className="text-xs text-gray-500">Alert when stock falls below this level</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Maximum Stock Level</label>
                    <Input
                      name="maxStockLevel"
                      type="number"
                      value={formData.maxStockLevel}
                      onChange={handleChange}
                      min="0"
                    />
                    <p className="text-xs text-gray-500">Maximum quantity to store</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Barcode</label>
                    <Input
                      name="barcode"
                      value={formData.barcode}
                      onChange={handleChange}
                      placeholder="Scan or enter barcode"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Selling Price ($)</label>
                    <Input
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Cost Price ($)</label>
                    <Input
                      name="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Profit per Unit</p>
                      <p className="text-xl font-bold text-green-600">
                        ${calculateProfit().toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Profit Margin</p>
                      <p className="text-xl font-bold text-blue-600">
                        {calculateProfitMargin().toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supplier Information */}
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Supplier</label>
                    <Input
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleChange}
                      placeholder="e.g., TechSuppliers Inc."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Stock Status */}
            <Card>
              <CardHeader>
                <CardTitle>Stock Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Current Stock</p>
                      <p className="text-2xl font-bold">{formData.quantity} units</p>
                    </div>
                  </div>

                  {formData.quantity <= formData.minStockLevel ? (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-800">Low Stock Alert</p>
                          <p className="text-sm text-red-600">
                            Only {formData.quantity} units remaining (min: {formData.minStockLevel})
                          </p>
                        </div>
                      </div>
                      <Button variant="destructive" className="w-full">
                        Order More Stock
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Stock Level Good</p>
                          <p className="text-sm text-green-600">
                            {formData.quantity} units in stock
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Min Stock</span>
                      <span className="font-medium">{formData.minStockLevel} units</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${Math.min((formData.quantity / formData.maxStockLevel) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Max Stock</span>
                      <span className="font-medium">{formData.maxStockLevel} units</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Value Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Value Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Cost Value</span>
                    <span className="font-medium">
                      ${(formData.quantity * formData.cost).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Selling Value</span>
                    <span className="font-medium text-green-600">
                      ${(formData.quantity * formData.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Profit Potential</span>
                    <span className="font-medium text-blue-600">
                      ${(formData.quantity * calculateProfit()).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this item?')) {
                        // Handle delete
                        router.push('/inventory')
                      }
                    }}
                  >
                    Delete Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
    </ProtectedRoute>
  )
}