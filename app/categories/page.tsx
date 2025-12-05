'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const categories = [
  { id: 1, name: 'Electronics', count: 45, description: 'Electronic devices and accessories' },
  { id: 2, name: 'Office Supplies', count: 89, description: 'Office stationery and supplies' },
  { id: 3, name: 'Furniture', count: 23, description: 'Office furniture and equipment' },
  { id: 4, name: 'Software', count: 56, description: 'Software licenses and subscriptions' },
  { id: 5, name: 'Hardware', count: 34, description: 'Computer hardware components' },
  { id: 6, name: 'Networking', count: 21, description: 'Networking equipment and cables' },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New category:', newCategory)
    setNewCategory({ name: '', description: '' })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Organize your inventory into categories</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Add New Category</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                className="w-full border rounded-lg p-3 text-sm"
                rows={3}
                placeholder="Enter category description"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit">Save Category</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {category.count} items
              </span>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View items →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No categories found</p>
        </div>
      )}
    </div>
  )
}