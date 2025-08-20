// Sistema de misiones configurable
// Para agregar nuevas misiones, añade objetos al array AVAILABLE_MISSIONS

export const MISSION_TYPES = {
  COLLECT_TYPE: 'collect_type', // Recolectar X cantidad de un tipo específico
  COLLECT_TOTAL: 'collect_total', // Recolectar X criaturas en total
  COLLECT_VARIETY: 'collect_variety' // Recolectar X tipos diferentes
};

export const AVAILABLE_MISSIONS = [
  // NIVEL 1: Misiones fáciles para principiantes
  {
    id: 'first_creature',
    type: MISSION_TYPES.COLLECT_TOTAL,
    title: 'Primer Contacto',
    description: 'Encuentra tu primera criatura marina',
    target: {
      totalCount: 1
    },
    reward: 'Explorador Novato',
    difficulty: 1,
    order: 1
  },
  {
    id: 'collect_1_crab',
    type: MISSION_TYPES.COLLECT_TYPE,
    title: 'Encuentro con Cangrejos',
    description: 'Encuentra 1 cangrejo de mar',
    target: {
      creatureType: 'seacrab',
      count: 1
    },
    reward: 'Observador de Crustáceos',
    difficulty: 1,
    order: 2
  },
  
  // NIVEL 2: Misiones intermedias
  {
    id: 'collect_3_total',
    type: MISSION_TYPES.COLLECT_TOTAL,
    title: 'Explorador Activo',
    description: 'Encuentra 3 criaturas en una sesión',
    target: {
      totalCount: 3
    },
    reward: 'Insignia de Explorador',
    difficulty: 2,
    order: 3
  },
  {
    id: 'collect_2_snails',
    type: MISSION_TYPES.COLLECT_TYPE,
    title: 'Coleccionista de Caracolas',
    description: 'Encuentra 2 caracoles marinos',
    target: {
      creatureType: 'snail',
      count: 2
    },
    reward: 'Medallón de Moluscos',
    difficulty: 2,
    order: 4
  },
  
  // NIVEL 3: Misiones de variedad
  {
    id: 'collect_all_types',
    type: MISSION_TYPES.COLLECT_VARIETY,
    title: 'Diversidad Marina',
    description: 'Encuentra al menos una criatura de cada tipo',
    target: {
      varietyCount: 3
    },
    reward: 'Diploma de Biodiversidad',
    difficulty: 3,
    order: 5
  },
  {
    id: 'collect_3_crabs',
    type: MISSION_TYPES.COLLECT_TYPE,
    title: 'Cazador de Cangrejos',
    description: 'Encuentra 3 cangrejos de mar',
    target: {
      creatureType: 'seacrab',
      count: 3
    },
    reward: 'Especialista en Crustáceos',
    difficulty: 3,
    order: 6
  },
  
  // NIVEL 4: Misiones avanzadas
  {
    id: 'collect_4_cucumbers',
    type: MISSION_TYPES.COLLECT_TYPE,
    title: 'Especialista en Equinodermos',
    description: 'Encuentra 4 pepinos de mar',
    target: {
      creatureType: 'seacucumber',
      count: 4
    },
    reward: 'Certificado de Bentólogo',
    difficulty: 4,
    order: 7
  },
  {
    id: 'collect_6_total',
    type: MISSION_TYPES.COLLECT_TOTAL,
    title: 'Explorador Experto',
    description: 'Encuentra 6 criaturas en una sesión',
    target: {
      totalCount: 6
    },
    reward: 'Rango de Investigador',
    difficulty: 4,
    order: 8
  },
  
  // NIVEL 5: Misiones maestras
  {
    id: 'collect_8_total',
    type: MISSION_TYPES.COLLECT_TOTAL,
    title: 'Maestro del Océano',
    description: 'Encuentra 8 criaturas en una sesión',
    target: {
      totalCount: 8
    },
    reward: 'Rango de Capitán ROV',
    difficulty: 5,
    order: 9
  },
  {
    id: 'collect_variety_and_total',
    type: MISSION_TYPES.COLLECT_TOTAL,
    title: 'Explorador Supremo',
    description: 'Encuentra 10 criaturas en una sesión',
    target: {
      totalCount: 10
    },
    reward: 'Leyenda del Abismo',
    difficulty: 5,
    order: 10
  }
];

// Función para obtener misiones aleatorias para una sesión (legacy)
export const getRandomMissions = (count = 2) => {
  const shuffled = [...AVAILABLE_MISSIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Nueva función para obtener misiones progresivas
export const getProgressiveMissions = (completedMissionIds = [], count = 2) => {
  // Ordenar misiones por orden de dificultad
  const sortedMissions = [...AVAILABLE_MISSIONS].sort((a, b) => a.order - b.order);
  
  // Filtrar misiones no completadas
  const availableMissions = sortedMissions.filter(
    mission => !completedMissionIds.includes(mission.id)
  );
  
  // Si no hay misiones disponibles, reiniciar desde el principio
  if (availableMissions.length === 0) {
    return sortedMissions.slice(0, count);
  }
  
  // Retornar las próximas misiones en orden
  return availableMissions.slice(0, count);
};

// Función para obtener la siguiente misión disponible
export const getNextAvailableMission = (completedMissionIds = []) => {
  const sortedMissions = [...AVAILABLE_MISSIONS].sort((a, b) => a.order - b.order);
  
  const nextMission = sortedMissions.find(
    mission => !completedMissionIds.includes(mission.id)
  );
  
  // Si todas las misiones están completadas, reiniciar desde el principio
  return nextMission || sortedMissions[0];
};

// Función para verificar si una misión está completada
export const isMissionCompleted = (mission, creatureCounts) => {
  switch (mission.type) {
    case MISSION_TYPES.COLLECT_TYPE:
      return creatureCounts[mission.target.creatureType] >= mission.target.count;
    
    case MISSION_TYPES.COLLECT_TOTAL:
      const totalCount = Object.values(creatureCounts).reduce((sum, count) => sum + count, 0);
      return totalCount >= mission.target.totalCount;
    
    case MISSION_TYPES.COLLECT_VARIETY:
      const typesFound = Object.values(creatureCounts).filter(count => count > 0).length;
      return typesFound >= mission.target.varietyCount;
    
    default:
      return false;
  }
};

// Función para obtener el progreso de una misión
export const getMissionProgress = (mission, creatureCounts) => {
  switch (mission.type) {
    case MISSION_TYPES.COLLECT_TYPE:
      return Math.min(creatureCounts[mission.target.creatureType] || 0, mission.target.count);
    
    case MISSION_TYPES.COLLECT_TOTAL:
      const totalCount = Object.values(creatureCounts).reduce((sum, count) => sum + count, 0);
      return Math.min(totalCount, mission.target.totalCount);
    
    case MISSION_TYPES.COLLECT_VARIETY:
      const typesFound = Object.values(creatureCounts).filter(count => count > 0).length;
      return Math.min(typesFound, mission.target.varietyCount);
    
    default:
      return 0;
  }
};