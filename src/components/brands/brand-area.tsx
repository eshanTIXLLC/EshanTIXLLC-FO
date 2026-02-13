"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
  const [cardsToShow, setCardsToShow] = useState(5); // default desktop

  // Detect screen width to show fewer cards on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(3);
      } else {
        setCardsToShow(5);
      }
    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          padding: "50px 0",
          background: "#fffcfc",
          textAlign: "center",
        }}
      >
        {/* Title & Subtitle */}
        <div style={{ marginBottom: "50px" }}>
          <h2 className="animated-title">
            OUR FEATURED BRANDS
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
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {visibleBrands.map((brand) => (
            <div
              key={brand.id}
              className="brand-card"
            >
              <Image
                src={brand.image || "/noimage.png"}
                alt="brand"
                width={200}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div style={{ marginTop: "25px" }}>
          <button onClick={handlePrev} className="arrow-btn">
            ◀
          </button>
          <button onClick={handleNext} className="arrow-btn">
            ▶
          </button>
        </div>

        {/* ===== THEME CSS ===== */}
        <style jsx>{`
          /* Brand Card Styles */
          .brand-card {
            flex: 0 0 220px;
            padding: 25px;
            border-radius: 20px;
            background: rgba(255,255,255,0.9);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .brand-card:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          }

          /* Arrow Buttons */
          .arrow-btn {
            margin: 0 10px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: none;
            background: #fff;
            color: #000;
            cursor: pointer;
            font-weight: bold;
            font-size: 18px;
            transition: transform 0.2s ease;
          }

          .arrow-btn:hover {
            transform: scale(1.1);
          }

          /* Title & Subtitle */
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

          /* MOBILE VIEW: show 3 cards and smaller size */
          @media (max-width: 767px) {
            .animated-title {
              font-size: 28px;
            }
            .animated-subtitle {
              font-size: 14px;
              max-width: 90%;
              margin: 0 auto;
            }
            .brand-card {
              flex: 0 0 160px; /* original mobile width */
              padding: 15px;    /* original mobile padding */
              border-radius: 16px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            }
            .arrow-btn {
              width: 30px;
              height: 30px;
              font-size: 16px;
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Brands;
