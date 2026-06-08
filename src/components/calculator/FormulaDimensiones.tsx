'use client'

import { motion } from 'framer-motion'
import { useCalculadoraStore } from '@/store/useCalculadoraStore'
import { AnimatePresence } from 'framer-motion'
import { getFigura } from '@/lib/figuras'
import { DimensionInput } from './DimensionInput'

export function FormulaDimensiones() {
  const { figuraActiva, parametros, setParam, startAnimation } = useCalculadoraStore()
  const figura = figuraActiva ? getFigura(figuraActiva) : null

  if (!figura) return null

  const allParamsFilled = figura.parametros.every((p) => parametros[p.id] && parametros[p.id] > 0)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={figuraActiva}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 22,
        }}
        className="space-y-6"
      >
        <h3 className="text-white font-semibold text-lg">Ingresa las medidas</h3>

        <div className="space-y-4">
          {figura.parametros.map((param, idx) => (
            <DimensionInput
              key={param.id}
              parametro={param}
              value={parametros[param.id] || 0}
              onChange={(value) => setParam(param.id, value)}
              index={idx}
            />
          ))}
        </div>

        {/* Live Formula */}
        <motion.div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-sm font-mono text-white/60">
          <p>
            {figura.formula}
            {allParamsFilled && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-cyan-400 ml-2"
              >
                ✓
              </motion.span>
            )}
          </p>
        </motion.div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: allParamsFilled ? 1.03 : 1 }}
          whileTap={{ scale: allParamsFilled ? 0.96 : 1 }}
          onClick={startAnimation}
          disabled={!allParamsFilled}
          className={`w-full font-bold rounded-2xl px-8 py-4 transition-all ${
            allParamsFilled
              ? 'bg-cyan-500 text-black hover:bg-cyan-400'
              : 'bg-cyan-500/40 text-black/40 cursor-not-allowed'
          }`}
        >
          Calcular Volumen →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
