"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowUpRight, ShieldCheck, Building2, Globe } from "lucide-react";

/* ---------- TYPES ---------- */
type FooterLink = {
  list: string;
  path: string;
};

type FooterWidget = {
  id: number;
  title: string;
  footer__links: FooterLink[];
};

/* ---------- DATA ---------- */
const footerWidget: FooterWidget[] = [
  {
    id: 1,
    title: "Quick Access",
    footer__links: [
      { list: "Privacy Policy", path: "/privacy-policy" },
      { list: "Terms & Condition", path: "/terms-and-conditions" },
      { list: "Returns & Refunds", path: "/returns-and-refunds" },
    ],
  },
  {
    id: 2,
    title: "Customer Care",
    footer__links: [
      { list: "Help & Contact Us", path: "/contact" },
      { list: "Online Store", path: "/shop" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-main-grid">
        
        {/* Card 1: Brand Identity with EXTRA LARGE LOGO */}
        <div className="brand-card">
          <Link href="/">
         
          </Link>
          <div className="brand-content-box">
            <h3 className="company-title">ESHAN TIX LLC</h3>
            <p className="brand-description">
              Leading the way in Online Retail & E-commerce with a commitment to quality and transparency.
            </p>
            
            {/* Social Section moved under Follow Us */}
            <div className="follow-us-section">
              <span className="follow-label">Follow Us</span>
              <div className="social-pill-container">
                <a href="https://www.facebook.com/profile.php?id=61586968809454" target="_blank" className="social-btn"><Facebook size={22} /></a>
                <a href="https://www.instagram.com/eshan_tix_llc?igsh=MTNmM3c4NDZqcmZtNg==" target="_blank" className="social-btn"><Instagram size={22} /></a>
                <a href="#" className="social-btn"><Twitter size={22} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Contact Details */}
        <div className="content-card">
          <div className="card-header">
            <div className="header-icon-box"><Globe size={20} /></div>
            <h4>Our Presence</h4>
          </div>
          
          <div className="location-stack">
            <div className="location-item">
              <MapPin size={24} className="icon-gold" />
              <div className="text-group">
                <span className="tiny-label">Business Address</span>
                <p>25 SE 2nd Ave Ste 550 #686, Miami, Florida, 33131, USA</p>
              </div>
            </div>

            <div className="location-item">
              <Building2 size={24} className="icon-gold" />
              <div className="text-group">
                <span className="tiny-label">Registered Office</span>
                <p>7901 4th St N STE 300, St. Petersburg, Florida, 33702, USA</p>
              </div>
            </div>
          </div>

          <div className="contact-pills-stack">
            <a href="tel:+17866198378" className="action-pill">
              <Phone size={18} /> <span>+1 786 619 8378</span>
            </a>
            <a href="mailto:info@eshantixllc.com" className="action-pill">
              <Mail size={18} /> <span>info@eshantixllc.com</span>
            </a>
          </div>
        </div>

        {/* Card 3: Navigation & Trust */}
        <div className="content-card">
          <div className="nav-grid">
            {footerWidget.map((item) => (
              <div key={item.id} className="nav-section">
                <h4 className="nav-header">{item.title}</h4>
                <ul className="link-stack">
                  {item.footer__links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.path}>
                        {link.list} <ArrowUpRight size={14} className="jump-arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="security-badge">
            <ShieldCheck size={28} className="secure-icon" />
            <div className="secure-text">
              <strong>Verified Security</strong>
          
            </div>
          </div>
        </div>

      </div>

      <div className="bottom-bar">
        <p>© 2026 <strong>ESHAN TIX LLC</strong> — All Rights Reserved.</p>
      </div>

      <style jsx>{`
        .footer-root {
          background-color: #ffffff;
          padding: 80px 24px 30px;
          border-top: 1px solid #f0f0f0;
          font-family: 'Inter', sans-serif;
        }

        .footer-main-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1.2fr 1fr;
          gap: 24px;
        }

        /* Large Logo Card */
        .brand-card {
          background: #ffffff;
          padding: 40px;
          border-radius: 35px;
          border: 1px solid #f1f1f1;
          box-shadow: 0 15px 40px rgba(0,0,0,0.02);
        }

        .logo-hero-wrapper {
          margin-bottom: 20px;
          display: block;
          max-width: 100%;
        }

        .company-title {
          font-size: 26px;
          font-weight: 800;
          color: #473737;
          margin-bottom: 12px;
        }

        .brand-description {
          color: #202020;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        /* Follow Us Section */
        .follow-us-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #f5f5f5;
        }

        .follow-label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .social-pill-container {
          display: flex;
          gap: 15px;
        }

        .social-btn {
          width: 50px;
          height: 50px;
          background: #f8f8f8;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #444;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          background: #8B4513;
          color: white;
          transform: translateY(-6px);
        }

        /* Content Cards */
        .content-card {
          background: #ffffff;
          padding: 40px;
          border-radius: 35px;
          border: 1px solid #f1f1f1;
          box-shadow: 0 15px 40px rgba(0,0,0,0.02);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
        }

        .header-icon-box {
          width: 40px;
          height: 40px;
          background: #fdf8f4;
          color: #332d28;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-header h4 {
          font-size: 19px;
          font-weight: 700;
        }

        .location-stack {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 35px;
        }

        .location-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .icon-gold { color: #8B4513; flex-shrink: 0; }

        .tiny-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #292828;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .text-group p {
          font-size: 14.5px;
          color: #444;
          margin: 0;
          line-height: 1.5;
        }

        .contact-pills-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: #f9f9f9;
          border-radius: 15px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: 0.2s;
        }

        .action-pill:hover {
          background: #8B4513;
          color: white;
        }

        .nav-grid {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 30px;
        }

        .nav-header { font-size: 16px; font-weight: 700; margin-bottom: 15px; }

        .link-stack { list-style: none; padding: 0; }
        .link-stack li { margin-bottom: 12px; }
        .link-stack a {
          display: flex;
          justify-content: space-between;
          text-decoration: none;
          color: #666;
          transition: 0.2s;
        }
        .link-stack a:hover { color: #8B4513; transform: translateX(5px); }
        .jump-arrow { opacity: 0; transition: 0.3s; }
        .link-stack a:hover .jump-arrow { opacity: 1; }

        .security-badge {
          background: #f0fdf4;
          padding: 20px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .secure-icon { color: #16a34a; }
        .secure-text strong { display: block; font-size: 14px; color: #166534; }
        .secure-text span { font-size: 11px; color: #16a34a; }

        .bottom-bar {
          text-align: center;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid #f0f0f0;
          color: #999;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
          }
          .brand-card {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
          }
          .brand-card {
            grid-column: span 1;
            padding: 30px 20px;
            text-align: center;
          }
          .logo-hero-wrapper {
            margin: 0 auto 20px;
          }
          .social-pill-container {
            justify-content: center;
          }
          .content-card {
            padding: 30px 20px;
          }
          .location-item {
            text-align: left;
          }
        }
      `}</style>
    </footer>
  );
}