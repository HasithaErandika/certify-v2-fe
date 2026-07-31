import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-transparent py-6 px-4 sm:px-8 mt-auto relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-gray-400">
          &copy; {new Date().getFullYear()} SLIIT Mozilla Club &middot; Certify Platform
        </p>
        <div className="flex gap-4 text-gray-400">
          <a href="#" className="hover:text-mozilla-ink transition">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-mozilla-orange transition">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
