export default function AchievementsModal({ isOpen, onClose, playerStats }) {
  if (!isOpen) return null;

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
        maxWidth: '500px',
        width: '90%'
      }}>
        <h2>Logros</h2>
        <p>¡Explora el océano para desbloquear logros!</p>
        <p>Especies descubiertas: {playerStats?.speciesDiscovered || 0}/3</p>
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