import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Template {
  id: number;
  template_name: string;
  template_for?: string;
  event_name?: string;
}

interface FormData {
  template_id: string;
  recipient_name: string;
  recipient_email: string;
  issue_reason: string;
  event_name: string;
  event_date: string;
  event_location: string;
  issuer_name: string;
  course_name: string;
  notes: string;
}

const EMPTY_FORM: FormData = {
  template_id: "",
  recipient_name: "",
  recipient_email: "",
  issue_reason: "",
  event_name: "",
  event_date: "",
  event_location: "",
  issuer_name: "",
  course_name: "",
  notes: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  borderRadius: "0.5rem",
  border: "1.5px solid var(--color-moz-gray-light)",
  background: "#f7f7fa",
  color: "var(--color-moz-black)",
  fontSize: "0.875rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-moz-orange)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,113,57,0.12)";
    e.currentTarget.style.background = "#ffffff";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-moz-gray-light)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "#f7f7fa";
  },
};

function Field({
  label,
  required,
  children,
}: Readonly<{ label: string; required?: boolean; children: React.ReactNode }>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <label
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--color-moz-gray-dark)",
          letterSpacing: "0.03em",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--color-moz-orange)", marginLeft: "0.2rem" }}>*</span>
        )}
      </label>
      {children}
    </div>
  );
}

{/* Page */}

