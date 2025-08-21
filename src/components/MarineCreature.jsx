import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getCreatureById } from "../config/creatureTypes";

export default function MarineCreature({ position, creatureType, creatureId, onDiscovered, rotationX = 0 }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Obtener información de la criatura desde la configuración
  const creatureInfo = getCreatureById(creatureType);
  
  // Cargar el modelo (debe hacerse antes de cualquier return condicional)
  const gltf = useLoader(GLTFLoader, creatureInfo?.modelPath || '/models/Snail.glb');
  
  // useFrame debe ejecutarse siempre, antes de cualquier return condicional
  useFrame((state) => {
    if (groupRef.current && creatureInfo) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });
  
  if (!creatureInfo) {
    console.error(`Creature type "${creatureType}" not found in configuration`);
    return null;
  }

  const handleClick = () => {
    console.log(`¡Criatura descubierta! ${creatureInfo.name} (${creatureType})`);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    if (onDiscovered) {
      onDiscovered(creatureType, creatureId);
    }
  };

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={groupRef} position={position} scale={clicked ? 0.9 : 1} rotation={[0, rotationX, 0]}>
      {/* Modelo 3D real */}
      <primitive object={gltf.scene.clone()} scale={hovered ? creatureInfo.scale * 1.1 : creatureInfo.scale} />

      {/* Hitbox invisible */}
      <mesh onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Outline effect cuando hover */}
      {hovered && (
        <mesh scale={1.3}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} wireframe />
        </mesh>
      )}
    </group>
  );
}
