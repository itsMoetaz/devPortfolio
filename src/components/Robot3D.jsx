import { useRef, useEffect, useState, useCallback, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

const Robot3D = memo(({ scrollProgress = 0 }) => {
  const robotRef = useRef()
  const headRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const eyesRef = useRef()
  const frameCount = useRef(0)
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [robotState, setRobotState] = useState('idle') // idle, looking, walking

  const handleMouseMove = useCallback((e) => {
    // Throttle mouse tracking to every 3rd frame
    if (frameCount.current % 3 === 0) {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    // Reduce GSAP animations frequency
    if (scrollProgress > 0.1 && robotState !== 'walking') {
      setRobotState('walking')
      // Trigger walking animation with reduced duration
      if (robotRef.current) {
        gsap.to(robotRef.current.rotation, {
          y: Math.PI / 6,
          duration: 0.3, // Reduced from 0.5
          ease: "power2.out"
        })
      }
    } else if (scrollProgress <= 0.1 && robotState !== 'idle') {
      setRobotState('idle')
      if (robotRef.current) {
        gsap.to(robotRef.current.rotation, {
          y: 0,
          duration: 0.3, // Reduced from 0.5
          ease: "power2.out"
        })
      }
    }
  }, [scrollProgress, robotState])

  useFrame((state, delta) => {
    if (!robotRef.current) return

    frameCount.current++
    
    // Throttle animations to every 2nd frame for better performance
    if (frameCount.current % 2 !== 0) return

    const time = state.clock.elapsedTime

    if (robotState === 'idle') {
      // Reduced idle breathing animation frequency
      robotRef.current.position.y = Math.sin(time * 1) * 0.05 // Reduced intensity and speed
      
      // Head follows mouse with less frequent updates
      if (headRef.current && frameCount.current % 4 === 0) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          mousePosition.x * 0.3, // Reduced from 0.5
          0.05 // Reduced lerp speed
        )
        headRef.current.rotation.x = THREE.MathUtils.lerp(
          headRef.current.rotation.x,
          mousePosition.y * 0.2, // Reduced from 0.3
          0.05 // Reduced lerp speed
        )
      }
      
      // Reduced eye glow animation frequency
      if (eyesRef.current && frameCount.current % 6 === 0) {
        eyesRef.current.children.forEach((eye, index) => {
          if (eye.material) {
            eye.material.emissiveIntensity = 0.6 + Math.sin(time * 2 + index) * 0.1 // Reduced intensity
          }
        })
      }
      
    } else if (robotState === 'walking') {
      // Walking animation with reduced frequency
      const walkSpeed = 3 // Reduced from 4
      
      // Body sway
      robotRef.current.rotation.z = Math.sin(time * walkSpeed) * 0.05 // Reduced intensity
      
      // Arm swinging with reduced frequency
      if (leftArmRef.current && rightArmRef.current && frameCount.current % 3 === 0) {
        leftArmRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.3 // Reduced from 0.5
        rightArmRef.current.rotation.x = -Math.sin(time * walkSpeed) * 0.3 // Reduced from 0.5
      }
      
      // Leg movement with reduced frequency
      if (leftLegRef.current && rightLegRef.current && frameCount.current % 3 === 0) {
        leftLegRef.current.rotation.x = Math.sin(time * walkSpeed) * 0.2 // Reduced from 0.3
        rightLegRef.current.rotation.x = -Math.sin(time * walkSpeed) * 0.2 // Reduced from 0.3
      }
      
      // Head bob with reduced frequency
      if (headRef.current && frameCount.current % 4 === 0) {
        headRef.current.position.y = Math.abs(Math.sin(time * walkSpeed * 1.5)) * 0.05 // Reduced intensity
      }
    }

    // Position based on scroll with reduced frequency
    if (frameCount.current % 5 === 0) {
      const scrollInfluence = scrollProgress * Math.PI * 0.3 // Reduced from 0.5
      robotRef.current.position.x = Math.sin(scrollInfluence) * 0.1 // Reduced from 0.2
    }
  })

  return (
    <Float speed={robotState === 'walking' ? 0 : 0.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={robotRef} scale={1.2}>
        {/* Robot Head */}
        <group ref={headRef} position={[0, 1.2, 0]}>
          <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.1} smoothness={2}>
            <meshStandardMaterial 
              color="#2563eb" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#1e40af"
              emissiveIntensity={0.05}
            />
          </RoundedBox>
          
          {/* Eyes */}
          <group ref={eyesRef}>
            <mesh position={[-0.25, 0.1, 0.35]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial 
                color="#06b6d4" 
                emissive="#06b6d4"
                emissiveIntensity={0.6}
                transparent
              />
            </mesh>
            <mesh position={[0.25, 0.1, 0.35]}>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial 
                color="#06b6d4" 
                emissive="#06b6d4"
                emissiveIntensity={0.6}
                transparent
              />
            </mesh>
          </group>
          
          {/* Face Panel */}
          <mesh position={[0, -0.1, 0.35]}>
            <boxGeometry args={[0.4, 0.2, 0.02]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              emissive="#8b5cf6"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Antenna */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial 
              color="#10b981" 
              emissive="#10b981"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        {/* Robot Body */}
        <RoundedBox args={[1.2, 1.4, 0.8]} radius={0.1} smoothness={2} position={[0, 0.2, 0]}>
          <meshStandardMaterial 
            color="#1e293b" 
            metalness={0.8} 
            roughness={0.2}
          />
        </RoundedBox>
        
        {/* Chest Panel */}
        <RoundedBox args={[0.8, 0.8, 0.05]} radius={0.05} smoothness={2} position={[0, 0.4, 0.35]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#3b82f6"
            emissiveIntensity={0.2}
            metalness={0.5}
          />
        </RoundedBox>
        
        {/* Side Lights */}
        <mesh position={[-0.5, 0.2, 0.35]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1]} />
          <meshStandardMaterial 
            color="#ef4444" 
            emissive="#ef4444"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0.5, 0.2, 0.35]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Arms */}
        <group ref={leftArmRef} position={[-0.8, 0.6, 0]}>
          <RoundedBox args={[0.3, 1, 0.3]} radius={0.05} smoothness={2}>
            <meshStandardMaterial color="#2563eb" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          {/* Hand */}
          <mesh position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#1e40af" metalness={0.8} />
          </mesh>
        </group>
        
        <group ref={rightArmRef} position={[0.8, 0.6, 0]}>
          <RoundedBox args={[0.3, 1, 0.3]} radius={0.05} smoothness={2}>
            <meshStandardMaterial color="#2563eb" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          {/* Hand */}
          <mesh position={[0, -0.6, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#1e40af" metalness={0.8} />
          </mesh>
        </group>

        {/* Legs */}
        <group ref={leftLegRef} position={[-0.3, -0.8, 0]}>
          <RoundedBox args={[0.35, 1, 0.4]} radius={0.05} smoothness={2}>
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </RoundedBox>
          {/* Foot */}
          <RoundedBox args={[0.4, 0.2, 0.6]} radius={0.05} smoothness={2} position={[0, -0.6, 0.1]}>
            <meshStandardMaterial color="#2563eb" metalness={0.7} />
          </RoundedBox>
        </group>
        
        <group ref={rightLegRef} position={[0.3, -0.8, 0]}>
          <RoundedBox args={[0.35, 1, 0.4]} radius={0.05} smoothness={2}>
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </RoundedBox>
          {/* Foot */}
          <RoundedBox args={[0.4, 0.2, 0.6]} radius={0.05} smoothness={2} position={[0, -0.6, 0.1]}>
            <meshStandardMaterial color="#2563eb" metalness={0.7} />
          </RoundedBox>
        </group>
      </group>
    </Float>
  )
})

export default Robot3D