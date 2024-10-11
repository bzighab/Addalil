// Overlay.tsx
import React from "react";
import "../Overlay.css";

const Overlay: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <p className="blinking-text">{message}</p>
      </div>
    </div>
  );
};

export default Overlay;
