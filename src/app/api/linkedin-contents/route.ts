import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'linkedin-contents.json')

interface LinkedInContent {
  id: string
  title: string
  description: string
  url: string
  embedUrl: string
  thumbnail?: string
}

async function readData(): Promise<LinkedInContent[]> {
  try {
    const data = await readFile(dataFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return []
  }
}

async function writeData(data: LinkedInContent[]): Promise<void> {
  try {
    await writeFile(dataFilePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing data:', error)
    throw error
  }
}

// GET - Tüm içerikleri getir
export async function GET() {
  try {
    const contents = await readData()
    return NextResponse.json(contents)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read contents' }, { status: 500 })
  }
}

// POST - Yeni içerik ekle
export async function POST(request: NextRequest) {
  try {
    const newContent: LinkedInContent = await request.json()
    const contents = await readData()

    // Generate ID
    const maxId = contents.reduce((max, c) => Math.max(max, parseInt(c.id) || 0), 0)
    newContent.id = (maxId + 1).toString()

    contents.push(newContent)
    await writeData(contents)

    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 })
  }
}

// PUT - İçeriği güncelle
export async function PUT(request: NextRequest) {
  try {
    const updatedContent: LinkedInContent = await request.json()
    const contents = await readData()

    const index = contents.findIndex(c => c.id === updatedContent.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    contents[index] = updatedContent
    await writeData(contents)

    return NextResponse.json(updatedContent)
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

// DELETE - İçeriği sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const contents = await readData()
    const filteredContents = contents.filter(c => c.id !== id)

    if (contents.length === filteredContents.length) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    await writeData(filteredContents)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
  }
}
