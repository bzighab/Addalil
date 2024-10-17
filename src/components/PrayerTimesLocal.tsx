import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "./Overlay"; // Import the Overlay component
import "../App.css"; // Make sure to create or update this CSS file
import moment from "moment-hijri";

import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

interface PrayerTimesProps {
  onPrayerTimeMatch: () => void; // Function passed from App to trigger the overlay
}

const PrayerTimesLocal: React.FC<PrayerTimesProps> = ({
  onPrayerTimeMatch,
}) => {
  const hijriDate = moment().format("iYYYY/iM/iD"); // Format the Hijri date
  const [timeString, setTimeString] = useState("");
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string>>({}); // State to hold prayer times
  const [playedPrayers, setPlayedPrayers] = useState<string[]>([]); // Track played prayers
  const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility
  const currentTimeGregorie: Date = new Date();
  const day: number = currentTimeGregorie.getDate(); // Returns the day (1-31)
  // Get the month (Note: getMonth() returns 0 for January, so add 1)
  const month: number = currentTimeGregorie.getMonth() + 1; // Returns the month (1-12)

  // Get the year
  const year: number = currentTimeGregorie.getFullYear();
  const hijriMonths: { [key: number]: string } = {
    1: "محرم",
    2: "صفر",
    3: "ربيع الأول",
    4: "ربيع الثاني",
    5: "جمادى الأولى",
    6: "جمادى الثانية",
    7: "رجب",
    8: "شعبان",
    9: "رمضان",
    10: "شوال",
    11: "ذو القعدة",
    12: "ذو الحجة",
  };
  const gregorianMonths: { [key: number]: string } = {
    1: "جانفي",
    2: "فيفري",
    3: "مارس",
    4: "أفريل",
    5: "ماي",
    6: "جوان",
    7: "جويلية",
    8: "أوت",
    9: "سبتمبر",
    10: "أكتوبر",
    11: "نوفمبر",
    12: "ديسمبر",
  };

  const arabicWeekDays: string[] = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  // Fetch prayer times from the Adhan API
  const fetchPrayerTimes = async () => {
    try {
      const coordinates = new Coordinates(36.28639, 7.95111); // Alger

      const params = CalculationMethod.Tehran();
      const date = new Date();
      const prayerAlger = new PrayerTimes(coordinates, date, params);

      console.log(prayerAlger);

      /*  const response = await axios.get(
        "http://api.aladhan.com/v1/timingsByCity/2024-10-07?city=London&country=UK"
      );
      setPrayerTimes(response.data.data.timings); */ // Update state with fetched prayer times */
      setPrayerTimes({
        Fajr: "15:20", // Change this to a time that is a few minutes from now
        Dhuhr: "15:30",
        Asr: "15:45",
        Maghrib: "20:45",
        Isha: "19:23",
        Sunrise: "20:44 ",
      });
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
        const formattedPrayerTime = "09:37:00"; // Format time for comparison

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
          message="حَانَ الآنَ وَقْتُ صَلَاةِ العَصْرِ فِي مَدِينَةِ الزَّعْرُورِيَّةِ وَمَا جَاوَرَهَا"
          onClose={() => setShowOverlay(false)} // Close the overlay when clicked
        />
      )}
      <div className="header">
        <h1>مسجد الرحمـــٰن ـ الزعرورية</h1>
        <h2>
          <div className="hijri-date">
            <span className="muwafik">الموافق لـ</span>
            <span className="Hijri-year">{moment().format("iYYYY")}</span>
            <span className="Hijri-month">
              {hijriMonths[moment().format("iM")]}
            </span>
            <span className="Hijri-day">{moment().format("iD")}</span>
            <span className="day-of-Week">
              {arabicWeekDays[currentTimeGregorie.getDay()]}
            </span>
          </div>
          <div className="gregorian-date">
            <span className="gregorian-year">{year}</span>
            <span className="gregorian-month">{gregorianMonths[month]}</span>
            <span className="gregorian-day">{day}</span>
          </div>
        </h2>
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

export default PrayerTimesLocal;
