import { AlertTriangle } from 'lucide-react'

const lowStockItems = [
  { id: 1, name: 'Wireless Mouse', current: 8, minimum: 10, location: 'A-12' },
  { id: 2, name: 'USB-C Cable', current: 3, minimum: 5, location: 'B-07' },
  { id: 3, name: 'Keyboard', current: 12, minimum: 15, location: 'C-22' },
  { id: 4, name: 'Monitor', current: 2, minimum: 5, location: 'D-14' },
  { id: 5, name: 'Headphones', current: 6, minimum: 10, location: 'E-09' },
]

export default function LowStockAlert() {
  return (
    <div className="space-y-4">
      {lowStockItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-gray-500">{item.location}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {item.current} / {item.minimum}
            </p>
            <p className="text-xs text-red-600">
              {item.minimum - item.current} below minimum
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}