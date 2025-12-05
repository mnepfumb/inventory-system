import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react'

const transactions = [
  { id: 1, item: 'Wireless Mouse', type: 'IN', quantity: 50, user: 'John Doe', time: '2 hours ago' },
  { id: 2, item: 'Mechanical Keyboard', type: 'OUT', quantity: 5, user: 'Jane Smith', time: '4 hours ago' },
  { id: 3, item: 'USB-C Cable', type: 'ADJUST', quantity: 10, user: 'Admin', time: '1 day ago' },
  { id: 4, item: 'Monitor Stand', type: 'IN', quantity: 25, user: 'Bob Wilson', time: '2 days ago' },
  { id: 5, item: 'Webcam', type: 'OUT', quantity: 8, user: 'Alice Johnson', time: '3 days ago' },
]

export default function RecentTransactions() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IN':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />
      case 'OUT':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />
      case 'ADJUST':
        return <RefreshCw className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IN':
        return 'bg-green-100 text-green-800'
      case 'OUT':
        return 'bg-red-100 text-red-800'
      case 'ADJUST':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.item}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getTypeIcon(transaction.type)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                </div>
              </TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell>{transaction.user}</TableCell>
              <TableCell className="text-gray-500">{transaction.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}