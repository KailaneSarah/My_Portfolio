import { RefObject } from "react";

interface ContactHeaderProps {
  line1: RefObject<HTMLSpanElement>;
  line2: RefObject<HTMLSpanElement>;
}

export function ContactHeader({ line1, line2 }: ContactHeaderProps) {
  return (
    <>
      <span className="tag">Contact</span>

      <div className="contact__big">
        <span className="line">
          <span ref={line1}>Vamos</span>
        </span>
        <span className="line">
          <span ref={line2}>trabalhar.</span>
        </span>
      </div>
    </>
  );
}