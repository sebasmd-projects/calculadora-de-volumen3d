'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Parametro } from '@/types'

interface DimensionInputProps {
  parametro: Parametro
  value: number
  onChange: (value: number) => void
  index: number
}

export function DimensionInput({ parametro, value, onChange, index }: DimensionInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 22,
        delay: index * 0.09,
      }}
      className="relative"
    >
      <input
        type="number"
        min={parametro.min}
        max={parametro.max}
        step={parametro.step}
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 pt-6 pb-3 text-white font-mono text-lg focus:border-cyan-400/60 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.12)]"
      />

      <motion.label
        animate={{
          top: isFocused || value ? 8 : '50%',
          fontSize: isFocused || value ? 12 : 14,
          color: isFocused || value ? 'rgb(6, 182, 212)' : 'rgba(255,255,255,0.4)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
        className="absolute left-4 transform -translate-y-1/2 pointer-events-none"
      >
        {parametro.label}
      </motion.label>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 text-white/50 text-xs px-2 py-0.5 rounded-md pointer-events-none">
        {parametro.unit}
      </div>

      <input
        type="range"
        min={parametro.min}
        max={parametro.max}
        step={parametro.step}
        value={value || 0}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full mt-2 accent-cyan-400"
      />
    </motion.div>
  )
}
