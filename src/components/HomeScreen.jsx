import { useState } from "react";
import Achievements from "./Achievements.jsx";
import Album from "./Album.jsx";
import "./HomeScreen.css";

export default function HomeScreen({ onStartGame, playerStats, discoveredSpecies, unlockedAchievements }) {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  return (
    <div className="home-screen">
      <div className="home-background">
        <div className="ocean-overlay"></div>
        <div className="content-container">
          <div className="title-section">
            <h1 className="main-title">Underwater Oases of Mar Del Plata</h1>
            <p className="subtitle">Explora las profundidades del océano</p>
            <p className="description">Sumérgete en una aventura submarina única. Controla tu ROV y descubre las maravillas ocultas en las profundidades del MAR DEL PLATA.</p>
          </div>

          <div className="button-section">
            <button className="explore-button" onClick={onStartGame}>
              <span className="button-text">EXPLORAR</span>
            </button>

            <div className="menu-buttons">
              <button className="menu-button" onClick={() => setShowAlbum(true)}>
                <span className="button-icon">📚</span>
                <span className="button-label">ÁLBUM DE ESPECIES</span>
              </button>

              <button className="menu-button" onClick={() => setShowAchievements(true)}>
                <span className="button-icon">🏆</span>
                <span className="button-label">LOGROS ({unlockedAchievements?.length || 0})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAchievements && (
        <Achievements 
          unlockedAchievements={unlockedAchievements}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {showAlbum && (
        <Album 
          discoveredSpecies={discoveredSpecies} 
          onClose={() => setShowAlbum(false)}
        />
      )}
    </div>
  );
}
