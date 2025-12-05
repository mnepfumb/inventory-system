import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, Package, DollarSign, AlertTriangle, 
  TrendingUp, BarChart3, Shield, Settings,
  Clock, Activity, Download, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminDashboardProps {
  user: any
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'R45,678',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Inventory Value',
      value: 'R123,456',
      change: '+8.2%',
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Active Users',
      value: '24',
      change: '+3',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Low Stock Items',
      value: '18',
      change: '-2',
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ]

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Added new user', time: '2 mins ago', role: 'admin' },
    { id: 2, user: 'Jane Smith', action: 'Updated inventory settings', time: '10 mins ago', role: 'admin' },
    { id: 3, user: 'Bob Johnson', action: 'Restocked 50 items', time: '25 mins ago', role: 'staff' },
    { id: 4, user: 'Alice Brown', action: 'Generated monthly report', time: '1 hour ago', role: 'manager' },
    { id: 5, user: 'Charlie Wilson', action: 'Created new category', time: '2 hours ago', role: 'manager' },
  ]

  const systemMetrics = [
    { name: 'Server Uptime', value: '99.9%', status: 'good' },
    { name: 'Database Load', value: '45%', status: 'normal' },
    { name: 'Active Sessions', value: '12', status: 'normal' },
    { name: 'Storage Usage', value: '78%', status: 'warning' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner for Admin */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8" />
              <h2 className="text-2xl font-bold">System Administration</h2>
            </div>
            <p className="text-blue-100">
              You have full system access. Monitor performance, manage users, and configure settings.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
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

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{activity.time}</span>
                    <div className="mt-1">
                      <span className={`px-2 py-1 rounded text-xs ${
                        activity.role === 'admin' ? 'bg-red-100 text-red-800' :
                        activity.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {activity.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemMetrics.map((metric) => (
                <div key={metric.name} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{metric.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      metric.status === 'good' ? 'bg-green-100 text-green-800' :
                      metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {metric.value}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        metric.status === 'good' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: metric.value.includes('%') ? metric.value : '100%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                View All Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Manage Permissions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Audit Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Inventory Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Bulk Operations
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Update Stock Levels
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analytics & Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Financial Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance Metrics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Historical Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}