import type { ReactNode } from "react";
import Dial from "./Dial";
import Lines from "./Lines";

type Props = { index: string; label: string; title: ReactNode[]; kicker: string; text: string; readout: [string, string] };

export default function PageHero({ index, label, title, kicker, text, readout }: Props) {
  return (
    <section className="phero">
      <div className="phero__grid" aria-hidden="true" />
      <Dial readout={readout} />
      <div className="wrap phero__in">
        <p className="mono phero__label" data-reveal>
          <span className="dim">({index})</span> {label}
        </p>
        <Lines as="h1" className="phero__title" lines={title} delay={60} />
        <div className="phero__foot">
          <p className="mono kicker" data-reveal style={{ ["--d" as string]: 260 }}>
            <span className="kicker__dot" /> {kicker}
          </p>
          <p className="phero__text" data-reveal style={{ ["--d" as string]: 340 }}>
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
