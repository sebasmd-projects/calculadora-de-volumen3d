'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCalculadoraStore } from '@/store/useCalculadoraStore'
import { convertVolumen, formatVolumen } from '@/lib/calculos'
import { Copy, Check } from 'lucide-react'
import confetti from 'canvas-confetti'

export function ResultadoPanel() {
  const { resultado, lastCalculo, resetCalculo } = useCalculadoraStore()
  const [unidad, setUnidad] = useState<'cm3' | 'm3' | 'litros' | 'mm3'>('cm3')
  const [copied, setCopied] = useState(false)

  if (!resultado || !lastCalculo) return null

  const convertedValue = convertVolumen(resultado, unidad)
  const displayValue = formatVolumen(convertedValue)

  const unidades = ['cm3', 'm3', 'litros', 'mm3'] as const

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-black/40 border border-cyan-400/20 rounded-3xl p-8"
      >
        {/* Confetti on mount */}
        {typeof window !== 'undefined' && (
          <motion.div
            onAnimationComplete={() => {
              confetti({
                particleCount: 120,
                spread: 90,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'],
              })
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        )}

        <h3 className="text-white font-semibold text-lg mb-4">Resultado</h3>

        {/* Value */}
        <motion.div className="text-6xl md:text-7xl font-mono font-black text-cyan-300 tabular-nums mb-6 text-balance">
          {displayValue}
        </motion.div>

        {/* Unit Selector */}
        <div className="flex gap-2 mb-6">
          {unidades.map((u) => (
            <motion.button
              key={u}
              onClick={() => setUnidad(u)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                unidad === u
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white'
              }`}
            >
              {u}
            </motion.button>
          ))}
        </div>

        {/* Formula breakdown */}
        <motion.div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 mb-6 text-xs text-white/50 font-mono space-y-2">
          <p className="text-white/40">Tipo: {lastCalculo.figura}</p>
          <p className="text-white/40">
            Parámetros: {Object.entries(lastCalculo.parametros)
              .map(([k, v]) => `${k}=${v}`)
              .join(', ')}
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 flex-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold py-3 rounded-xl hover:bg-cyan-500/30 transition-colors"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copiado' : 'Copiar'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetCalculo}
            className="flex-1 bg-white/[0.04] border border-white/[0.08] text-white font-semibold py-3 rounded-xl hover:bg-white/[0.08] transition-colors"
          >
            Nueva Figura
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
