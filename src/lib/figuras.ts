import type { Figura } from '@/types'

export const FIGURAS: Figura[] = [
  {
    id: 'esfera',
    nombre: 'Esfera',
    formula: 'V = (4/3)πr³',
    parametros: [
      { id: 'r', label: 'Radio', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
    ],
  },
  {
    id: 'cubo',
    nombre: 'Cubo',
    formula: 'V = a³',
    parametros: [{ id: 'a', label: 'Arista', unit: 'cm', min: 0.1, max: 500, step: 0.1 }],
  },
  {
    id: 'cilindro',
    nombre: 'Cilindro',
    formula: 'V = πr²h',
    parametros: [
      { id: 'r', label: 'Radio', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
      { id: 'h', label: 'Altura', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
    ],
  },
  {
    id: 'cono',
    nombre: 'Cono',
    formula: 'V = (1/3)πr²h',
    parametros: [
      { id: 'r', label: 'Radio', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
      { id: 'h', label: 'Altura', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
    ],
  },
  {
    id: 'piramide',
    nombre: 'Pirámide',
    formula: 'V = (1/3)lwh',
    parametros: [
      { id: 'l', label: 'Largo', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
      { id: 'w', label: 'Ancho', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
      { id: 'h', label: 'Altura', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
    ],
  },
  {
    id: 'prisma',
    nombre: 'Prisma',
    formula: 'V = lwh',
    parametros: [
      { id: 'l', label: 'Largo', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
      { id: 'w', label: 'Ancho', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
      { id: 'h', label: 'Altura', unit: 'cm', min: 0.1, max: 500, step: 0.1 },
    ],
  },
]

export function getFigura(id: string): Figura | undefined {
  return FIGURAS.find((f) => f.id === id)
}
