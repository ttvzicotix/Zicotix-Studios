import { Canvas, useFrame } from '@react-three/fiber'
import { Component, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

// The approved Z, planet and terrain stay in the original artwork underneath.
// This transparent canvas only adds atmosphere; it must never paint a background
// or draw a second, different Z over the approved logo.
function Rain({ count }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const drops = useMemo(() => Array.from({ length: count }, () => ({
    x: THREE.MathUtils.randFloat(-8, 8),
    y: THREE.MathUtils.randFloat(-5, 5),
    z: THREE.MathUtils.randFloat(-2, 1),
    speed: THREE.MathUtils.randFloat(0.65, 1.35),
    scale: THREE.MathUtils.randFloat(0.45, 1.05),
  })), [count])

  const drawDrops = () => {
    if (!mesh.current) return
    drops.forEach((drop, i) => {
      dummy.position.set(drop.x, drop.y, drop.z)
      dummy.scale.setScalar(drop.scale)
      dummy.rotation.z = -0.12
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  }

  useLayoutEffect(drawDrops, [drops, dummy])
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    for (const drop of drops) {
      drop.y -= delta * drop.speed
      drop.x -= delta * drop.speed * 0.12
      if (drop.y < -5.5) {
        drop.y = 5.5
        drop.x = THREE.MathUtils.randFloat(-8, 8)
      }
    }
    drawDrops()
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} frustumCulled={false}>
      <boxGeometry args={[0.004, 0.18, 0.004]} />
      <meshBasicMaterial color="#ddbcff" transparent opacity={0.2} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  )
}

class AtmosphereBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function Experience({ active = true }) {
  const compact = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  return (
    <AtmosphereBoundary>
      <Canvas
        dpr={[1, 1.35]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 0, 7.2], fov: 39 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        fallback={null}
        style={{ pointerEvents: 'none', background: 'transparent' }}
      >
        <Rain count={compact ? 60 : 180} />
      </Canvas>
    </AtmosphereBoundary>
  )
}