export default function IssueCertificatePage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templatesError, setTemplatesError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [issuedId, setIssuedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setTemplatesLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_BACKEND_API}/admin/templates`,
        );
        if (!res.ok) throw new Error("Could not load templates");
        const data = await res.json() as Template[] | { data: Template[] };
        const list = Array.isArray(data) ? data : (data as { data: Template[] }).data ?? [];
        setTemplates(list);
      } catch {
        setTemplatesError("Could not load templates — enter template ID manually.");
      } finally {
        setTemplatesLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.template_id || !form.recipient_name || !form.recipient_email) return;

    try {
      setSubmitting(true);
      setSubmitError("");
      setIssuedId(null);

      const payload: Record<string, unknown> = {
        template_id: Number(form.template_id),
        recipient_name: form.recipient_name.trim(),
        recipient_email: form.recipient_email.trim(),
      };

      (
        [
          "issue_reason",
          "event_name",
          "event_date",
          "event_location",
          "issuer_name",
          "course_name",
          "notes",
        ] as const
      ).forEach((key) => {
        if (form[key].trim()) payload[key] = form[key].trim();
      });

      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_BACKEND_API}/admin/add/certificate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(err.message ?? `Server error ${res.status}`);
      }

      const result = await res.json() as { certificate_id?: string; data?: { certificate_id?: string } };
      const certId =
        result.certificate_id ?? result.data?.certificate_id ?? null;

      if (!certId) throw new Error("No certificate ID returned by the server.");

      setIssuedId(certId);
      setForm(EMPTY_FORM);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (issuedId) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          backgroundColor: "#f7f7fa",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid var(--color-moz-gray-light)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            maxWidth: "30rem",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(89,42,203,0.06)",
          }}
        >
          {/* Checkmark */}
          <div
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "50%",
              background: "rgba(255,113,57,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              fontSize: "1.5rem",
            }}
          >
            ✓
          </div>

          <h2
            style={{
              margin: "0 0 0.5rem",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--color-moz-black)",
            }}
          >
            Certificate Issued!
          </h2>
          <p style={{ color: "var(--color-moz-gray-mid)", fontSize: "0.875rem", margin: "0 0 1.5rem" }}>
            The certificate has been created successfully.
          </p>

          {/* ID chip */}
          <div
            style={{
              background: "#f7f7fa",
              border: "1px solid var(--color-moz-gray-light)",
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--color-moz-gray-mid)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Certificate ID
            </p>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontFamily: "monospace",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-moz-black)",
                wordBreak: "break-all",
              }}
            >
              {issuedId}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}>
            <Link
              id="view-certificate-link"
              to={`/certificates/${encodeURIComponent(issuedId)}`}
              style={{
                display: "block",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, var(--color-moz-orange) 0%, var(--color-moz-orange-mid) 100%)",
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.9rem",
                boxShadow: "0 4px 14px rgba(255,113,57,0.3)",
              }}
            >
              View Certificate →
            </Link>
            <button
              id="issue-another-button"
              onClick={() => setIssuedId(null)}
              style={{
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "1.5px solid var(--color-moz-gray-light)",
                background: "transparent",
                color: "var(--color-moz-gray-mid)",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.9rem",
                fontFamily: "inherit",
              }}
            >
              Issue Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="scrollbar-hidden"
      style={{
        height: "calc(100vh - 140px)",
        overflowY: "auto",
        padding: "2rem 1.5rem",
        backgroundColor: "#f7f7fa",
      }}
    >
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "var(--color-moz-black)",
              letterSpacing: "-0.02em",
            }}
          >
            Issue Certificate
          </h1>
          <p style={{ margin: "0.375rem 0 0", fontSize: "0.875rem", color: "var(--color-moz-gray-mid)" }}>
            Fill in the details below to issue a new certificate to a recipient.
          </p>
        </div>

        <form
          id="issue-certificate-form"
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Section: Template */}
          <section
            style={{
              background: "#ffffff",
              border: "1px solid var(--color-moz-gray-light)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <h2 style={{ margin: "0 0 1rem", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-moz-black)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Template
            </h2>

            <Field label="Template" required>
              {templatesLoading ? (
                <div
                  style={{
                    ...inputStyle,
                    color: "var(--color-moz-gray-mid)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Loading templates…
                </div>
              ) : templates.length > 0 ? (
                <select
                  id="template-select"
                  required
                  value={form.template_id}
                  onChange={set("template_id")}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  {...focusHandlers}
                >
                  <option value="">Select a template…</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.template_name}
                      {t.template_for ? ` — ${t.template_for}` : ""}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  {templatesError && (
                    <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", color: "#c0392b" }}>
                      ⚠ {templatesError}
                    </p>
                  )}
                  <input
                    id="template-id-input"
                    type="number"
                    min="1"
                    required
                    placeholder="Enter template ID"
                    value={form.template_id}
                    onChange={set("template_id")}
                    style={inputStyle}
                    {...focusHandlers}
                  />
                </>
              )}
            </Field>
          </section>

          {/* Section: Recipient */}
          <section
            style={{
              background: "#ffffff",
              border: "1px solid var(--color-moz-gray-light)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <h2 style={{ margin: "0 0 1rem", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-moz-black)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Recipient
            </h2>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))" }}>
              <Field label="Full Name" required>
                <input
                  id="recipient-name-input"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.recipient_name}
                  onChange={set("recipient_name")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
              <Field label="Email" required>
                <input
                  id="recipient-email-input"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.recipient_email}
                  onChange={set("recipient_email")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
            </div>
          </section>

          {/* Section: Event Details */}
          <section
            style={{
              background: "#ffffff",
              border: "1px solid var(--color-moz-gray-light)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <h2 style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-moz-black)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Event Details
            </h2>
            <p style={{ margin: "0 0 1rem", fontSize: "0.78rem", color: "var(--color-moz-gray-mid)" }}>
              All fields in this section are optional.
            </p>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))" }}>
              <Field label="Issue Reason">
                <input
                  id="issue-reason-input"
                  type="text"
                  placeholder="e.g. participation"
                  value={form.issue_reason}
                  onChange={set("issue_reason")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
              <Field label="Event Name">
                <input
                  id="event-name-input"
                  type="text"
                  placeholder="e.g. AI Workshop 2026"
                  value={form.event_name}
                  onChange={set("event_name")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
              <Field label="Event Date">
                <input
                  id="event-date-input"
                  type="date"
                  value={form.event_date}
                  onChange={set("event_date")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
              <Field label="Event Location">
                <input
                  id="event-location-input"
                  type="text"
                  placeholder="e.g. Colombo"
                  value={form.event_location}
                  onChange={set("event_location")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
              <Field label="Issuer Name">
                <input
                  id="issuer-name-input"
                  type="text"
                  placeholder="e.g. SLIIT Mozilla Club"
                  value={form.issuer_name}
                  onChange={set("issuer_name")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
              <Field label="Course Name">
                <input
                  id="course-name-input"
                  type="text"
                  placeholder="e.g. Prompt Engineering"
                  value={form.course_name}
                  onChange={set("course_name")}
                  style={inputStyle}
                  {...focusHandlers}
                />
              </Field>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Field label="Notes">
                <textarea
                  id="notes-input"
                  placeholder="Any additional notes…"
                  rows={3}
                  value={form.notes}
                  onChange={set("notes")}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "5rem",
                  }}
                  {...focusHandlers}
                />
              </Field>
            </div>
          </section>

          {submitError && (
            <div
              style={{
                padding: "0.875rem 1rem",
                borderRadius: "0.75rem",
                background: "#fdf0ef",
                border: "1px solid #f5c6c2",
                color: "#c0392b",
                fontSize: "0.875rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "flex-start",
              }}
            >
              <span>⚠</span>
              <span>{submitError}</span>
            </div>
          )}

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "2rem" }}>
            <button
              id="submit-certificate-button"
              type="submit"
              disabled={submitting || !form.template_id || !form.recipient_name || !form.recipient_email}
              style={{
                padding: "0.75rem 2rem",
                borderRadius: "0.75rem",
                border: "none",
                background:
                  submitting || !form.template_id || !form.recipient_name || !form.recipient_email
                    ? "var(--color-moz-gray-light)"
                    : "linear-gradient(135deg, var(--color-moz-orange) 0%, var(--color-moz-orange-mid) 100%)",
                color:
                  submitting || !form.template_id || !form.recipient_name || !form.recipient_email
                    ? "var(--color-moz-gray)"
                    : "#fff",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor:
                  submitting || !form.template_id || !form.recipient_name || !form.recipient_email
                    ? "not-allowed"
                    : "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
                boxShadow:
                  submitting || !form.template_id || !form.recipient_name || !form.recipient_email
                    ? "none"
                    : "0 4px 14px rgba(255,113,57,0.35)",
              }}
            >
              {submitting ? "Issuing…" : "Issue Certificate →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
