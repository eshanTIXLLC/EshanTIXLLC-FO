"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ClothBanner = () => {
  const router = useRouter();

  const banner: React.CSSProperties = {
    width: "100%", // full width
    height: "auto",
    aspectRatio: "1536 / 1024", // maintain your image ratio
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/banner.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover", // full banner hero look
    maxWidth: "100%",
  };

  const button: React.CSSProperties = {
    padding: "16px 40px",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#000",
    background: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "2px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    transition: "all 0.3s ease",
    zIndex: 2,
  };

  return (
    <div style={banner}>
      <button
        style={button}
        onClick={() => router.push("/shop")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Shop Now
      </button>
    </div>
  );
};

export default ClothBanner;