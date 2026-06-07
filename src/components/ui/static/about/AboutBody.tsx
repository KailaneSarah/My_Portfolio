"use client";

import { RefObject } from "react";

interface AboutBodyProps {
  bodyRef: RefObject<HTMLDivElement>;
}

export function AboutBody({ bodyRef }: AboutBodyProps) {
  return (
    <div ref={bodyRef} className="about__body">
      <p>
        Sou designer e desenvolvedor com foco em criar interfaces que
        equilibram estética refinada e experiências funcionais.
      </p>
      <p>
        Acredito que o bom design é invisível — ele guia as pessoas
        naturalmente, sem esforço. Cada detalhe importa, desde a
        tipografia até o timing das animações.
      </p>
    </div>
  );
}