// Configuración central de tipos de criaturas
// Para agregar nuevas criaturas, simplemente añade un nuevo objeto aquí

export const CREATURE_TYPES = {
  seacrab: {
    id: 'seacrab',
    name: 'Cangrejo',
    modelPath: '/models/seacrab.glb',
    scale: 1,
    emoji: '🦀',
    description: 'Crustáceo carroñero y depredador de aguas profundas'
  },
  snail: {
    id: 'snail',
    name: 'Caracol de Mar ',
    modelPath: '/models/Snail.glb',
    scale: 0.05,
    emoji: '🐌',
    description: 'Molusco gasterópodo depredador de aguas profundas'
  },
  seacucumber: {
    id: 'seacucumber',
    name: 'Pepino de Mar',
    modelPath: '/models/seacucumber.glb',
    scale: 1,
    emoji: '🥒',
    description: 'Equinodermo bentónico filtrador'
  }
  // Para agregar nuevas criaturas en el futuro:
  // newcreature: {
  //   id: 'newcreature',
  //   name: 'Nombre de la Criatura',
  //   modelPath: '/models/newcreature.glb',
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