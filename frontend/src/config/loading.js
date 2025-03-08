import React from "react";
// import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="dots-spinner">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{ transform: `rotate(${i * 30}deg) translate(20px)` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
