import { getAllAchievements, ACHIEVEMENT_CATEGORIES} from "../config/achievements";
import "./Achievements.css";

export default function Achievements({ unlockedAchievements = [], onClose }) {
  const allAchievements = getAllAchievements();

  // Función para verificar si un logro está desbloqueado
  const isUnlocked = (achievementId) => unlockedAchievements.includes(achievementId);

  // Agrupar logros por categoría
  const achievementsByCategory = Object.entries(ACHIEVEMENT_CATEGORIES).map(([categoryKey, categoryInfo]) => ({
    ...categoryInfo,
    key: categoryKey,
    achievements: allAchievements.filter(achievement => achievement.category === categoryKey)
  }));

  const unlockedCount = unlockedAchievements.length;
  const totalCount = allAchievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="achievements-overlay" onClick={onClose}>
      <div className="achievements-container" onClick={(e) => e.stopPropagation()}>
        <div className="achievements-header">
          <h2>Logros</h2>
          <p>Desbloqueados: {unlockedCount} / {totalCount}</p>
          <button className="close-achievements-btn" onClick={onClose}>X</button>
        </div>

        <div className="achievements-progress">
          <div className="progress-bar-achievements">
            <div 
              className="progress-fill-achievements" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="progress-text">{progressPercentage}% Completado</span>
        </div>

        <div className="achievements-content">
          {achievementsByCategory.map(category => (
            <div key={category.key} className="achievement-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-count">
                  {category.achievements.filter(a => isUnlocked(a.id)).length} / {category.achievements.length}
                </span>
              </div>
              
              <div className="achievements-grid">
                {category.achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`achievement-card ${isUnlocked(achievement.id) ? 'unlocked' : 'locked'}`}
                  >
                    <div className="achievement-icon">
                      {isUnlocked(achievement.id) ? achievement.icon : '🔒'}
                    </div>
                    <div className="achievement-info">
                      <div className="achievement-title">
                        {isUnlocked(achievement.id) ? achievement.title : '???'}
                      </div>
                      <div className="achievement-description">
                        {isUnlocked(achievement.id) ? achievement.description : 'Logro bloqueado'}
                      </div>
                    </div>
                    {isUnlocked(achievement.id) && (
                      <div className="achievement-badge">✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="achievements-footer">
          <p>¡Sigue explorando para desbloquear más logros!</p>
        </div>
      </div>
    </div>
  );
}