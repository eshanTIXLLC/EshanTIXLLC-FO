"use client";

import ContactForm from "../forms/contact-form";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const contactInfo = [
  {
    id: 0,
    icon: "MapPin",
    title: "Business Address",
    subtitle: `25 SE 2nd Ave Ste 550 #686, Miami, Florida, 33131, USA`,
  },
  {
    id: 1,
    icon: "MapPin",
    title: "Registered Address",
    subtitle: `7901 4th St N STE 300, St. Petersburg, Florida, 33702, USA`,
  },
  {
    id: 2,
    icon: "Phone",
    title: "Phone",
    subtitle: "+1 786 619 8378",
  },
  {
    id: 3,
    icon: "Mail",
    title: "Email",
    subtitle: "info@eshantixllc.com",
  },
  {
    id: 4,
    icon: "Clock",
    title: "Business Hours",
    subtitle: "Monday - Friday: 9:00 AM - 6:00 PM EST",
  },
];

const socialMedia = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61586968809454",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/eshan_tix_llc?igsh=MTNmM3c4NDZqcmZtNg==",
    color: "#E4405F",
  },
  {
    name: "Twitter",
    url: "https://x.com/eshantixllc",
    color: "#1DA1F2",
  },
];

const ContactArea = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "MapPin":
        return <MapPin size={22} />;
      case "Phone":
        return <Phone size={22} />;
      case "Mail":
        return <Mail size={22} />;
      case "Clock":
        return <Clock size={22} />;
      default:
        return null;
    }
  };

  const renderSocialIcon = (name: string) => {
    switch (name) {
      case "Facebook":
        return <Facebook size={20} />;
      case "Instagram":
        return <Instagram size={20} />;
      case "Twitter":
        return <Twitter size={20} />;
      default:
        return null;
    }
  };

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #2c1810 0%, #6b4423 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
              letterSpacing: "-0.5px",
            }}
          >
            Get in Touch
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#5a4234",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "32px",
          }}
          className="contact-grid-responsive"
        >
          {/* Contact Info Card */}
          <div className="contact-card">
            <h3
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#2c1810",
                marginBottom: "12px",
              }}
            >
              Contact Information
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#5a4234",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Feel free to reach out to us through any of the following channels.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px 0" }}>
              {contactInfo.map((item) => (
                <li key={item.id} className="contact-item">
                  <div className="contact-icon-wrapper">{renderIcon(item.icon)}</div>
                  <div style={{ flex: 1 }}>
                    <h6
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#6b4423",
                        margin: "0 0 6px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.title}
                    </h6>
                    {item.id === 2 ? (
                      <a
                        href={`tel:${item.subtitle.replace(/\s/g, "")}`}
                        style={{
                          fontSize: "15px",
                          color: "#4a3428",
                          lineHeight: 1.6,
                          display: "block",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                        className="contact-link"
                      >
                        {item.subtitle}
                      </a>
                    ) : item.id === 3 ? (
                      <a
                        href={`mailto:${item.subtitle}`}
                        style={{
                          fontSize: "15px",
                          color: "#4a3428",
                          lineHeight: 1.6,
                          display: "block",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                        className="contact-link"
                      >
                        {item.subtitle}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: "15px",
                          color: "#4a3428",
                          lineHeight: 1.6,
                          display: "block",
                        }}
                      >
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Social Media Section */}
            <div
              style={{
                marginTop: "40px",
                paddingTop: "32px",
                borderTop: "2px solid #f5e6d3",
              }}
            >
              <h6
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#2c1810",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Follow Us
              </h6>
              <ul style={{ display: "flex", gap: "16px", padding: 0, margin: 0, listStyle: "none" }}>
                {socialMedia.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link social-${social.name.toLowerCase()}`}
                      aria-label={social.name}
                    >
                      {renderSocialIcon(social.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-card">
            <h3
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#2c1810",
                marginBottom: "12px",
              }}
            >
              Send us a Message
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#5a4234",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Fill out the form below and our team will get back to you shortly.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 992px) {
          .contact-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }

        .contact-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 8px 24px rgba(44, 24, 16, 0.1);
          border: 1px solid #e8d5c4;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(44, 24, 16, 0.2);
        }

        .contact-item {
          display: flex;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid #f5e6d3;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          transform: translateX(5px);
        }

        .contact-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .contact-icon-wrapper {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: #6b4423;
        }

        .contact-item:hover .contact-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .contact-link:hover {
          color: #6b4423 !important;
        }

        .social-link {
          width: 48px;
          height: 48px;
          background: #ffffff;
          border: 2px solid #e8d5c4;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #6b4423;
          text-decoration: none;
        }

        .social-link:hover {
          transform: translateY(-6px) scale(1.1);
        }

        .social-facebook:hover {
          background: #1877f2;
          border-color: #1877f2;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(24, 119, 242, 0.3);
        }

        .social-instagram:hover {
          background: #e4405f;
          border-color: #e4405f;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(228, 64, 95, 0.3);
        }

        .social-twitter:hover {
          background: #1da1f2;
          border-color: #1da1f2;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(29, 161, 242, 0.3);
        }

        @media (max-width: 768px) {
          .contact-card {
            padding: 28px 24px;
          }

          .contact-icon-wrapper {
            width: 40px;
            height: 40px;
          }

          .social-link {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactArea;
