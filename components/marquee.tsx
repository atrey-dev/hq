'use client';

import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';
import FastMarquee from 'react-fast-marquee';
import type { MarqueeProps as FastMarqueeProps } from 'react-fast-marquee';

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div className={cn('relative w-full overflow-hidden', className)} {...props} />
);

export type MarqueeContentProps = FastMarqueeProps & {
  ariaLabel?: string;
};

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  gradient = false,
  ariaLabel,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee
    loop={loop}
    autoFill={autoFill}
    pauseOnHover={pauseOnHover}
    gradient={gradient}
    aria-label={ariaLabel}
    {...props}
  />
);

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right';
};

export const MarqueeFade = ({ className, side, ...props }: MarqueeFadeProps) => (
  <div
    className={cn(
      'pointer-events-none absolute inset-y-0 z-10 h-full w-24 from-background to-transparent',
      side === 'left' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l',
      className
    )}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn('mx-3 flex-shrink-0', className)} {...props} />
);


