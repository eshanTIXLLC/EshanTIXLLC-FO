"use client";
import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

const ChatButtons = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const whatsappNumber = "01748399860";
  const whatsappMsg = encodeURIComponent(
    "Hello! I want to inquire about your products."
  );

  const messengerLink = "https://m.me/utbd"; // demo Messenger link

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, "_blank");
  };

  const handleMessenger = () => {
    window.open(messengerLink, "_blank");
  };

  // Adjust positions based on mobile
  const whatsappBottom = isMobile ? "120px" : "90px";
  const messengerBottom = isMobile ? "200px" : "160px";
  const rightPos = isMobile ? "10px" : "10px";

  return (
    <>
      {/* WhatsApp Button */}
      <div
        style={{
          ...styles.container,
          bottom: whatsappBottom,
          right: rightPos,
          background: "#25D366",
        }}
        onClick={handleWhatsApp}
      >
        <FaWhatsapp size={28} style={{ color: "#fff" }} />
      </div>

      {/* Messenger Button */}
      <div
        style={{
          ...styles.container,
          bottom: messengerBottom,
          right: rightPos,
          background: "#0084FF",
        }}
        onClick={handleMessenger}
      >
        <FaFacebookMessenger size={28} style={{ color: "#fff" }} />
      </div>
    </>
  );
};

export default ChatButtons;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    width: "60px",
    height: "60px",
    marginTop: "30px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    zIndex: 9999,
    transition: "all 0.3s ease, transform 0.3s ease",
  },
};
