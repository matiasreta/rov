import { useState, useEffect, useRef } from "react";
import OceanScene from "./scenes/OceanScene";
import HomeScreen from "./components/HomeScreen";
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home"); // 'home' o 'game'

  // Load saved data from localStorage
  const [discoveredSpecies, setDiscoveredSpecies] = useState(() => {
    const saved = localStorage.getItem("rovGame_discoveredSpecies");
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

  const handleSpeciesDiscovery = (speciesId) => {
    if (!discoveredSpecies.includes(speciesId)) {
      const now = Date.now();
      const sessionStart = sessionStats.sessionStartTime;
      const timeSinceStart = now - sessionStart;
      const isQuickDiscovery = timeSinceStart < 10000; // Less than 10 seconds

      setDiscoveredSpecies((prev) => [...prev, speciesId]);
      setSessionStats((prev) => ({
        ...prev,
        especies: prev.especies + 1,
        especiesEnSesion: prev.especiesEnSesion + 1,
        descubrimientoRapido: prev.descubrimientoRapido || isQuickDiscovery,
      }));

      console.log(`Especie descubierta: ${speciesId}`);
      if (isQuickDiscovery) {
        console.log("¡Descubrimiento rápido! Menos de 10 segundos");
      }
    }
  };

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("rovGame_discoveredSpecies", JSON.stringify(discoveredSpecies));
  }, [discoveredSpecies]);

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
        <HomeScreen onStartGame={handleStartGame} playerStats={sessionStats} discoveredSpecies={discoveredSpecies} />
      ) : (
        <OceanScene onSpeciesDiscovery={handleSpeciesDiscovery} isGameActive={isGameActive} diveTimer={diveTimer} onBackToHome={handleBackToHome} discoveredSpecies={discoveredSpecies} />
      )}
    </div>
  );
}

export default App;
