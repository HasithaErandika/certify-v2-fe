import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [certificateId, setCertificateId] = useState("");
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    const trimmedId = certificateId.trim();
    if (!trimmedId) return;
    navigate(`/certificates/${encodeURIComponent(trimmedId)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleVerifyClick();
  };

  return (
    <section
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        background:
          "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(89,42,203,0.07) 0%, transparent 65%)",
        backgroundColor: "#f7f7fa",
      }}
    >
      <div style={{ width: "100%", maxWidth: "28rem", textAlign: "center" }}>
        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-moz-black)",
            margin: "0 0 0.75rem",
          }}
        >
          Verify Your{" "}
          <span style={{ color: "var(--color-moz-orange)" }}>Certificate</span>
        </h1>

        {/* Sub-text */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-moz-gray-mid)",
            margin: "0 auto 1.5rem",
            maxWidth: "24rem",
            lineHeight: 1.5,
          }}
        >
          Enter the unique certificate ID to instantly verify an official
          credential issued by&nbsp;
          <a
            href="https://sliitmozilla.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-moz-violet)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            SLIIT Mozilla Club
          </a>
          .
        </p>

        {/* Card */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--color-moz-gray-light)",
            borderRadius: "1rem",
            padding: "1.5rem",
            boxShadow:
              "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(89,42,203,0.06)",
          }}
        >
          <label
            htmlFor="certificate-id-input"
            style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--color-moz-gray-dark)",
              textAlign: "left",
              marginBottom: "0.4rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Certificate ID
          </label>

          <input
            id="certificate-id-input"
            type="text"
            placeholder="e.g. A3F8C20B91D4"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "0.6rem 0.8rem",
              borderRadius: "0.5rem",
              border: "1.5px solid var(--color-moz-gray-light)",
              background: "#f7f7fa",
              color: "var(--color-moz-black)",
              fontSize: "0.85rem",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--color-moz-orange)";
              e.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(255,113,57,0.15)";
              e.currentTarget.style.background = "#ffffff";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--color-moz-gray-light)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "#f7f7fa";
            }}
          />

          <button
            id="verify-button"
            onClick={handleVerifyClick}
            style={{
              marginTop: "0.75rem",
              width: "100%",
              padding: "0.6rem",
              borderRadius: "0.5rem",
              border: "none",
              background:
                "linear-gradient(135deg, var(--color-moz-orange) 0%, var(--color-moz-orange-mid) 100%)",
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              transition:
                "transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease",
              fontFamily: "inherit",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 14px rgba(255,113,57,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 22px rgba(255,113,57,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(255,113,57,0.35)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Verify Certificate →
          </button>
        </div>

        {/* Subtle hint */}
        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.7rem",
            color: "var(--color-moz-gray-mid)",
          }}
        >
          Find your certificate ID in the email you received from us.
        </p>
      </div>
    </section>
  );
}

export default HomePage;
