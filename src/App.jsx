import { useState, useEffect, useRef } from "react";
import OceanScene from "./scenes/OceanScene";
import HomeScreen from "./components/HomeScreen";
import { getAllCreatureIds } from "./config/creatureTypes";
import { getRandomMissions, isMissionCompleted } from "./config/missions";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home"); // 'home' o 'game'

  // Load saved data from localStorage - ahora guarda conteos por tipo
  const [discoveredSpecies, setDiscoveredSpecies] = useState(() => {
    const saved = localStorage.getItem("rovGame_discoveredSpecies");
    return saved ? JSON.parse(saved) : [];
  });

  // Inicializar conteos de criaturas por tipo
  const initializeCreatureCounts = () => {
    const counts = {};
    getAllCreatureIds().forEach(id => {
      counts[id] = 0;
    });
    return counts;
  };

  const [sessionCreatureCounts, setSessionCreatureCounts] = useState(initializeCreatureCounts);
  const [totalCreatureCounts, setTotalCreatureCounts] = useState(() => {
    const saved = localStorage.getItem("rovGame_totalCreatureCounts");
    return saved ? JSON.parse(saved) : initializeCreatureCounts();
  });

  // Sistema de misiones
  const [currentMissions, setCurrentMissions] = useState(() => {
    const saved = localStorage.getItem("rovGame_currentMissions");
    return saved ? JSON.parse(saved) : getRandomMissions(2);
  });

  const [completedMissions, setCompletedMissions] = useState(() => {
    const saved = localStorage.getItem("rovGame_completedMissions");
    return saved ? JSON.parse(saved) : [];
  });

  const [sessionStats, setSessionStats] = useState(() => {
    const saved = localStorage.getItem("rovGame_sessionStats");
    return saved
      ? JSON.parse(saved)
      : {
          especies: 0,
          especiesEnSesion: 0,
          sesionesCompletadas: 0,
          profundidadMax: 3000, // All species are at 3000m
          descubrimientoRapido: false,
          sessionStartTime: null,
        };
  });
  const [diveTimer, setDiveTimer] = useState(120);
  const [isGameActive, setIsGameActive] = useState(false);
  const timerRef = useRef(null);

  const handleStartGame = () => {
    setCurrentScreen("game");
    setDiveTimer(120);
    setIsGameActive(true);
    
    // Reiniciar conteos de sesión
    setSessionCreatureCounts(initializeCreatureCounts());
    
    // Generar nuevas misiones si no hay misiones activas
    if (currentMissions.length === 0) {
      const newMissions = getRandomMissions(2);
      setCurrentMissions(newMissions);
    }
    
    setSessionStats((prev) => ({
      ...prev,
      especiesEnSesion: 0,
      sessionStartTime: Date.now(),
      descubrimientoRapido: false,
    }));
    startDiveTimer();
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
    setIsGameActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startDiveTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setDiveTimer((prev) => {
        if (prev <= 1) {
          setIsGameActive(false);
          setCurrentScreen("home");
          // Increment completed sessions when timer runs out
          setSessionStats((prevStats) => ({
            ...prevStats,
            sesionesCompletadas: prevStats.sesionesCompletadas + 1,
          }));
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSpeciesDiscovery = (creatureType) => {
    // Incrementar conteos de sesión
    setSessionCreatureCounts(prev => ({
      ...prev,
      [creatureType]: prev[creatureType] + 1
    }));

    // Incrementar conteos totales
    setTotalCreatureCounts(prev => ({
      ...prev,
      [creatureType]: prev[creatureType] + 1
    }));

    // Agregar a especies descubiertas si es primera vez
    if (!discoveredSpecies.includes(creatureType)) {
      setDiscoveredSpecies(prev => [...prev, creatureType]);
    }

    // Verificar misiones completadas
    const updatedCounts = {
      ...sessionCreatureCounts,
      [creatureType]: sessionCreatureCounts[creatureType] + 1
    };

    currentMissions.forEach(mission => {
      if (!completedMissions.includes(mission.id) && isMissionCompleted(mission, updatedCounts)) {
        setCompletedMissions(prev => [...prev, mission.id]);
        console.log(`¡Misión completada: ${mission.title}!`);
      }
    });

    const now = Date.now();
    const sessionStart = sessionStats.sessionStartTime;
    const timeSinceStart = now - sessionStart;
    const isQuickDiscovery = timeSinceStart < 10000;

    setSessionStats(prev => ({
      ...prev,
      especies: prev.especies + 1,
      especiesEnSesion: prev.especiesEnSesion + 1,
      descubrimientoRapido: prev.descubrimientoRapido || isQuickDiscovery,
    }));

    console.log(`Criatura descubierta: ${creatureType}`);
    if (isQuickDiscovery) {
      console.log("¡Descubrimiento rápido! Menos de 10 segundos");
    }
  };

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("rovGame_discoveredSpecies", JSON.stringify(discoveredSpecies));
  }, [discoveredSpecies]);

  useEffect(() => {
    localStorage.setItem("rovGame_totalCreatureCounts", JSON.stringify(totalCreatureCounts));
  }, [totalCreatureCounts]);

  useEffect(() => {
    localStorage.setItem("rovGame_currentMissions", JSON.stringify(currentMissions));
  }, [currentMissions]);

  useEffect(() => {
    localStorage.setItem("rovGame_completedMissions", JSON.stringify(completedMissions));
  }, [completedMissions]);

  useEffect(() => {
    localStorage.setItem("rovGame_sessionStats", JSON.stringify(sessionStats));
  }, [sessionStats]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      {currentScreen === "home" ? (
        <HomeScreen 
          onStartGame={handleStartGame} 
          playerStats={sessionStats} 
          discoveredSpecies={discoveredSpecies}
          totalCreatureCounts={totalCreatureCounts}
          completedMissions={completedMissions}
        />
      ) : (
        <OceanScene 
          onSpeciesDiscovery={handleSpeciesDiscovery} 
          isGameActive={isGameActive} 
          diveTimer={diveTimer} 
          onBackToHome={handleBackToHome} 
          discoveredSpecies={discoveredSpecies}
          sessionCreatureCounts={sessionCreatureCounts}
          currentMissions={currentMissions}
        />
      )}
    </div>
  );
}

export default App;
