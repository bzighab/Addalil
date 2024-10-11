import React, { useEffect, useRef } from "react";
import "../assets/css/Ticker.css"; // Assurez-vous que le CSS est bien importé

interface TickerProps {
  title: string;
  items: string[];
}

const Ticker: React.FC<TickerProps> = ({ title, items }) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tickerElement = tickerRef.current;
    if (tickerElement) {
      // Créer une animation pour le défilement
      const animation = tickerElement.animate(
        [
          { transform: "translateX(-100%)" }, // Départ à droite
          { transform: "translateX(100%)" }, // Fin à gauche
        ],
        {
          duration: 60000, // Durée pour le défilement
          iterations: Infinity,
          easing: "linear",
        }
      );

      return () => animation.cancel(); // Annuler l'animation à la désactivation
    }
  }, [items]);

  return (
    <div className="ticker-container">
      <div className="ticker-content" ref={tickerRef}>
        {/* Répéter les éléments pour un défilement fluide */}
        {items.concat(items).map((item, index) => (
          <span key={index} className="ticker-item">
            {item}
          </span>
        ))}
      </div>
      <div className="ticker-title">{title}</div>
    </div>
  );
};

export default Ticker;
