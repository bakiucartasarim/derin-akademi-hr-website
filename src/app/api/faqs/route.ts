import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'faqs.json')

interface FAQ {
  id: string
  question: string
  answer: string
}

function readFAQs(): FAQ[] {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading FAQs:', error)
    return []
  }
}

function writeFAQs(faqs: FAQ[]): void {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(faqs, null, 2))
  } catch (error) {
    console.error('Error writing FAQs:', error)
    throw error
  }
}

export async function GET() {
  try {
    const faqs = readFAQs()
    return NextResponse.json(faqs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const faqs = readFAQs()
    
    const newFAQ: FAQ = {
      ...body,
      id: Date.now().toString()
    }
    
    faqs.push(newFAQ)
    writeFAQs(faqs)
    
    return NextResponse.json(newFAQ, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const faqs = readFAQs()
    
    const index = faqs.findIndex(f => f.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    
    faqs[index] = { ...faqs[index], ...body }
    writeFAQs(faqs)
    
    return NextResponse.json(faqs[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 })
    }
    
    const faqs = readFAQs()
    const filteredFAQs = faqs.filter(f => f.id !== id)
    
    if (filteredFAQs.length === faqs.length) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    
    writeFAQs(filteredFAQs)
    
    return NextResponse.json({ message: 'FAQ deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}