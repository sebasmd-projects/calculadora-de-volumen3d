import { calcularVolumen, validateParams } from '@/lib/calculos'
import type { FiguraType, CalcPayload } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

// In-memory store (replace with database in production)
let calculos: Array<any> = []

export async function POST(request: NextRequest) {
  try {
    const { tipo, parametros } = (await request.json()) as CalcPayload

    // Validate
    const validTypes: FiguraType[] = ['esfera', 'cubo', 'cilindro', 'cono', 'piramide', 'prisma']
    if (!validTypes.includes(tipo)) {
      return NextResponse.json({ error: 'Tipo de figura inválido' }, { status: 400 })
    }

    if (!validateParams(parametros)) {
      return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
    }

    // Calculate
    const resultado = calcularVolumen(tipo, parametros)

    const calculo = {
      id: crypto.randomUUID(),
      figura: tipo,
      parametros,
      resultado: parseFloat(resultado.toFixed(6)),
      unidad: 'cm3',
      fecha: new Date().toISOString(),
    }

    return NextResponse.json(calculo)
  } catch (error) {
    console.error('Calculation error:', error)
    return NextResponse.json({ error: 'Error en cálculo' }, { status: 500 })
  }
}
