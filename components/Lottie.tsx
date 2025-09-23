'use client';

import { useEffect, useRef } from 'react';

type LottieProps = {
  src: string; // path to lottie json (can be in public)
  width?: number;
  height?: number;
  loop?: boolean | number;
  autoplay?: boolean;
  className?: string;
  playOnHover?: boolean;
};

export default function Lottie({
  src,
  width = 35,
  height = 35,
  loop = true,
  autoplay = true,
  playOnHover = false,
  className,
}: LottieProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Using unknown to avoid any, instance shape is provided by lottie-web at runtime
  const animRef = useRef<unknown | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;
    let cleanup: (() => void) | undefined;
    (async () => {
      const { default: lottie } = await import('lottie-web');
      if (!isMounted || !containerRef.current) return;
      const instance = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop,
        autoplay: playOnHover ? false : autoplay,
        path: src,
      });
      animRef.current = instance;
      cleanup = () => {
        (instance as any)?.destroy();
        animRef.current = null;
      };
    })();
    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [src, loop, autoplay, playOnHover]);

  const handleMouseEnter = () => {
    if (playOnHover) (animRef.current as any)?.goToAndPlay(0, true);
  };
  const handleMouseLeave = () => {
    if (playOnHover) (animRef.current as any)?.stop();
  };

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      role={playOnHover ? 'img' : undefined}
      aria-label={playOnHover ? 'Animated icon' : undefined}
    />
  );
}


