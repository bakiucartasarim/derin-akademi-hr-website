import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'trainings.json')

interface Training {
  id: string
  title: string
  description: string
  features: string[]
  duration: string
  iconColor: string
}

function readTrainings(): Training[] {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading trainings:', error)
    return []
  }
}

function writeTrainings(trainings: Training[]): void {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(trainings, null, 2))
  } catch (error) {
    console.error('Error writing trainings:', error)
    throw error
  }
}

export async function GET() {
  try {
    const trainings = readTrainings()
    return NextResponse.json(trainings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trainings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const trainings = readTrainings()
    
    const newTraining: Training = {
      ...body,
      id: Date.now().toString(),
      features: body.features.filter((f: string) => f.trim() !== '')
    }
    
    trainings.push(newTraining)
    writeTrainings(trainings)
    
    return NextResponse.json(newTraining, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create training' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const trainings = readTrainings()
    
    const index = trainings.findIndex(t => t.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 })
    }
    
    trainings[index] = { 
      ...trainings[index], 
      ...body,
      features: body.features.filter((f: string) => f.trim() !== '')
    }
    writeTrainings(trainings)
    
    return NextResponse.json(trainings[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update training' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID parameter required' }, { status: 400 })
    }
    
    const trainings = readTrainings()
    const filteredTrainings = trainings.filter(t => t.id !== id)
    
    if (filteredTrainings.length === trainings.length) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 })
    }
    
    writeTrainings(filteredTrainings)
    
    return NextResponse.json({ message: 'Training deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete training' }, { status: 500 })
  }
}