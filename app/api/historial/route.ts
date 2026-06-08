import { NextRequest, NextResponse } from 'next/server'
import type { Calculo } from '@/types'

// In-memory store
let calculos: Calculo[] = []

export async function GET() {
  try {
    return NextResponse.json([...calculos].reverse().slice(0, 100))
  } catch (error) {
    console.error('Historial GET error:', error)
    return NextResponse.json({ error: 'Error fetching historial' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const calculo = (await request.json()) as Calculo
    calculos.push(calculo)
    return NextResponse.json(calculo, { status: 201 })
  } catch (error) {
    console.error('Historial POST error:', error)
    return NextResponse.json({ error: 'Error saving calculo' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    calculos = calculos.filter((c) => c.id !== id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Historial DELETE error:', error)
    return NextResponse.json({ error: 'Error deleting calculo' }, { status: 500 })
  }
}
