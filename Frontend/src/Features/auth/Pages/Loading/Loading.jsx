import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>

      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;