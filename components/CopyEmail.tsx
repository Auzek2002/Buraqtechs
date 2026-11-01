"use client";

import { useState } from "react";
import { site } from "@/lib/content";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${site.email}`;
    }
  };
  return (
    <button className="reach__big" onClick={copy} data-cursor={copied ? "Copied" : "Copy"}>
      {site.email}
      <span className="mono reach__hint">{copied ? "Copied ✓" : "Click to copy"}</span>
    </button>
  );
}
