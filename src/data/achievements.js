export const logros = [
  {
    id: 'first_discovery',
    nombre: 'Primer Contacto',
    descripcion: 'Descubre tu primera especie',
    condicion: (stats) => stats.especies >= 1,
    icono: '🔍'
  },
  {
    id: 'half_catalog',
    nombre: 'Explorador Experimentado',
    descripcion: 'Descubre 2 especies diferentes',
    condicion: (stats) => stats.especies >= 2,
    icono: '📊'
  },
  {
    id: 'master_researcher',
    nombre: 'Maestro Investigador',
    descripcion: 'Completa todo el catálogo (3 especies)',
    condicion: (stats) => stats.especies >= 3,
    icono: '🎓'
  },
  {
    id: 'speed_researcher',
    nombre: 'Investigador Veloz',
    descripcion: 'Descubre las 3 especies en una sesión',
    condicion: (stats) => stats.especiesEnSesion >= 3,
    icono: '⚡'
  },
  {
    id: 'deep_explorer',
    nombre: 'Explorador Abisal',
    descripcion: 'Explora a 3000m de profundidad',
    condicion: (stats) => stats.profundidadMax >= 3000,
    icono: '🌊'
  },
  {
    id: 'persistent_explorer',
    nombre: 'Explorador Persistente',
    descripcion: 'Completa 3 sesiones de buceo',
    condicion: (stats) => stats.sesionesCompletadas >= 3,
    icono: '🏊'
  },
  {
    id: 'quick_discoverer',
    nombre: 'Descubridor Rápido',
    descripcion: 'Descubre una especie en menos de 10 segundos',
    condicion: (stats) => stats.descubrimientoRapido,
    icono: '💨'
  },
  {
    id: 'session_veteran',
    nombre: 'Veterano de las Profundidades',
    descripcion: 'Completa 5 sesiones de buceo',
    condicion: (stats) => stats.sesionesCompletadas >= 5,
    icono: '🏆'
  }
];

export const getProgressText = (logro, stats) => {
  switch (logro.id) {
    case 'half_catalog':
      return `${Math.min(stats.especies, 2)}/2 especies`;
    case 'master_researcher':
      return `${Math.min(stats.especies, 3)}/3 especies`;
    case 'speed_researcher':
      return `${Math.min(stats.especiesEnSesion || 0, 3)}/3 especies`;
    case 'deep_explorer':
      return `${Math.min(stats.profundidadMax || 0, 3000)}/3000m`;
    case 'persistent_explorer':
      return `${Math.min(stats.sesionesCompletadas || 0, 3)}/3 sesiones`;
    case 'session_veteran':
      return `${Math.min(stats.sesionesCompletadas || 0, 5)}/5 sesiones`;
    default:
      return null;
  }
};