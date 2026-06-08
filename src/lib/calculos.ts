import type { FiguraType } from '@/types'

export function calcularVolumen(tipo: FiguraType, parametros: Record<string, number>): number {
  switch (tipo) {
    case 'esfera':
      return (4 / 3) * Math.PI * Math.pow(parametros.r, 3)
    case 'cubo':
      return Math.pow(parametros.a, 3)
    case 'cilindro':
      return Math.PI * Math.pow(parametros.r, 2) * parametros.h
    case 'cono':
      return (1 / 3) * Math.PI * Math.pow(parametros.r, 2) * parametros.h
    case 'piramide':
      return (1 / 3) * parametros.l * parametros.w * parametros.h
    case 'prisma':
      return parametros.l * parametros.w * parametros.h
    default:
      return 0
  }
}

export function validateParams(parametros: Record<string, number>): boolean {
  return Object.values(parametros).every((val) => typeof val === 'number' && val > 0)
}

export function formatVolumen(valor: number): string {
  return valor.toFixed(6)
}

export function convertVolumen(valor: number, unidad: 'cm3' | 'm3' | 'litros' | 'mm3'): number {
  switch (unidad) {
    case 'm3':
      return valor / 1e6
    case 'litros':
      return valor / 1000
    case 'mm3':
      return valor * 1000
    case 'cm3':
    default:
      return valor
  }
}
