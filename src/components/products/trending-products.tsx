"use client";

import { IProduct } from "@/types/product-d-t";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import ProductItem from "./single-product/product-item";

type IProps = {
  trendingProd?: IProduct[];
  style_2?: boolean;
  container?: string;
};

function TrendingProducts({
  trendingProd = [],
  style_2 = false,
  container = "container",
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setVisibleCount(6);
      } else {
        setVisibleCount(8);
        setShowAllMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSeeMore = () => {
    if (isMobile) {
      setShowAllMobile((prev) => !prev);
    } else {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount(trendingProd.length);
        setLoading(false);
      }, 300);
    }
  };

  const productsToShow = isMobile
    ? showAllMobile
      ? trendingProd
      : trendingProd.slice(0, visibleCount)
    : trendingProd.slice(0, visibleCount);

  return (
    <>
      {loading && <Loader />}

      <section className="product__area themed-trending-section">
        <div className={container}>
          {/* TITLE */}
        <div className="row">
<div className="col-12 text-center mb-50">
  <h2 className="animated-title">
     Style & Trend Collection

  </h2>
  <p className="animated-subtitle">
      Handpicked fashion essentials for the modern wardrobe – quality, comfort & style in every piece.

  </p>
</div>

</div>

          {/* PRODUCTS GRID */}
          <div className={`row g-3 ${isMobile ? "justify-content-center" : ""}`}>
            {productsToShow.map((item: any, index: number) => {
              const firstImage = item.images?.[0]?.image || "/placeholder.png";
              const product = { ...item, image: firstImage };

              return (
                <div
                  key={index}
                  className={
                    isMobile
                      ? "col-6"
                      : "col-xl-3 col-lg-3 col-md-6 col-sm-6"
                  }
                >
                  <ProductItem product={product} setLoading={setLoading} />
                </div>
              );
            })}
          </div>

          {/* SEE MORE */}
          {trendingProd.length > visibleCount && (
            <div className="row mt-40">
              <div className="col-12 text-center">
                <button
                  onClick={handleSeeMore}
                  disabled={loading}
                  className="see-more-btn-theme"
                >
                  {loading
                    ? "Loading..."
                    : isMobile
                    ? showAllMobile
                      ? "Show Less"
                      : "See More"
                    : "See More"}
                </button>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .themed-trending-section {
            padding-top: 80px;
            padding-bottom: 100px;
            margin-Top: -40px;
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
    .themed-trending-section {
            padding-top: 60px;
            padding-bottom: 90px;
            margin-Top: -30px;
          }
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

/* Hover – premium lift effect */
.see-more-btn-theme:hover {
  transform: translateY(-3px) scale(1.04);
  background: linear-gradient(135deg, #2d1b17, #555555);
  box-shadow: 0 14px 32px rgba(62, 39, 35, 0.45);
}

/* Disabled state */
.see-more-btn-theme:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Mobile */
@media (max-width: 767px) {
  .themed-trending-section {
    padding-top: 60px;
    padding-bottom: 70px;
    margin-left: 15px;
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
}

export default TrendingProducts;
