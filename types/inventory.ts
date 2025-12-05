export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
  cost: number;
  minStockLevel: number;
  maxStockLevel: number;
  location: string;
  supplier: string;
  createdAt: Date;
  updatedAt: Date;
  lastRestocked: Date | null;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  performedBy: string;
  createdAt: Date;
}

export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  categoriesCount: number;
}