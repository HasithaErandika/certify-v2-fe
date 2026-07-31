import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-transparent p-4 sm:px-8 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center hover:opacity-80 transition group">
            <img src="/logo.png" alt="SLIIT Mozilla Campus Club" className="h-10 object-contain" />
          </Link>
          <span className="hidden sm:block w-px h-10 bg-gray-200 mx-2"></span>
          <span className="hidden sm:block text-xs font-bold text-mozilla-orange tracking-widest uppercase">
            Certificate Portal
          </span>
        </div>
        <a
          href="https://sliitmozilla.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-gray-500 hover:text-mozilla-ink hover:border-gray-300 transition"
        >
          sliitmozilla.org
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </header>
  );
}
