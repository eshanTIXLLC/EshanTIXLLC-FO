"use client";

import { IProduct } from "@/types/product-d-t";
import { useState, useEffect } from "react";
import ProductItem from "./single-product/product-item";

type IProps = {
  products?: IProduct[];
  spacing?: string;
  style_2?: boolean;
  featuredProducts?: IProduct[];
};

const SaleOffProducts = ({
  products = [],
  spacing = "pb-100",
  style_2 = false,
  featuredProducts = [],
}: IProps) => {
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSeeMore = () => {
    const total = featuredProducts.length || products.length;
    setVisibleCount(total);
  };

  const productsToShow =
    (featuredProducts.length ? featuredProducts : products).slice(
      0,
      visibleCount
    );

  return (
    <>
      <section className={`sale__area themed-sale-section ${spacing}`}>
        <div className="container">
          {/* TITLE */}
          <div className="row">
<div className="col-12 text-center mb-50">
  <h2 className="animated-title">
    Trendy Picks of the Week
  </h2>
  <p className="animated-subtitle">
    Explore our handpicked collection – style, comfort, and the best deals in one place.
  </p>
</div>

          </div>

          {/* PRODUCT GRID */}
          <div className="row gy-4">
            {productsToShow.map((product: any, i: number) => {
              const firstImage =
                product.images?.[0]?.image || "/placeholder.png";
              const normalizedProduct = { ...product, image: firstImage };

              return (
                <div
                  key={i + product?.id}
                  className="col-6 col-md-3 col-lg-3"
                >
                  <ProductItem product={normalizedProduct} />
                </div>
              );
            })}
          </div>

          {/* SEE MORE BUTTON */}
          {visibleCount <
            (featuredProducts.length || products.length) && (
            <div className="row mt-30">
              <div className="col-12 text-center">
                <button
                  onClick={handleSeeMore}
                  className="see-more-btn-theme"
                >
                  See More
                </button>
              </div>
            </div>
          )}
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

export default SaleOffProducts;
