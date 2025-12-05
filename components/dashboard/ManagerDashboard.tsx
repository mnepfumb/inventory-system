import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Package, DollarSign, AlertTriangle, TrendingUp,
  BarChart3, Users, ShoppingCart, PieChart,
  ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ManagerDashboardProps {
  user: any
}

export default function ManagerDashboard({ user }: ManagerDashboardProps) {
  const stats = [
    {
      title: 'Monthly Revenue',
      value: 'R12,345',
      change: '+8.2%',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Inventory Turnover',
      value: '2.4x',
      change: '+0.3x',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Pending Orders',
      value: '18',
      change: '-5',
      icon: ShoppingCart,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Team Members',
      value: '8',
      change: '+2',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  const topProducts = [
    { name: 'Wireless Mouse', sales: 245, revenue: 'R7,350', change: '+12%' },
    { name: 'Mechanical Keyboard', sales: 189, revenue: 'R16,821', change: '+8%' },
    { name: 'USB-C Cable', sales: 432, revenue: 'R8,640', change: '+15%' },
    { name: 'Monitor Stand', sales: 78, revenue: 'R3,900', change: '+5%' },
  ]

  const stockAlerts = [
    { name: 'USB-C Cable', current: 45, min: 50, location: 'A-12' },
    { name: 'Webcam', current: 8, min: 10, location: 'B-07' },
    { name: 'Laptop Stand', current: 3, min: 5, location: 'C-22' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner for Manager */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Operations Dashboard</h2>
            </div>
            <p className="text-blue-100">
              Manage inventory, monitor team performance, and track operational metrics.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <Package className="w-4 h-4 mr-2" />
              Manage Inventory
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
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
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
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

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{product.sales} units</span>
                        <span>{product.revenue} revenue</span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${product.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {product.change.startsWith('+') ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span className="font-medium">{product.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((item) => {
                const percent = (item.current / item.min) * 100
                return (
                  <div key={item.name} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Location: {item.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.current}/{item.min}</p>
                        <p className="text-sm text-red-600">
                          {item.min - item.current} below minimum
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${percent < 60 ? 'bg-red-500' : 'bg-yellow-500'}`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Orders</p>
                <p className="text-2xl font-bold mt-2">42</p>
                <p className="text-sm text-green-600 mt-1">+5 from yesterday</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Order Value</p>
                <p className="text-2xl font-bold mt-2">R145.60</p>
                <p className="text-sm text-green-600 mt-1">+12.5% increase</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock Reorder Time</p>
                <p className="text-2xl font-bold mt-2">3.2 days</p>
                <p className="text-sm text-red-600 mt-1">+0.5 days avg</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full">
                <Package className="w-4 h-4 mr-2" />
                Add Item
              </Button>
              <Button variant="outline" className="w-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Restock Alerts
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Sales Report
              </Button>
              <Button className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Team View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New stock received</p>
                  <p className="text-sm text-gray-500">5 mins ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Team meeting completed</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}