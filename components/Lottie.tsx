'use client';

import { useEffect, useRef } from 'react';
import type { AnimationItem } from 'lottie-web';

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
  type AnimationControls = Pick<AnimationItem, 'destroy' | 'goToAndPlay' | 'stop'>;
  const animRef = useRef<AnimationControls | null>(null);

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
      animRef.current = instance as unknown as AnimationControls;
      cleanup = () => {
        instance?.destroy();
        animRef.current = null;
      };
    })();
    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, [src, loop, autoplay, playOnHover]);

  const handleMouseEnter = () => {
    if (playOnHover) animRef.current?.goToAndPlay(0, true);
  };
  const handleMouseLeave = () => {
    if (playOnHover) animRef.current?.stop();
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


