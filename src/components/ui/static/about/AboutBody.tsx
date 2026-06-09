"use client";

import { RefObject } from "react";

interface AboutBodyProps {
  bodyRef: RefObject<HTMLDivElement>;
}

export function AboutBody({ bodyRef }: AboutBodyProps) {
  return (
    <div ref={bodyRef} className="about__body">
      <p>
        Sou Kailane Sarah, desenvolvedora fullstack e estudante
        apaixonada por construir produtos digitais que unem código
        sólido e design com intenção.
      </p>
      <p>
        Trabalho do front ao back — React, Next.js, Flutter, WordPress —
        sempre com atenção à acessibilidade e à experiência de quem
        vai usar o que eu construo. Por enquanto são poucos projetos,
        mas cada um foi entregue com cuidado e propósito.
      </p>
    </div>
  );
}