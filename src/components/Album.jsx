import { useState } from "react";
import { getAllCreatureTypes } from "../config/creatureTypes";
import SpeciesCard from "./SpeciesCard";
import "./Album.css";

export default function Album({ discoveredSpecies = [], onClose }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const allCreatures = getAllCreatureTypes();

  const handleCardClick = (creatureType) => {
    if (discoveredSpecies.includes(creatureType)) {
      setSelectedCard(creatureType);
    }
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
  };

  return (
    <div className="album-overlay" onClick={onClose}>
      <div className="album-container" onClick={(e) => e.stopPropagation()}>
        <div className="album-header">
          <h2>Álbum de Especies Marinas</h2>
          <p>Descubiertas: {discoveredSpecies.length} / {allCreatures.length}</p>
          <button className="close-album-btn" onClick={onClose}>X</button>
        </div>

        <div className="album-grid">
          {discoveredSpecies.length === 0 ? (
            <div className="no-species-message">
              <p>Aún no has descubierto ninguna especie.</p>
              <p>¡Sumérgete en el océano para comenzar tu colección!</p>
            </div>
          ) : (
            allCreatures
              .filter(creature => discoveredSpecies.includes(creature.id))
              .map((creature) => (
                <div 
                  key={creature.id}
                  className="album-card-slot discovered"
                  onClick={() => handleCardClick(creature.id)}
                >
                  <div className="discovered-card">
                    <div className="album-card-header">
                      <div className="preview-name">{creature.name}</div>
                    </div>
                    <div className="card-preview">
                      <img 
                        src={`/src/assets/img/${creature.id}.png`} 
                        alt={creature.name}
                        className="preview-img"
                      />
                    </div>
                    <div className="card-hover-text">Haz clic para ver</div>
                  </div>
                </div>
              ))
          )}
        </div>

        <div className="album-footer">
          <p>Explora el océano para descubrir más especies</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(discoveredSpecies.length / allCreatures.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {selectedCard && (
          <SpeciesCard 
            creatureType={selectedCard} 
            onClose={handleCloseCard}
          />
        )}
      </div>
    </div>
  );
}