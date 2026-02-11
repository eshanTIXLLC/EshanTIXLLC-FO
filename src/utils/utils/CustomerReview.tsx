"use client";

import { Star, Quote } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "Sarah Ahmed",
      review:
        "Amazing quality! The fabric is super comfortable and delivery was fast. Highly recommended!",
      rating: 5,
    },
    {
      name: "James Karim",
      review:
        "Loved the premium feel of the product. Packaging was clean and professional.",
      rating: 4,
    },
    {
      name: "Aisha Rahman",
      review:
        "Great customer support and excellent product quality. Will buy again!",
      rating: 5,
    },
  ];

  const css = `
    @media(max-width: 768px){
      .review-grid {
        grid-template-columns: repeat(1, 1fr) !important;
      }
    }
    @media(min-width: 769px){
      .review-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
    .review-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }
  `;

  const cardStyle: React.CSSProperties = {
    padding: "26px",
    borderRadius: "20px",
    background: "#fff",
    border: "1px solid #e5e5e5",
    transition: "0.3s",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  };

  return (
    <>
      <style>{css}</style>

      <section style={{ padding: "70px 20px", background: "#f8f3f3ff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Header */}
          <h2
            style={{
              textAlign: "center",
              fontSize: "34px",
              fontWeight: 700,
              marginBottom: "10px",
              color: "#1A1A1A",
            }}
          >
            What Our  
            <span style={{ color: "#ff6b6b" }}> Customers Say</span>
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: "16px",
              marginBottom: "50px",
              maxWidth: "600px",
              marginInline: "auto",
              lineHeight: 1.6,
            }}
          >
            Real feedback from happy customers who love shopping with us.
          </p>

          {/* Review Cards */}
          <div
            className="review-grid"
            style={{
              display: "grid",
              gap: "26px",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {reviews.map((item, i) => (
              <div key={i} className="review-card" style={cardStyle}>
                <Quote size={30} color="#ff6b6b" />

                {/* Rating */}
                <div style={{ margin: "10px 0" }}>
                  {Array(item.rating)
                    .fill(null)
                    .map((_, idx) => (
                      <Star key={idx} size={18} fill="#ff6b6b" color="#ff6b6b" />
                    ))}
                </div>

                {/* Text */}
                <p
                  style={{
                    color: "#444",
                    lineHeight: 1.6,
                    fontSize: "15px",
                    marginBottom: "12px",
                  }}
                >
                  “{item.review}”
                </p>

                <h4
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "#1A1A1A",
                  }}
                >
                  {item.name}
                </h4>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#"
              style={{
                padding: "14px 24px",
                background: "#1877F2",
                color: "#fff",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "0.3s",
              }}
            >
              Follow on Facebook
            </a>

            <a
              href="#"
              style={{
                padding: "14px 24px",
                background: "#E4405F",
                color: "#fff",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "0.3s",
              }}
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
