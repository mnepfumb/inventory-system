import { z } from 'zod';

export const inventoryItemSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  price: z.number().min(0, "Price must be positive"),
  cost: z.number().min(0, "Cost must be positive"),
  minStockLevel: z.number().min(0),
  maxStockLevel: z.number().min(0),
  location: z.string().min(1, "Location is required"),
  supplier: z.string().optional(),
});

export type InventoryItemFormData = z.infer<typeof inventoryItemSchema>;