import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Color } from "three";
import CustomOceanFloor from "../components/CustomOceanFloor";
import ROVVehicle from "../components/ROVVehicle";
import VehicleCamera from "../components/VehicleCamera";
import MarineCreature from "../components/MarineCreature";
import ROVCameraUI from "../components/ROVCameraUI";

export default function OceanScene({ onSpeciesDiscovery, isGameActive }) {
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
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          clearColor: new Color("#001122"),
          antialias: true,
        }}
      >
        <Suspense fallback={null}>
          {/* Cámara primera persona dentro del ROV */}
          <VehicleCamera target={rovRef} offset={[0, 0.2, 0.3]} />

          {/* Iluminación ambiente submarina */}
          <ambientLight intensity={0.3} color="#004466" />
          <directionalLight position={[10, 20, 5]} intensity={0.4} color="#0088cc" castShadow />

          {/* Niebla para simular profundidad */}
          <fog attach="fog" args={["#001122", 10, 80]} />

          {/* Fondo marino personalizado */}
          <CustomOceanFloor />

          {/* ROV con controles de vehículo */}
          <ROVVehicle rovRef={rovRef} />

          {/* Criaturas marinas */}
          <MarineCreature position={[-5, -2, -3]} modelPath="/src/assets/models/Snail.glb" creatureName="Caracol Marino" scale={0.05} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[4, -1.8, -6]} modelPath="/src/assets/models/seacrab.glb" creatureName="Cangrejo de Mar" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-2, -2.2, -8]} modelPath="/src/assets/models/seacucumber.glb" creatureName="Pepino de Mar" onDiscovered={handleSpeciesDiscovered} />

          {/* Ambiente submarino */}
          <Environment preset="dawn" />
        </Suspense>
      </Canvas>

      {/* ROV Camera UI Overlay */}
      <ROVCameraUI rovRef={rovRef} speciesCount={0} totalSpecies={3} />
    </div>
  );
}
