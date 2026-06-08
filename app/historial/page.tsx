'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { useState, useMemo } from 'react'
import { useHistorial, useDeleteCalculo } from '@/hooks/useVolumen'
import type { Calculo } from '@/types'
import { FiguraIcon } from '@/components/calculator/FiguraIcon'
import { Copy, Trash2, Search } from 'lucide-react'
import Link from 'next/link'

const columnHelper = createColumnHelper<Calculo>()

export default function HistorialPage() {
  const { data: calculos = [], isLoading } = useHistorial()
  const { mutate: deleteCalculo } = useDeleteCalculo()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const columns = [
    columnHelper.accessor('figura', {
      header: 'Figura',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <FiguraIcon figura={info.getValue()} size={28} />
          <span className="capitalize">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('parametros', {
      header: 'Parámetros',
      cell: (info) => (
        <span className="font-mono text-white/50 text-sm">
          {Object.entries(info.getValue())
            .map(([k, v]) => `${k}=${v}`)
            .join(' · ')}
        </span>
      ),
    }),
    columnHelper.accessor('resultado', {
      header: 'Resultado',
      cell: (info) => (
        <span className="font-mono font-bold text-cyan-300">{info.getValue().toFixed(6)} cm³</span>
      ),
    }),
    columnHelper.accessor('fecha', {
      header: 'Fecha',
      cell: (info) => {
        const date = new Date(info.getValue())
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        let timeStr = 'hace poco'
        if (diffMins < 60) timeStr = `hace ${diffMins}m`
        else if (diffHours < 24) timeStr = `hace ${diffHours}h`
        else if (diffDays < 7) timeStr = `hace ${diffDays}d`

        return <span className="text-white/40 text-sm">{timeStr}</span>
      },
    }),
    columnHelper.display({
      id: 'acciones',
      header: 'Acciones',
      cell: (info) => {
        const calculo = info.row.original
        const isCopied = copied === calculo.id

        return (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                await navigator.clipboard.writeText(calculo.resultado.toFixed(6))
                setCopied(calculo.id)
                setTimeout(() => setCopied(null), 2000)
              }}
              className={`p-2 rounded transition-colors ${isCopied
                ? 'text-green-400 bg-green-500/20'
                : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
            >
              <Copy size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => deleteCalculo(calculo.id)}
              className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/20 rounded transition-colors"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        )
      },
    }),
  ]

  const table = useReactTable({
    data: calculos,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel({ pageSize: 10 }),
  })

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050510] pt-20 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-white/[0.04] rounded-lg animate-pulse"
                style={{
                  animation: `pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite ${i * 0.1}s`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050510] pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-white/30 text-sm mb-2">VolCalc / Historial</p>
          <h1 className="text-3xl md:text-4xl font-black text-white">Historial de Cálculos</h1>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
        >
          {[
            { label: 'Total Cálculos', value: calculos.length },
            {
              label: 'Volumen Promedio',
              value:
                calculos.length > 0
                  ? (calculos.reduce((a, b) => a + b.resultado, 0) / calculos.length).toFixed(2) +
                  ' cm³'
                  : '0',
            },
            {
              label: 'Máximo',
              value:
                calculos.length > 0 ? Math.max(...calculos.map((c) => c.resultado)).toFixed(2) : '0',
            },
            {
              label: 'Figura Favorita',
              value:
                calculos.length > 0
                  ? calculos
                    .reduce(
                      (acc, c) => ({
                        ...acc,
                        [c.figura]: (acc[c.figura as any] || 0) + 1,
                      }),
                      {} as Record<string, number>,
                    )
                    ? Object.entries(
                      calculos.reduce(
                        (acc, c) => ({
                          ...acc,
                          [c.figura]: (acc[c.figura as any] || 0) + 1,
                        }),
                        {} as Record<string, number>,
                      ),
                    ).sort(([, a], [, b]) => b - a)[0]?.[0]
                    : '-'
                  : '-',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-5 py-4"
            >
              <p className="text-white/40 text-xs font-semibold mb-2">{stat.label}</p>
              <p className="text-xl font-black text-cyan-300">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar en historial..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/60"
          />
        </div>

        {/* Table */}
        {calculos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-white/40 mb-4">Sin cálculos aún</p>
            <Link href="/calculadora" className="text-cyan-400 hover:text-cyan-300">
              → Ir a calcular
            </Link>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {table.getFlatHeaders().map((header) => (
                    <th
                      key={header.id}
                      className="text-white/30 text-xs uppercase tracking-widest pb-3 text-left font-semibold"
                    >
                      {header.isPlaceholder ? null : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {table.getRowModel().rows.map((row) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 240,
                        damping: 24,
                        delay: parseInt(row.id) * 0.035,
                      }}
                      layout
                      className="border-b border-white/[0.05] hover:bg-white/[0.025] transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {calculos.length > 0 && (
          <div className="mt-8 flex items-center justify-between text-white/50 text-sm">
            <div>
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 bg-white/[0.04] rounded disabled:opacity-40 hover:bg-white/[0.08] transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 bg-white/[0.04] rounded disabled:opacity-40 hover:bg-white/[0.08] transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
