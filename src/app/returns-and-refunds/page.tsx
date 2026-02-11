"use client";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";
import AnnouncementBar from "@/utils/AnnouncementBar";
import { FaPhone, FaEnvelope } from "react-icons/fa";

export default async function ReturnsAndRefundsPage() {
  return (
    <Wrapper>
      <AnnouncementBar/>
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <section
            style={{
              padding: "180px 16px 90px",
              background: "linear-gradient(135deg,#ffffff,#f0f0f0)",
            }}
          >
            <div className="container d-flex justify-content-center">

              <div className="card policy-card">

                {/* TITLE */}
                <div className="text-center mb-40">
                  <h1 className="policy-title">Return & Refund Policy – ESHAN TIX LLC</h1>
                  <p className="policy-sub">
                    At ESHAN TIX LLC, customer satisfaction is important to us. If you are not fully satisfied with your purchase, we offer a return and refund policy under the terms outlined below.
                  </p>
                </div>

                {/* RETURN ELIGIBILITY */}
                <div className="policy-section">
                  <h4>🔄 Return Eligibility</h4>
                  <p>
                    Returns are accepted within <strong>30 days</strong> of delivery. Items must be unused, unopened, and in their original packaging, along with proof of purchase.
                  </p>
                </div>

                {/* NON-RETURNABLE ITEMS */}
                <div className="policy-section">
                  <h4>❌ Non-Returnable Items</h4>
                  <ul className="policy-list">
                    <li>Opened or used personal care and beauty products</li>
                    <li>Clearance or final sale items</li>
                    <li>Gift cards (if applicable)</li>
                  </ul>
                </div>

                {/* RETURN PROCESS */}
                <div className="policy-section">
                  <h4>📝 Return Process</h4>
                  <p>
                    To initiate a return, please contact our support team at <FaEnvelope /> info@eshantixllc.com with your order number and reason for return. Once approved, we will provide return instructions and the return address.
                  </p>
                </div>

                {/* REFUNDS */}
                <div className="policy-section">
                  <h4>💳 Refunds</h4>
                  <p>
                    After receiving and inspecting the returned item, approved refunds will be issued to the original payment method. Refund processing may take <strong>5–10 business days</strong>, depending on your payment provider.
                  </p>
                </div>

                {/* RETURN SHIPPING */}
                <div className="policy-section">
                  <h4>🚚 Return Shipping</h4>
                  <p>
                    Customers are responsible for return shipping costs unless the item is defective, damaged, or incorrect upon delivery.
                  </p>
                </div>

                {/* DAMAGED OR INCORRECT ITEMS */}
                <div className="policy-section">
                  <h4>⚠️ Damaged or Incorrect Items</h4>
                  <p>
                    If you receive a damaged, defective, or incorrect item, please contact us within 48 hours of delivery. We will arrange a replacement or refund as applicable.
                  </p>
                </div>

                {/* CONTACT */}
                <div className="policy-note">
                  <strong>Contact Us</strong>
                  <br />
                  <FaPhone /> +1 786 619 8378
                  <br />
                  <FaEnvelope /> info@eshantixllc.com
                </div>

              </div>
            </div>
          </section>
        </Suspense>
      </main>

      <Footer />

      {/* THEME CSS */}
      <style jsx>{`
        .policy-card {
          max-width: 860px;
          background: #ffffff; /* light cream */
          padding: 50px 42px;
          border-radius: 20px;
          border: 1px solid rgba(75,46,46,0.15);
          box-shadow: 0 14px 40px rgba(75,46,46,0.15);
          transition: 0.35s ease;
          backdrop-filter: blur(4px);
        }

        .policy-card:hover {
          transform: translateY(-4px) scale(1.01);
        }

        .policy-title {
          text-align: center;
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 12px;
          color: #4b2e2e; /* dark chocolate */
          background: linear-gradient(135deg,#4b2e2e,#7b4b3b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .policy-sub {
          text-align: center;
          color: #6b4f4f;
          margin-bottom: 36px;
          font-size: 14px;
        }

        .policy-section {
          margin-bottom: 28px;
        }

        .policy-section h4 {
          font-weight: 700;
          margin-bottom: 10px;
          color: #4b2e2e; /* dark chocolate */
        }

        .policy-section p {
          margin: 0;
          font-size: 15px;
          color: #5a3e3e;
          line-height: 1.75;
        }

        .policy-list {
          padding-left: 22px;
          margin: 0;
          list-style-type: disc;
          color: #4b2e2e;
        }

        .policy-list li {
          margin-bottom: 6px;
          font-size: 15px;
          line-height: 1.7;
        }

        .policy-note {
          background: rgba(187,143,143,0.15); /* soft brown */
          color: #4b2e2e;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 14px;
          margin-top: 20px;
          border-left: 4px solid #7b4b3b;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .policy-note svg {
          margin-right: 6px;
        }

        @media (max-width: 576px) {
          .policy-card {
            padding: 28px 20px;
          }

          .policy-title {
            font-size: 26px;
          }
        }
      `}</style>
    </Wrapper>
  );
}
