export default function SpeciesAlbum({ isOpen, onClose, discoveredSpecies = [] }) {
  if (!isOpen) return null;

  const allSpecies = [
    { name: 'Caracol Marino', discovered: discoveredSpecies.includes('Caracol Marino') },
    { name: 'Cangrejo de Mar', discovered: discoveredSpecies.includes('Cangrejo de Mar') },
    { name: 'Pepino de Mar', discovered: discoveredSpecies.includes('Pepino de Mar') }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#001122',
        padding: '2rem',
        borderRadius: '10px',
        color: 'white',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80%',
        overflow: 'auto'
      }}>
        <h2>Álbum de Especies</h2>
        <div style={{ marginBottom: '1rem' }}>
          {allSpecies.map((species, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                margin: '0.5rem 0',
                backgroundColor: species.discovered ? '#004466' : '#333',
                borderRadius: '5px'
              }}
            >
              <span style={{ marginRight: '1rem', fontSize: '2rem' }}>
                {species.discovered ? '🐚' : '❓'}
              </span>
              <span>{species.discovered ? species.name : '???'}</span>
            </div>
          ))}
        </div>
        <button 
          onClick={onClose}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0088cc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}