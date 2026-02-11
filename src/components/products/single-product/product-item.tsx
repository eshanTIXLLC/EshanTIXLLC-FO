"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

export default function GadgetProductCard({ product, setLoading }: any) {
  const discountPercent = product.productAttributes?.[0]?.discountPercent || 0;
  const stock = product.productAttributes?.[0]?.stockAmount ?? 0;

  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ===== 3D TILT ===== */
  const handleMouseMove = (e: any) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rx = -(y / rect.height - 0.5) * 7;
    const ry = (x / rect.width - 0.5) * 7;

    cardRef.current.style.transform = `
      perspective(900px)
      rotateX(${rx}deg)
      rotateY(${ry}deg)
      translateY(-4px)
    `;
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  const handleNavigateToDetails = () => {
    setLoading && setLoading(true);
    window.location.href = `/product-details/${product.slug}`;
  };

  return (
    <div
      ref={cardRef}
      className="product-card-theme"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onClick={handleNavigateToDetails}
    >
      {/* IMAGE */}
      <div className="product-image-wrapper">
        <Image
          src={product?.images?.[0]?.image ?? "/noimage.png"}
          alt={product.name}
          fill
          className="product-image"
        />

        <span className="image-shine" />

        {discountPercent > 0 && (
          <div className="discount-badge">{discountPercent}% OFF</div>
        )}

        {stock <= 0 && <div className="out-stock-badge">Out of Stock</div>}
      </div>

      {/* INFO */}
      <div className="info-wrapper">
        <h3 className="product-title">{product.name}</h3>

        <div className="price-row">
          <span className="sale-price">
           ${product.productAttributes?.[0]?.discountedRetailPrice} 
          </span>

          {discountPercent > 0 && (
            <span className="regular-price">
              {product.productAttributes?.[0]?.retailPrice}
            </span>
          )}
        </div>

        <button className="quick-view-btn">
          <Eye size={18} />
          <span>Quick View</span>
        </button>
      </div>

      {/* ================= CSS ================= */}
      <style jsx>{`
        .product-card-theme {
          width: 100%;
          height: 520px;
          background: #fff;
          border-radius: 22px;
          border: 1px solid #eee;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: 0.2s ease;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
        }

        .product-card-theme:hover {
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
        }

        /* IMAGE */
        .product-image-wrapper {
          width: 100%;
          aspect-ratio: 1 / 1.1;
          position: relative;
          overflow: hidden;
        }

        .product-image {
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .product-card-theme:hover .product-image {
          transform: scale(1.07);
        }

        .image-shine {
          position: absolute;
          inset: 0;
          left: -120%;
          width: 45%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transform: skewX(-18deg);
          pointer-events: none;
          z-index: 2;
        }

        .product-card-theme:hover .image-shine {
          animation: shineImage 0.7s ease forwards;
        }

        @keyframes shineImage {
          to {
            left: 150%;
          }
        }

        /* BADGES */
        .discount-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(90deg, #ff3d00, #ff9100);
          color: #fff;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          z-index: 3;
        }

        .out-stock-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #000;
          color: #fff;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          z-index: 3;
        }

        /* INFO */
        .info-wrapper {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

 .product-title {
  font-size: ${isMobile ? "14px" : "18px"};
  font-weight: 700;
  background: linear-gradient(90deg, #4b2e1e, #494949); /* Dark Coffee → Ash */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  min-height: ${isMobile ? "36px" : "44px"};
  margin-bottom: 6px;
}

        .price-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .sale-price {
          font-size: ${isMobile ? "18px" : "22px"};
          font-weight: 800;
          color: #111;
        }

        .regular-price {
          font-size: ${isMobile ? "12px" : "14px"};
          color: #94a3b8;
          text-decoration: line-through;
        }

        /* BUTTON */
.quick-view-btn {
  margin-top: auto;
    background: linear-gradient(135deg, #3e2723, #6d6d6d);

  color: #fff;
  padding: 12px 0;
  border-radius: 16px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 24px rgba(111, 78, 55, 0.35),
              inset 0 0 12px rgba(255, 255, 255, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.quick-view-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(111, 78, 55, 0.55),
              inset 0 0 16px rgba(255, 255, 255, 0.1);
}


        @media (max-width: 767px) {
          .product-card-theme {
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
}
