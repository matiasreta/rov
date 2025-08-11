import { useGLTF } from '@react-three/drei';

export default function CustomOceanFloor() {
  // Cargar la escena GLTF
  const { scene } = useGLTF('/src/assets/models/scene.glb');

  return (
    <group>
      {/* Tu escena GLTF personalizada - ya incluye el suelo */}
      <primitive 
        object={scene} 
        position={[0, -8, 0]} 
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

// Precargar el modelo GLTF
useGLTF.preload('/src/assets/models/scene.glb');