import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { Color } from "three";
import CustomOceanFloor from "../components/CustomOceanFloor";
import SandFloor from "../components/SandFloor";
import ROVVehicle from "../components/ROVVehicle";
import VehicleCamera from "../components/VehicleCamera";
import MarineCreature from "../components/MarineCreature";
import ROVCameraUI from "../components/ROVCameraUI";
import SpeciesCard from "../components/SpeciesCard";

export default function OceanScene({ onSpeciesDiscovery, isGameActive, diveTimer, onBackToHome, sessionCreatureCounts = {}, currentMissions = [], discoveredSpecies = [] }) {
  const rovRef = useRef();
  const [showSpeciesCard, setShowSpeciesCard] = useState(null);
  const [clickedCreatures, setClickedCreatures] = useState(new Set());

  const handleSpeciesDiscovered = (creatureType, creatureId) => {
    // Check if this specific creature has already been clicked
    if (clickedCreatures.has(creatureId)) {
      return; // Don't count clicks on already discovered creatures
    }

    if (isGameActive && onSpeciesDiscovery) {
      // Mark this creature as clicked
      setClickedCreatures((prev) => new Set([...prev, creatureId]));

      onSpeciesDiscovery(creatureType);
      // Show the species card only if it's the first time discovering this creature type
      if (!discoveredSpecies.includes(creatureType)) {
        setShowSpeciesCard(creatureType);
      }
    }
  };

  const handleCloseCard = () => {
    setShowSpeciesCard(null);
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
          <ambientLight intensity={5.3} color="#3475d8" />
          <hemisphereLight skyColor="#4f94cd" groundColor="#1e3a5f" intensity={0.5} />
          <directionalLight position={[10, 20, 5]} intensity={0.5} color="#ffffff" castShadow />

          {/* Niebla densa para simular visibilidad oceánica limitada */}
          <fog attach="fog" args={["#011e2b", 1, 23]} />

          {/* Suelo de arena */}
          <SandFloor />

          {/* Fondo marino personalizado */}
          <CustomOceanFloor />

          {/* ROV con controles de vehículo */}
          <ROVVehicle rovRef={rovRef} />

          {/* Criaturas marinas distribuidas por el mapa */}
          <MarineCreature position={[13, -2, -60.4]} creatureType="seacrab" creatureId="seacrab-1" rotationX={Math.PI * 0.34} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[22.4, -6, -59]} creatureType="seacrab" creatureId="seacrab-2" rotationX={Math.PI * 1.4} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[21, -5.5, -57]} creatureType="seacrab" creatureId="seacrab-3" rotationX={Math.PI * 1.4} onDiscovered={handleSpeciesDiscovered} />

          <MarineCreature position={[22, -6, -87]} creatureType="seacrab" creatureId="seacrab-3" rotationX={Math.PI * 1.2} onDiscovered={handleSpeciesDiscovered} />

          <MarineCreature position={[17, -6, 44]} creatureType="seacrab" creatureId="seacrab-4" rotationX={Math.PI * 0.5} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-8, -6, 34]} creatureType="seacrab" creatureId="seacrab-5" rotationX={Math.PI * 1.9} onDiscovered={handleSpeciesDiscovered} />

          <MarineCreature position={[-30, -6, -40]} creatureType="seacrab" creatureId="seacrab-5" rotationX={Math.PI * 0.1} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-60, -6, -30]} creatureType="seacrab" creatureId="seacrab-5" rotationX={Math.PI * 1.4} onDiscovered={handleSpeciesDiscovered} />

          <MarineCreature position={[18, -6.4, -7]} creatureType="snail" creatureId="snail-4" rotationX={Math.PI * 0.6} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[50, -6.4, -2]} creatureType="snail" creatureId="snail-5" rotationX={Math.PI * 1.3} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-44, -6.4, 27]} creatureType="snail" creatureId="snail-1" rotationX={Math.PI * 0.2} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[50, -6.4, -6]} creatureType="snail" creatureId="snail-2" rotationX={Math.PI * 1.8} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-34, -6.4, -19]} creatureType="snail" creatureId="snail-3" rotationX={Math.PI * 0.9} onDiscovered={handleSpeciesDiscovered} />

          <MarineCreature position={[-10, -6, -87]} creatureType="seacucumber" creatureId="seacucumber-3" rotationX={Math.PI * 1.1} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-30, -6, -20]} creatureType="seacucumber" creatureId="seacucumber-3" rotationX={Math.PI * 0.4} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[40, -6, -20]} creatureType="seacucumber" creatureId="seacucumber-4" rotationX={Math.PI * 1.6} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-19, -6, -5]} creatureType="seacucumber" creatureId="seacucumber-5" rotationX={Math.PI * 0.7} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-80, -6, -25]} creatureType="seacucumber" creatureId="seacucumber-1" rotationX={Math.PI * 1.5} onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[20, -6, -30]} creatureType="seacucumber" creatureId="seacucumber-2" rotationX={Math.PI * 0.3} onDiscovered={handleSpeciesDiscovered} />

          {/* Zona Profunda position={[-1, -6 - 7]} */}

          {/* Ambiente submarino - removido para evitar alteración de colores */}
        </Suspense>
      </Canvas>

      {/* ROV Camera UI Overlay - Unificado */}
      <ROVCameraUI rovRef={rovRef} diveTimer={diveTimer} onBackToHome={onBackToHome} sessionCreatureCounts={sessionCreatureCounts} currentMissions={currentMissions} />

      {/* Species Card Modal */}
      {showSpeciesCard && <SpeciesCard creatureType={showSpeciesCard} onClose={handleCloseCard} />}
    </div>
  );
}
