import { helpSubtitle, site } from "@/lib/content";
import Lines from "./Lines";
import Magnetic from "./Magnetic";
import { TLink } from "./Transition";

export default function CTA() {
  return (
    <section className="cta" aria-labelledby="cta-h">
      <div className="cta__glow" aria-hidden="true" />
      <div className="wrap cta__in">
        <p className="mono kicker" data-reveal>
          <span className="kicker__dot" /> Start a project
        </p>
        <Lines
          id="cta-h"
          className="cta__title"
          lines={["Would you like", <>to start a <em className="serif">project</em></>, "with us?"]}
        />
        <div className="cta__row">
          <div className="cta__copy" data-reveal style={{ ["--d" as string]: 200 }}>
            <p className="cta__sub">
              We enable you and your desired audience to achieve. <span className="dim">{helpSubtitle[1]}.</span>
            </p>
            <p className="dim">
              We take your company from scratch, create its identity from the ground up and make it an ideal brand for your target clients.
            </p>
          </div>
          <div className="cta__actions" data-reveal style={{ ["--d" as string]: 300 }}>
            <Magnetic>
              <a href={`tel:${site.phone}`} className="btn btn--volt btn--lg" data-cursor="Call">
                <span className="roll" data-t={site.phone}>
                  <span>{site.phone}</span>
                </span>
              </a>
            </Magnetic>
            <TLink href="/contact/" className="orbit" data-cursor="Write">
              <svg viewBox="0 0 120 120" className="orbit__ring" aria-hidden="true">
                <defs>
                  <path id="orbit-p" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
                </defs>
                <text>
                  <textPath href="#orbit-p" textLength="286" lengthAdjust="spacing">Send a request · Send a request · </textPath>
                </text>
              </svg>
              <span className="orbit__arrow" aria-hidden="true">→</span>
              <span className="sr-only">Send a request</span>
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
