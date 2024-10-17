// Overlay.tsx
import React from "react";
import "../Overlay.css";
import muathinImage from "../assets/images/muathin.png"; // Adjust the path to your image

const Overlay: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <img src={muathinImage} alt="Mu'athin" className="muathin-image" />
        <p className="blinking-text">{message}</p>
      </div>
    </div>
  );
};

export default Overlay;
