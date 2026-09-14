import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'

function useReducedMotion() {
  return useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false, [])
}

function InteractiveZ() {
  const mesh = useRef()
  const target = useRef({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const reducedMotion = useReducedMotion()

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-1.8, 1.25)
    s.lineTo(1.8, 1.25)
    s.lineTo(1.8, 0.72)
    s.lineTo(-0.62, -1.2)
    s.lineTo(1.8, -1.2)
    s.lineTo(1.8, -1.78)
    s.lineTo(-1.8, -1.78)
    s.lineTo(-1.8, -1.2)
    s.lineTo(0.62, 0.72)
    s.lineTo(-1.8, 0.72)
    s.closePath()
    return s
  }, [])

  const extrudeSettings = useMemo(() => ({
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.075,
    bevelSize: 0.045,
    bevelSegments: 4,
    curveSegments: 8,
  }), [])

  useFrame((state, delta) => {
    if (!mesh.current || reducedMotion) return
    if (!dragging) {
      target.current.y = state.pointer.x * 0.055
      target.current.x = -state.pointer.y * 0.035
    }
    mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, target.current.x, 6, delta)
    mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, target.current.y, 6, delta)
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.035
  })

  const updateDrag = (e) => {
    if (!dragging || reducedMotion) return
    target.current.y = THREE.MathUtils.clamp(e.pointer.x * 0.34, -0.34, 0.34)
    target.current.x = THREE.MathUtils.clamp(-e.pointer.y * 0.24, -0.24, 0.24)
  }

  return (
    <mesh
      ref={mesh}
      position={[1.9, 0.15, 0.4]}
      scale={1.08}
      onPointerDown={(e) => {
        e.stopPropagation()
        setDragging(true)
        e.target?.setPointerCapture?.(e.pointerId)
      }}
      onPointerMove={updateDrag}
      onPointerUp={() => setDragging(false)}
      onPointerOut={() => setDragging(false)}
    >
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#fbf9ff"
        metalness={0.34}
        roughness={0.2}
        emissive="#4e006f"
        emissiveIntensity={0.13}
      />
      <Edges color="#dd52ff" scale={1.002} threshold={18} />
    </mesh>
  )
}

function Planet() {
  return (
    <group position={[3.05, 0.9, -4.6]}>
      <mesh scale={3.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#130019" emissive="#4f006a" emissiveIntensity={0.38} roughness={0.92} />
      </mesh>
      <mesh rotation={[Math.PI / 2.16, 0.1, 0.28]}>
        <torusGeometry args={[3.35, 0.016, 8, 256]} />
        <meshBasicMaterial color="#dc45ff" transparent opacity={0.78} />
      </mesh>
    </group>
  )
}

function Rain({ count = 180 }) {
  const instanced = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const drops = useMemo(() => Array.from({ length: count }, () => ({
    x: THREE.MathUtils.randFloat(-7, 8),
    y: THREE.MathUtils.randFloat(-4, 6),
    z: THREE.MathUtils.randFloat(-2, 1.5),
    speed: THREE.MathUtils.randFloat(0.8, 1.8),
    scale: THREE.MathUtils.randFloat(0.45, 1.15),
  })), [count])
  const reducedMotion = useReducedMotion()

  useFrame((_, delta) => {
    if (!instanced.current || reducedMotion) return
    drops.forEach((drop, i) => {
      drop.y -= delta * drop.speed
      drop.x -= delta * 0.14 * drop.speed
      if (drop.y < -4.5) {
        drop.y = 6
        drop.x = THREE.MathUtils.randFloat(-7, 8)
      }
      dummy.position.set(drop.x, drop.y, drop.z)
      dummy.scale.set(drop.scale, drop.scale, drop.scale)
      dummy.rotation.z = 0.12
      dummy.updateMatrix()
      instanced.current.setMatrixAt(i, dummy.matrix)
    })
    instanced.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instanced} args={[null, null, count]} frustumCulled={false}>
      <boxGeometry args={[0.006, 0.22, 0.006]} />
      <meshBasicMaterial color="#d9b1ff" transparent opacity={0.22} depthWrite={false} />
    </instancedMesh>
  )
}

function Mist() {
  const group = useRef()
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120)
    gradient.addColorStop(0, 'rgba(205,70,255,0.28)')
    gradient.addColorStop(0.45, 'rgba(110,25,160,0.11)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(canvas)
  }, [])
  const reducedMotion = useReducedMotion()

  useFrame((state) => {
    if (!group.current || reducedMotion) return
    group.current.position.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.22
  })

  return (
    <group ref={group} position={[1.6, -1.9, -0.8]}>
      {[0, 1, 2].map((i) => (
        <sprite key={i} position={[i * 1.7 - 1.5, i * 0.22, -i * 0.4]} scale={[5.2, 2.15, 1]}>
          <spriteMaterial map={texture} transparent opacity={0.62 - i * 0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </group>
  )
}

function CameraDrift() {
  const { camera } = useThree()
  const reducedMotion = useReducedMotion()
  useFrame((state, delta) => {
    if (reducedMotion) return
    const tx = state.pointer.x * 0.12
    const ty = state.pointer.y * 0.08
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 3.2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 3.2, delta)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#030204']} />
      <fog attach="fog" args={['#07030c', 6.5, 17]} />
      <ambientLight intensity={0.58} />
      <directionalLight position={[5, 6, 7]} intensity={2.3} color="#fff7ff" />
      <pointLight position={[4.8, 2.7, 3.5]} intensity={35} distance={14} decay={2} color="#d72cff" />
      <pointLight position={[-3, -2, 2]} intensity={9} distance={9} color="#6b1cff" />
      <Stars radius={60} depth={32} count={800} factor={2.1} saturation={0} fade speed={0.18} />
      <Planet />
      <Mist />
      <Rain />
      <InteractiveZ />
      <CameraDrift />
    </>
  )
}

export default function Experience() {
  return (
    <Canvas
      dpr={[1, 1.65]}
      camera={{ position: [0, 0, 7.2], fov: 39 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene />
    </Canvas>
  )
}
