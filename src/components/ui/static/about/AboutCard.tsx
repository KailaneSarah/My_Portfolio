"use client";

import { RefObject } from "react";
import ProfileCard from "@/components/ui/animated/ProfileCard";
import { useLanguage } from "@/context/LanguageContext";

interface AboutCardProps {
  cardRef: RefObject<HTMLDivElement>;
}

export function AboutCard({ cardRef }: AboutCardProps) {
  const { t } = useLanguage();

  return (
    <div ref={cardRef} className="about__card-wrapper">
      <ProfileCard
        name="Sarah"
        title="Designer & Developer"
        handle="sarahdev"
        status={t.about.status}
        contactText={t.about.contactCard}
        avatarUrl="/Image.png"
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