"use client";

import {
  useRef,
  useEffect,
  useCallback,
  CSSProperties,
} from "react";

import styles from "@/styles/ProfileCard.module.css";

interface ProfileCardProps {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  className?: string;
  enableTilt?: boolean;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e55 0%,#71C4FF22 100%)";

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));

export default function ProfileCard({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const updateCardTransform = useCallback(
    (offsetX: number, offsetY: number) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;

      if (!card || !wrap) return;

      const width = card.clientWidth;
      const height = card.clientHeight;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      wrap.style.setProperty("--pointer-x", `${percentX}%`);
      wrap.style.setProperty("--pointer-y", `${percentY}%`);

      wrap.style.setProperty(
        "--pointer-from-center",
        `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`
      );

      wrap.style.setProperty(
        "--pointer-from-top",
        `${percentY / 100}`
      );

      wrap.style.setProperty(
        "--pointer-from-left",
        `${percentX / 100}`
      );

      wrap.style.setProperty(
        "--rotate-x",
        `${round(-(centerX / 6))}deg`
      );

      wrap.style.setProperty(
        "--rotate-y",
        `${round(centerY / 5)}deg`
      );
    },
    []
  );

  useEffect(() => {
    if (!enableTilt) return;

    const card = cardRef.current;

    if (!card) return;

    const onMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();

      updateCardTransform(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
    };

    const onLeave = () => {
      const wrap = wrapRef.current;

      if (!wrap) return;

      wrap.style.setProperty("--rotate-x", "0deg");
      wrap.style.setProperty("--rotate-y", "0deg");

      wrap.style.setProperty("--pointer-x", "50%");
      wrap.style.setProperty("--pointer-y", "50%");
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, [enableTilt, updateCardTransform]);

  const wrapStyle: CSSProperties & Record<string, string> = {
    "--icon": iconUrl ? `url(${iconUrl})` : "none",
    "--grain": grainUrl ? `url(${grainUrl})` : "none",

    "--behind-gradient": showBehindGradient
      ? behindGradient ?? DEFAULT_BEHIND_GRADIENT
      : "none",

    "--inner-gradient":
      innerGradient ?? DEFAULT_INNER_GRADIENT,
  };

  return (
    <div
      ref={wrapRef}
      className={`${styles.pcCardWrapper} ${className}`}
      style={wrapStyle}
    >
      <section
        ref={cardRef}
        className={styles.pcCard}
      >
        <div className={styles.pcAvatarContainer}>
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={name}
            draggable={false}
          />
        </div>

        <div className={styles.pcInside}>
          <div className={styles.pcShine} />
          <div className={styles.pcGlare} />

        </div>

        {showUserInfo && (
          <div className={styles.pcUserInfo}>
            <div className={styles.pcUserDetails}>
              <div className={styles.pcMiniAvatar}>
                <img
                  src={miniAvatarUrl || avatarUrl}
                  alt={name}
                />
              </div>

              <div className={styles.pcUserText}>
                <div className={styles.pcHandle}>
                  @{handle}
                </div>

                <div className={styles.pcStatus}>
                  {status}
                </div>
              </div>
            </div>

            <button
              className={styles.pcContactBtn}
              onClick={onContactClick}
              type="button"
            >
              {contactText}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}