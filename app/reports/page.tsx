'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  BarChart3, Download, Filter, Calendar, 
  TrendingUp, PieChart, LineChart, DollarSign,
  Package, Users, ShoppingCart, FileText 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const reports = [
  {
    id: '1',
    name: 'Monthly Sales Report',
    type: 'Sales',
    period: 'Jan 2024',
    generated: '2024-01-31',
    size: '2.4 MB',
    icon: DollarSign,
  },
  {
    id: '2',
    name: 'Inventory Stock Report',
    type: 'Inventory',
    period: 'Current',
    generated: '2024-01-25',
    size: '1.8 MB',
    icon: Package,
  },
  {
    id: '3',
    name: 'Category Performance',
    type: 'Analytics',
    period: 'Q4 2023',
    generated: '2024-01-20',
    size: '3.2 MB',
    icon: PieChart,
  },
  {
    id: '4',
    name: 'User Activity Report',
    type: 'Users',
    period: 'Dec 2023',
    generated: '2024-01-15',
    size: '1.5 MB',
    icon: Users,
  },
  {
    id: '5',
    name: 'Supplier Performance',
    type: 'Procurement',
    period: '2023',
    generated: '2024-01-10',
    size: '2.1 MB',
    icon: ShoppingCart,
  },
  {
    id: '6',
    name: 'Financial Summary',
    type: 'Finance',
    period: '2023',
    generated: '2024-01-05',
    size: '4.2 MB',
    icon: FileText,
  },
]

export default function ReportsPage() {
  const { user } = useAuth()
  const [selectedReportType, setSelectedReportType] = useState('all')

  const filteredReports = selectedReportType === 'all' 
    ? reports 
    : reports.filter(r => r.type === selectedReportType)

  const reportTypes = ['all', ...new Set(reports.map(r => r.type))]

  const stats = [
    { title: 'Total Reports', value: '24', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { title: 'This Month', value: '5', icon: Calendar, color: 'bg-green-100 text-green-600' },
    { title: 'Storage Used', value: '15.2 MB', icon: Download, color: 'bg-purple-100 text-purple-600' },
    { title: 'Auto-generated', value: '18', icon: BarChart3, color: 'bg-yellow-100 text-yellow-600' },
  ]

  const quickReports = [
    { name: 'Daily Sales', time: '5 mins', icon: LineChart },
    { name: 'Stock Levels', time: '2 mins', icon: Package },
    { name: 'User Activity', time: '3 mins', icon: Users },
    { name: 'Low Stock Alert', time: '1 min', icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Generate and analyze inventory reports</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Download className="w-4 h-4 mr-2" />
          Export All
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>All Reports</CardTitle>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date Range
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {reportTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedReportType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        selectedReportType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type === 'all' ? 'All Reports' : type}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {filteredReports.map((report) => {
                    const Icon = report.icon
                    return (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{report.type}</span>
                              <span>•</span>
                              <span>{report.period}</span>
                              <span>•</span>
                              <span>Generated: {report.generated}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">{report.size}</span>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {filteredReports.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No reports found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickReports.map((report) => {
                  const Icon = report.icon
                  return (
                    <button
                      key={report.name}
                      className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-sm text-gray-500">Generate in {report.time}</p>
                          </div>
                        </div>
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Sales Reports', count: 8, icon: DollarSign, color: 'bg-green-100 text-green-600' },
                  { type: 'Inventory Reports', count: 6, icon: Package, color: 'bg-blue-100 text-blue-600' },
                  { type: 'Analytics', count: 5, icon: PieChart, color: 'bg-purple-100 text-purple-600' },
                  { type: 'User Reports', count: 3, icon: Users, color: 'bg-yellow-100 text-yellow-600' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{item.type}</span>
                      </div>
                      <span className="text-gray-500">{item.count} reports</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Generation Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Report Name</th>
                  <th className="text-left py-3 px-4">Frequency</th>
                  <th className="text-left py-3 px-4">Next Run</th>
                  <th className="text-left py-3 px-4">Last Generated</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Daily Sales Summary', freq: 'Daily', next: 'Tomorrow, 6:00 AM', last: 'Today, 6:00 AM', status: 'Active' },
                  { name: 'Weekly Inventory', freq: 'Weekly', next: 'Monday, 8:00 AM', last: 'Jan 22, 8:00 AM', status: 'Active' },
                  { name: 'Monthly Financial', freq: 'Monthly', next: 'Feb 1, 12:00 AM', last: 'Jan 1, 12:00 AM', status: 'Active' },
                  { name: 'Quarterly Analytics', freq: 'Quarterly', next: 'Apr 1, 6:00 AM', last: 'Jan 1, 6:00 AM', status: 'Paused' },
                ].map((schedule, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium">{schedule.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {schedule.freq}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {schedule.next}
                    </td>
                    <td className="py-4 px-4">
                      {schedule.last}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {schedule.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="outline" size="sm">
                        Run Now
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}