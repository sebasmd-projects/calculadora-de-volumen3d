import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FiguraType, AnimPhase, Calculo } from '@/types'

interface CalculadoraState {
  figuraActiva: FiguraType | null
  parametros: Record<string, number>
  resultado: number | null
  animPhase: AnimPhase
  lastCalculo: Calculo | null

  setFigura: (figura: FiguraType | null) => void
  setParam: (key: string, value: number) => void
  startAnimation: () => void
  setAnimPhase: (phase: AnimPhase) => void
  setResultado: (calculo: Calculo) => void
  resetCalculo: () => void
}

export const useCalculadoraStore = create<CalculadoraState>()(
  persist(
    (set) => ({
      figuraActiva: null,
      parametros: {},
      resultado: null,
      animPhase: 'idle',
      lastCalculo: null,

      setFigura: (figura) =>
        set((state) => ({
          figuraActiva: figura,
          parametros: figura ? {} : state.parametros,
          resultado: null,
          animPhase: 'idle',
        })),

      setParam: (key, value) =>
        set((state) => ({
          parametros: { ...state.parametros, [key]: value },
        })),

      startAnimation: () => set({ animPhase: 'charging' }),

      setAnimPhase: (phase) => set({ animPhase: phase }),

      setResultado: (calculo) =>
        set({
          resultado: calculo.resultado,
          lastCalculo: calculo,
          animPhase: 'revealing',
        }),

      resetCalculo: () =>
        set({
          resultado: null,
          animPhase: 'idle',
          lastCalculo: null,
        }),
    }),
    {
      name: 'volcalc-v1',
      partialize: (state) => ({
        figuraActiva: state.figuraActiva,
        parametros: state.parametros,
      }),
    },
  ),
)
