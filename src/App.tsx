import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import "./assets/fonts/fonts.css"; // Import the font CSS
import PrayerTimes from "./components/PrayerTimesLocal";
import Ticker from "./components/Ticker"; // Import du composant Ticker
import moment from "moment-hijri";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hijriDate = moment().format("iYYYY/iM/iD"); // Format the Hijri date

  // List of video paths
  const videoList = [
    "src/assets/video/15445535-uhd_3840_2160_25fps.mp4",
    "src/assets/video/15143647-uhd_3840_2160_30fps.mp4",
    "src/assets/video/2867874-uhd_3840_2160_24fps.mp4",
    "src/assets/video/15445540-uhd_3840_2160_25fps.mp4",
    "src/assets/video/16555148-uhd_2560_1440_50fps.mp4",
    "src/assets/video/4755514-uhd_3840_2160_25fps.mp4",
    "src/assets/video/5087985-uhd_3840_2160_25fps.mp4",
    "src/assets/video/7304302-uhd_4096_2160_30fps.mp4",
    "src/assets/video/6566722-hd_1920_1080_30fps.mp4",
    "src/assets/video/12762154-uhd_3840_2160_25fps.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility
  const [isAudioInitialized, setIsAudioInitialized] = useState(false); // Track audio initialization

  // Function to switch video every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % videoList.length;
        console.log("Switching to video index:", nextIndex); // Diagnostic log
        return nextIndex;
      });
    }, 60000); // Switch video every 60 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  // Apply slow motion to the video
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = 0.2; // Play the video at half speed
      videoElement.load(); // Load the new video
    }
  }, [currentVideoIndex]);

  // Hide the overlay after 2 minutes when a prayer time is reached
  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 120000); // 2 minutes = 120,000 ms
      return () => clearTimeout(timer);
    }
  }, [showOverlay]);

  // Function to show overlay when prayer time matches
  const handlePrayerTimeMatch = () => {
    setShowOverlay(true);
  };

  // Function to initialize audio playback
  const initializeAudio = () => {
    setIsAudioInitialized(true); // Set audio initialized state
  };

  // Exemple de données pour la bande défilante
  const tickerTitle = " أحاديث نبوية";
  /* const tickerItems = [
    "ندعوكم لحضور صلاة الاستسقاء يوم الاثنين عند الساعة السابعة صباحًا في مسجدنا. يرجى الحضور مبكرًا.",
    "سيُعقد درس في العقيدة يوم الأربعاء مع الشيخ صالح في مسجدنا. الجميع مدعو للحضور.",
    "نرحب بكم لحضور درس تفسير القرآن الكريم مع الشيخ محمد يوم الخميس في مسجدنا.",
    "غداً يوم الجمعة، نذكركم بجمع التبرعات لمسجد النصر - تاورة. جزاكم الله خيراً.",
  ]; */

  const tickerItems = [
    "أَخْبَرَنَا قُتَيْبَةُ بْنُ سَعِيدٍ، قَالَ حَدَّثَنَا سُفْيَانُ، عَنِ الزُّهْرِيِّ، عَنْ أَبِي سَلَمَةَ، عَنْ أَبِي هُرَيْرَةَ، أَنَّ النَّبِيَّ صلى الله عليه وسلم قَالَ  إِذَا اسْتَيْقَظَ أَحَدُكُمْ مِنْ نَوْمِهِ فَلاَ يَغْمِسْ يَدَهُ فِي وَضُوئِهِ حَتَّى يَغْسِلَهَا ثَلاَثًا فَإِنَّ أَحَدَكُمْ لاَ يَدْرِي أَيْنَ بَاتَتْ يَدُهُ",

    "عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ  الإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ '.",

    "عَنْ أَبِي هُرَيْرَةَ، عَنْ رَسُولِ اللَّهِ صلى الله عليه وسلم أَنَّهُ قَالَ 'سَيَكُونُ فِي آخِرِ أُمَّتِي أُنَاسٌ يُحَدِّثُونَكُمْ مَا لَمْ تَسْمَعُوا أَنْتُمْ وَلاَ آبَاؤُكُمْ فَإِيَّاكُمْ وَإِيَّاهُمْ ",
  ];
  return (
    <div className="overlay">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="video-background"
        autoPlay
        loop
        muted
        key={currentVideoIndex}
      >
        <source src={videoList[currentVideoIndex]} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>

      {/* Prayer Times Component */}
      <PrayerTimes onPrayerTimeMatch={handlePrayerTimeMatch} />

      {/* Bande défilante */}
      <Ticker title={tickerTitle} items={tickerItems} />

      {/* Optional button to inform users */}
      {!isAudioInitialized && (
        <button onClick={initializeAudio} className="enable-audio-button">
          Enable Audio
        </button>
      )}
    </div>
  );
}

export default App;
