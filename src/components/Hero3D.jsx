import { useRef, useEffect, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const FloatingGeometry = memo(({ position, color, geometry = 'sphere', size = 1, speed = 1 }) => {
  const meshRef = useRef()
  const frameCount = useRef(0)

  useFrame((state) => {
    if (meshRef.current) {
      // Throttle animation updates for better performance
      frameCount.current++
      if (frameCount.current % 2 === 0) {
        meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.15
        meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.3
      }
    }
  })

  const GeometryComponent = () => {
    switch (geometry) {
      case 'box':
        return <RoundedBox args={[size, size, size]} radius={0.1} smoothness={2} />
      case 'torus':
        return <torusGeometry args={[size, size * 0.4, 8, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[size]} />
      default:
        return <sphereGeometry args={[size, 16, 16]} />
    }
  }

  return (
    <Float speed={speed * 0.7} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <GeometryComponent />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
})

const CodeParticles = memo(() => {
  const groupRef = useRef()
  const frameCount = useRef(0)

  useFrame((state) => {
    if (groupRef.current) {
      // Throttle rotation for better performance
      frameCount.current++
      if (frameCount.current % 3 === 0) {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      }
    }
  })

  const colors = ['#6366f1', '#a855f7', '#06b6d4', '#8b5cf6']

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => {
        const radius = 2.5 + Math.random() * 1.5
        const angle = (i / 12) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (Math.random() - 0.5) * 3
        const color = colors[i % colors.length]

        return (
          <Float key={i} speed={0.8 + Math.random() * 0.4} rotationIntensity={0.2}>
            <mesh position={[x, y, z]}>
              <planeGeometry args={[0.25, 0.25]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.6}
                emissive={color}
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
})

const Hero3D = memo(() => {
  const sceneRef = useRef()
  const frameCount = useRef(0)

  useFrame((state) => {
    if (sceneRef.current) {
      // Throttle scene rotation for better performance
      frameCount.current++
      if (frameCount.current % 4 === 0) {
        sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.05
      }
    }
  })

  return (
    <group ref={sceneRef}>
      {/* Main central sphere with reduced detail */}
      <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.2}>
        <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#6366f1"
            metalness={0.7}
            roughness={0.2}
            emissive="#a855f7"
            emissiveIntensity={0.1}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* Reduced floating geometries for better performance */}
      <FloatingGeometry position={[-2.5, 1.5, -1]} color="#a855f7" geometry="box" size={0.6} speed={0.6} />
      <FloatingGeometry position={[2.5, -1, 1]} color="#06b6d4" geometry="torus" size={0.5} speed={0.8} />
      <FloatingGeometry position={[-2, -1.5, 1.5]} color="#8b5cf6" geometry="octahedron" size={0.5} speed={0.7} />
      <FloatingGeometry position={[2, 1.8, -1.5]} color="#3b82f6" geometry="sphere" size={0.4} speed={0.9} />

      {/* Reduced code particles */}
      <CodeParticles />

      {/* Optimized lighting - fewer lights for better performance */}
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-4, -4, -4]} intensity={0.4} color="#a855f7" />
    </group>
  )
})

export default Hero3D