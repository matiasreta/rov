import { useState } from 'react';
import { speciesDatabase, getRarityInfo } from '../data/speciesData.js';
import './SpeciesAlbum.css';

export default function SpeciesAlbum({ isOpen, onClose, discoveredSpecies = [] }) {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  if (!isOpen) return null;

  const speciesArray = Object.values(speciesDatabase);
  
  const updatedSpecies = speciesArray.map(species => ({
    ...species,
    discovered: discoveredSpecies.includes(species.id)
  }));

  const discoveredCount = updatedSpecies.filter(s => s.discovered).length;
  const totalCount = speciesArray.length;

  const handleSpeciesClick = (species) => {
    if (species.discovered) {
      setSelectedSpecies(species);
    }
  };

  const closeSpeciesDetail = () => {
    setSelectedSpecies(null);
  };

  return (
    <div className="species-album-overlay" onClick={onClose}>
      <div className="species-album" onClick={(e) => e.stopPropagation()}>
        <div className="album-header">
          <h2>ÁLBUM DE ESPECIES</h2>
          <div className="progress-info">
            {discoveredCount}/{totalCount} especies descubiertas
          </div>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="species-grid">
          {updatedSpecies.map((species) => {
            const rarityInfo = getRarityInfo(species.rarity);
            return (
              <div 
                key={species.id} 
                className={`species-card ${species.discovered ? 'discovered' : 'undiscovered'} ${species.discovered ? 'clickable' : ''}`}
                onClick={() => handleSpeciesClick(species)}
              >
                <div className="species-image">
                  {species.discovered ? (
                    <div className="species-icon">🐠</div>
                  ) : (
                    <div className="mystery-icon">❓</div>
                  )}
                </div>
                
                <div className="species-info">
                  <div className="species-name">
                    {species.discovered ? species.commonName : '???'}
                  </div>
                  <div 
                    className="species-rarity"
                    style={{ color: rarityInfo.color }}
                  >
                    {species.discovered ? rarityInfo.label : 'Desconocido'}
                  </div>
                  {species.discovered && (
                    <div className="species-depth">
                      Profundidad: {species.depth}
                    </div>
                  )}
                </div>
                
                {species.discovered && (
                  <div className="discovered-badge">
                    ✓ Descubierto
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="album-footer">
          <div className="completion-bar">
            <div className="completion-label">Progreso del catálogo</div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(discoveredCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <div className="completion-percent">
              {Math.round((discoveredCount / totalCount) * 100)}%
            </div>
          </div>
        </div>
      </div>
      
      {selectedSpecies && (
        <div className="species-detail-overlay" onClick={closeSpeciesDetail}>
          <div className="species-detail-card" onClick={(e) => e.stopPropagation()}>
            <div className="species-detail-header">
              <div className="species-detail-icon">🐠</div>
              <div className="species-detail-title">
                <h3>{selectedSpecies.commonName}</h3>
                <p className="scientific-name">{selectedSpecies.scientificName}</p>
              </div>
              <button className="close-detail-button" onClick={closeSpeciesDetail}>✕</button>
            </div>
            
            <div className="species-detail-body">
              <div className="species-detail-section">
                <h4>Información General</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Rareza:</span>
                    <span className="detail-value" style={{ color: getRarityInfo(selectedSpecies.rarity).color }}>
                      {getRarityInfo(selectedSpecies.rarity).label}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Profundidad:</span>
                    <span className="detail-value">{selectedSpecies.depth}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tamaño:</span>
                    <span className="detail-value">{selectedSpecies.size}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Hábitat:</span>
                    <span className="detail-value">{selectedSpecies.habitat}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Dieta:</span>
                    <span className="detail-value">{selectedSpecies.diet}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Conservación:</span>
                    <span className="detail-value">{selectedSpecies.conservation}</span>
                  </div>
                </div>
              </div>
              
              <div className="species-detail-section">
                <h4>Descripción</h4>
                <p className="species-description">{selectedSpecies.description}</p>
              </div>
              
              <div className="species-detail-section">
                <h4>Dato Curioso</h4>
                <p className="fun-fact">💡 {selectedSpecies.funFact}</p>
              </div>
              
              <div className="discovery-points">
                <span className="points-label">Puntos de Descubrimiento:</span>
                <span className="points-value">+{selectedSpecies.discoveryPoints}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}