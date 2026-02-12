"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Loader from "../Loader";

type Category = {
  id: string;
  name: string;
  image?: string;
  discount?: number;
  smDesc?: string;
  badge?: string;
  color?: string;
  createdAt?: string;
};

type ShopCategoryProps = {
  spacing?: string;
  categories?: Category[];
};

const ShopCategory = ({ spacing = "100px 0", categories = [] }: ShopCategoryProps) => {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedCategories = useMemo(() => {
    return [...categories].sort(
      (a, b) =>
        new Date(a.createdAt || "").getTime() -
        new Date(b.createdAt || "").getTime()
    );
  }, [categories]);

  if (!sortedCategories.length) return null;

  return (
    <>
      {loading && <Loader />}

      <section
        style={{
          padding: isMobile ? "50px 0" : spacing,
          background: "#FAF2EE",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "0 16px" : "0 60px",
          }}
        >
          {/* ================= HEADER ================= */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "40px" : "80px" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#8b6f61",
              }}
            >
              ALL IN ONE MARKETPLACE
            </p>

            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 900,
                marginBottom: "18px",
                background: "linear-gradient(90deg, #3e2723, #8d8d8d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                letterSpacing: "-0.5px",
              }}
            >
              Shop By Category
            </h2>

            <p
              style={{
                fontSize: isMobile ? "14px" : "18px",
                color: "#5f5f5f",
                maxWidth: "760px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Skin Care, Fashion, lifestyle, daily essentials & more —  
              everything you need, beautifully organized in one place.
            </p>
          </div>

          {/* ================= GRID ================= */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
              gap: isMobile ? "14px" : "34px",
              marginBottom: "70px",
            }}
          >
            {sortedCategories.map((item) => (
              <Link
                key={item.id}
                href={`/shop?category=${item.id}`}
                onClick={() => setLoading(true)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "22px",
                    padding: isMobile ? "18px 14px" : "42px 32px",
                    border: "1px solid rgba(0,0,0,0.04)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow:
                      hoveredCard === item.id
                        ? "0 25px 60px rgba(0,0,0,0.15)"
                        : "0 6px 18px rgba(0,0,0,0.06)",
                    transform: hoveredCard === item.id ? "translateY(-10px)" : "none",
                    transition: "0.4s ease",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      width: "100%",
                      height: isMobile ? "90px" : "150px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      background: "#eee",
                      marginBottom: "18px",
                      position: "relative",
                    }}
                  >
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                    )}
                  </div>

                  {/* TEXT */}
                  <h3
                    style={{
                      fontSize: isMobile ? "14px" : "22px",
                      fontWeight: 800,
                      background: "linear-gradient(90deg, #3e2723, #9a9a9a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      fontSize: isMobile ? "12px" : "13px",
                      fontWeight: 500,
                      color: "#6b6b6b",
                      marginBottom: "14px",
                    }}
                  >
                    {item.smDesc || "Explore premium products"}
                  </p>

                  {/* CTA */}
                  <div
                    style={{
                      marginTop: "auto",
                      fontWeight: 800,
                      fontSize: isMobile ? "14px" : "18px",
                      background: "linear-gradient(90deg, #3e2723, #8b8b8b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Shop Now →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ================= FOOTER CTA ================= */}
          <div
            style={{
              textAlign: "center",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              paddingTop: "45px",
            }}
          >
            <p
              style={{
                color: "#5a5a5a",
                marginBottom: "24px",
                fontSize: "15px",
              }}
            >
              Looking for more? Explore our complete product collection.
            </p>

            <Link
              href="/shop"
              style={{
                padding: "15px 46px",
                background: "linear-gradient(135deg, #3e2723, #6d6d6d)",
                color: "#fff",
                borderRadius: "60px",
                fontWeight: 800,
                fontSize: "15px",
                textDecoration: "none",
                letterSpacing: "0.6px",
                boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
                transition: "0.35s ease",
              }}
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopCategory;
