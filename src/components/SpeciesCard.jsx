import { useState } from "react";
import { getCreatureById } from "../config/creatureTypes";
import "./SpeciesCard.css";

const SPECIES_DATA = {
  seacrab: {
    scientificName: "Chaceon sp.",
    group: "Crustáceos ",
    depth: "Desde 450 hasta más de 2000 metros",
    size: "15 cm de caparazon",
    diet: "Carroñero y depredador (come restos y caza pequeños animales)",
    funFact: 'Para crecer, debe "quitarse" su caparazón viejo y duro, como si se sacara una armadura que le queda chica. Debajo ya tiene una nueva, que al principio es blanda.',
    backTitle: "¡Un explorador blindado del fondo marino!",
    backContent: [
      "El Cangrejo de Profundidad es un verdadero tanque del océano. Vive en los fondos fangosos o rocosos, donde camina con sus largas y fuertes patas. Su caparazón (llamado exoesqueleto) lo protege de los depredadores y de la enorme presión que hay a cientos de metros de profundidad.",
      "Es un personaje muy importante en su ecosistema, ya que es un oportunista y un gran limpiador. Con sus poderosas pinzas, puede romper conchas de otros animales para alimentarse o simplemente se dedica a comer los restos de animales más grandes que caen al fondo. Gracias a su trabajo, el fondo marino se mantiene limpio y los nutrientes se reciclan.",
      "Sus ojos pequeños están adaptados a la poca o nula luz, por lo que utiliza principalmente su sentido del olfato y el tacto para encontrar comida en la oscuridad.",
    ],
  },
  snail: {
    scientificName: "Austromegabalanus sp.",
    group: "Moluscos ",
    depth: "Desde 50 hasta 1000 metros",
    size: "8 cm",
    diet: "Depredador (caza pequeños caracoles y otros invertebrados)",
    funFact: "Aunque se mueve muy lento, su boca (llamada rádula) tiene miles de 'dientecitos' para raspar y perforar conchas de otros animales. ¡Es como un taladro natural!",
    backTitle: "¡Un cazador silencioso del fondo!",
    backContent: [
      "El caracol de mar 'Gary' fue una de las sorpresas encontradas por el CONICET en la expedición a las profundidades de Mar del Plata. Este animal no se desliza sin rumbo; es un verdadero depredador que vive en los fondos rocosos y arenosos, donde busca a su próxima comida.",
      "A pesar de su apariencia tranquila, 'Gary' es un maestro de la paciencia y la estrategia. Para alimentarse, utiliza su rádula, una especie de lengua con dientes, para perforar las conchas de sus presas. Una vez que hace un agujero, introduce una sustancia que disuelve a la víctima para poder alimentarse.",
      "Aunque su ritmo es pausado, 'Gary' es un eslabón importante en su ecosistema. Al controlar las poblaciones de caracoles más pequeños, ayuda a mantener el equilibrio natural de su hogar. Este animal es un recordatorio de que en las profundidades de nuestro mar, incluso las criaturas más lentas tienen un papel vital en el gran ecosistema marino.",
    ],
  },
  seacucumber: {
    scientificName: "Benthodytes sp.",
    group: "Equinodermos",
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
              <img src={`/img/${creatureType}.png`} alt={creatureInfo.name} className="creature-img" />
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
