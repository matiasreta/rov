// Sistema de misiones configurable
// Para agregar nuevas misiones, añade objetos al array AVAILABLE_MISSIONS

export const MISSION_TYPES = {
  COLLECT_TYPE: 'collect_type', // Recolectar X cantidad de un tipo específico
  COLLECT_TOTAL: 'collect_total', // Recolectar X criaturas en total
  COLLECT_VARIETY: 'collect_variety' // Recolectar X tipos diferentes
};

export const AVAILABLE_MISSIONS = [
  {
    id: 'collect_3_crabs',
    type: MISSION_TYPES.COLLECT_TYPE,
    title: 'Cazador de Cangrejos',
    description: 'Encuentra 3 cangrejos de mar',
    target: {
      creatureType: 'seacrab',
      count: 3
    },
    reward: 'Insignia de Explorador Marino'
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
    reward: 'Medallón de Moluscos'
  },
  {
    id: 'collect_4_cucumbers',
    type: MISSION_TYPES.COLLECT_TYPE,
    title: 'Especialista en Equinodermos',
    description: 'Encuentra 4 pepinos de mar',
    target: {
      creatureType: 'seacucumber',
      count: 4
    },
    reward: 'Certificado de Bentólogo'
  },
  {
    id: 'collect_all_types',
    type: MISSION_TYPES.COLLECT_VARIETY,
    title: 'Diversidad Marina',
    description: 'Encuentra al menos una criatura de cada tipo',
    target: {
      varietyCount: 3 // Número de tipos diferentes
    },
    reward: 'Diploma de Biodiversidad'
  },
  {
    id: 'collect_8_total',
    type: MISSION_TYPES.COLLECT_TOTAL,
    title: 'Explorador Experto',
    description: 'Encuentra 8 criaturas en una sesión',
    target: {
      totalCount: 8
    },
    reward: 'Rango de Capitán ROV'
  }
];

// Función para obtener misiones aleatorias para una sesión
export const getRandomMissions = (count = 2) => {
  const shuffled = [...AVAILABLE_MISSIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
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