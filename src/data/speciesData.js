export const speciesDatabase = {
  'Cangrejo de Mar': {
    id: 'Cangrejo de Mar',
    commonName: 'Cangrejo de Mar Profundo',
    scientificName: 'Chaceon quinquedens',
    rarity: 'common',
    depth: '3000m',
    size: '15-20cm',
    habitat: 'Fondos arenosos y rocosos abisales',
    diet: 'Omnívoro - detritos, moluscos pequeños',
    description: 'Cangrejo de aguas profundas con caparazón rojizo. Adaptado a la vida abisal.',
    discoveryPoints: 10,
    funFact: 'Pueden vivir hasta 20 años y mudar su caparazón múltiples veces en las profundidades.',
    conservation: 'Preocupación menor',
    model: 'seacrab.glb'
  },
  
  'Caracol Marino': {
    id: 'Caracol Marino',
    commonName: 'Caracol Marino Abisal',
    scientificName: 'Bathyspira gordaensis',
    rarity: 'common',
    depth: '3000m',
    size: '3-5cm',
    habitat: 'Sedimentos blandos del fondo marino abisal',
    diet: 'Detritívoro - materia orgánica en descomposición',
    description: 'Pequeño caracol de concha espiral perfectamente adaptado a las profundidades abisales.',
    discoveryPoints: 15,
    funFact: 'Su concha puede soportar presiones extremas de 300 atmosferas a 3000m de profundidad.',
    conservation: 'Estable',
    model: 'Snail.glb'
  },
  
  'Pepino de Mar': {
    id: 'Pepino de Mar',
    commonName: 'Pepino de Mar Gigante',
    scientificName: 'Psychropotes longicauda',
    rarity: 'uncommon',
    depth: '3000m',
    size: '30-50cm',
    habitat: 'Llanuras abisales de sedimento fino a 3000m',
    diet: 'Detritívoro - sedimento orgánico del fondo abisal',
    description: 'Equinodermo de gran tamaño que habita exclusivamente las profundidades abisales de 3000 metros.',
    discoveryPoints: 25,
    funFact: 'A 3000m puede procesar hasta 200g de sedimento por día, actuando como "aspiradora" del fondo marino.',
    conservation: 'Vulnerable - sensible al cambio climático',
    model: 'seacucumber.glb'
  }
};

export const getRarityInfo = (rarity) => {
  const rarityData = {
    common: {
      label: 'Común',
      color: '#4caf50',
      probability: '60%',
      description: 'Especie frecuente en su hábitat'
    },
    uncommon: {
      label: 'Poco Común',
      color: '#2196f3',
      probability: '25%',
      description: 'Especie con población limitada'
    },
    rare: {
      label: 'Raro',
      color: '#9c27b0',
      probability: '12%',
      description: 'Especie difícil de encontrar'
    },
    legendary: {
      label: 'Legendario',
      color: '#ff9800',
      probability: '3%',
      description: 'Especie extremadamente rara'
    }
  };
  
  return rarityData[rarity] || rarityData.common;
};

// Función para obtener especies por profundidad
export const getSpeciesByDepth = (currentDepth) => {
  return Object.values(speciesDatabase).filter(species => {
    const [minDepth] = species.depth.split('-').map(d => parseInt(d.replace('m', '')));
    return currentDepth >= minDepth;
  });
};