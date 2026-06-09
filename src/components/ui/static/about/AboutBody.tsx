"use client";

import { RefObject } from "react";

interface AboutBodyProps {
  bodyRef: RefObject<HTMLDivElement>;
}

export function AboutBody({ bodyRef }: AboutBodyProps) {
  return (
    <div ref={bodyRef} className="about__body">
      <p>
        Sou Kailane Sarah — desenvolvedora fullstack em formação,
        movida por construir coisas que funcionam de verdade para
        pessoas reais.
      </p>
      <p>
        Trabalho com React, Next.js, Flutter e WordPress, do front
        ao back, com atenção especial para acessibilidade. Tenho
        poucos projetos por enquanto, mas cada entrega foi feita com
        responsabilidade e atenção real ao problema que estava
        resolvendo.
      </p>
    </div>
  );
}