"use client";

import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";
import AnnouncementBar from "@/utils/AnnouncementBar";
import { FaPhone, FaEnvelope, FaFileAlt, FaBox, FaShoppingCart, FaInfoCircle, FaGavel, FaExclamationTriangle, FaPen } from "react-icons/fa";

export default function TermsAndConditionsPage() {
  return (
    <Wrapper>
      <AnnouncementBar />
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <section
            style={{
              padding: "180px 16px 90px",
              background: "#ffffff", // pure white background
            }}
          >
            <div className="container d-flex justify-content-center">
              <div className="policy-card">
                {/* TITLE */}
                <h1 className="policy-title">
                  Terms & Conditions – ESHAN TIX LLC
                </h1>

                <p className="policy-sub">
                  Welcome to ESHAN TIX LLC. Please read these Terms and Conditions carefully before using our services.
                </p>

                {/* SECTION */}
                <div className="policy-section">
                  <h4><FaInfoCircle className="section-icon" /> Use of Website</h4>
                  <p>
                    You agree to use this website for lawful purposes only. Any misuse, fraudulent activity, or unauthorized use of the website is strictly prohibited.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaFileAlt className="section-icon" /> Product Information</h4>
                  <p>
                    We strive to ensure that all product descriptions, images, and pricing information on our website are accurate. Minor errors may occur, and we reserve the right to correct them without prior notice.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaShoppingCart className="section-icon" /> Orders & Payments</h4>
                  <p>
                    All orders are subject to acceptance and availability. Payments are processed through secure third-party gateways. ESHAN TIX LLC reserves the right to cancel or refuse any order.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaBox className="section-icon" /> Shipping & Delivery</h4>
                  <p>
                    Estimated delivery times are provided for convenience only and may vary due to factors beyond our control, including carrier delays or external circumstances.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaShoppingCart className="section-icon" /> Returns & Refunds</h4>
                  <p>
                    Returns and refunds are governed by our Return & Refund Policy, which is available on our website.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaPen className="section-icon" /> Intellectual Property</h4>
                  <p>
                    All website content, including text, images, logos, and graphics, is the property of ESHAN TIX LLC and may not be used, copied, or reproduced without prior written permission.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaExclamationTriangle className="section-icon" /> Limitation of Liability</h4>
                  <p>
                    ESHAN TIX LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaGavel className="section-icon" /> Governing Law</h4>
                  <p>
                    These Terms and Conditions are governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaPen className="section-icon" /> Changes to Terms</h4>
                  <p>
                    ESHAN TIX LLC reserves the right to update or modify these Terms and Conditions at any time. Continued use of the website constitutes acceptance of the revised terms.
                  </p>
                </div>

                {/* CONTACT INFO */}
                <div className="policy-note">
                  <strong>Contact Information</strong>
                  <div className="contact-item">
                    <FaPhone className="icon" /> +1 786 619 8378
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="icon" /> info@eshantixllc.com
                  </div>
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
          background: #ffffff; /* pure white */
          padding: 50px 42px;
          border-radius: 20px;
          border: 1px solid rgba(75, 46, 46, 0.15);
          box-shadow: 0 14px 40px rgba(75, 46, 46, 0.15);
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
          color: #4b2e2e;
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
          color: #4b2e2e;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-icon {
          color: #4b2e2e;
        }

        .policy-section p {
          margin: 0;
          font-size: 15px;
          color: #5a3e3e;
          line-height: 1.75;
        }

        .policy-note {
          background: rgba(187, 143, 143, 0.15);
          color: #4b2e2e;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 14px;
          margin-top: 20px;
          border-left: 4px solid #7b4b3b;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
        }

        .contact-item .icon {
          color: #4b2e2e;
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
