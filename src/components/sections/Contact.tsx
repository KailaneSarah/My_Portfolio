"use client";

import { useRef } from "react";
import { SectionInner } from "@/components/layout/SectionWrapper";
import { useContactAnimation } from "@/hooks/useContactAnimation";
import { ContactBackground } from "@/components/ui/static/contact/ContactBackground";
import { ContactHeader }     from "@/components/ui/static/contact/ContactHeader";
import { ContactEmail }      from "@/components/ui/static/contact/ContactEmail";

export default function Contact() {
  const section = useRef<HTMLDivElement>(null);
  const line1   = useRef<HTMLSpanElement>(null);
  const line2   = useRef<HTMLSpanElement>(null);
  const email   = useRef<HTMLAnchorElement>(null);

  useContactAnimation({ section, line1, line2, email });

  return (
    <section ref={section} className="contact">
      <ContactBackground />

      <SectionInner className="contact__inner">
        <div className="contact__content">
          <ContactHeader line1={line1} line2={line2} />
          <ContactEmail emailRef={email} />
        </div>
      </SectionInner>
    </section>
  );
}