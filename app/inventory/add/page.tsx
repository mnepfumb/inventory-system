import React from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function AddInventoryPage() {
		return (
			<ProtectedRoute requiredPermission="inventory:create">
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Add Inventory Item</h1>
						<p className="text-sm text-gray-600 mt-2">This page is a placeholder for the Add Item form.</p>
					</div>
				</div>
			</ProtectedRoute>
		)
}
