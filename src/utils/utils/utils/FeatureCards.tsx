"use client";

import { Shirt, Star, Truck, Gift, Heart, Percent } from "lucide-react";

export default function ClothFeatures() {
  const features = [
    {
      title: "Premium Clothing",
      description: "Stylish & comfortable outfits crafted from high-quality fabrics.",
      icon: <Shirt size={28} strokeWidth={1.5} />,
    },
    {
      title: "Top Rated",
      description: "Thousands of satisfied customers with excellent experiences.",
      icon: <Star size={28} strokeWidth={1.5} />,
    },
    {
      title: "Fast Delivery",
      description: "Quick & secure delivery with careful packaging.",
      icon: <Truck size={28} strokeWidth={1.5} />,
    },
    {
      title: "Gift Ready",
      description: "Beautiful gift packaging available for special occasions.",
      icon: <Gift size={28} strokeWidth={1.5} />,
    },
    {
      title: "Best Sellers",
      description: "Our most loved and trending fashion selections.",
      icon: <Heart size={28} strokeWidth={1.5} />,
    },
    {
      title: "Exclusive Deals",
      description: "Special discounts & offers updated regularly.",
      icon: <Percent size={28} strokeWidth={1.5} />,
    },
  ];

  // Card Style
  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, #ffffff, #e3e3e3)",
    borderRadius: "20px",
    padding: "28px 20px",
    boxShadow: "10px 10px 20px rgba(0,0,0,0.08), -10px -10px 20px #ffffff",
    transition: "all 0.3s ease",
    cursor: "pointer",
    textAlign: "center",
  };

  const iconStyle: React.CSSProperties = {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "#ff6b6b",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    margin: "0 auto 16px auto",
    boxShadow: "4px 4px 10px rgba(0,0,0,0.12)",
    transition: "all 0.3s ease",
  };

  const responsiveCSS = `
    @media (max-width: 768px) {
      .feature-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (min-width: 769px) {
      .feature-grid {
        grid-template-columns: repeat(6, 1fr) !important;
      }
    }
    .feature-card:hover {
      transform: translateY(-6px) scale(1.03);
    }
    .feature-card:hover .icon-box {
      transform: scale(1.12);
    }
  `;

  return (
    <>
      <style>{responsiveCSS}</style>

      <section style={{ backgroundColor: "#F5F5F7", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          
          {/* Header */}
          <h2
            style={{
              fontSize: "34px",
              fontWeight: 700,
              color: "#2D2D2D",
              marginBottom: "10px",
              letterSpacing: "-0.5px",
            }}
          >
            Enhance Your Style With  
            <span style={{ color: "#ff6b6b" }}> Premium Fashion</span>
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#6A6A6A",
              marginBottom: "40px",
              lineHeight: 1.6,
              maxWidth: "650px",
              marginInline: "auto",
            }}
          >
            Shop high-quality clothing with confidence. Stylish, modern, and always comfortable.
          </p>

          {/* 6 Feature Cards */}
          <div
            className="feature-grid"
            style={{
              display: "grid",
              gap: "26px",
              gridTemplateColumns: "repeat(6, 1fr)", // Desktop default
            }}
          >
            {features.map((item, index) => (
              <div key={index} className="feature-card" style={cardStyle}>
                <div className="icon-box" style={iconStyle}>
                  {item.icon}
                </div>

                <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "10px", color: "#2D2D2D" }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "14px", color: "#6A6A6A", lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
