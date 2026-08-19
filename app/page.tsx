"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import AnimatedGrid from "@/components/AnimatedGrid";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ── Hero elements exit ── */
  const atreyOpacity = useTransform(smooth, [0, 0.05], [1, 0]);
  const atreyY = useTransform(smooth, [0, 0.05], [0, -40]);
  const navOpacity = useTransform(smooth, [0.02, 0.08], [1, 0]);
  const overlayOpacity = useTransform(smooth, [0.08, 0.25], [1, 0]);
  const gradientOpacity = useTransform(smooth, [0.08, 0.22], [1, 0]);
  const gridOpacity = useTransform(smooth, [0.05, 0.20], [1, 0]);

  const builderScale = useTransform(smooth, (v) => {
    const t = Math.max(0, Math.min(1, v / 0.32));
    return 1 + 54 * t * t;
  });

  /* ── Card materialises from full-screen → padded card ── */
  const cardInset = useTransform(smooth, [0.12, 0.30], [0, 24]);
  const cardRadius = useTransform(smooth, [0.12, 0.30], [0, 20]);
  const cardBg = useTransform(
    smooth,
    [0.20, 0.34],
    ["rgba(255,248,231,0)", "rgba(255,248,231,1)"]
  );
  const cardShadow = useTransform(smooth, (v) => {
    const t = Math.max(0, Math.min(1, (v - 0.20) / 0.14));
    if (t <= 0) return "none";
    const blur = Math.round(20 + t * 80);
    const yPx = Math.round(8 + t * 32);
    const a = (0.1 + t * 0.45).toFixed(2);
    return `0 ${yPx}px ${blur}px rgba(0,0,0,${a})`;
  });

  /* ── Content after zoom ── */
  const contentOpacity = useTransform(smooth, [0.36, 0.42], [0, 1]);

  return (
    <>
      {/* ━━━ Fixed video background ━━━ */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ━━━ Fixed overlays — stay in place, fade on scroll ━━━ */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: "rgba(15, 8, 30, 0.18)",
          pointerEvents: "none",
          opacity: overlayOpacity,
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: "60vh",
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(20, 10, 40, 0.55), rgba(20, 10, 40, 0.15) 55%, transparent)",
          pointerEvents: "none",
          opacity: gradientOpacity,
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          opacity: gridOpacity,
        }}
      >
        <AnimatedGrid />
      </motion.div>

      {/* ━━━ Fixed nav ━━━ */}
      <motion.nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 32px",
          pointerEvents: "none",
          opacity: navOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontWeight: 900,
            fontSize: "clamp(13px, 1.4vw, 20px)",
            color: "#FFF8E7",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          atrey.dev
        </span>
        <span
          style={{
            fontFamily: "var(--font-inter-tight)",
            fontWeight: 700,
            fontSize: "clamp(9px, 0.85vw, 13px)",
            color: "rgba(255,248,231,0.45)",
            letterSpacing: "0.15em",
            lineHeight: 1.6,
            textTransform: "uppercase",
            textAlign: "right" as const,
            userSelect: "none",
          }}
        >
          Full Stack
          <br />
          Builder
        </span>
      </motion.nav>

      {/* ━━━ Scroll-driven section ━━━ */}
      <div
        ref={scrollRef}
        style={{ height: "600vh", position: "relative", zIndex: 10 }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
          }}
        >
          {/* The card — starts full-screen, contracts to padded rounded card */}
          <motion.div
            style={{
              position: "absolute",
              top: cardInset,
              right: cardInset,
              bottom: cardInset,
              left: cardInset,
              borderRadius: cardRadius,
              overflow: "hidden",
              backgroundColor: cardBg,
              boxShadow: cardShadow,
            }}
          >
            {/* ── Stacked hero text ── */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <div>
                <motion.p
                  style={{
                    fontFamily: "'MasonDirect', var(--font-mason), var(--font-cinzel), serif",
                    fontSize: "clamp(44px, 13vw, 240px)",
                    fontWeight: 700,
                    letterSpacing: "-0.005em",
                    lineHeight: 0.95,
                    margin: 0,
                    textAlign: "center" as const,
                    textTransform: "uppercase" as const,
                    backgroundImage:
                      "linear-gradient(180deg, #FFFAEC 0%, #F4D589 50%, #B98927 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    WebkitTextStroke: "2px #2A2A32",
                    textShadow:
                      "0 0 1px rgba(255, 150, 60, 0.7), 0 0 6px rgba(255, 120, 40, 0.5), 0 0 18px rgba(220, 90, 20, 0.3), 0 4px 0 rgba(20, 14, 8, 0.5), 0 10px 24px rgba(10, 5, 0, 0.55)",
                    opacity: atreyOpacity,
                    y: atreyY,
                  }}
                >
                  ATREY THE
                </motion.p>

                <div style={{ position: "relative" }}>
                  <motion.p
                    style={{
                      fontFamily: "'MasonDirect', var(--font-mason), var(--font-cinzel), serif",
                      fontSize: "clamp(80px, 22vw, 440px)",
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 0.85,
                      margin: 0,
                      textAlign: "center" as const,
                      textTransform: "uppercase" as const,
                      backgroundImage:
                        "linear-gradient(180deg, #FFF1B0 0%, #FFD56A 18%, #E8A030 38%, #C8801F 60%, #8C5810 85%, #6A3A08 100%)",
                      backgroundSize: "100% 220%",
                      backgroundPosition: "50% 100%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      WebkitTextStroke: "3px #1A1A22",
                      animation: "forge-pulse 4.5s ease-in-out infinite",
                      scale: builderScale,
                      transformOrigin: "50% 50%",
                    }}
                  >
                    BUILDER
                  </motion.p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src="/hammer.png"
                    alt=""
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "100%",
                      height: "clamp(70px, 18vw, 340px)",
                      x: "-28%",
                      y: "-54%",
                      rotate: 8,
                      opacity: atreyOpacity,
                      filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.55))",
                      pointerEvents: "none",
                      userSelect: "none" as const,
                    }}
                  />
                  <motion.div
                    aria-hidden
                    style={{
                      position: "absolute",
                      bottom: "8%",
                      left: "92%",
                      width: "clamp(80px, 16vw, 280px)",
                      height: "clamp(120px, 22vw, 360px)",
                      pointerEvents: "none",
                      opacity: atreyOpacity,
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, i) => {
                      const drift = ((i * 53) % 60) - 30;
                      const startLeft = 18 + ((i * 47) % 70);
                      const size = 4 + ((i * 31) % 5);
                      return (
                        <motion.div
                          key={i}
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: `${startLeft}%`,
                            width: size,
                            height: size,
                            borderRadius: "50%",
                            background:
                              "radial-gradient(circle, #FFE3A0 0%, #FF8A2A 55%, #C82E0A 90%, transparent 100%)",
                            boxShadow: "0 0 12px rgba(255, 140, 40, 0.85)",
                            willChange: "transform, opacity",
                          }}
                          animate={{
                            y: [0, -120 - i * 18, -200 - i * 22],
                            x: [0, drift * 0.45, drift],
                            opacity: [0, 0.95, 0],
                            scale: [0.5, 1, 0.35],
                          }}
                          transition={{
                            duration: 2.6 + (i % 4) * 0.35,
                            delay: i * 0.32,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── Content — fades in after text dissolves into cream ── */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                opacity: contentOpacity,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter-tight)",
                  fontSize: "clamp(28px, 5vw, 72px)",
                  fontWeight: 900,
                  color: "#2a1f0e",
                  textAlign: "center",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                }}
              >
                Building Crazy
                <br />
                Ideas Into
                <br />
                Reality
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
