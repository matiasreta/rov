import { useState } from "react";
import AchievementsModal from "./AchievementsModal.jsx";
import SpeciesAlbum from "./SpeciesAlbum.jsx";
import "./HomeScreen.css";

export default function HomeScreen({ onStartGame, playerStats, discoveredSpecies }) {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSpeciesAlbum, setShowSpeciesAlbum] = useState(false);
  return (
    <div className="home-screen">
      <div className="home-background">
        <div className="ocean-overlay"></div>
        <div className="content-container">
          <div className="title-section">
            <h1 className="main-title">MARDEL ROV</h1>
            <p className="subtitle">Explora las profundidades del océano</p>
            <p className="description">Sumérgete en una aventura submarina única. Controla tu ROV y descubre las maravillas ocultas en las profundidades del MAR DEL PLATA.</p>
          </div>

          <div className="button-section">
            <button className="explore-button" onClick={onStartGame}>
              <span className="button-text">EXPLORAR</span>
            </button>

            <div className="menu-buttons">
              <button className="menu-button" onClick={() => setShowSpeciesAlbum(true)}>
                <span className="button-icon">📚</span>
                <span className="button-label">ÁLBUM DE ESPECIES</span>
              </button>

              <button className="menu-button" onClick={() => setShowAchievements(true)}>
                <span className="button-icon">🏆</span>
                <span className="button-label">LOGROS</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AchievementsModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} playerStats={playerStats} />

      <SpeciesAlbum isOpen={showSpeciesAlbum} onClose={() => setShowSpeciesAlbum(false)} discoveredSpecies={discoveredSpecies} />
    </div>
  );
}
