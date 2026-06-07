"use client";

import { RefObject } from "react";
import ProfileCard from "@/components/ui/animated/ProfileCard";

interface AboutCardProps {
  cardRef: RefObject<HTMLDivElement>;
}

export function AboutCard({ cardRef }: AboutCardProps) {
  return (
    <div ref={cardRef} className="about__card-wrapper">
      <ProfileCard
        name="Sarah"
        title="Designer & Developer"
        handle="sarahdev"
        status="Available"
        contactText="Contato"
        avatarUrl="https://i.pravatar.cc/1000"
        iconUrl="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
        grainUrl="https://www.transparenttextures.com/patterns/asfalt-dark.png"
        showUserInfo
        showBehindGradient
        enableTilt
        onContactClick={() => {
          document
            .querySelector(".contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}