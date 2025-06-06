import { useRef, useEffect, useMemo, memo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

const GalaxyParticles = memo(() => {
  const points = useRef()
  const particleCount = 1500 // Reduced from 5000 for performance

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Create galaxy spiral
      const i3 = i * 3
      const radius = Math.random() * 50
      const spinAngle = radius * 0.1
      const branchAngle = (i % 3) * (Math.PI * 2) / 3
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 5
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 5
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 5
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
      
      // Colors - galaxy themed
      const mixedColor = new THREE.Color()
      const innerColor = new THREE.Color('#9333ea')
      const outerColor = new THREE.Color('#3b82f6')
      mixedColor.lerpColors(innerColor, outerColor, radius / 50)
      
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }
    
    return { positions, colors }
  }, [])

  const frameCount = useRef(0)

  useFrame((state) => {
    if (points.current) {
      // Throttle rotation updates for better performance
      frameCount.current++
      if (frameCount.current % 2 === 0) {
        points.current.rotation.y = state.clock.elapsedTime * 0.03 // Reduced speed
      }
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={positions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        vertexColors 
        transparent 
        opacity={0.7}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
})

const FloatingAsteroid = memo(({ position, scale, speed }) => {
  const meshRef = useRef()
  const frameCount = useRef(0)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Throttle asteroid animations for better performance
      frameCount.current++
      if (frameCount.current % 3 === 0) {
        meshRef.current.rotation.x += delta * speed * 0.3
        meshRef.current.rotation.y += delta * speed * 0.2
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 1.5
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#4c1d95"
        metalness={0.6}
        roughness={0.5}
        emissive="#9333ea"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
})

const GalaxyScene = memo(() => {
  const { camera } = useThree()
  const groupRef = useRef()

  useEffect(() => {
    // Simplified camera animation for better performance
    gsap.to(camera.position, {
      z: 10,
      duration: 2,
      ease: "power2.out"
    })
  }, [camera])

  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      
      {/* Reduced lighting for better performance */}
      <ambientLight intensity={0.3} color="#9333ea" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ec4899" />
      
      {/* Reduced Stars count for performance */}
      <Stars 
        radius={80} 
        depth={40} 
        count={3000} 
        factor={3} 
        saturation={0.4} 
        fade 
        speed={0.5} 
      />

      {/* Galaxy Particles */}
      <GalaxyParticles />

      {/* Reduced Floating Asteroids count */}
      <group ref={groupRef}>
        <FloatingAsteroid position={[-15, 5, -10]} scale={0.4} speed={0.6} />
        <FloatingAsteroid position={[15, -3, -15]} scale={0.5} speed={0.8} />
        <FloatingAsteroid position={[8, 8, -20]} scale={0.3} speed={0.4} />
      </group>

      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true} 
        autoRotate 
        autoRotateSpeed={0.05}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </>
  )
})

export default GalaxyScene