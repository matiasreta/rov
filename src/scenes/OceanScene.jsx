import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Color } from "three";
import CustomOceanFloor from "../components/CustomOceanFloor";
import ROVVehicle from "../components/ROVVehicle";
import VehicleCamera from "../components/VehicleCamera";
import MarineCreature from "../components/MarineCreature";
import ROVCameraUI from "../components/ROVCameraUI";

export default function OceanScene({ onSpeciesDiscovery, isGameActive, diveTimer, onBackToHome, discoveredSpecies = [] }) {
  const rovRef = useRef();

  const handleSpeciesDiscovered = (speciesName) => {
    if (isGameActive && onSpeciesDiscovery) {
      onSpeciesDiscovery(speciesName);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [0, -1, 3],
          fov: 96,
          near: 0.5,
          far: 60,
        }}
        gl={{
          clearColor: new Color("#536ea1"),
          antialias: true,
        }}
      >
        <Suspense fallback={null}>
          {/* Cámara primera persona dentro del ROV */}
          <VehicleCamera target={rovRef} offset={[0, 0.2, 0.3]} />

          {/* Iluminación ambiente submarina mejorada para colores */}
          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight position={[10, 20, 5]} intensity={0.6} color="#ffffff" castShadow />

          {/* Niebla densa para simular visibilidad oceánica limitada */}
          <fog attach="fog" args={["#021722", 1, 23]} />

          {/* Fondo marino personalizado */}
          <CustomOceanFloor />

          {/* ROV con controles de vehículo */}
          <ROVVehicle rovRef={rovRef} />

          {/* Criaturas marinas */}
          <MarineCreature position={[-1, -7, -7]} modelPath="/src/assets/models/Snail.glb" creatureName="Caracol Marino" scale={0.05} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-1, -7, -4]} modelPath="/src/assets/models/seacrab.glb" creatureName="Cangrejo de Mar" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-1, -7, -1]} modelPath="/src/assets/models/seacucumber.glb" creatureName="Pepino de Mar" onDiscovered={handleSpeciesDiscovered} />

          {/* Ambiente submarino - removido para evitar alteración de colores */}
        </Suspense>
      </Canvas>

      {/* ROV Camera UI Overlay - Unificado */}
      <ROVCameraUI rovRef={rovRef} speciesCount={discoveredSpecies.length} totalSpecies={3} diveTimer={diveTimer} onBackToHome={onBackToHome} />
    </div>
  );
}
