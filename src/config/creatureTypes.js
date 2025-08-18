// Configuración central de tipos de criaturas
// Para agregar nuevas criaturas, simplemente añade un nuevo objeto aquí

export const CREATURE_TYPES = {
  seacrab: {
    id: 'seacrab',
    name: 'Cangrejo de Mar',
    modelPath: '/src/assets/models/seacrab.glb',
    scale: 1,
    emoji: '🦀',
    description: 'Crustáceo común en fondos marinos'
  },
  snail: {
    id: 'snail',
    name: 'Caracol Marino',
    modelPath: '/src/assets/models/Snail.glb',
    scale: 0.05,
    emoji: '🐚',
    description: 'Molusco gasterópodo de aguas profundas'
  },
  seacucumber: {
    id: 'seacucumber',
    name: 'Pepino de Mar',
    modelPath: '/src/assets/models/seacucumber.glb',
    scale: 1,
    emoji: '🥒',
    description: 'Equinodermo bentónico filtrador'
  }
  // Para agregar nuevas criaturas en el futuro:
  // newcreature: {
  //   id: 'newcreature',
  //   name: 'Nombre de la Criatura',
  //   modelPath: '/src/assets/models/newcreature.glb',
  //   scale: 1,
  //   emoji: '🐟',
  //   description: 'Descripción de la criatura'
  // }
};

// Función helper para obtener todas las criaturas como array
export const getAllCreatureTypes = () => Object.values(CREATURE_TYPES);

// Función helper para obtener información de una criatura por ID
export const getCreatureById = (id) => CREATURE_TYPES[id];

// Función helper para obtener IDs de todas las criaturas
export const getAllCreatureIds = () => Object.keys(CREATURE_TYPES);