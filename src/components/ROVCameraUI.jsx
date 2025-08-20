import { useState, useEffect } from "react";
//import { getCreatureById } from "../config/creatureTypes";
import { getMissionProgress } from "../config/missions";
import "./ROVCameraUI.css";

export default function ROVCameraUI({ rovRef, diveTimer = 30, onBackToHome, sessionCreatureCounts = {}, currentMissions = [] }) {
  const [timestamp, setTimestamp] = useState("");
  const [rovData, setRovData] = useState({
    heading: 0,
    depth: 2000,
    temp: 3.0,
    salinity: 34.6,
    o2Con: 280,
    o2Sat: 95,
  });
  // Update timestamp every second
  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      setTimestamp(utc.toISOString().slice(0, 19).replace("T", " ") + " UTC");
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update ROV data based on position and add realistic fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      if (rovRef?.current) {
        const rotation = rovRef.current.rotation;

        // Convert Y position to depth (negative Y = deeper)

        // Convert rotation to heading degrees
        const heading = ((((rotation.y * 180) / Math.PI) % 360) + 360) % 360;

        setRovData(() => ({
          heading: Math.round(heading * 10) / 10,
          depth: 2000,
          temp: Math.round((2.5 + Math.random() * 1.0) * 10) / 10, // 2.5-3.5°C
          salinity: Math.round((34.5 + Math.random() * 0.2) * 10) / 10, // 34.5-34.7 PSU
          o2Con: Math.round(270 + Math.random() * 20), // 270-290 μM
          o2Sat: Math.round(92 + Math.random() * 6), // 92-98%
        }));
      }
    }, 100); // Update 10 times per second for smooth values

    return () => clearInterval(interval);
  }, [rovRef]);

  return (
    <div className="rov-camera-ui">
      <div className="top-bar">
        <button className="back-button" onClick={onBackToHome}>
          ← Volver al Inicio
        </button>
        <div className="timer-display">
          <span className="timer-label">Bateria:</span>
          <span className={`timer-value ${diveTimer <= 10 ? "timer-warning" : ""}`}>{diveTimer}%</span>
        </div>
      </div>

      {/* Controls and Technical data overlay - Left Side */}
      <div className="controls-and-data">
        {/* Technical data section */}
        <div className="technical-data">
          <div className="data-line">HEADING: {rovData.heading.toFixed(1)}°</div>
          <div className="data-line">DEPTH: {rovData.depth.toFixed(1)} m</div>
          <div className="data-line">TEMP: {rovData.temp.toFixed(1)} °C</div>
          <div className="data-line">SALINITY: {rovData.salinity.toFixed(1)} PSU</div>
          <div className="data-line">O2 CON: {rovData.o2Con} μM</div>
          <div className="data-line">O2 SAT: {rovData.o2Sat} %</div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-title">🤖 CONTROLES ROV</div>
          <div className="controls-grid">
            <div className="control-item">
              <span className="control-key">W</span>
              <span className="control-desc">Avanzar</span>
            </div>
            <div className="control-item">
              <span className="control-key">S</span>
              <span className="control-desc">Retroceder</span>
            </div>
            <div className="control-item">
              <span className="control-key">A</span>
              <span className="control-desc">Girar Izq</span>
            </div>
            <div className="control-item">
              <span className="control-key">D</span>
              <span className="control-desc">Girar Der</span>
            </div>
            <div className="control-item">
              <span className="control-key">ESPACIO</span>
              <span className="control-desc">Subir</span>
            </div>
            <div className="control-item">
              <span className="control-key">SHIFT</span>
              <span className="control-desc">Bajar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Progress - Top Right */}
      <div className="mission-panel">
        <div className="mission-title">🎯 MISIONES ACTIVAS</div>
        {currentMissions.length === 0 ? (
          <div className="mission-item">No hay misiones activas</div>
        ) : (
          currentMissions
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((mission, index) => {
              const progress = getMissionProgress(mission, sessionCreatureCounts);
              const maxProgress = mission.target.count || mission.target.totalCount || mission.target.varietyCount;
              const isCompleted = progress >= maxProgress;
              const isPrimary = index === 0;
              
              return (
                <div key={mission.id} className={`mission-item ${isCompleted ? "completed" : ""} ${isPrimary ? "primary" : "secondary"}`}>
                  <div className="mission-header">
                    <div className="mission-name">
                      {isPrimary && <span className="mission-priority">🎯 </span>}
                      {mission.title}
                    </div>
                    <div className="mission-level">Nivel {mission.difficulty || 1}</div>
                  </div>
                  <div className="mission-description">{mission.description}</div>
                  <div className="mission-progress">
                    {progress}/{maxProgress}
                    {isCompleted && <span className="mission-check"> ✓</span>}
                  </div>
                </div>
              );
            })
        )}
      </div>

      {/* Timestamp - Bottom Right */}
      <div className="timestamp">{timestamp}</div>
    </div>
  );
}
