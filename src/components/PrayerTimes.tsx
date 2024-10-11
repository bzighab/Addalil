import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "./Overlay"; // Import the Overlay component
import "../App.css"; // Make sure to create or update this CSS file

interface PrayerTimesProps {
  onPrayerTimeMatch: () => void; // Function passed from App to trigger the overlay
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ onPrayerTimeMatch }) => {
  const [timeString, setTimeString] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string>>({}); // State to hold prayer times
  const [playedPrayers, setPlayedPrayers] = useState<string[]>([]); // Track played prayers
  const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility

  // Fetch prayer times from the Adhan API
  const fetchPrayerTimes = async () => {
    try {
      const response = await axios.get(
        "http://api.aladhan.com/v1/timingsByCity/2024-10-07?city=London&country=UK"
      );
      setPrayerTimes(response.data.data.timings); // Update state with fetched prayer times */
      /*  setPrayerTimes({
        Fajr: "15:20", // Change this to a time that is a few minutes from now
        Dhuhr: "15:30",
        Asr: "15:45",
        Maghrib: "20:45",
        Isha: "19:23",
        Sunrise: "20:44 ",
      }); */
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  // Fetch prayer times on component mount
  useEffect(() => {
    fetchPrayerTimes();
  }, []); // Empty dependency array to run only once

  // Check prayer times every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTimeString(currentTime);

      // Check if it's time for Adhan and prevent playing it multiple times
      Object.entries(prayerTimes).forEach(([key, time]) => {
        // const formattedPrayerTime = ${time}:00; // Format time for comparison
        const formattedPrayerTime = "00:32:00"; // Format time for comparison

        if (
          currentTime === formattedPrayerTime &&
          !playedPrayers.includes(key)
        ) {
          onPrayerTimeMatch(); // Trigger overlay in App component
          setPlayedPrayers((prev) => [...prev, key]); // Mark this prayer as played
          setShowOverlay(true); // Show overlay when it's time for Adhan
          setTimeout(() => setShowOverlay(false), 12000000); // Hide overlay after 2 minutes
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [prayerTimes, playedPrayers, onPrayerTimeMatch]);

  return (
    <div className="container">
      {showOverlay && (
        <Overlay
          message="عن عثمان بن عفان رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم:
«مَنْ تَوَضَّأَ فَأَحْسَنَ الْوُضُوءَ خَرَجَتْ خَطَايَاهُ مِنْ جَسَدِهِ حَتَّى تَخْرُجَ مِنْ تَحْتِ أَظْفَارِهِ».  
[صحيح] - [رواه مسلم] - [صحيح مسلم - 245] - - -

الشرح:
يُخْبِرُ النبيُّ صلى الله عليه وسلم أنَّ مَن توضَّأ مع مُراعاةِ سُننِ الوضوء وآدابِه، كان ذلك من أسبابِ تكفيرِ السيئات وحَطِّ الخطايا، «حتى تخرج» ذنوبُه من تحت أظفار يديه ورجليه"
          onClose={() => setShowOverlay(false)} // Close the overlay when clicked
        />
      )}
      <div className="header">
        <h1>مسجد الرحمـــٰن ـ الزعرورية</h1>
        <h2>{new Date().toLocaleDateString()}</h2>
      </div>
      <div className="top-row">
        <div className="jumua">
          <h3>الجمعة</h3>
          <p>12:30</p>
        </div>
        <div className="current-time">
          <h3>الوقت الحالي</h3>
          <p>{timeString}</p>
        </div>
        <div className="shuruk">
          <h3>الشروق</h3>
          <p>{prayerTimes.Sunrise || "Loading..."}</p>
        </div>
      </div>
      <div className="prayers">
        <div className="prayer">
          <h3>العشاء</h3>
          <p>{prayerTimes.Isha || "Loading..."}</p>
        </div>
        <div className="prayer">
          <h3>المغرب</h3>
          <p>{prayerTimes.Maghrib || "Loading..."}</p>
        </div>
        <div className="prayer">
          <h3>العصر</h3>
          <p>{prayerTimes.Asr || "Loading..."}</p>
        </div>
        <div className="prayer">
          <h3>الظهر</h3>
          <p>{prayerTimes.Dhuhr || "Loading..."}</p>
        </div>
        <div className="prayer">
          <h3>الفجر</h3>
          <p>{prayerTimes.Fajr || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
