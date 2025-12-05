import InventoryTable from '@/components/inventory/InventoryTable'
import { mockInventory } from '@/lib/db'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function InventoryPage() {
  return (
    <ProtectedRoute requiredPermission="inventory:read">
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-600 mt-2">Manage your products and stock levels</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventoryTable items={mockInventory} />
        </div>
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                Bulk Update
              </button>
              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                Generate Report
              </button>
              <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                Import Items
              </button>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Inventory Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">234</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">R45,678</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </ProtectedRoute>
  )
}