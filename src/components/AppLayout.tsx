import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

/* ─── AppLayout ─── */
interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <div className="flex h-screen overflow-hidden flex-col" style={{ backgroundColor: "var(--color-moz-white)" }}>
      {/* ── Header ── */}
      <header
        id="site-header"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid var(--color-moz-gray-light)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Club brand */}
          <Link
            to="/"
            className="flex items-center gap-2 no-underline sm:gap-3"
            aria-label="SLIIT Mozilla Club home"
          >
            <img
              src="https://www.sliitmozilla.org/assets/Mozilla-logo.png"
              alt="Mozilla logo"
              style={{ display: "block", height: "clamp(24px, 5vw, 36px)", width: "auto" }}
            />
            <span
              className="hidden sm:block"
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "var(--color-moz-orange-mid)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Certificate Portal
            </span>
          </Link>

          {/* External link to club site */}
          <a
            href="https://sliitmozilla.org"
            target="_blank"
            rel="noopener noreferrer"
            id="header-club-link"
            style={{
              fontWeight: 600,
              color: "var(--color-moz-gray-mid)",
              textDecoration: "none",
              border: "1px solid var(--color-moz-gray-light)",
              borderRadius: "9999px",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs sm:px-4 sm:py-1.5 sm:text-sm"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-moz-orange)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-moz-orange)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-moz-gray-mid)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-moz-gray-light)";
            }}
          >
            <span className="hidden sm:inline">sliitmozilla.org</span>
            <span>↗</span>
          </a>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 flex flex-col min-h-0">{children}</main>

      {/* ── Footer ── */}
      <footer
        id="site-footer"
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid var(--color-moz-gray-light)",
        }}
      >
        <div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row"
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.8rem",
              color: "var(--color-moz-gray-mid)",
            }}
          >
            © {new Date().getFullYear()} SLIIT Mozilla Club · Certify Platform
          </p>

          {/* Social links */}
          <nav aria-label="SLIIT Mozilla Club social links">
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                gap: "1rem",
              }}
            >
              {[
                {
                  id: "footer-github",
                  href: "https://github.com/sliitmozillaclub",
                  label: "GitHub",
                  Icon: FaGithub,
                },
                {
                  id: "footer-instagram",
                  href: "https://instagram.com/sliitmozillaclub",
                  label: "Instagram",
                  Icon: FaInstagram,
                },
                {
                  id: "footer-linkedin",
                  href: "https://linkedin.com/company/sliitmozillaclub",
                  label: "LinkedIn",
                  Icon: FaLinkedin,
                },
              ].map(({ id, href, label, Icon }) => (
                <li key={id}>
                  <a
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`SLIIT Mozilla Club on ${label}`}
                    style={{
                      color: "var(--color-moz-gray-mid)",
                      display: "flex",
                      alignItems: "center",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-moz-orange)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-moz-gray-mid)";
                    }}
                  >
                    <Icon size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
