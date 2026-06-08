'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCalculadoraStore } from '@/store/useCalculadoraStore'
import { useCalcularVolumen } from '@/hooks/useVolumen'
import { FiguraSelector } from '@/components/calculator/FiguraSelector'
import { FormulaDimensiones } from '@/components/calculator/FormulaDimensiones'
import { FiguraVisualizacion3D } from '@/components/calculator/FiguraVisualizacion3D'
import { ResultadoPanel } from '@/components/calculator/ResultadoPanel'
import { useEffect, useState } from 'react'

export default function CalculadoraPage() {
  const { figuraActiva, parametros, setAnimPhase, setResultado, resultado, animPhase } =
    useCalculadoraStore()
  const { mutate: calcular, isPending } = useCalcularVolumen()
  const [error, setError] = useState<string | null>(null)

  // Trigger calculation when animPhase is 'charging'
  useEffect(() => {
    if (animPhase === 'charging' && figuraActiva) {
      // Simulate explosion animation delay
      const timer = setTimeout(() => {
        calcular(
          { tipo: figuraActiva, parametros },
          {
            onSuccess: (data) => {
              setResultado(data)
              setAnimPhase('revealing')
            },
            onError: (err: any) => {
              setError(err.message || 'Error en cálculo')
              setAnimPhase('idle')
            },
          },
        )
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [animPhase, figuraActiva, parametros, calcular, setAnimPhase, setResultado])

  return (
    <main className="min-h-screen bg-[#050510] pt-20 pb-16 px-4 md:px-6 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <p className="text-white/30 text-sm mb-2">VolCalc / Calculadora</p>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Calculadora de Volúmenes</h1>
        <motion.div
          className="h-0.5 bg-cyan-400"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </motion.div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <FiguraSelector />

            <AnimatePresence mode="wait">
              {figuraActiva && <FormulaDimensiones key={figuraActiva} />}
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div className="lg:sticky lg:top-24 space-y-8">
            <FiguraVisualizacion3D />

            <AnimatePresence>
              {resultado !== null && <ResultadoPanel key="resultado" />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className="fixed top-4 right-4 bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg"
            onAnimationComplete={() => {
              const timer = setTimeout(() => setError(null), 4000)
              return () => clearTimeout(timer)
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Button */}
      {figuraActiva && !resultado && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#050510]/90 backdrop-blur-sm py-4 border-t border-white/[0.06] px-4">
          <button
            onClick={() => setAnimPhase('charging')}
            disabled={isPending || Object.keys(parametros).length === 0}
            className="w-full bg-cyan-500 text-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-40"
          >
            {isPending ? 'Calculando...' : 'Calcular'}
          </button>
        </div>
      )}
    </main>
  )
}
