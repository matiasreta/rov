import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Vector3 } from 'three'

function SeaFloorItem({ modelPath, position, rotation, scale }) {
  const { scene } = useGLTF(modelPath)
  
  return (
    <primitive 
      object={scene.clone()} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

export default function SeaFloorDecorations() {
  // Generar posiciones aleatorias para decoraciones
  const decorations = useMemo(() => {
    const items = []
    
    // 1. ROCAS MUY GRANDES (3-5 rocas enormes como formaciones principales)
    const megaRocks = 4
    for (let i = 0; i < megaRocks; i++) {
      const angle = (i / megaRocks) * Math.PI * 2 + Math.random() * 0.5
      const distance = 30 + Math.random() * 20
      const x = Math.cos(angle) * distance
      const z = Math.sin(angle) * distance
      const y = -7.5 + Math.random() * 0.3
      const scale = 2.5 + Math.random() * 1.5 // MUY GRANDES
      
      items.push({
        id: `mega-${i}`,
        modelPath: '/models/Rock Large.glb',
        position: [x, y, z],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: [scale, scale, scale],
        type: 'mega-rock'
      })
    }
    
    // 2. GRUPOS DE ROCAS GEMELAS (6-8 grupos de 2 rocas)
    const twinGroups = 7
    for (let i = 0; i < twinGroups; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 15 + Math.random() * 40
      const centerX = Math.cos(angle) * distance
      const centerZ = Math.sin(angle) * distance
      
      const baseScale = 0.6 + Math.random() * 0.8
      const spacing = 2 + Math.random() * 3
      
      // Primera roca del grupo
      items.push({
        id: `twin-${i}-a`,
        modelPath: Math.random() > 0.5 ? '/models/Rock.glb' : '/models/Rock Large.glb',
        position: [centerX - spacing/2, -7.7 + Math.random() * 0.2, centerZ],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: [baseScale, baseScale, baseScale],
        type: 'twin-rock'
      })
      
      // Segunda roca del grupo (similar pero no idéntica)
      items.push({
        id: `twin-${i}-b`,
        modelPath: Math.random() > 0.5 ? '/models/Rock.glb' : '/models/Rock Large.glb',
        position: [centerX + spacing/2, -7.7 + Math.random() * 0.2, centerZ],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: [baseScale * (0.8 + Math.random() * 0.4), baseScale * (0.8 + Math.random() * 0.4), baseScale * (0.8 + Math.random() * 0.4)],
        type: 'twin-rock'
      })
    }
    
    // 3. DECORACIONES NORMALES (corales y rocas pequeñas)
    const normalModels = [
      { path: '/models/Rock.glb', minScale: 0.3, maxScale: 0.8, weight: 2 },
      { path: '/models/Rock Large.glb', minScale: 0.4, maxScale: 1.2, weight: 1 },
      { path: '/models/coral.glb', minScale: 0.5, maxScale: 1.5, weight: 5 }
    ]
    
    const normalItems = 30
    
    for (let i = 0; i < normalItems; i++) {
      // Seleccionar modelo basado en peso
      const totalWeight = normalModels.reduce((sum, model) => sum + model.weight, 0)
      let randomWeight = Math.random() * totalWeight
      let selectedModel = normalModels[0]
      
      for (const model of normalModels) {
        randomWeight -= model.weight
        if (randomWeight <= 0) {
          selectedModel = model
          break
        }
      }
      
      // Posición aleatoria evitando las mega rocas
      let x, z, distance
      let attempts = 0
      do {
        const angle = Math.random() * Math.PI * 2
        distance = Math.random() * 50
        x = Math.cos(angle) * distance
        z = Math.sin(angle) * distance
        attempts++
      } while (distance < 8 && attempts < 10) // Evitar centro muy congestionado
      
      const y = -7.8 + (Math.random() - 0.5) * 0.3
      const scale = selectedModel.minScale + 
                   (Math.random() * (selectedModel.maxScale - selectedModel.minScale))
      
      items.push({
        id: `normal-${i}`,
        modelPath: selectedModel.path,
        position: [x, y, z],
        rotation: [0, Math.random() * Math.PI * 2, 0],
        scale: [scale, scale, scale],
        type: 'normal'
      })
    }
    
    return items
  }, [])
  
  return (
    <group>
      {decorations.map(item => (
        <SeaFloorItem
          key={item.id}
          modelPath={item.modelPath}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        />
      ))}
    </group>
  )
}

// Precargar modelos
useGLTF.preload('/models/Rock.glb')
useGLTF.preload('/models/Rock Large.glb')
useGLTF.preload('/models/coral.glb')