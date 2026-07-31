import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

function PreviewPage() {
  const { id } = useParams();
  const certificateId = id || "Not provided";
  const [certificateBlob, setCertificateBlob] = useState<Blob>();
  const [certificateImg, setCertificateImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = "";

    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_BACKEND_API}/certificate/${encodeURIComponent(certificateId)}/preview`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setError("Failed to fetch certificate preview");
          return;
        }

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        setCertificateImg(objectUrl);
        setCertificateBlob(blob);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          return;
        }
        setError("Error fetching certificate preview");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();

    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [certificateId]);

  const handleDownload = () => {
    if (!certificateBlob) return;

    const fileUrl = URL.createObjectURL(certificateBlob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `certificate-${certificateId}.pdf`;
    link.click();
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 140px)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "#f7f7fa",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              fontWeight: 700,
              color: "var(--color-moz-black)",
              letterSpacing: "-0.02em",
            }}
          >
            Certificate Preview
          </h1>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.8rem",
              color: "var(--color-moz-gray-mid)",
              fontFamily: "monospace",
            }}
          >
            ID: {certificateId}
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
          {/* Back link */}
          <Link
            id="back-to-home-link"
            to="/"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1.5px solid var(--color-moz-gray-light)",
              background: "#ffffff",
              color: "var(--color-moz-gray-mid)",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-moz-gray)";
              e.currentTarget.style.color = "var(--color-moz-black)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-moz-gray-light)";
              e.currentTarget.style.color = "var(--color-moz-gray-mid)";
            }}
          >
            ← Back
          </Link>

          {/* Download button */}
          <button
            id="download-certificate-button"
            onClick={handleDownload}
            disabled={!certificateBlob}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: certificateBlob
                ? "linear-gradient(135deg, var(--color-moz-orange) 0%, var(--color-moz-orange-mid) 100%)"
                : "var(--color-moz-gray-light)",
              color: certificateBlob ? "#fff" : "var(--color-moz-gray)",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: certificateBlob ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              fontFamily: "inherit",
              boxShadow: certificateBlob
                ? "0 2px 10px rgba(255,113,57,0.3)"
                : "none",
            }}
            onMouseEnter={(e) => {
              if (certificateBlob) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 18px rgba(255,113,57,0.45)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = certificateBlob
                ? "0 2px 10px rgba(255,113,57,0.3)"
                : "none";
            }}
          >
            ↓ Download PDF
          </button>
        </div>
      </div>

      {/* Status messages */}
      {loading && (
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "var(--color-moz-gray-mid)",
              fontSize: "0.9rem",
              padding: "2rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: "spin 1s linear infinite",
              }}
            >
              ⟳
            </span>{" "}
            Loading certificate…
          </p>
        </div>
      )}

      {error && (
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#c0392b",
              fontSize: "0.9rem",
              padding: "1.5rem",
              background: "#fdf0ef",
              borderRadius: "0.75rem",
              border: "1px solid #f5c6c2",
            }}
          >
            ⚠ {error}
          </p>
        </div>
      )}

      {/* PDF viewer */}
      {certificateImg && !loading && !error && (
        <div
          style={{
            flex: 1,
            maxWidth: "72rem",
            margin: "0 auto",
            width: "100%",
            minHeight: 0,
            borderRadius: "1rem",
            overflow: "hidden",
            border: "1px solid var(--color-moz-gray-light)",
            background: "#ffffff",
            boxShadow:
              "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(89,42,203,0.06)",
            padding: "0.5rem",
          }}
        >
          <PDFViewer url={certificateImg} />
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default PreviewPage;
