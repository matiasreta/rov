import { useState } from "react";
import { getCreatureById } from "../config/creatureTypes";
import "./SpeciesCard.css";

const SPECIES_DATA = {
  seacrab: {
    scientificName: "Chionoecetes sp.",
    group: "Crustáceos (¡Artrópodos marinos!)",
    depth: "50 - 200 metros",
    size: "10 - 15 cm",
    diet: "Omnívoro (algas y pequeños invertebrados)",
    funFact: "Sus patas pueden regenerarse si las pierde en una pelea. ¡Es como tener superpoderes de curación!",
    backTitle: "¡El constructor de las profundidades! 🏗️",
    backContent: [
      "El Cangrejo de Mar vive en un mundo donde cada roca puede ser su hogar y cada grieta una fortaleza. 🏰",
      "Con sus potentes pinzas, no solo caza sino que también construye y modifica su entorno, moviendo rocas y creando refugios.",
      "Es un ingeniero nato: construye madrigueras elaboradas y puede apilar rocas para crear muros protectores.",
      "Su caparazón duro lo protege de depredadores, pero también lo convierte en el 'tanque' del ecosistema marino, defendiendo territorio con valentía.",
    ],
  },
  snail: {
    scientificName: "Turritella sp.",
    group: "Moluscos (¡Primos de los pulpos!)",
    depth: "10 - 300 metros",
    size: "3 - 8 cm",
    diet: "Herbívoro (algas y biofilm)",
    funFact: "Su concha en espiral sigue una secuencia matemática perfecta llamada 'proporción áurea'. ¡Es pura geometría natural!",
    backTitle: "¡El matemático de las profundidades! 📐",
    backContent: [
      "El Caracol Marino lleva su hogar a cuestas, una concha que crece siguiendo patrones matemáticos perfectos. 🏠",
      "Su rádula (lengua raspadora) tiene miles de dientes microscópicos que usa como papel de lija para raspar algas de las rocas.",
      "Es un filtrador nato: cuando se siente amenazado, se retrae completamente en su concha y puede permanecer cerrado por horas.",
      "Su movimiento lento pero constante lo convierte en el 'jardinero' del océano, limpiando superficies y manteniendo el ecosistema equilibrado.",
    ],
  },
  seacucumber: {
    scientificName: "Benthodytes sp.",
    group: "Equinodermos (¡Pariente de las estrellas de mar!)",
    depth: "Más de 1500 metros",
    size: "15 - 25 cm",
    diet: "Detritívoro (come restos orgánicos)",
    funFact: "Aunque parece blandito, su cuerpo está lleno de pequeños 'huesitos' u osículos que le dan estructura. ¡Es como si tuviera un esqueleto desarmado por dentro!",
    backTitle: "¡Un limpiador de las profundidades! 🧼",
    backContent: [
      "El Pepino de Mar 'Batatita' vive en un mundo de oscuridad total y muchísima presión, ¡imagina tener el peso de más de 150 colectivos encima! 🚌",
      "Al no llegar la luz del sol, no hay plantas, por lo que su comida es la 'nieve marina': una lluvia constante de restos de animales, plancton y otros nutrientes que caen desde la superficie.",
      "Al comerse estos desechos, el 'Batatita' cumple un rol fundamental: ¡es el gran reciclador del océano profundo! Limpia el fondo marino y devuelve los nutrientes al ecosistema.",
      "Es un animal tranquilo y lento, que se arrastra por el suelo oceánico como una aspiradora submarina, asegurando que nada se desperdicie en las misteriosas profundidades.",
    ],
  },
};

export default function SpeciesCard({ creatureType, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const creatureInfo = getCreatureById(creatureType);
  const speciesData = SPECIES_DATA[creatureType];

  if (!creatureInfo || !speciesData) {
    return null;
  }

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-overlay" onClick={onClose}>
      <div className="card-container" onClick={(e) => e.stopPropagation()}>
        <div className={`species-card ${isFlipped ? "flipped" : ""}`} onClick={handleCardClick}>
          {/* Frente de la carta */}
          <div className="card-face card-front">
            <div className="card-header">
              <div className="creature-name">{creatureInfo.name}</div>
              <div className="scientific-name">{speciesData.scientificName}</div>
            </div>

            <div className="creature-image">
              <img src={`/src/assets/img/${creatureType}.png`} alt={creatureInfo.name} className="creature-img" />
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-label">🌟 Grupo:</span>
                {speciesData.group}
              </div>
              <div className="stat-item">
                <span className="stat-label">🌊 Profundidad:</span>
                {speciesData.depth}
              </div>
              <div className="stat-item">
                <span className="stat-label">📏 Tamaño:</span>
                {speciesData.size}
              </div>
              <div className="stat-item">
                <span className="stat-label">🍽️ Alimentación:</span>
                {speciesData.diet}
              </div>
            </div>

            <div className="fun-fact">
              <strong>Dato Curioso:</strong> {speciesData.funFact}
            </div>
          </div>

          {/* Dorso de la carta */}
          <div className="card-face card-back">
            <div className="back-header">
              <div className="back-title">{speciesData.backTitle}</div>
            </div>

            <div className="back-content">
              {speciesData.backContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="card-instructions">
          <p>🖱️ Haz clic en la carta para voltearla</p>
          <p>❌ Haz clic fuera para cerrar</p>
        </div>
      </div>
    </div>
  );
}
