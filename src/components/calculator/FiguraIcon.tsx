'use client'

import type { FiguraType } from '@/types'

export function FiguraIcon({ figura, size = 24 }: { figura: FiguraType; size?: number }) {
  const strokeWidth = 1.5

  const icons: Record<FiguraType, React.ReactNode> = {
    esfera: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <circle cx="32" cy="32" r="28" />
        <ellipse cx="32" cy="32" rx="28" ry="8" />
        <path d="M4 32C4 44.7 16.7 55 32 55C47.3 55 60 44.7 60 32" />
      </svg>
    ),
    cubo: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M16 20L48 8L56 20L24 32M16 20L24 32M56 20L56 52M24 32L24 44M48 8L48 40M16 20L16 52L24 44" />
      </svg>
    ),
    cilindro: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <ellipse cx="32" cy="16" rx="16" ry="6" />
        <line x1="16" y1="16" x2="16" y2="48" />
        <line x1="48" y1="16" x2="48" y2="48" />
        <ellipse cx="32" cy="48" rx="16" ry="6" />
      </svg>
    ),
    cono: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <line x1="32" y1="8" x2="16" y2="48" />
        <line x1="32" y1="8" x2="48" y2="48" />
        <ellipse cx="32" cy="48" rx="16" ry="6" />
      </svg>
    ),
    piramide: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <line x1="32" y1="8" x2="16" y2="48" />
        <line x1="32" y1="8" x2="48" y2="48" />
        <line x1="32" y1="8" x2="20" y2="56" />
        <line x1="32" y1="8" x2="44" y2="56" />
        <line x1="16" y1="48" x2="48" y2="48" />
        <line x1="20" y1="56" x2="44" y2="56" />
      </svg>
    ),
    prisma: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M12 28L32 12L52 28L52 48L32 56L12 48Z" />
        <line x1="32" y1="12" x2="32" y2="56" />
        <line x1="12" y1="28" x2="52" y2="28" />
      </svg>
    ),
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        color: 'rgb(6, 182, 212)',
      }}
    >
      {icons[figura]}
    </div>
  )
}
