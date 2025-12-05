import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react'

export default function InventoryStats() {
  const stats = [
    {
      title: 'Total Items',
      value: '1,234',
      change: '+12.5%',
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Value',
      value: 'R45,678',
      change: '+8.2%',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Low Stock',
      value: '23',
      change: '-5%',
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Out of Stock',
      value: '5',
      change: '-2%',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600',
    },
  ]

  return (
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
  )
}