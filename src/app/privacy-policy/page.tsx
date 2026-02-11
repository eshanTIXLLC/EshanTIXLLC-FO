"use client";

import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";
import AnnouncementBar from "@/utils/AnnouncementBar";
import { FaPhone, FaEnvelope, FaFileAlt, FaInfoCircle, FaLock, FaUsers, FaCookie, FaPen } from "react-icons/fa";

export default function PrivacyPolicyPage() {
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
                  Privacy Policy – ESHAN TIX LLC
                </h1>

                <p className="policy-sub">
                  ESHAN TIX LLC respects your privacy and is committed to
                  protecting your personal information.
                </p>

                {/* SECTION */}
                <div className="policy-section">
                  <h4><FaInfoCircle className="section-icon" /> Information We Collect</h4>
                  <p>
                    We may collect personal information such as your name, email
                    address, phone number, billing and shipping address, and
                    payment details when you place an order or contact us. We
                    may also collect non-personal data including browser type,
                    IP address, and website usage through cookies and analytics
                    tools.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaFileAlt className="section-icon" /> How We Use Your Information</h4>
                  <ul>
                    <li>Process and fulfill orders</li>
                    <li>Provide customer support</li>
                    <li>Communicate order updates</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal and accounting requirements</li>
                  </ul>
                </div>

                <div className="policy-section">
                  <h4><FaLock className="section-icon" /> Data Security</h4>
                  <p>
                    We implement industry-standard security measures to protect
                    your personal information. Payment transactions are
                    processed through secure third-party payment providers, and
                    we do not store sensitive payment data on our servers.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaUsers className="section-icon" /> Third-Party Services</h4>
                  <p>
                    We may share limited information with trusted third-party
                    service providers such as payment processors, shipping
                    partners, and analytics services solely for business
                    operations.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaCookie className="section-icon" /> Cookies</h4>
                  <p>
                    Our website uses cookies to enhance user experience and
                    analyze website traffic. You may disable cookies through
                    your browser settings at any time.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaPen className="section-icon" /> Your Rights</h4>
                  <p>
                    You have the right to access, update, or request deletion of
                    your personal information, subject to applicable laws.
                  </p>
                </div>

                <div className="policy-section">
                  <h4><FaPen className="section-icon" /> Policy Updates</h4>
                  <p>
                    ESHAN TIX LLC may update this Privacy Policy from time to
                    time. Any changes will be posted on this page.
                  </p>
                </div>

                {/* CONTACT INFO */}
                <div className="policy-note">
                  <strong>Contact Us</strong>
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

        .policy-section ul {
          padding-left: 22px;
          margin: 0;
        }

        .policy-section li {
          margin-bottom: 8px;
          font-size: 15px;
          color: #333;
          line-height: 1.7;
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
