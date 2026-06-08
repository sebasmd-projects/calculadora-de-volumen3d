'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useCalculadoraStore } from '@/store/useCalculadoraStore'
import { getFigura } from '@/lib/figuras'

function Esfera({ parametros }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const r = Math.max(0.5, parametros.r || 0.5)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(r, r, r)
    }
  }, [r])

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#06b6d4" wireframe emissive="#06b6d4" emissiveIntensity={0.3} />
    </mesh>
  )
}

function Cubo({ parametros }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const a = Math.max(0.5, parametros.a || 0.5)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(a, a, a)
    }
  }, [a])

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#06b6d4" wireframe emissive="#06b6d4" emissiveIntensity={0.3} />
    </mesh>
  )
}

function Cilindro({ parametros }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const r = Math.max(0.5, parametros.r || 0.5)
  const h = Math.max(0.5, parametros.h || 0.5)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(r, h, r)
    }
  }, [r, h])

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshStandardMaterial color="#06b6d4" wireframe emissive="#06b6d4" emissiveIntensity={0.3} />
    </mesh>
  )
}

function Cono({ parametros }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const r = Math.max(0.5, parametros.r || 0.5)
  const h = Math.max(0.5, parametros.h || 0.5)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(r, h, r)
    }
  }, [r, h])

  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[1, 2, 32]} />
      <meshStandardMaterial color="#06b6d4" wireframe emissive="#06b6d4" emissiveIntensity={0.3} />
    </mesh>
  )
}

function Piramide({ parametros }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lado = Math.max(0.5, parametros.lado || 0.5)
  const h = Math.max(0.5, parametros.h || 0.5)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(lado, h, lado)
    }
  }, [lado, h])

  return (
    <mesh ref={meshRef}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#06b6d4" wireframe emissive="#06b6d4" emissiveIntensity={0.3} />
    </mesh>
  )
}

function Prisma({ parametros }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const l = Math.max(0.5, parametros.l || 0.5)
  const w = Math.max(0.5, parametros.w || 0.5)
  const h = Math.max(0.5, parametros.h || 0.5)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(l, h, w)
    }
  }, [l, h, w])

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#06b6d4" wireframe emissive="#06b6d4" emissiveIntensity={0.3} />
    </mesh>
  )
}

function RotatingScene({ figuraActiva, parametros }: any) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return

    let animationId: number
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.x += 0.005
        groupRef.current.rotation.y += 0.008
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  const figureComponents: any = {
    esfera: Esfera,
    cubo: Cubo,
    cilindro: Cilindro,
    cono: Cono,
    piramide: Piramide,
    prisma: Prisma,
  }

  const FigureComponent = figureComponents[figuraActiva]

  return (
    <group ref={groupRef}>
      {FigureComponent && <FigureComponent parametros={parametros} />}
    </group>
  )
}

export function FiguraVisualizacion3D() {
  const { figuraActiva, parametros } = useCalculadoraStore()
  const figura = figuraActiva ? getFigura(figuraActiva) : null

  if (!figura) return null

  return (
    <div className="w-full h-80 bg-black/30 border border-white/[0.06] rounded-3xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingScene figuraActiva={figuraActiva} parametros={parametros} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={4}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          rotateSpeed={0.8}
        />
        <gridHelper args={[10, 10]} />
      </Canvas>
    </div>
  )
}
