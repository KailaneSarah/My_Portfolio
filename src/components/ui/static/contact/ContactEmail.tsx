import { RefObject } from "react";

const EMAIL = "kailaneSarah.developer@email.com";

interface ContactEmailProps {
  emailRef: RefObject<HTMLAnchorElement>;
}

export function ContactEmail({ emailRef }: ContactEmailProps) {
  return (
    <a ref={emailRef} href={`mailto:${EMAIL}`} className="contact__email">
      Entre em contato por: {EMAIL}
    </a>
  );
}