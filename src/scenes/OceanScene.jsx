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

export default function OceanScene({ onSpeciesDiscovery, isGameActive, diveTimer, onBackToHome, sessionCreatureCounts = {}, currentMissions = [] }) {
  const rovRef = useRef();
  const [showSpeciesCard, setShowSpeciesCard] = useState(null);

  const handleSpeciesDiscovered = (creatureType) => {
    if (isGameActive && onSpeciesDiscovery) {
      onSpeciesDiscovery(creatureType);
      // Show the species card
      setShowSpeciesCard(creatureType);
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
          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight position={[10, 20, 5]} intensity={0.6} color="#ffffff" castShadow />

          {/* Niebla densa para simular visibilidad oceánica limitada */}
          <fog attach="fog" args={["#021722", 1, 23]} />

          {/* Suelo de arena */}
          <SandFloor />

          {/* Fondo marino personalizado */}
          <CustomOceanFloor />

          {/* ROV con controles de vehículo */}
          <ROVVehicle rovRef={rovRef} />

          {/* Criaturas marinas - 16 criaturas distribuidas por el mapa */}
          {/* Zona Central */}
          <MarineCreature position={[-1, -6, -7]} creatureType="snail" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-1, -6, -4]} creatureType="seacrab" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-1, -6, -1]} creatureType="seacucumber" onDiscovered={handleSpeciesDiscovered} />
          
          {/* Zona Norte */}
          <MarineCreature position={[3, -5, -8]} creatureType="seacrab" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[5, -7, -6]} creatureType="snail" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[2, -6, -10]} creatureType="seacucumber" onDiscovered={handleSpeciesDiscovered} />
          
          {/* Zona Sur */}
          <MarineCreature position={[-5, -6, -3]} creatureType="seacrab" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-4, -7, -9]} creatureType="snail" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-6, -5, -5]} creatureType="seacucumber" onDiscovered={handleSpeciesDiscovered} />
          
          {/* Zona Este */}
          <MarineCreature position={[7, -6, -2]} creatureType="seacrab" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[8, -5, -7]} creatureType="snail" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[6, -8, -4]} creatureType="seacucumber" onDiscovered={handleSpeciesDiscovered} />
          
          {/* Zona Oeste */}
          <MarineCreature position={[-8, -6, -6]} creatureType="seacrab" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-7, -7, -2]} creatureType="snail" onDiscovered={handleSpeciesDiscovered} />
          <MarineCreature position={[-9, -5, -8]} creatureType="seacucumber" onDiscovered={handleSpeciesDiscovered} />
          
          {/* Zona Profunda */}
          <MarineCreature position={[0, -9, -12]} creatureType="seacrab" onDiscovered={handleSpeciesDiscovered} />

          {/* Ambiente submarino - removido para evitar alteración de colores */}
        </Suspense>
      </Canvas>

      {/* ROV Camera UI Overlay - Unificado */}
      <ROVCameraUI 
        rovRef={rovRef} 
        diveTimer={diveTimer} 
        onBackToHome={onBackToHome}
        sessionCreatureCounts={sessionCreatureCounts}
        currentMissions={currentMissions}
      />

      {/* Species Card Modal */}
      {showSpeciesCard && (
        <SpeciesCard 
          creatureType={showSpeciesCard} 
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}
