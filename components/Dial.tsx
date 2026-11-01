// Instrument-style rotating dial used behind interior page heroes.
const TICKS = 120;

export default function Dial({ readout }: { readout: [string, string] }) {
  return (
    <div className="dial" aria-hidden="true">
      <svg viewBox="0 0 400 400" className="dial__spin">
        <circle cx="200" cy="200" r="196" className="dial__ring" />
        <circle cx="200" cy="200" r="150" className="dial__ring dial__ring--in" />
        {Array.from({ length: TICKS }, (_, i) => {
          const major = i % 10 === 0;
          return (
            <line
              key={i}
              x1="200"
              y1={major ? 8 : 14}
              x2="200"
              y2="24"
              className={major ? "dial__tick dial__tick--maj" : "dial__tick"}
              transform={`rotate(${(i * 360) / TICKS} 200 200)`}
            />
          );
        })}
        <path d="M200 50a150 150 0 0 1 130 75" className="dial__arc" />
      </svg>
      <svg viewBox="0 0 400 400" className="dial__counter">
        <circle cx="200" cy="200" r="110" className="dial__ring dial__ring--dash" />
        <circle cx="200" cy="90" r="5" className="dial__dot" />
      </svg>
      <div className="dial__read mono">
        <strong>{readout[0]}</strong>
        <span>{readout[1]}</span>
      </div>
    </div>
  );
}
