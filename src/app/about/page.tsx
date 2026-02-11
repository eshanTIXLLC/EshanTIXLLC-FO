"use client";

import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "../loading";
import AnnouncementBar from "@/utils/AnnouncementBar";

export default function AboutUs() {
  return (
    <Wrapper>
      <AnnouncementBar />
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <section className="about-section">
            <div className="container d-flex justify-content-center">
              <div className="about-card">
                <h1 className="about-title">About ESHAN TIX LLC</h1>

                <div className="about-content">
                  <p>
                    <strong>ESHAN TIX LLC</strong> is a U.S.-registered
                    e-commerce company focused on online retail and wholesale
                    distribution of high-quality branded consumer products. We
                    operate with a commitment to transparency, authenticity,
                    and customer satisfaction.
                  </p>

                  <p>
                    Our product selection includes beauty, personal care,
                    household, grocery, baby products, office products, pet
                    supplies, and everyday consumer essentials sourced through
                    authorized distributors and trusted supply partners.
                  </p>

                  <p>
                    We ensure that all products offered through our platform
                    are genuine, factory-sealed, and compliant with brand and
                    marketplace standards.
                  </p>

                  <p>
                    At <strong>ESHAN TIX LLC</strong>, we prioritize responsible
                    sourcing, quality control, and efficient order fulfillment
                    to provide a reliable shopping experience for our customers
                    and partners. Our operations follow U.S. business
                    regulations and ethical retail practices.
                  </p>

                  <p>
                    We welcome brand owners, manufacturers, and authorized
                    wholesalers to connect with us for partnership and
                    verification inquiries.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Suspense>
      </main>

      <Footer />

      <style jsx>{`
        .about-section {
          padding: 180px 16px 90px; /* header থেকে নিচে gap বাড়ানো */
          background: #ffffff;
        }

        .about-card {
          max-width: 760px; /* card ছোট করা */
          background: #ffffff;
          padding: 42px 36px;
          border-radius: 16px;
          border: 1px solid #ededed;
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.08);
        }

        .about-title {
          text-align: center;
          font-size: 30px;
          font-weight: 800;
          margin-bottom: 26px;
          color: #111;
          letter-spacing: 0.8px;
        }

        .about-content p {
          font-size: 15px;
          line-height: 1.85;
          color: #444;
          margin-bottom: 14px;
        }

        @media (max-width: 576px) {
          .about-section {
            padding: 150px 14px 70px;
          }

          .about-card {
            padding: 26px 20px;
          }

          .about-title {
            font-size: 24px;
          }

          .about-content p {
            font-size: 14.5px;
          }
        }
      `}</style>
    </Wrapper>
  );
}
