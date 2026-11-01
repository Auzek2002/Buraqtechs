"use client";

import { useRef } from "react";
import { heroText, site } from "@/lib/content";
import { useProgress } from "@/lib/useProgress";
import Clock from "./Clock";
import Lines from "./Lines";
import Magnetic from "./Magnetic";
import { TLink } from "./Transition";
import WarpField from "./WarpField";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  useProgress(ref, (p) => ref.current?.style.setProperty("--hp", (Math.max(0, p - 0.5) * 2).toFixed(4)));

  return (
    <section ref={ref} className="hero">
      <div className="hero__bg" aria-hidden="true">
        <WarpField />
        <div className="hero__shade" />
      </div>

      <div className="wrap hero__in">
        <div className="hero__top mono">
          <p className="kicker" data-reveal>
            <span className="kicker__dot" /> {site.tagline}
          </p>
          <p className="hero__coords dim" data-reveal style={{ ["--d" as string]: 120 }}>
            {site.coords}
          </p>
        </div>

        <Lines
          as="h1"
          className="hero__title"
          delay={120}
          lines={[
            <>We Create <span className="hero__amp">&amp;</span></>,
            "Scale Your",
            <>Business <em className="serif hero__accent">Digitally</em></>,
          ]}
        />

        <div className="hero__foot">
          <p className="hero__text" data-reveal style={{ ["--d" as string]: 520 }}>
            {heroText}
          </p>
          <div className="hero__cta" data-reveal style={{ ["--d" as string]: 620 }}>
            <Magnetic>
              <TLink href="/contact/" className="btn btn--volt btn--lg" data-cursor="Let's go">
                <span className="roll" data-t="Get Started">
                  <span>Get Started</span>
                </span>
                <span aria-hidden="true">→</span>
              </TLink>
            </Magnetic>
            <TLink href="/services/" className="btn btn--ghost btn--lg">
              <span className="roll" data-t="Our services">
                <span>Our services</span>
              </span>
            </TLink>
          </div>
          <div className="hero__meta mono dim" data-reveal style={{ ["--d" as string]: 720 }}>
            <span>Karachi <Clock /></span>
            <span className="hero__scroll">
              Scroll <i aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
