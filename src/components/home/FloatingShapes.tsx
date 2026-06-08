'use client'

import { motion } from 'framer-motion'

export function FloatingShapes() {
  const shapes = [
    { color: 'text-cyan-400/20', y: [0, -22, 0], duration: 3.5 },
    { color: 'text-violet-400/20', y: [0, -22, 0], duration: 4 },
    { color: 'text-cyan-400/20', y: [0, -22, 0], duration: 4.5 },
    { color: 'text-violet-400/20', y: [0, -22, 0], duration: 5 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute text-6xl ${shape.color}`}
          style={{
            left: `${25 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            y: shape.y,
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {i % 2 === 0 ? '◆' : '■'}
        </motion.div>
      ))}
    </div>
  )
}
