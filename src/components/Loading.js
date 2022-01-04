// Package Import
import React from "react";

// CSS Import
import "../assets/css/loading.css";

function Loading() {
  return (
    // Loading Screen HTML
    <div className="loading_screen">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>
  );
}

export default Loading;
