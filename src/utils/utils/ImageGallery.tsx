// components/ImageGallery.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/1.png", alt: "Office" },
  { src: "/2.png", alt: "Warehouse" },
  { src: "/3.png", alt: "Car" },
  { src: "/4.png", alt: "Delivery" },
  { src: "/5.png", alt: "Preparing" },
  { src: "/6.jpg", alt: "Shipping" },
];

const ImageGallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (img: { src: string; alt: string }) => {
    setCurrentImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <section
      style={{
        padding: "100px 20px",
        background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "linear-gradient(135deg, rgba(255, 61, 0, 0.05), rgba(255, 145, 0, 0.05))",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          background: "linear-gradient(135deg, rgba(255, 145, 0, 0.05), rgba(255, 61, 0, 0.05))",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* Title Section */}
        <div style={{ marginBottom: "60px" }}>
         <h2
  style={{
    fontSize: "clamp(32px, 5vw, 48px)",
    fontWeight: 800,
    marginBottom: "16px",

    /* Dark coffee gradient text */
    background: "linear-gradient(90deg, #2d1b17, #3e2723, #6d6d6d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",

    position: "relative",
    display: "inline-block",
    letterSpacing: "-0.5px",
  }}
>
  Explore Our Vibrant Gallery
</h2>
          <div
            style={{
              width: "100px",
              height: "4px",
              background: "linear-gradient(90deg, #ff3d00, #ff9100)",
              margin: "0 auto",
              borderRadius: "2px",
              animation: "expand 1s ease-out forwards",
            }}
          />
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "#666",
              maxWidth: "600px",
              margin: "20px auto 0",
              lineHeight: "1.6",
            }}
          >
            Discover our workspace, processes, and dedication to excellence
          </p>
        </div>

        {/* Grid Gallery */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "50px",
            padding: "0 20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => openModal(img)}
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "75%",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "#f5f5f5",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 25px 50px rgba(255, 61, 0, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.12)";
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />

              {/* Overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.6) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="image-overlay"
              />

              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  padding: "20px",
                  color: "#fff",
                  zIndex: 2,
                  opacity: 0,
                  transform: "translateY(10px)",
                  transition: "all 0.3s ease",
                }}
                className="image-label"
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                    display: "block",
                    letterSpacing: "0.5px",
                  }}
                >
                  {img.alt}
                </span>
              </div>

              {/* Hover icon */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "70px",
                  height: "70px",
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 3,
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                }}
                className="zoom-icon"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff3d00"
                  strokeWidth="2.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && currentImage && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            cursor: "zoom-out",
            padding: "20px",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "30px",
              right: "30px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "#fff",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              zIndex: 10001,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ×
          </button>

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              height: "auto",
              animation: "zoomIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={1000}
              height={667}
              style={{
                objectFit: "contain",
                borderRadius: "16px",
                width: "100%",
                height: "auto",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              }}
            />
            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                color: "#fff",
                fontSize: "24px",
                fontWeight: 700,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {currentImage.alt}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 100px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .zoom-icon,
        .image-overlay,
        .image-label {
          opacity: 0;
        }

        div:hover .zoom-icon,
        div:hover .image-overlay,
        div:hover .image-label {
          opacity: 1;
        }

        div:hover .image-label {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          div[style*="grid"] {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageGallery;