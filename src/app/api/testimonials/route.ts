import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'testimonials.json')

interface Testimonial {
  id: string
  companyName: string
  companyInitials: string
  sector: string
  testimonialText: string
  authorName: string
  authorTitle: string
  rating: number
  bgColor: string
}

function readTestimonials(): Testimonial[] {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading testimonials:', error)
    return []
  }
}

function writeTestimonials(testimonials: Testimonial[]): void {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(testimonials, null, 2))
  } catch (error) {
    console.error('Error writing testimonials:', error)
    throw error
  }
}

export async function GET() {
  try {
    const testimonials = readTestimonials()
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const testimonials = readTestimonials()
    
    const newTestimonial: Testimonial = {
      ...body,
      id: Date.now().toString()
    }
    
    testimonials.push(newTestimonial)
    writeTestimonials(testimonials)
    
    return NextResponse.json(newTestimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const testimonials = readTestimonials()
    
    const index = testimonials.findIndex(t => t.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }
    
    testimonials[index] = { ...testimonials[index], ...body }
    writeTestimonials(testimonials)
    
    return NextResponse.json(testimonials[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 })
    }
    
    const testimonials = readTestimonials()
    const filteredTestimonials = testimonials.filter(t => t.id !== id)
    
    if (filteredTestimonials.length === testimonials.length) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }
    
    writeTestimonials(filteredTestimonials)
    
    return NextResponse.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}