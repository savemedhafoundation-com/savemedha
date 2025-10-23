import React, { useState, useEffect } from "react";
import combineImg from "../assets/Photo/3 IMAGES COMBINED.jpg"; // ✅ Fixed import

const DotPattern = () => (
  <div style={{ display: "flex", gap: "8px" }}>
    {[...Array(3)].map((_, i) => (
      <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {[...Array(3)].map((_, j) => (
          <div
            key={j}
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              backgroundColor: "#6FCF97",
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

const HeroBanner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* LEFT TEXT PANEL */}
      <div
        style={{
          position: "relative",
          width: isMobile ? "100%" : "603px",
          minWidth: isMobile ? "100%" : "603px",
          height: isMobile ? "auto" : "100%",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: isMobile ? "center" : "flex-start",
          padding: isMobile ? "40px 24px" : "60px 40px",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              opacity: 0.4,
            }}
          >
            <DotPattern />
          </div>
        )}

        <div style={{ maxWidth: "600px" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#6FCF97",
              padding: "6px 12px",
              borderRadius: "4px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontFamily: "sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              NATURAL IMMUNOTHERAPY
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: isMobile ? "32px" : "48px",
              lineHeight: 1.2,
              color: "#000",
              margin: "0 0 4px 0",
            }}
          >
            Empowering lives,
          </h1>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: isMobile ? "28px" : "40px",
              lineHeight: 1.2,
              color: "#6FCF97",
              margin: "0 0 24px 0",
            }}
          >
            Saving futures
          </h2>

          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: 600,
              margin: "0 0 32px 0",
            }}
          >
            <span style={{ color: "#000" }}>Fighting to make a </span>
            <span style={{ color: "#2D5BFF", fontWeight: 700 }}>
              CANCER FREE WORLD
            </span>
          </p>

          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: "#6FCF97",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.5px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              boxShadow: isHovered
                ? "0 6px 16px rgba(111, 207, 151, 0.4)"
                : "0 2px 8px rgba(111, 207, 151, 0.2)",
            }}
          >
            DISCOVER
          </button>
        </div>

        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              opacity: 0.4,
            }}
          >
            <DotPattern />
          </div>
        )}
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div
        style={{
          position: "relative",
          width: isMobile ? "100%" : "calc(100% - 603px)",
          height: isMobile ? "280px" : "100%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={combineImg}
          alt="Hero Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              opacity: 0.4,
            }}
          >
            <DotPattern />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
