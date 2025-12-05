import { InventoryItem } from '@/types/inventory'

// Mock data for development
export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    sku: 'ELEC-001',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    category: 'Electronics',
    quantity: 45,
    price: 29.99,
    cost: 15.50,
    minStockLevel: 10,
    maxStockLevel: 100,
    location: 'A-12',
    supplier: 'TechSuppliers Inc.',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: new Date('2024-01-15'),
  },
  {
    id: '2',
    sku: 'ELEC-002',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    category: 'Electronics',
    quantity: 25,
    price: 89.99,
    cost: 45.00,
    minStockLevel: 5,
    maxStockLevel: 50,
    location: 'B-07',
    supplier: 'KeyTech Ltd.',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: new Date('2024-01-10'),
  },
  {
    id: '3',
    sku: 'OFF-001',
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    category: 'Furniture',
    quantity: 8,
    price: 299.99,
    cost: 150.00,
    minStockLevel: 3,
    maxStockLevel: 20,
    location: 'WH-01',
    supplier: 'OfficePro Inc.',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: new Date('2024-01-05'),
  },
  {
    id: '4',
    sku: 'CAB-001',
    name: 'USB-C Cable',
    description: '3m USB-C to USB-C cable',
    category: 'Electronics',
    quantity: 120,
    price: 19.99,
    cost: 8.50,
    minStockLevel: 50,
    maxStockLevel: 200,
    location: 'C-03',
    supplier: 'CableMasters',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: new Date('2024-01-20'),
  },
  {
    id: '5',
    sku: 'SOF-001',
    name: 'Microsoft Office 365',
    description: '1-year subscription',
    category: 'Software',
    quantity: 45,
    price: 99.99,
    cost: 70.00,
    minStockLevel: 10,
    maxStockLevel: 100,
    location: 'Digital',
    supplier: 'Microsoft',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: null,
  },
  {
    id: '6',
    sku: 'NET-001',
    name: 'WiFi Router',
    description: 'Dual-band WiFi 6 router',
    category: 'Networking',
    quantity: 3,
    price: 149.99,
    cost: 85.00,
    minStockLevel: 5,
    maxStockLevel: 25,
    location: 'D-14',
    supplier: 'NetGear',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: new Date('2023-12-15'),
  },
  {
    id: '7',
    sku: 'MON-001',
    name: '27" 4K Monitor',
    description: '27-inch 4K UHD monitor',
    category: 'Electronics',
    quantity: 15,
    price: 399.99,
    cost: 250.00,
    minStockLevel: 5,
    maxStockLevel: 30,
    location: 'E-22',
    supplier: 'Dell',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: new Date('2024-01-18'),
  },
  {
    id: '8',
    sku: 'ACC-001',
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand',
    category: 'Accessories',
    quantity: 0,
    price: 49.99,
    cost: 25.00,
    minStockLevel: 10,
    maxStockLevel: 50,
    location: 'F-08',
    supplier: 'AmazonBasics',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastRestocked: null,
  },
]

export const categories = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories', itemCount: 4 },
  { id: '2', name: 'Furniture', description: 'Office furniture and equipment', itemCount: 1 },
  { id: '3', name: 'Software', description: 'Software licenses and subscriptions', itemCount: 1 },
  { id: '4', name: 'Networking', description: 'Networking equipment and cables', itemCount: 1 },
  { id: '5', name: 'Accessories', description: 'Computer and office accessories', itemCount: 1 },
]

// Simple in-memory database simulation
class MockDB {
  private inventory = [...mockInventory]
  private categories = [...categories]

  getInventory() {
    return this.inventory
  }

  getCategories() {
    return this.categories
  }

  addItem(item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) {
    const newItem: InventoryItem = {
      ...item,
      id: (this.inventory.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.inventory.push(newItem)
    return newItem
  }

  updateItem(id: string, updates: Partial<InventoryItem>) {
    const index = this.inventory.findIndex(item => item.id === id)
    if (index === -1) return null
    
    this.inventory[index] = {
      ...this.inventory[index],
      ...updates,
      updatedAt: new Date(),
    }
    
    return this.inventory[index]
  }

  deleteItem(id: string) {
    const index = this.inventory.findIndex(item => item.id === id)
    if (index === -1) return false
    
    this.inventory.splice(index, 1)
    return true
  }
}

export const db = new MockDB()