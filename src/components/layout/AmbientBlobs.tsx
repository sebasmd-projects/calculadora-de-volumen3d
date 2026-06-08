'use client'

import { motion } from 'framer-motion'

export function AmbientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Cyan blob - top left */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[80px]"
        style={{ top: '-200px', left: '-100px' }}
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Violet blob - bottom right */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-[80px]"
        style={{ bottom: '-300px', right: '-200px' }}
        animate={{
          x: [15, -15, 15],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blue blob - center right */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[80px]"
        style={{ top: '50%', right: '-150px', transform: 'translateY(-50%)' }}
        animate={{
          x: [-10, 10, -10],
          y: [-8, 8, -8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
