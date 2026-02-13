// AnnouncementBar.tsx
"use client";
import React from "react";

const AnnouncementBar = () => {
  const barStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "40px",
    backgroundColor: "red",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "1rem",
    zIndex: 9999,
    whiteSpace: "nowrap",     // prevent wrapping
    overflow: "hidden",       // hide overflow
    textOverflow: "ellipsis", // optional: show "..." if it overflows
    padding: "0 10px",        // optional: small horizontal padding
  };

  return (
    <div style={barStyle}>
      BUY OVER 100$ & GET FREE SHIPPING ACROSS IN USA
    </div>
  );
};

export default AnnouncementBar;
