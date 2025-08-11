import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export default function VehicleCamera({ target, offset = [0, 0.2, 0.5] }) {
  const { camera } = useThree();
  const currentPos = useRef(new Vector3());
  const currentLookAt = useRef(new Vector3());

  // Configurar FOV muy restrictivo para simular visión de ROV submarina
  camera.fov = 80; // FOV muy pequeño para crear efecto de "linterna submarina"
  camera.far = 35; // Limitar distancia de renderizado para mayor inmersión
  camera.updateProjectionMatrix();

  useFrame(() => {
    if (!target?.current) return;

    // Obtener transformaciones del ROV
    const rovPosition = target.current.position.clone();
    const rovRotation = target.current.rotation.clone();

    // Posición de cámara DENTRO del ROV (primera persona)
    const cameraOffset = new Vector3(offset[0], offset[1], offset[2]);
    cameraOffset.applyEuler(rovRotation);
    const targetCameraPos = rovPosition.clone().add(cameraOffset);

    // Punto de mira hacia adelante y ligeramente hacia abajo
    const lookOffset = new Vector3(0, -14, -20);
    lookOffset.applyEuler(rovRotation);
    const targetLookAt = rovPosition.clone().add(lookOffset);

    // Suavizado más responsivo para primera persona
    const lerpFactor = 0.12;

    currentPos.current.lerp(targetCameraPos, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);

    // Aplicar a la cámara
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
