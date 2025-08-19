import { useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

export default function SandFloor({ size = [400, 400], position = [0, -7, 0] }) {
  const sandTexture = useTexture("/src/assets/textures/sandfloor.jpg");

  sandTexture.wrapS = RepeatWrapping;
  sandTexture.wrapT = RepeatWrapping;
  sandTexture.repeat.set(20, 20);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={size} />
      <meshLambertMaterial map={sandTexture} />
    </mesh>
  );
}
