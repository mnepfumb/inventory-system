import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Package, CheckCircle, AlertTriangle, Clock,
  ShoppingCart, ListChecks, Upload, Download,
  ArrowRight, Calendar, User, Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StaffDashboardProps {
  user: any
}

export default function StaffDashboard({ user }: StaffDashboardProps) {
  const todaysTasks = [
    { id: 1, task: 'Restock wireless mice', quantity: 50, location: 'A-12', completed: true },
    { id: 2, task: 'Update price tags', quantity: 120, location: 'B-07', completed: false },
    { id: 3, task: 'Organize storage area', location: 'Warehouse A', completed: false },
    { id: 4, task: 'Scan incoming shipment', quantity: 200, location: 'Receiving', completed: false },
  ]

  const assignedItems = [
    { name: 'Wireless Mouse', sku: 'ELEC-001', quantity: 45, location: 'A-12' },
    { name: 'USB-C Cable', sku: 'CAB-001', quantity: 120, location: 'B-07' },
    { name: 'Keyboard', sku: 'ELEC-002', quantity: 25, location: 'C-22' },
  ]

  const recentActions = [
    { action: 'Scanned 45 items', time: '10:30 AM', type: 'scan' },
    { action: 'Updated stock levels', time: '9:45 AM', type: 'update' },
    { action: 'Created new item entry', time: 'Yesterday', type: 'create' },
    { action: 'Reported damaged goods', time: 'Yesterday', type: 'report' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner for Staff */}
      <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 rounded-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <User className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Daily Operations</h2>
            </div>
            <p className="text-green-100">
              Welcome to your daily tasks. Focus on inventory management and operational duties.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-3">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <ListChecks className="w-4 h-4 mr-2" />
              View Tasks
            </Button>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              <Upload className="w-4 h-4 mr-2" />
              Start Shift
            </Button>
          </div>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Tasks</p>
                <p className="text-2xl font-bold mt-2">4</p>
                <p className="text-sm text-gray-500 mt-1">1 completed</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <ListChecks className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Items Scanned</p>
                <p className="text-2xl font-bold mt-2">145</p>
                <p className="text-sm text-green-600 mt-1">+25 from yesterday</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold mt-2">92%</p>
                <p className="text-sm text-green-600 mt-1">+3% improvement</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shift Time</p>
                <p className="text-2xl font-bold mt-2">4.5h</p>
                <p className="text-sm text-gray-500 mt-1">Started: 8:00 AM</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="w-5 h-5" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      task.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {task.quantity && (
                          <span>Qty: {task.quantity}</span>
                        )}
                        <span>Location: {task.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant={task.completed ? "outline" : "default"}>
                    {task.completed ? 'Completed' : 'Start'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Your Assigned Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedItems.map((item) => (
                <div key={item.sku} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.quantity} units</p>
                      <p className="text-sm text-gray-500">in stock</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Location: {item.location}</span>
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    action.type === 'scan' ? 'bg-blue-100' :
                    action.type === 'update' ? 'bg-green-100' :
                    action.type === 'create' ? 'bg-purple-100' : 'bg-yellow-100'
                  }`}>
                    {action.type === 'scan' && <Package className="w-4 h-4 text-blue-600" />}
                    {action.type === 'update' && <Upload className="w-4 h-4 text-green-600" />}
                    {action.type === 'create' && <ShoppingCart className="w-4 h-4 text-purple-600" />}
                    {action.type === 'report' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{action.action}</p>
                    <p className="text-sm text-gray-500">{action.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Package className="w-6 h-6" />
                <span>Scan Item</span>
              </Button>
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Upload className="w-6 h-6" />
                <span>Update Stock</span>
              </Button>
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                <span>New Item</span>
              </Button>
              <Button className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                <Download className="w-6 h-6" />
                <span>Print Labels</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Items Needing Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Wireless Mouse</p>
                  <p className="text-sm text-gray-500">8 left (Min: 10)</p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">
                Restock Now
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">USB-C Cable</p>
                  <p className="text-sm text-gray-500">45 left (Min: 50)</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Notify Manager
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Keyboard</p>
                  <p className="text-sm text-gray-500">25 left (Min: 5)</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}