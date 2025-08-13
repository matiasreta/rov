import { useState, useEffect } from "react";
import "./ROVCameraUI.css";

export default function ROVCameraUI({ rovRef, diveTimer = 30, onBackToHome }) {
  const [timestamp, setTimestamp] = useState("");
  const [rovData, setRovData] = useState({
    heading: 0,
    depth: 0,
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
        const position = rovRef.current.position;
        const rotation = rovRef.current.rotation;

        // Convert Y position to depth (negative Y = deeper)
        const depth = Math.max(0, Math.abs(position.y) * 10);

        // Convert rotation to heading degrees
        const heading = ((((rotation.y * 180) / Math.PI) % 360) + 360) % 360;

        setRovData(() => ({
          heading: Math.round(heading * 10) / 10,
          depth: Math.round(depth * 10) / 10,
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
          <span className="timer-label">TIEMPO:</span>
          <span className={`timer-value ${diveTimer <= 10 ? "timer-warning" : ""}`}>{diveTimer}s</span>
        </div>
      </div>

      {/* Controls and Technical data overlay - Top Left */}
      <div className="controls-and-data">
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

        {/* Technical data section */}
        <div className="technical-data">
          <div className="data-line">HEADING: {rovData.heading.toFixed(1)}°</div>
          <div className="data-line">DEPTH: {rovData.depth.toFixed(1)} m</div>
          <div className="data-line">TEMP: {rovData.temp.toFixed(1)} °C</div>
          <div className="data-line">SALINITY: {rovData.salinity.toFixed(1)} PSU</div>
          <div className="data-line">O2 CON: {rovData.o2Con} μM</div>
          <div className="data-line">O2 SAT: {rovData.o2Sat} %</div>
        </div>
      </div>

      {/* Timestamp - Bottom Right */}
      <div className="timestamp">{timestamp}</div>
    </div>
  );
}
