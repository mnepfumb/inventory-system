'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inventoryItemSchema, InventoryItemFormData } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface InventoryFormProps {
  onSubmit: (data: InventoryItemFormData) => Promise<void>
  initialData?: Partial<InventoryItemFormData>
  categories: string[]
}

export default function InventoryForm({ 
  onSubmit, 
  initialData, 
  categories 
}: InventoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InventoryItemFormData>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: initialData || {
      quantity: 0,
      price: 0,
      cost: 0,
      minStockLevel: 0,
      maxStockLevel: 100,
    },
  })

  const handleFormSubmit = async (data: InventoryItemFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            {...register('sku')}
            placeholder="e.g., ELEC-001"
          />
          {errors.sku && (
            <p className="text-sm text-red-600">{errors.sku.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="e.g., Wireless Mouse"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            onValueChange={(value) => setValue('category', value)}
            defaultValue={initialData?.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            {...register('quantity', { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-sm text-red-600">{errors.quantity.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (R)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cost">Cost (R)</Label>
          <Input
            id="cost"
            type="number"
            step="0.01"
            {...register('cost', { valueAsNumber: true })}
          />
          {errors.cost && (
            <p className="text-sm text-red-600">{errors.cost.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
          <Input
            id="minStockLevel"
            type="number"
            {...register('minStockLevel', { valueAsNumber: true })}
          />
          {errors.minStockLevel && (
            <p className="text-sm text-red-600">{errors.minStockLevel.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxStockLevel">Maximum Stock Level</Label>
          <Input
            id="maxStockLevel"
            type="number"
            {...register('maxStockLevel', { valueAsNumber: true })}
          />
          {errors.maxStockLevel && (
            <p className="text-sm text-red-600">{errors.maxStockLevel.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            {...register('location')}
            placeholder="e.g., Warehouse A, Shelf B3"
          />
          {errors.location && (
            <p className="text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            {...register('supplier')}
            placeholder="e.g., TechSuppliers Inc."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          rows={3}
          placeholder="Product description..."
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Item'}
        </Button>
      </div>
    </form>
  )
}