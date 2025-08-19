import Album from './Album';

export default function SpeciesAlbum({ isOpen, onClose, discoveredSpecies = [] }) {
  if (!isOpen) return null;

  return (
    <Album 
      discoveredSpecies={discoveredSpecies} 
      onClose={onClose}
    />
  );
}