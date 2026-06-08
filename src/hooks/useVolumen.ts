'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Calculo, CalcPayload } from '@/types'

export function useCalcularVolumen() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CalcPayload) => {
      const response = await fetch('/api/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error en cálculo')
      }

      return response.json() as Promise<Calculo>
    },
    onSuccess: async (calculo) => {
      await fetch('/api/historial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(calculo),
      })
      queryClient.invalidateQueries({ queryKey: ['historial'] })
    },
  })
}

export function useHistorial() {
  return useQuery({
    queryKey: ['historial'],
    queryFn: async () => {
      const response = await fetch('/api/historial')
      if (!response.ok) throw new Error('Error fetching historial')
      return response.json() as Promise<Calculo[]>
    },
    staleTime: 30000,
  })
}

export function useDeleteCalculo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch('/api/historial', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error('Error deleting calculo')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historial'] })
    },
  })
}
