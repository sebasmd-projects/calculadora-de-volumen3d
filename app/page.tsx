'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ParticleCanvas } from '@/components/home/ParticleCanvas'
import { FloatingShapes } from '@/components/home/FloatingShapes'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden pt-16">
      {/* Background elements */}
      <ParticleCanvas />
      <FloatingShapes />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.06), transparent)',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="inline-block border border-cyan-500/30 text-cyan-400 text-xs px-3 py-1 rounded-full mb-8"
        >
          Geometría en 3D
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black leading-tight mb-4">
          Calcula <span className="text-cyan-400">Volúmenes</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-white/40 text-lg mt-4 mb-10">
          Esferas · Cubos · Cilindros · Conos · Pirámides · Prismas
        </motion.p>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          {[
            { num: 'Tiempo Real', label: '' },
            { num: '3D', label: 'Visualización' },
            { num: 'Historial', label: '' },
          ].map((stat, ind) => (
            <div
              key={ind}
              className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-5 py-3"
            >
              <motion.div className="text-2xl font-black text-cyan-300">
                {stat.num}
              </motion.div>
              {stat.label && <div className="text-xs text-white/40">{stat.label}</div>}
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link
            href="/calculadora"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-4 rounded-2xl transition-colors"
          >
            Comenzar →
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
