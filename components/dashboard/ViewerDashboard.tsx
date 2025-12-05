import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Package, Eye, BarChart3, Tag, 
  TrendingUp, Download, Filter, Search,
  ArrowRight, Calendar, BookOpen, History
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ViewerDashboardProps {
  user: any
}

export default function ViewerDashboard({ user }: ViewerDashboardProps) {
  const inventoryOverview = [
    { category: 'Electronics', count: 245, value: 'R45,678', change: '+12%' },
    { category: 'Furniture', count: 89, value: 'R67,890', change: '+8%' },
    { category: 'Office Supplies', count: 432, value: 'R12,345', change: '+15%' },
    { category: 'Software', count: 56, value: 'R23,456', change: '+5%' },
  ]

  const recentAdditions = [
    { name: 'Wireless Mouse', category: 'Electronics', added: 'Today', sku: 'ELEC-001' },
    { name: 'Ergonomic Chair', category: 'Furniture', added: 'Yesterday', sku: 'FUR-012' },
    { name: 'USB-C Hub', category: 'Electronics', added: '2 days ago', sku: 'ELEC-045' },
    { name: 'Desk Lamp', category: 'Office Supplies', added: '3 days ago', sku: 'OFF-023' },
  ]

  const topCategories = [
    { name: 'Electronics', items: 245, percentage: 35 },
    { name: 'Office Supplies', items: 432, percentage: 25 },
    { name: 'Furniture', items: 89, percentage: 20 },
    { name: 'Software', items: 56, percentage: 15 },
    { name: 'Networking', items: 34, percentage: 5 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner for Viewer */}
      <div className="p-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Read-Only Dashboard</h2>
            </div>
            <p className="text-gray-100">
              You have view-only access. Browse inventory, view reports, and monitor stock levels.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-white text-gray-800 hover:bg-gray-100">
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Inventory
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold mt-2">1,234</p>
                <p className="text-sm text-gray-500 mt-1">Across 12 categories</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold mt-2">R145,678</p>
                <p className="text-sm text-green-600 mt-1">+8.2% from last month</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold mt-2">12</p>
                <p className="text-sm text-gray-500 mt-1">5 main categories</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold mt-2">18</p>
                <p className="text-sm text-gray-500 mt-1">Need attention</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Category Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryOverview.map((category) => (
                <div key={category.category} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Tag className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{category.category}</p>
                      <p className="text-sm text-gray-500">{category.count} items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{category.value}</p>
                    <p className={`text-sm ${category.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {category.change} from last month
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Additions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAdditions.map((item) => (
                <div key={item.sku} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category} • {item.added}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Category Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-gray-500">{category.items} items ({category.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Browse Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search inventory items..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button className="flex-1">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Inventory List
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Category Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Monthly Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Value Trends
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold">View-Only Access</h3>
          </div>
          <p className="text-sm text-gray-600">
            You can browse all inventory items, view categories, and access reports. No editing permissions.
          </p>
        </div>

        <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold">Export Data</h3>
          </div>
          <p className="text-sm text-gray-600">
            Export inventory data as CSV or PDF for offline viewing and analysis.
          </p>
        </div>

        <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold">Browse History</h3>
          </div>
          <p className="text-sm text-gray-600">
            Track your browsing history and save frequently accessed items for quick reference.
          </p>
        </div>
      </div>
    </div>
  )
}