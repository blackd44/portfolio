"use client";

import { cn } from "@/utils/utils";
import { CSSProperties, ReactNode, useEffect, useId } from "react";
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

const toneColor = (i: number) =>
  i % 2 ? "var(--color-active-2)" : "var(--color-active)";

// How far before a stop the trail starts blending into that stop's colour.
const BLEND = 28;

// Gradient stops (down the trail) that switch to each stop's colour as the
// trail arrives there, so every leg matches the stop it leaves from.
const bands = (ys: number[], h: number) => {
  const at = (y: number) => Math.min(1, Math.max(0, y / h));
  return ys.flatMap((y, i) =>
    i === 0
      ? [{ offset: 0, color: toneColor(0) }]
      : [
          { offset: at(y - BLEND), color: toneColor(i - 1) },
          { offset: at(y), color: toneColor(i) },
        ]
  );
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
  const {
    root,
    marker,
    head: headRef,
    trail,
    reached,
    goTo,
  } = useScrollTrail(build);

  // Each card keeps its full size; measure how far its frame shrinks to sit
  // just below the heading while the stop isn't reached.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      el.querySelectorAll<HTMLElement>(`.${css.card}`).forEach((card) => {
        const more = card.querySelector<HTMLElement>("[data-more]");
        if (!more) return;
        const pad = parseFloat(getComputedStyle(card).paddingBottom) || 0;
        const cut = card.offsetHeight - (more.offsetTop + pad);
        card.style.setProperty("--cut", `${Math.max(0, cut)}px`);
      });
      el.dataset.measured = "";
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [root]);

  return (
    <div
      ref={root}
      className={cn(css.root, theme.root)}
      // Colour of the stop the trail last passed, for the head and glows.
      style={
        { "--trail-tone": toneColor(Math.max(0, reached - 1)) } as CSSProperties
      }
    >
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
              {bands(trail.ys, trail.h).map((b, k) => (
                <stop key={k} offset={b.offset} stopColor={b.color} />
              ))}
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
          {trail.deco && (
            <path d={trail.deco} className={cn(css.deco, theme.deco)} />
          )}
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
