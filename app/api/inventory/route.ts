import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inventoryItemSchema } from '@/lib/schemas'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    let filteredItems = db.getInventory()
    
    // Apply filters
    if (category && category !== 'all') {
      filteredItems = filteredItems.filter(item => item.category === category)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.sku.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower)
      )
    }

    // Apply pagination
    const total = filteredItems.length
    const items = filteredItems.slice(skip, skip + limit)

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = inventoryItemSchema.parse(body)

    // Check if SKU already exists
    const existingItem = db.getInventory().find(item => item.sku === validatedData.sku)
    if (existingItem) {
      return NextResponse.json(
        { error: 'SKU already exists' },
        { status: 400 }
      )
    }

    // Create new item
    const newItem = {
      ...validatedData,
      lastRestocked: validatedData.quantity > 0 ? new Date() : null,
    }

    const item = db.addItem(newItem)
    
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating inventory item:', error)
    return NextResponse.json(
      { error: 'Failed to create inventory item' },
      { status: 500 }
    )
  }
}