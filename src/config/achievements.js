// Configuración de logros del juego
// Los logros se basan en la lógica existente del juego

export const ACHIEVEMENTS = {
  // Logros de descubrimiento por especie
  firstCrab: {
    id: 'firstCrab',
    title: 'Primer Cangrejo',
    description: 'Descubre tu primer cangrejo de profundidad',
    icon: '🦀',
    condition: (stats) => stats.totalCreatureCounts?.seacrab >= 1,
    category: 'discovery'
  },
  crabCollector: {
    id: 'crabCollector',
    title: 'Coleccionista de Cangrejos',
    description: 'Descubre 3 cangrejos de profundidad',
    icon: '🦀',
    condition: (stats) => stats.totalCreatureCounts?.seacrab >= 3,
    category: 'discovery'
  },
  crabMaster: {
    id: 'crabMaster',
    title: 'Maestro de Cangrejos',
    description: 'Descubre 5 cangrejos de profundidad',
    icon: '👑🦀',
    condition: (stats) => stats.totalCreatureCounts?.seacrab >= 5,
    category: 'discovery'
  },

  // Logros de caracoles
  firstSnail: {
    id: 'firstSnail',
    title: 'Conoce a Gary',
    description: 'Descubre tu primer caracol de mar',
    icon: '🐌',
    condition: (stats) => stats.totalCreatureCounts?.snail >= 1,
    category: 'discovery'
  },
  snailHunter: {
    id: 'snailHunter',
    title: 'Cazador de Caracoles',
    description: 'Descubre 3 caracoles de mar',
    icon: '🐌',
    condition: (stats) => stats.totalCreatureCounts?.snail >= 3,
    category: 'discovery'
  },

  // Logros de pepinos de mar
  firstCucumber: {
    id: 'firstCucumber',
    title: 'Primer Pepino',
    description: 'Descubre tu primer pepino de mar',
    icon: '🥒',
    condition: (stats) => stats.totalCreatureCounts?.seacucumber >= 1,
    category: 'discovery'
  },
  cucumberExpert: {
    id: 'cucumberExpert',
    title: 'Experto en Pepinos',
    description: 'Descubre 3 pepinos de mar',
    icon: '🥒',
    condition: (stats) => stats.totalCreatureCounts?.seacucumber >= 3,
    category: 'discovery'
  },

  // Logros de descubrimiento general
  firstDiscovery: {
    id: 'firstDiscovery',
    title: 'Primera Exploración',
    description: 'Descubre tu primera criatura marina',
    icon: '🔍',
    condition: (stats) => stats.discoveredSpecies?.length >= 1,
    category: 'exploration'
  },
  allSpecies: {
    id: 'allSpecies',
    title: 'Biólogo Marino',
    description: 'Descubre todas las especies disponibles',
    icon: '🧬',
    condition: (stats) => stats.discoveredSpecies?.length >= 3,
    category: 'exploration'
  },

  // Logros de sesión
  quickExplorer: {
    id: 'quickExplorer',
    title: 'Explorador Rápido',
    description: 'Descubre una criatura en menos de 10 segundos',
    icon: '⚡',
    condition: (stats) => stats.sessionStats?.descubrimientoRapido === true,
    category: 'skill'
  },
  sessionMaster: {
    id: 'sessionMaster',
    title: 'Maestro de Sesión',
    description: 'Descubre 3 criaturas en una sola sesión',
    icon: '🏆',
    condition: (stats) => stats.sessionStats?.especiesEnSesion >= 3,
    category: 'skill'
  },

  // Logros de persistencia
  dedicated: {
    id: 'dedicated',
    title: 'Explorador Dedicado',
    description: 'Completa 5 sesiones de exploración',
    icon: '🎯',
    condition: (stats) => stats.sessionStats?.sesionesCompletadas >= 5,
    category: 'persistence'
  },
  veteran: {
    id: 'veteran',
    title: 'Veterano del Océano',
    description: 'Completa 10 sesiones de exploración',
    icon: '🌊',
    condition: (stats) => stats.sessionStats?.sesionesCompletadas >= 10,
    category: 'persistence'
  },

  // Logros de conteo total
  collector: {
    id: 'collector',
    title: 'Coleccionista',
    description: 'Descubre un total de 10 criaturas',
    icon: '📚',
    condition: (stats) => stats.sessionStats?.especies >= 10,
    category: 'collection'
  },
  masterCollector: {
    id: 'masterCollector',
    title: 'Coleccionista Maestro',
    description: 'Descubre un total de 25 criaturas',
    icon: '📖',
    condition: (stats) => stats.sessionStats?.especies >= 25,
    category: 'collection'
  },

  // Logros especiales
  deepExplorer: {
    id: 'deepExplorer',
    title: 'Explorador de Profundidades',
    description: 'Alcanza la máxima profundidad',
    icon: '🌑',
    condition: (stats) => stats.sessionStats?.profundidadMax >= 3000,
    category: 'exploration'
  }
};

// Categorías de logros para organización
export const ACHIEVEMENT_CATEGORIES = {
  discovery: {
    name: 'Descubrimiento',
    icon: '🔍',
    color: '#4CAF50'
  },
  exploration: {
    name: 'Exploración', 
    icon: '🗺️',
    color: '#2196F3'
  },
  skill: {
    name: 'Habilidad',
    icon: '⚡',
    color: '#FF9800'
  },
  persistence: {
    name: 'Persistencia',
    icon: '🎯',
    color: '#9C27B0'
  },
  collection: {
    name: 'Colección',
    icon: '📚',
    color: '#795548'
  }
};

// Función helper para obtener todos los logros
export const getAllAchievements = () => Object.values(ACHIEVEMENTS);

// Función helper para obtener logros por categoría
export const getAchievementsByCategory = (category) => 
  Object.values(ACHIEVEMENTS).filter(achievement => achievement.category === category);

// Función para verificar qué logros están desbloqueados
export const getUnlockedAchievements = (gameStats) => {
  return Object.values(ACHIEVEMENTS).filter(achievement => 
    achievement.condition(gameStats)
  );
};

// Función para obtener el progreso de logros (desbloqueados vs total)
export const getAchievementProgress = (gameStats) => {
  const total = Object.keys(ACHIEVEMENTS).length;
  const unlocked = getUnlockedAchievements(gameStats).length;
  return { unlocked, total, percentage: Math.round((unlocked / total) * 100) };
};

// Función para verificar si un logro específico está desbloqueado
export const isAchievementUnlocked = (achievementId, gameStats) => {
  const achievement = ACHIEVEMENTS[achievementId];
  return achievement ? achievement.condition(gameStats) : false;
};