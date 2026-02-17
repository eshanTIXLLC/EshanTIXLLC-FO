"use client";
import React from "react";

const AnnouncementBar = () => {
  const message = "BUY OVER 100$ & GET FREE SHIPPING ACROSS IN USA";

  return (
    <>
      <style>{`
        .announcement-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 36px;
          background-color: #e00000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          z-index: 9999;
          overflow: hidden;
        }

        /* Static centered text — shown on larger screens */
        .announcement-static {
          display: none;
          white-space: nowrap;
          padding: 0 16px;
        }

        /* Scrolling marquee — shown on small/narrow screens */
        .announcement-marquee {
          display: flex;
          width: 100%;
          overflow: hidden;
        }

        .announcement-track {
          display: flex;
          animation: marquee-scroll 18s linear infinite;
          white-space: nowrap;
          will-change: transform;
        }

        .announcement-track span {
          padding-right: 80px; /* gap between repeated messages */
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Switch to static text on wider screens */
        @media (min-width: 540px) {
          .announcement-static  { display: block; }
          .announcement-marquee { display: none; }
        }
      `}</style>

      <div className="announcement-bar" role="banner" aria-label="Announcement">
        {/* Scrolling version for small/mobile screens */}
        <div className="announcement-marquee" aria-hidden="true">
          <div className="announcement-track">
            {/* Duplicate the message so the scroll loops seamlessly */}
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>{message}</span>
            ))}
          </div>
        </div>

        {/* Static version for wider screens */}
        <span className="announcement-static">{message}</span>
      </div>
    </>
  );
};

export default AnnouncementBar;