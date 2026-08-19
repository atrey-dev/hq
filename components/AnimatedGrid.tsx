"use client";

import { useEffect, useRef, useState } from "react";

const CELL = 48;

// Seeded pseudo-random so each line gets a consistent but varied start position
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function AnimatedGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setDims({
        cols: Math.ceil(el.clientWidth / CELL) + 1,
        rows: Math.ceil(el.clientHeight / CELL) + 1,
      });
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-10">
      <style>{`
        @keyframes dash-h {
          from { stroke-dashoffset: 2400; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes dash-v {
          from { stroke-dashoffset: 1600; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes grid-sweep {
          0%   { mask-position: -80% -80%; -webkit-mask-position: -80% -80%; }
          100% { mask-position: 180% 180%; -webkit-mask-position: 180% 180%; }
        }
        .sweep-layer {
          background-image:
            linear-gradient(to right, rgba(255,200,80,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,200,80,0.2) 1px, transparent 1px);
          background-size: ${CELL}px ${CELL}px;
          -webkit-mask-image: radial-gradient(ellipse 600px 600px at center, white, transparent 70%);
          mask-image: radial-gradient(ellipse 600px 600px at center, white, transparent 70%);
          -webkit-mask-size: 200% 200%;
          mask-size: 200% 200%;
          animation: grid-sweep 12s linear infinite;
        }
      `}</style>

      <svg aria-hidden className="absolute inset-0 h-full w-full">
        {/* Static grid lines */}
        {Array.from({ length: dims.rows }, (_, i) => (
          <line
            key={`h-${i}`}
            x1={0} y1={i * CELL} x2="100%" y2={i * CELL}
            stroke="white" strokeWidth={1} strokeOpacity={0.15}
          />
        ))}
        {Array.from({ length: dims.cols }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * CELL} y1={0} x2={i * CELL} y2="100%"
            stroke="white" strokeWidth={1} strokeOpacity={0.15}
          />
        ))}

        {/* Traveling dash on every horizontal line */}
        {Array.from({ length: dims.rows }, (_, i) => {
          const dur = 6 + (i % 5) * 1.5;
          // Negative delay = start mid-animation, no waiting
          const negDelay = -(seededRandom(i) * dur);
          return (
            <line
              key={`dh-${i}`}
              x1={0} y1={i * CELL} x2={2400} y2={i * CELL}
              stroke="rgba(255,210,100,0.18)"
              strokeWidth={1}
              strokeDasharray="120 2280"
              style={{
                animation: `dash-h ${dur}s linear ${negDelay}s infinite`,
              }}
            />
          );
        })}

        {/* Traveling dash on every vertical line */}
        {Array.from({ length: dims.cols }, (_, i) => {
          const dur = 5 + (i % 6) * 1.2;
          const negDelay = -(seededRandom(i + 100) * dur);
          return (
            <line
              key={`dv-${i}`}
              x1={i * CELL} y1={0} x2={i * CELL} y2={1600}
              stroke="rgba(255,210,100,0.18)"
              strokeWidth={1}
              strokeDasharray="120 1480"
              style={{
                animation: `dash-v ${dur}s linear ${negDelay}s infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* Sweep highlight */}
      <div className="sweep-layer absolute inset-0 h-full w-full" />
    </div>
  );
}
