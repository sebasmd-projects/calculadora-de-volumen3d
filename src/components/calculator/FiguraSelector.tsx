'use client'

import { motion } from 'framer-motion'
import { useCalculadoraStore } from '@/store/useCalculadoraStore'
import { FIGURAS } from '@/lib/figuras'
import { FiguraIcon } from './FiguraIcon'

export function FiguraCard({ figura, index }: { figura: any; index: number }) {
  const { figuraActiva, setFigura } = useCalculadoraStore()
  const isSelected = figuraActiva === figura.id

  return (
    <motion.button
      initial={{ opacity: 0, y: 32, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 20,
        delay: index * 0.07,
      }}
      whileHover={{
        scale: 1.06,
        rotateY: 10,
        rotateX: -5,
      }}
      whileTap={{ scale: 0.91 }}
      onClick={() => setFigura(figura.id)}
      className={`relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 cursor-pointer overflow-hidden transition-all ${
        isSelected ? 'border-cyan-400/60 bg-cyan-500/[0.07]' : ''
      }`}
      style={{
        perspective: '900px',
        transformStyle: 'preserve-3d',
      }}
    >
      {isSelected && (
        <>
          <motion.div
            layoutId="selectedCard"
            className="absolute inset-0 rounded-2xl border-2 border-cyan-400 pointer-events-none"
          />
          <motion.div
            layoutId="checkmark"
            className="absolute top-3 right-3 bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            ✓
          </motion.div>
        </>
      )}

      <FiguraIcon figura={figura.id} size={64} />
      <p className="text-white font-semibold text-sm mt-3">{figura.nombre}</p>
      <p className="font-mono text-white/35 text-xs mt-1">{figura.formula}</p>
    </motion.button>
  )
}

export function FiguraSelector() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <h2 className="text-white font-semibold text-xl">Selecciona una figura</h2>
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {FIGURAS.map((figura, i) => (
          <FiguraCard key={figura.id} figura={figura} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
