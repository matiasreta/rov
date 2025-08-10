import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function MarineCreature({ position, modelPath, creatureName, scale = 1, onDiscovered }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  const gltf = useLoader(GLTFLoader, modelPath)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  const handleClick = () => {
    console.log(`¡Criatura descubierta! ${creatureName}`)
    setClicked(true)
    setTimeout(() => setClicked(false), 200)
    
    if (onDiscovered) {
      onDiscovered(creatureName)
    }
  }

  const handlePointerOver = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
  }

  return (
    <group
      ref={groupRef}
      position={position}
      scale={clicked ? 0.9 : 1}
    >
      {/* Modelo 3D real */}
      <primitive 
        object={gltf.scene.clone()} 
        scale={hovered ? scale * 1.1 : scale}
      />
      
      {/* Hitbox invisible */}
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      
      {/* Outline effect cuando hover */}
      {hovered && (
        <mesh scale={1.3}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.1}
            wireframe
          />
        </mesh>
      )}
    </group>
  )
}