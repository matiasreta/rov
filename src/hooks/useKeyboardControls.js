import { useState, useEffect } from 'react'

export function useKeyboardControls() {
  const [keys, setKeys] = useState({
    forward: false,    // W
    backward: false,   // S
    left: false,       // A
    right: false,      // D
    up: false,         // Space
    down: false        // Shift
  })
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
          setKeys(prev => ({ ...prev, forward: true }))
          break
        case 'KeyS':
          setKeys(prev => ({ ...prev, backward: true }))
          break
        case 'KeyA':
          setKeys(prev => ({ ...prev, left: true }))
          break
        case 'KeyD':
          setKeys(prev => ({ ...prev, right: true }))
          break
        case 'Space':
          event.preventDefault()
          setKeys(prev => ({ ...prev, up: true }))
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          setKeys(prev => ({ ...prev, down: true }))
          break
      }
    }
    
    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
          setKeys(prev => ({ ...prev, forward: false }))
          break
        case 'KeyS':
          setKeys(prev => ({ ...prev, backward: false }))
          break
        case 'KeyA':
          setKeys(prev => ({ ...prev, left: false }))
          break
        case 'KeyD':
          setKeys(prev => ({ ...prev, right: false }))
          break
        case 'Space':
          setKeys(prev => ({ ...prev, up: false }))
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          setKeys(prev => ({ ...prev, down: false }))
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  
  return keys
}