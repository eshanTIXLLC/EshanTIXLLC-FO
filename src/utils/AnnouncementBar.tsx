// AnnouncementBar.tsx
"use client";
import React from "react";

const AnnouncementBar = () => {
  const barStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "40px", // fixed height
    backgroundColor: "red",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "1rem",
    zIndex: 9999, // above everything
  };

  return <div style={barStyle}>Buy over $50 & get FREE shipping across the USA</div>;
};

export default AnnouncementBar;
