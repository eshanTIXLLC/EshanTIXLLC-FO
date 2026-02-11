"use client";

import { ShoppingCart, Package, Truck, CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function OrderProcess() {
  const steps = [
    { title: "Order Placed", desc: "You placed your order successfully.", icon: <ShoppingCart size={38} strokeWidth={1.6} /> },
    { title: "Processing", desc: "Your order is being prepared & packed.", icon: <Package size={38} strokeWidth={1.6} /> },
    { title: "On The Way", desc: "Shipped and moving towards your location.", icon: <Truck size={38} strokeWidth={1.6} /> },
    { title: "Delivered", desc: "Product delivered safely.", icon: <CheckCircle size={38} strokeWidth={1.6} /> },
  ];

  // STEP CARD STYLE
  const stepCard: React.CSSProperties = {
    textAlign: "center",
    padding: "28px 20px",
    borderRadius: "20px",
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    color: "#fff",
  };

  // ICON BOX STYLE
  const iconBox: React.CSSProperties = {
    width: "80px",
    height: "80px",
    margin: "0 auto 15px auto",
    borderRadius: "20px",
    background: "#ff6b6b",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    transition: "0.3s",
  };

  // SNOWFALL
  useEffect(() => {
    const canvas = document.getElementById("snow-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Auto Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Snowflake Type
    interface Snowflake {
      x: number;
      y: number;
      radius: number;
      speed: number;
    }

    const snowflakes: Snowflake[] = [];
    const numFlakes = 120;

    for (let i = 0; i < numFlakes; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();

      snowflakes.forEach((flake) => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      });

      ctx.fill();
      update();
      requestAnimationFrame(draw);
    };

    const update = () => {
      snowflakes.forEach((flake) => {
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
          flake.y = 0;
          flake.x = Math.random() * canvas.width;
        }
      });
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  // RESPONSIVE CSS
  const css = `
    @media(max-width: 768px){ 
        .order-grid{ 
            grid-template-columns: repeat(2, 1fr) !important; 
        }
    }
    @media(min-width: 769px){ 
        .order-grid{ 
            grid-template-columns: repeat(4, 1fr) !important; 
        }
    }
    .step-card:hover{
        transform: translateY(-6px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .step-card:hover .icon-box{
        transform: scale(1.07);
    }
  `;

  return (
    <>
      {/* Snow Canvas */}
      <canvas
        id="snow-canvas"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      ></canvas>

      <style>{css}</style>

      <section
        style={{
          position: "relative",
          padding: "60px 20px",
          background: "#0d0d0d",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "34px", fontWeight: "700", color: "#fff", marginBottom: "10px" }}>
            Order Processing <span style={{ color: "#ff6b6b" }}>Steps</span>
          </h2>

          <p
            style={{
              color: "#cccccc",
              fontSize: "16px",
              marginBottom: "40px",
              maxWidth: "600px",
              marginInline: "auto",
              lineHeight: 1.6,
            }}
          >
            Your order goes through these simple steps before it reaches your doorstep.
          </p>

          <div className="order-grid" style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {steps.map((step, i) => (
              <div key={i} className="step-card" style={stepCard}>
                <div className="icon-box" style={iconBox}>{step.icon}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "#ccc", marginTop: "8px" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
