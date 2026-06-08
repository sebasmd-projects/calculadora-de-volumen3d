export type FiguraType = 'esfera' | 'cubo' | 'cilindro' | 'cono' | 'piramide' | 'prisma'

export interface Parametro {
  id: string
  label: string
  unit: string
  min: number
  max: number
  step: number
}

export interface Figura {
  id: FiguraType
  nombre: string
  formula: string
  parametros: Parametro[]
}

export interface Calculo {
  id: string
  figura: FiguraType
  parametros: Record<string, number>
  resultado: number
  unidad: string
  fecha: string
}

export interface CalcPayload {
  tipo: FiguraType
  parametros: Record<string, number>
}

export type AnimPhase = 'idle' | 'charging' | 'exploding' | 'reassembling' | 'revealing'
