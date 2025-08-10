import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3, Euler } from 'three'

export default function FreeCamera({ target, speed = 0.1 }) {
  const { camera, gl } = useThree()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isPointerLocked, setIsPointerLocked] = useState(false)
  const currentPos = useRef(new Vector3())
  
  useEffect(() => {
    const canvas = gl.domElement
    
    const handleClick = () => {
      canvas.requestPointerLock()
    }
    
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === canvas)
    }
    
    const handleMouseMove = (event) => {
      if (document.pointerLockElement === canvas) {
        setRotation(prev => ({
          x: Math.max(-Math.PI/2 + 0.1, Math.min(Math.PI/2 - 0.1, prev.x - event.movementY * 0.002)),
          y: prev.y - event.movementX * 0.002
        }))
      }
    }
    
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        document.exitPointerLock()
      }
    }
    
    canvas.addEventListener('click', handleClick)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      canvas.removeEventListener('click', handleClick)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [gl])
  
  useFrame(() => {
    if (!target?.current) return
    
    // Obtener posición del ROV
    const rovPosition = target.current.position
    
    // Posición de la cámara (dentro del ROV)
    const targetPos = new Vector3(rovPosition.x, rovPosition.y + 0.3, rovPosition.z + 0.5)
    
    // Suavizar movimiento de posición
    currentPos.current.lerp(targetPos, speed)
    camera.position.copy(currentPos.current)
    
    // Aplicar rotación libre con mouse
    camera.rotation.set(rotation.x, rotation.y, 0)
  })
  
  return null
}