"use client";

import { postData } from "@/api/api";
import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

type IProps = {
  style_2?: boolean;
  style_3?: boolean;
};

const SubscribeArea = ({ style_2, style_3 }: IProps) => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) {
        setToastMessage("Please enter email");
        setSuccess(false);
        return;
      }

      const resp = await postData(`/newsletters`, { email });

      if (!resp.success) {
        console.log(resp?.message);
        setToastMessage(resp?.message);
        setSuccess(false);
        return;
      }
      setToastMessage(resp?.message);
      setSuccess(true);
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as string);
      setSuccess(false);
    } finally {
      setLoading(false);
      setEmail("");
      setTimeout(() => {
        setToastMessage("");
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <section style={{
      padding: style_2 ? "100px 0" : "80px 0",
   
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: "absolute",
        top: "-10%",
        left: "-5%",
        width: "400px",
        height: "400px",
        backgroundColor: "rgba(249, 115, 22, 0.08)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }}></div>

      <div style={{
        position: "absolute",
        bottom: "-15%",
        right: "-5%",
        width: "350px",
        height: "350px",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0,
      }}></div>

      {/* Floating cards decoration */}
      <div style={{
        position: "absolute",
        top: "15%",
        right: "10%",
        width: "80px",
        height: "80px",
        backgroundColor: "#000000",
        borderRadius: "16px",
        opacity: 0.05,
        transform: "rotate(45deg)",
        pointerEvents: "none",
        zIndex: 0,
      }}></div>

      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "8%",
        width: "100px",
        height: "100px",
        borderRadius: "20px",
        border: "2px solid rgba(249, 115, 22, 0.1)",
        pointerEvents: "none",
        zIndex: 0,
      }}></div>

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        paddingLeft: "24px",
        paddingRight: "24px",
        position: "relative",
        zIndex: 10,
      }}>
        {/* Main Content Card */}
        <div style={{
          backgroundColor: "#000000",
          backgroundImage: "linear-gradient(135deg, #000000 0%, #1f1f1f 100%)",
          borderRadius: "20px",
          padding: "60px 40px",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15), 0 0 1px rgba(255, 255, 255, 0.1) inset",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow background */}
          <div style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}></div>

          {/* Content */}
          <div style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}>
            {/* Header Section */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{
                display: "inline-block",
                marginBottom: "16px",
                padding: "12px 20px",
                backgroundColor: "rgba(249, 115, 22, 0.15)",
                borderRadius: "30px",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#f97316",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  💌 Newsletter
                </span>
              </div>

              <h2 style={{
                fontSize: "44px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 16px 0",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}>
                Get Exclusive Discounts
              </h2>

              <p style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#e5e5e5",
                margin: 0,
                lineHeight: 1.6,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}>
                Subscribe to our mailing list to receive updates on new arrivals, special offers and exclusive discount codes.
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} style={{
              display: "flex",
              gap: "12px",
              marginBottom: "20px",
              maxWidth: "500px",
              margin: "0 auto 20px auto",
            }}>
              <div style={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}>
                <Mail style={{
                  position: "absolute",
                  left: "16px",
                  width: "18px",
                  height: "18px",
                  color: "#f97316",
                  pointerEvents: "none",
                }} />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    borderRadius: "12px",
                    border: "1.5px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#ffffff",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px 32px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#f97316",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#ea580c";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#f97316";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                {loading ? (
                  <>
                    <span style={{ animation: "spin 1s linear infinite" }}>⏳</span>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send style={{ width: "16px", height: "16px" }} />
                    Subscribe
                  </>
                )}
              </button>
            </form>

            {/* Toast Message */}
            {toastMessage && (
              <div style={{
                padding: "14px 18px",
                borderRadius: "12px",
                border: "1.5px solid",
                fontSize: "13px",
                fontWeight: 600,
                animation: "slideDown 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                backgroundColor: success ? "#DCFCE7" : "#FEE2E2",
                borderColor: success ? "#BBF7D0" : "#FECACA",
                color: success ? "#166534" : "#DC2626",
                maxWidth: "500px",
                margin: "16px auto 0 auto",
              }}>
                {success ? (
                  <CheckCircle style={{ width: "18px", height: "18px" }} />
                ) : (
                  <span>⚠️</span>
                )}
                {toastMessage}
              </div>
            )}

            {/* Benefit Text */}
            <p style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#999999",
              margin: "24px 0 0 0",
              letterSpacing: "0.1px",
            }}>
              ✓ Exclusive deals · ✓ New products · ✓ Special offers · ✓ Early access
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default SubscribeArea;