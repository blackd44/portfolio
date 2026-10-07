"use client";

import { cn } from "@/utils/utils";
import { ReactNode, useId, useRef } from "react";
import Briefing from "./briefing";
import css from "./scroll-trail.module.scss";
import { Build } from "./trail-paths";
import { pad, tone, ViewProps } from "./types";
import useScrollTrail from "./use-scroll-trail";

type Theme = Readonly<Record<string, string>>;

type Props = ViewProps & {
  build: Build;
  theme: Theme;
  // Shape at the tip of the trail, drawn around (0, 0) facing +x.
  head: ReactNode;
  // Light pulses running along the drawn part of the trail.
  pulse?: boolean;
};

// Shared scroll-drawn trail; each theme restyles it via `theme` classes.
export default function ScrollTrail({
  items,
  build,
  theme,
  head,
  pulse,
}: Props) {
  const id = useId();
  const gradId = `${id}-grad`;
  const maskId = `${id}-mask`;
  const { root, marker, head: headRef, trail, reached } = useScrollTrail(build);
  const cards = useRef<(HTMLElement | null)[]>([]);

  // Bring a card near the top so the trail reaches it.
  const goTo = (i: number) => {
    const el = cards.current[i];
    if (!el) return;
    const offset = Math.max(112, window.innerHeight * 0.2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: reduce.matches ? "auto" : "smooth",
    });
  };

  return (
    <div ref={root} className={cn(css.root, theme.root)}>
      {trail && (
        <svg
          className={css.svg}
          width={trail.w}
          height={trail.h}
          viewBox={`0 0 ${trail.w} ${trail.h}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={gradId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={trail.h}
            >
              <stop offset="0" stopColor="var(--color-active)" />
              <stop offset="1" stopColor="var(--color-active-2)" />
            </linearGradient>
            {pulse && (
              <mask id={maskId} maskUnits="userSpaceOnUse">
                <path
                  data-drawn=""
                  d={trail.d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={12}
                />
              </mask>
            )}
          </defs>
          <path d={trail.d} className={cn(css.base, theme.base)} />
          <path
            data-drawn="main"
            d={trail.d}
            className={cn(css.done, theme.done)}
            stroke={`url(#${gradId})`}
          />
          {pulse && (
            <path d={trail.d} className={theme.pulse} mask={`url(#${maskId})`} />
          )}
          <g ref={headRef} className={cn(css.head, theme.head)}>
            {head}
          </g>
        </svg>
      )}

      <ol className={css.stops}>
        {items.map((p, i) => (
          <li
            key={p.title}
            className={cn(
              css.stop,
              tone(i),
              i < reached && [css.reached, theme.reached]
            )}
          >
            <span
              ref={marker(i)}
              aria-hidden="true"
              className={cn(css.marker, theme.marker)}
            >
              <span className={cn(css.dot, theme.dot)}>{pad(i + 1)}</span>
            </span>
            <article
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={cn(css.card, theme.card)}
              onClick={(e) => {
                // Links inside the card keep their own behaviour.
                if (!(e.target as HTMLElement).closest("a, button")) goTo(i);
              }}
            >
              <Briefing
                p={p}
                i={i}
                collapsed={i >= reached}
                onSelect={() => goTo(i)}
              />
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
