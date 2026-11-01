"use client";

import { useRef, useState, type CSSProperties } from "react";
import { about } from "@/lib/content";
import { useProgress } from "@/lib/useProgress";

const steps = about.process;
const N = steps.length;

// Pinned scroll sequence through the 6-D process with a hexagonal progress dial.
export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useProgress(
    ref,
    (p) => {
      ref.current?.style.setProperty("--pp", p.toFixed(4));
      setStep(Math.min(N - 1, Math.floor(p * N * 0.999)));
    },
    "pin"
  );

  return (
    <section ref={ref} className="proc" style={{ "--n": N } as CSSProperties} aria-labelledby="proc-h">
      <div className="proc__pin">
        <div className="wrap proc__in">
          <header className="proc__head">
            <p className="mono dim">(Method)</p>
            <h2 id="proc-h" className="proc__h">
              Our <em className="serif">6-D</em> Process
            </h2>
          </header>

          <div className="proc__stage">
            <div className="proc__num" aria-hidden="true">
              <span className="proc__digits" style={{ transform: `translateY(${-step}em)` }}>
                {steps.map((_, i) => (
                  <span key={i}>0{i + 1}</span>
                ))}
              </span>
            </div>

            <svg className="proc__hex" viewBox="0 0 200 200" aria-hidden="true">
              {steps.map((_, i) => {
                const a1 = ((i * 60 - 90) * Math.PI) / 180, a2 = (((i + 1) * 60 - 90) * Math.PI) / 180;
                const p = (a: number, r: number) => `${(100 + r * Math.cos(a)).toFixed(2)} ${(100 + r * Math.sin(a)).toFixed(2)}`;
                return <path key={i} d={`M${p(a1, 92)}L${p(a2, 92)}`} className={i <= step ? "is-lit" : ""} />;
              })}
              <polygon points="100,40 152,70 152,130 100,160 48,130 48,70" className="proc__hexin" />
              <text x="100" y="108" textAnchor="middle" className="proc__hexlabel">
                {steps[step].name.toUpperCase()}
              </text>
            </svg>

            <ol className="proc__list">
              {steps.map((s, i) => (
                <li key={s.name} className={i === step ? "is-active" : i < step ? "is-past" : ""}>
                  <h3>
                    <span className="mono">0{i + 1}.</span> {s.name}
                  </h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="proc__bar" aria-hidden="true">
            <span className="proc__fill" />
            {steps.map((s, i) => (
              <span key={s.name} className={`proc__tick${i <= step ? " is-lit" : ""}`} style={{ left: `${(i / (N - 1)) * 100}%` }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
