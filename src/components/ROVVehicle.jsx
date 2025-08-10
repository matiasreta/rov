import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere } from "@react-three/drei";
import { Vector3, Euler } from "three";
import { useKeyboardControls } from "../hooks/useKeyboardControls";

export default function ROVVehicle({ rovRef }) {
  const internalRef = useRef();
  const ref = rovRef || internalRef;

  // Estado del vehículo
  const [position, setPosition] = useState(new Vector3(0, -2, 0));
  const [rotation, setRotation] = useState(new Euler(0, 0, 0));
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0));
  const [angularVelocity, setAngularVelocity] = useState(0);

  const keys = useKeyboardControls();

  // Configuración física del ROV
  const thrustPower = 0.8;
  const rotationSpeed = 2.5; // Más rápido para doblar
  const damping = 0.92;
  const angularDamping = 0.95; // Menos fricción para rotación más ágil
  const maxSpeed = 0.2;

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Calcular thrust y rotación basados en input
    let thrust = 0;
    let torque = 0;

    if (keys.forward) thrust += thrustPower;
    if (keys.backward) thrust -= thrustPower;
    if (keys.left) torque += rotationSpeed;
    if (keys.right) torque -= rotationSpeed;

    // Aplicar torque (rotación en Y)
    setAngularVelocity((prev) => prev + torque * delta);
    setAngularVelocity((prev) => prev * angularDamping);

    // Actualizar rotación
    setRotation((prev) => {
      const newRotation = prev.clone();
      newRotation.y += angularVelocity * delta;
      return newRotation;
    });

    // Calcular dirección forward basada en rotación actual
    const forward = new Vector3(0, 0, -1);
    forward.applyEuler(rotation);

    // Aplicar thrust en dirección forward
    const thrustForce = forward.multiplyScalar(thrust * delta);

    setVelocity((prev) => {
      const newVelocity = prev.clone();
      newVelocity.add(thrustForce);

      // Controles verticales independientes
      if (keys.up) newVelocity.y += thrustPower * 0.6 * delta;
      if (keys.down) newVelocity.y -= thrustPower * 0.6 * delta;

      // Aplicar damping
      newVelocity.multiplyScalar(damping);

      // Limitar velocidad máxima
      if (newVelocity.length() > maxSpeed) {
        newVelocity.normalize().multiplyScalar(maxSpeed);
      }

      return newVelocity;
    });

    // Actualizar posición
    setPosition((prev) => {
      const newPos = prev.clone();
      newPos.add(velocity.clone().multiplyScalar(delta * 60));

      // Límites del mundo
      newPos.y = Math.max(-10, Math.min(5, newPos.y));

      return newPos;
    });

    // Aplicar transformaciones al objeto
    ref.current.position.copy(position);
    ref.current.rotation.copy(rotation);
  });

  return (
    <group ref={ref}>
      {/* Luz frontal del ROV - más intensa para primera persona */}
      <spotLight position={[0, 0.2, 1.5]} target-position={[0, 0, -15]} angle={0.9} penumbra={0.2} intensity={4} color="#ffffff" distance={50} />

      {/* ROV completamente invisible - solo existe para física */}
      <Box args={[1.5, 0.8, 2.5]} visible={false}>
        <meshStandardMaterial color="#ff6600" />
      </Box>
    </group>
  );
}
