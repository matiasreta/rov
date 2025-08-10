import { Plane, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RepeatWrapping } from "three";
import sandfloorTexture from "../assets/textures/sandfloor.jpg";
import SeaFloorDecorations from "./SeaFloorDecorations";

export default function OceanFloor() {
  const meshRef = useRef();

  // Cargar tu textura personalizada
  const sandTexture = useTexture(sandfloorTexture, (texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(6, 6); // Repetir la textura
    texture.needsUpdate = true;
  });

  useFrame((state) => {
    if (meshRef.current) {
      // Efecto sutil de ondulación en la arena
      meshRef.current.material.normalScale.x = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.material.normalScale.y = 0.1 + Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group>
      <Plane ref={meshRef} args={[150, 150]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]} receiveShadow>
        <meshStandardMaterial map={sandTexture} roughness={0.8} metalness={0.1} />
      </Plane>

      {/* Decoraciones 3D del suelo marino */}
      <SeaFloorDecorations />
    </group>
  );
}
