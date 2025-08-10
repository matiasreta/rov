import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere } from '@react-three/drei'
import { useKeyboardControls } from '../hooks/useKeyboardControls'

export default function ROV({ rovRef }) {
  const internalRef = useRef()
  const ref = rovRef || internalRef
  const [position, setPosition] = useState([0, -2, 0])
  const keys = useKeyboardControls()
  
  const speed = 0.15
  
  useFrame(() => {
    if (!ref.current) return
    
    let newX = position[0]
    let newY = position[1] 
    let newZ = position[2]
    
    if (keys.forward) newZ -= speed
    if (keys.backward) newZ += speed
    if (keys.left) newX -= speed
    if (keys.right) newX += speed
    if (keys.up) newY += speed
    if (keys.down) newY -= speed
    
    newY = Math.max(-8, Math.min(5, newY))
    
    setPosition([newX, newY, newZ])
    ref.current.position.set(newX, newY, newZ)
  })
  
  return (
    <group ref={ref} position={position}>
      {/* ROV invisible en primera persona - solo mantenemos la luz */}
      <spotLight
        position={[0, 0.2, 2]}
        angle={0.6}
        penumbra={0.4}
        intensity={2}
        color="#ffffff"
        distance={30}
      />
      
      {/* Sonidos de motores (invisible) para feedback */}
      <Box args={[2, 1, 3]} visible={false}>
        <meshStandardMaterial color="#ff6600" />
      </Box>
    </group>
  )
}