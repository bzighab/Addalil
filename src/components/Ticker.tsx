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
          duration: 600000, // Durée pour le défilement
          iterations: Infinity,
          easing: "linear",
        }
      );

      return () => animation.cancel(); // Annuler l'animation à la désactivation
    }
  }, [items]);

  return (
    <div className="footer">
      <div className="ticker-title">أحاديث نبوية</div>
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker__item">
            {" "}
            " - أَخْبَرَنَا قُتَيْبَةُ بْنُ سَعِيدٍ، قَالَ حَدَّثَنَا سُفْيَانُ،
            عَنِ الزُّهْرِيِّ، عَنْ أَبِي سَلَمَةَ، عَنْ أَبِي هُرَيْرَةَ، أَنَّ
            النَّبِيَّ صلى الله عليه وسلم قَالَ إِذَا اسْتَيْقَظَ أَحَدُكُمْ
            مِنْ نَوْمِهِ فَلاَ يَغْمِسْ يَدَهُ فِي وَضُوئِهِ حَتَّى يَغْسِلَهَا
            ثَلاَثًا فَإِنَّ أَحَدَكُمْ لاَ يَدْرِي أَيْنَ بَاتَتْ يَدُهُ",
          </div>
          <div className="ticker__item">
            " - عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ عَنِ النَّبِيِّ صلى الله
            عليه وسلم قَالَ الإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ
            شُعْبَةٌ مِنَ الإِيمَانِ " - ,
          </div>
          <div className="ticker__item">
            {" "}
            " - عَنْ أَبِي هُرَيْرَةَ، عَنْ رَسُولِ اللَّهِ صلى الله عليه وسلم
            أَنَّهُ قَالَ 'سَيَكُونُ فِي آخِرِ أُمَّتِي أُنَاسٌ يُحَدِّثُونَكُمْ
            مَا لَمْ تَسْمَعُوا أَنْتُمْ وَلاَ آبَاؤُكُمْ فَإِيَّاكُمْ
            وَإِيَّاهُمْ ", -
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
