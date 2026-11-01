import { TLink } from "@/components/Transition";
import WarpField from "@/components/WarpField";

export default function NotFound() {
  return (
    <section className="hero nf">
      <div className="hero__bg" aria-hidden="true">
        <WarpField originX={0.5} originY={0.5} density={0.7} />
        <div className="hero__shade" />
      </div>
      <div className="wrap nf__in">
        <p className="mono dim">Error 404</p>
        <h1 className="nf__title">
          Lost at <em className="serif">light speed.</em>
        </h1>
        <TLink href="/" className="btn btn--volt btn--lg">Back to home →</TLink>
      </div>
    </section>
  );
}
