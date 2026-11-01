import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
};

// Heading whose lines slide up out of a mask when scrolled into view.
export default function Lines({ lines, as: Tag = "h2", className, delay = 0, id }: Props) {
  return (
    <Tag id={id} className={className} data-reveal="lines" style={{ "--d": delay } as CSSProperties}>
      {lines.map((line, i) => (
        <span className="ln" key={i}>
          <span style={{ "--i": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
