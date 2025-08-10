import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export default function FirstPersonCamera({ target, offset = [0, 0.5, 1.5] }) {
  const { camera } = useThree();
  const targetPos = useRef(new Vector3());
  const currentPos = useRef(new Vector3());

  useFrame(() => {
    if (!target?.current) return;

    // Obtener posición del ROV
    const rovPosition = target.current.position;

    // Calcular posición de la cámara (dentro del ROV)
    targetPos.current.set(rovPosition.x + offset[0], rovPosition.y + offset[1], rovPosition.z + offset[2]);

    // Suavizar movimiento de cámara
    currentPos.current.lerp(targetPos.current, 0.1);
    camera.position.copy(currentPos.current);

    // Hacer que la cámara mire hacia adelante del ROV
    const lookAtTarget = new Vector3(rovPosition.x, rovPosition.y, rovPosition.z - 5);
    camera.lookAt(lookAtTarget);
  });

  return null;
}
