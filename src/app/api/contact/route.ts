import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'contact.json')

interface ContactInfo {
  address: string
  addressDetail: string
  phone: string
  phoneHours: string
  email: string
  emailResponse: string
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  whatsapp: string
}

function readContactInfo(): ContactInfo | null {
  try {
    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading contact info:', error)
    return null
  }
}

function writeContactInfo(contactInfo: ContactInfo): void {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(contactInfo, null, 2))
  } catch (error) {
    console.error('Error writing contact info:', error)
    throw error
  }
}

export async function GET() {
  try {
    const contactInfo = readContactInfo()
    if (!contactInfo) {
      return NextResponse.json({ error: 'Contact info not found' }, { status: 404 })
    }
    return NextResponse.json(contactInfo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    writeContactInfo(body)
    
    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 })
  }
}