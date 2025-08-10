import { logros, getProgressText } from '../data/achievements.js';
import './AchievementsModal.css';

export default function AchievementsModal({ isOpen, onClose, playerStats }) {
  if (!isOpen) return null;

  const stats = playerStats || {
    especies: 0,
    tieneEspecieRara: false,
    tieneEspecieLegendaria: false,
    profundidadMax: 0,
    especiesEnSesion: 0,
    tiempoJugado: 0
  };

  return (
    <div className="achievements-modal-overlay" onClick={onClose}>
      <div className="achievements-modal" onClick={(e) => e.stopPropagation()}>
        <div className="achievements-header">
          <h2>LOGROS DE INVESTIGACIÓN</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="achievements-list">
          {logros.map((logro) => {
            const isUnlocked = logro.condicion(stats);
            const progressText = getProgressText(logro, stats);
            
            return (
              <div 
                key={logro.id} 
                className={`achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {logro.icono}
                </div>
                
                <div className="achievement-content">
                  <div className="achievement-name">
                    {logro.nombre}
                    {isUnlocked && <span className="check-mark">✓</span>}
                    {!isUnlocked && <span className="lock-icon">🔒</span>}
                  </div>
                  <div className="achievement-description">
                    {logro.descripcion}
                  </div>
                  {progressText && (
                    <div className="achievement-progress">
                      {progressText}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}