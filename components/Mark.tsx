// Vector redraw of the Buraqtech bar-chart mark.
export default function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 40 36" aria-hidden="true" className="mark">
      <rect className="mark__b" x="2" y="15" width="7" height="15" fill="#a9b4ff" />
      <path className="mark__b" d="M11 6h8v24h-8z" fill="#7686ec" />
      <rect className="mark__b" x="21" y="11" width="7" height="19" fill="#a9b4ff" />
      <rect className="mark__b" x="30" y="2" width="8" height="28" fill="#6a7bd8" />
      <path d="M1 34.5 15 29.5l6 1.6L35 21" stroke="#9be33a" strokeWidth="3.2" fill="none" strokeLinejoin="round" />
      <path d="M30.5 19.6 38.6 17l-2 8.3z" fill="#9be33a" />
    </svg>
  );
}
