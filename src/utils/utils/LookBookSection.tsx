"use client";

import React, { useEffect, useState } from "react";

export default function LookBookSection() {
  const looks = [
    {
      title: "Streetwear Vibes",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    },
    {
      title: "Modern Winter Fit",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200",
    },
    {
      title: "Casual Everyday Look",
      img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1200",
    },
    {
      title: "Minimal Aesthetic",
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
    },
    {
      title: "Classy & Urban",
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200",
    },
    {
      title: "Premium Outfit",
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
    },
  ];

  // generate snowflakes config
  const [flakes, setFlakes] = useState<
    { left: number; size: number; duration: number; delay: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const count = 60;
    const arr = Array.from({ length: count }).map(() => ({
      left: Math.random() * 100, // percentage
      size: 1.5 + Math.random() * 5, // px
      duration: 4 + Math.random() * 6, // seconds
      delay: Math.random() * 5, // seconds
      opacity: 0.4 + Math.random() * 0.6,
    }));
    setFlakes(arr);
  }, []);

  const sectionStyle: React.CSSProperties = {
    padding: "70px 20px",
    backgroundColor: "#000", // black theme
    color: "#fff",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: 800,
    marginBottom: "10px",
    letterSpacing: "-1px",
    color: "#fff",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "16px",
    maxWidth: "650px",
    margin: "0 auto 40px auto",
    opacity: 0.8,
    lineHeight: 1.6,
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gap: "18px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1, // cards above background but below text layer z=3
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: "18px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.45s ease, box-shadow 0.45s ease",
    willChange: "transform",
    background: "#111", // ensure no white flashes
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    transition: "transform 0.6s ease",
    display: "block",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "18px 12px",
    background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: ".5px",
    zIndex: 3, // ensure overlay text over snow
  };

  // Snow container style (cover entire section)
  const snowContainerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 2, // below overlay (z=3) but above images (grid z=1)
    overflow: "hidden",
  };

  const keyframes = `
    @keyframes snowFall {
      0% { transform: translateY(-10vh) rotate(0deg); opacity: 0.95; }
      100% { transform: translateY(110vh) rotate(360deg); opacity: 0.2; }
    }
    @keyframes lookHoverZoom {
      to { transform: scale(1.12); }
    }
    @media (max-width: 640px) {
      .look-image {
        height: 220px !important;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>

      <section style={sectionStyle}>
        <h2 style={titleStyle}>LookBook – Style Inspiration</h2>
        <p style={subtitleStyle}>
          Explore premium outfit styles curated just for you. Upgrade your vibe with modern fashion inspiration.
        </p>

        {/* snow overlay */}
        <div style={snowContainerStyle}>
          {flakes.map((f, i) => {
            const flakeStyle: React.CSSProperties = {
              position: "absolute" as any,
              top: "-5vh",
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              background: `rgba(255,255,255,${f.opacity})`,
              borderRadius: "50%",
              filter: "blur(0.6px)",
              transform: "translateY(0)",
              animation: `snowFall ${f.duration}s linear infinite`,
              animationDelay: `${f.delay}s`,
            };
            return <div key={i} style={flakeStyle} />;
          })}
        </div>

        <div style={gridStyle}>
          {looks.map((look, i) => (
            <div
              key={i}
              style={cardStyle}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-8px)";
                const img = el.querySelector("img") as HTMLImageElement | null;
                if (img) img.style.transform = "scale(1.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                const img = el.querySelector("img") as HTMLImageElement | null;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img className="look-image" src={look.img} alt={look.title} style={imageStyle} />
              <div style={overlayStyle}>{look.title}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
