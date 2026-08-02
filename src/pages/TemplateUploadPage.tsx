import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
} from "lucide-react";

function TemplateUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fontSize, setFontSize] = useState("");
  const [fontColor, setFontColor] = useState("#161616");
  const [nameXPos, setNameXPos] = useState("");
  const [nameYPos, setNameYPos] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateFor, setTemplateFor] = useState("");
  const [eventName, setEventName] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const resetForm = () => {
    setFile(null);
    setFontSize("");
    setFontColor("#161616");
    setNameXPos("");
    setNameYPos("");
    setTemplateName("");
    setTemplateFor("");
    setEventName("");
    setIssuerName("");
    setNotes("");
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!file || !fontSize || !fontColor || !nameXPos || !nameYPos) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("template", file);
    formData.append("font_size", fontSize);
    formData.append("font_color", fontColor);
    formData.append("name_x_pos", nameXPos);
    formData.append("name_y_pos", nameYPos);
    if (templateName) formData.append("template_name", templateName);
    if (templateFor) formData.append("template_for", templateFor);
    if (eventName) formData.append("event_name", eventName);
    if (issuerName) formData.append("issuer_name", issuerName);
    if (notes) formData.append("notes", notes);

    try {
      setSubmitting(true);
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_BACKEND_API}/admin/add/template`,
        { method: "POST", body: formData },
      );

      if (!response.ok) {
        setError("Failed to upload template.");
        return;
      }

      setSuccess(true);
      resetForm();
    } catch {
      setError("Something went wrong while uploading the template.");
    } finally {
      setSubmitting(false);
    }
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
        overflowY: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "48rem",
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
            New Certificate Template
          </h1>
        </div>

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
      </div>

      {success && (
        <div style={{ maxWidth: "48rem", margin: "0 auto", width: "100%" }}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#1e7e42",
              fontSize: "0.85rem",
              padding: "0.9rem 1.25rem",
              background: "#eefaf1",
              borderRadius: "0.75rem",
              border: "1px solid #bfe8cc",
              margin: 0,
            }}
          >
            <CheckCircle2 size={18} /> Template uploaded successfully.
          </p>
        </div>
      )}

      {error && (
        <div style={{ maxWidth: "48rem", margin: "0 auto", width: "100%" }}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#c0392b",
              fontSize: "0.85rem",
              padding: "0.9rem 1.25rem",
              background: "#fdf0ef",
              borderRadius: "0.75rem",
              border: "1px solid #f5c6c2",
              margin: 0,
            }}
          >
            <AlertCircle size={18} /> {error}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          width: "100%",
          background: "#ffffff",
          border: "1px solid var(--color-moz-gray-light)",
          borderRadius: "1rem",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <label htmlFor="template-file-input" className="form-label">
            Template File{" "}
            <span style={{ color: "var(--color-moz-orange)" }}>*</span>
          </label>
          <label htmlFor="template-file-input" className="dropzone">
            {file ? (
              <FileText size={22} color="var(--color-moz-orange)" />
            ) : (
              <Upload size={22} color="var(--color-moz-gray-mid)" />
            )}
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--color-moz-black)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {file ? file.name : "Click to choose a PDF or image"}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.7rem",
                  color: "var(--color-moz-gray-mid)",
                }}
              >
                PDF, PNG or JPG
              </p>
            </div>
            <input
              id="template-file-input"
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <div>
            <label htmlFor="font-size-input" className="form-label">
              Font Size{" "}
              <span style={{ color: "var(--color-moz-orange)" }}>*</span>
            </label>
            <input
              id="font-size-input"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="font-color-input" className="form-label">
              Font Color{" "}
              <span style={{ color: "var(--color-moz-orange)" }}>*</span>
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                id="font-color-picker"
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="color-picker"
              />
              <input
                id="font-color-input"
                type="text"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="form-input color-hex"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name-x-pos-input" className="form-label">
              Name X Position{" "}
              <span style={{ color: "var(--color-moz-orange)" }}>*</span>
            </label>
            <input
              id="name-x-pos-input"
              type="number"
              value={nameXPos}
              onChange={(e) => setNameXPos(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="name-y-pos-input" className="form-label">
              Name Y Position{" "}
              <span style={{ color: "var(--color-moz-orange)" }}>*</span>
            </label>
            <input
              id="name-y-pos-input"
              type="number"
              value={nameYPos}
              onChange={(e) => setNameYPos(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <p
            style={{
              margin: "0 0 0.9rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--color-moz-gray-mid)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              borderTop: "1px solid var(--color-moz-gray-light)",
              paddingTop: "1.25rem",
            }}
          >
            Optional Metadata
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label htmlFor="template-name-input" className="form-label">
                Template Name
              </label>
              <input
                id="template-name-input"
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="template-for-input" className="form-label">
                Template For
              </label>
              <input
                id="template-for-input"
                type="text"
                value={templateFor}
                onChange={(e) => setTemplateFor(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="event-name-input" className="form-label">
                Event Name
              </label>
              <input
                id="event-name-input"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="issuer-name-input" className="form-label">
                Issuer Name
              </label>
              <input
                id="issuer-name-input"
                type="text"
                value={issuerName}
                onChange={(e) => setIssuerName(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes-input" className="form-label">
              Notes
            </label>
            <textarea
              id="notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="form-input textarea-input"
            />
          </div>
        </div>

        <button
          id="submit-template-button"
          type="submit"
          disabled={submitting}
          className="submit-btn"
          style={{
            padding: "0.7rem",
            borderRadius: "0.5rem",
            border: "none",
            background: submitting
              ? "var(--color-moz-gray-light)"
              : "linear-gradient(135deg, var(--color-moz-orange) 0%, var(--color-moz-orange-mid) 100%)",
            color: submitting ? "var(--color-moz-gray)" : "#fff",
            fontSize: "0.9rem",
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Uploading…
            </>
          ) : (
            "Upload Template"
          )}
        </button>
      </form>

      <style>{`
        .form-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-moz-gray-dark);
          text-align: left;
          margin-bottom: 0.4rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .form-input {
          width: 100%;
          padding: 0.55rem 0.75rem;
          border-radius: 0.4rem;
          border: 1px solid #d4d4d4;
          background: #f7f7fa;
          color: var(--color-moz-black);
          font-size: 0.85rem;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
          font-family: inherit;
        }
        .form-input:focus {
          border-color: var(--color-moz-orange);
        }
        .textarea-input {
          resize: vertical;
        }
        .color-picker {
          width: 2.6rem;
          height: 2.3rem;
          padding: 0.2rem;
          border-radius: 0.4rem;
          border: 1px solid #d4d4d4;
          background: #f7f7fa;
          cursor: pointer;
          box-sizing: border-box;
        }
        .color-hex {
          flex: 1;
          height: 2.3rem;
        }
        .dropzone {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 0.6rem;
          border: 1px dashed #d4d4d4;
          background: #f7f7fa;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }
        .dropzone:hover {
          border-color: var(--color-moz-orange);
        }
        .submit-btn {
          transition: transform 0.15s ease;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

export default TemplateUploadPage;
