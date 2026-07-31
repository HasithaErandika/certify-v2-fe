/* Mozilla Firefox SVG logo – used in AppLayout header */
export const FirefoxLogoSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="32"
    height="32"
    aria-label="Mozilla Firefox logo"
    role="img"
  >
    <defs>
      <radialGradient
        id="ff-grad-a"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%"
      >
        <stop offset="0%" stopColor="#ff980e" />
        <stop offset="100%" stopColor="#ff7139" />
      </radialGradient>
    </defs>
    <circle cx="256" cy="256" r="256" fill="url(#ff-grad-a)" opacity=".15" />
    <path
      d="M424 204c-8-72-64-132-136-148 12 20 20 44 20 68 0 68-52 124-120 132C124 264 72 220 56 160c-4 16-8 32-8 48 0 112 92 204 204 204 12 0 24-1 36-3 72-14 128-74 136-148v-56z"
      fill="#ff7139"
    />
    <path
      d="M256 48c-4 0-8 0-12 1 32 8 60 24 84 48-16-12-36-20-56-20-52 0-96 40-100 92-4 44 24 84 64 96 4 0 8 1 12 1 44 0 80-32 84-76 0-4 0-8 0-12 0-32-12-60-32-84C284 64 272 56 256 48z"
      fill="#592acb"
      opacity=".85"
    />
  </svg>
);
