"use client";

import Image from "next/image";
import { useState } from "react";
import Loader from "../Loader";

interface Brand {
  id: string | number;
  image: string;
}

interface BrandsProps {
  brands?: Brand[];
}

const Brands = ({ brands = [] }: BrandsProps) => {
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const cardsToShow = 5; // একসাথে কতটা দেখাবে
  const totalBrands = brands.length;

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev - cardsToShow < 0 ? Math.max(totalBrands - cardsToShow, 0) : prev - cardsToShow
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + cardsToShow >= totalBrands ? 0 : prev + cardsToShow
    );
  };

  if (!brands || brands.length === 0) return null;

  const visibleBrands = brands.slice(startIndex, startIndex + cardsToShow);

  return (
    <>
      {loading && <Loader />}
      <section
        style={{
          padding: "40px 0",
          background: "#fffcfc",
          textAlign: "center",
        }}
      >
        {/* Title & Subtitle */}
        <div style={{ marginBottom: "40px" }}>
          <h2 className="animated-title">
            Our Featured Brands
          </h2>
          <p className="animated-subtitle">
            Discover quality and style from brands we trust
          </p>
        </div>

        {/* Brand Cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {visibleBrands.map((brand) => (
            <div
              key={brand.id}
              style={{
                flex: "0 0 160px",
                padding: "15px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.8)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src={brand.image || "/noimage.png"}
                alt="brand"
                width={160}
                height={80}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handlePrev}
            style={{
              marginRight: "10px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "none",
              background: "#fff",
              color: "#000",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "none",
              background: "#fff",
              color: "#000",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ▶
          </button>
        </div>
           {/* ===== THEME CSS ===== */}
        <style jsx>{`
          .themed-sale-section {
            padding-top: 60px;
            padding-bottom: 90px;
          }


  .animated-title {
    font-size: 42px;
    font-weight: 900;
    text-transform: uppercase;
    background: linear-gradient(270deg, #4d4d4d, #292222, #222222);
    background-size: 600% 600%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 5s ease infinite;
    margin-bottom: 15px;
    display: inline-block;
    letter-spacing: 1px;
  }

  .animated-subtitle {
    font-size: 17px;
    color: #555;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    position: relative;
    overflow: hidden;
  }

  /* Subtle fade-in animation for subtitle */
  .animated-subtitle::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #000, #444, #000);
    animation: slideLine 2s linear infinite;
  }

  /* ================= ANIMATIONS ================= */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes slideLine {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }

  @media (max-width: 767px) {
    .animated-title {
      font-size: 28px;
    }
    .animated-subtitle {
      font-size: 14px;
      max-width: 90%;
      margin: 0 auto;
    }
  }

          .see-more-btn-theme {
          padding: 14px 42px;
  border-radius: 12px;
  border: none;

  /* Coffee + Ash gradient */
  background: linear-gradient(135deg, #3e2723, #6d6d6d);
  color: #ffffff;

  font-size: 15px;
  font-weight: 600;
  margin-top: 30px;

  cursor: pointer;
  transition: all 0.35s ease;
  box-shadow: 0 10px 24px rgba(62, 39, 35, 0.35);
          }

          .see-more-btn-theme:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
          }

          /* MOBILE ADJUST */
          @media (max-width: 767px) {
            .themed-sale-section {
              padding-top: 40px;
              Margin-left: 15px;
            }

            .sale-title {
              font-size: 24px;
            }

            .sale-subtitle {
              font-size: 14px;
            }

            .see-more-btn-theme {
              padding: 12px 34px;
              font-size: 14px;
              margin-top: 30px;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Brands;
