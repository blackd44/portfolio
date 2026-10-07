import { useEffect, useRef, useState } from "react";
import { Build } from "./trail-paths";

type Trail = { w: number; h: number; d: string; ys: number[] };

// Where on screen (share of viewport height) the trail chases while scrolling.
const LINE = 0.65;
// Over the last stretch of the page (share of viewport height) the line
// slides to the bottom edge, so the final stops still light up.
const RAMP = 0.6;
// How much of the remaining distance the head covers each frame.
const EASE = 0.14;

// Draws a path through the stop markers as the page scrolls. Paths marked
// `data-drawn` are revealed; `data-drawn="main"` is the one measured.
export default function useScrollTrail(build: Build) {
  const root = useRef<HTMLDivElement>(null);
  const markers = useRef<(HTMLElement | null)[]>([]);
  const head = useRef<SVGGElement>(null);
  const drawn = useRef(0);
  const [trail, setTrail] = useState<Trail | null>(null);
  const [reached, setReached] = useState(0);

  // Route the path through the markers; redo it whenever the layout changes.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const box = el.getBoundingClientRect();
      const pts = markers.current.map((m) => {
        const r = m!.getBoundingClientRect();
        return {
          x: r.left - box.left + r.width / 2,
          y: r.top - box.top + r.height / 2,
        };
      });
      // Midline of the space between each stop and the next.
      const stops = markers.current.map((m) =>
        m!.parentElement!.getBoundingClientRect()
      );
      const gaps = stops
        .slice(1)
        .map((next, i) => (stops[i].bottom + next.top) / 2 - box.top);
      setTrail({
        w: box.width,
        h: box.height,
        d: build({ pts, gaps, wide: box.width >= 640 }),
        ys: pts.map((p) => p.y),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [build]);

  useEffect(() => {
    const el = root.current;
    const path = el?.querySelector<SVGPathElement>('[data-drawn="main"]');
    if (!el || !path || !trail) return;
    const paths = el.querySelectorAll<SVGPathElement>("[data-drawn]");
    const total = path.getTotalLength();
    paths.forEach((p) => (p.style.strokeDasharray = `${total} ${total}`));
    drawn.current = Math.min(drawn.current, total);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    // The path only runs downward, so search along it for a given height.
    const lengthAt = (y: number) => {
      let lo = 0;
      let hi = total;
      for (let k = 0; k < 18; k++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < y) lo = mid;
        else hi = mid;
      }
      return lo;
    };

    // Distance along the path to each stop. Stops sit on vertical runs, so
    // their height pins them down exactly.
    const { ys } = trail;
    const stops = ys.map((y, i) =>
      i === 0 ? 0 : i === ys.length - 1 ? total : lengthAt(y)
    );

    // Scrolling from one stop to the next draws that whole leg evenly,
    // so flat crossings glide instead of snapping across at one height.
    const progressAt = (y: number) => {
      if (y <= ys[0]) return 0;
      for (let i = 0; i < ys.length - 1; i++) {
        if (y < ys[i + 1]) {
          const t = (y - ys[i]) / (ys[i + 1] - ys[i]);
          return stops[i] + t * (stops[i + 1] - stops[i]);
        }
      }
      return total;
    };

    const tick = () => {
      frame = 0;
      const vh = window.innerHeight;
      const left =
        document.documentElement.scrollHeight - (window.scrollY + vh);
      const ramp = Math.min(1, Math.max(0, 1 - left / (vh * RAMP)));
      const line = vh * (LINE + (1 - LINE) * ramp);
      const target = progressAt(line - el.getBoundingClientRect().top);
      const gap = target - drawn.current;
      drawn.current =
        reduce || Math.abs(gap) < 0.5 ? target : drawn.current + gap * EASE;

      const len = drawn.current;
      paths.forEach((p) => (p.style.strokeDashoffset = `${total - len}`));

      // Park the head at the tip, facing along the path.
      const at = path.getPointAtLength(len);
      const a = path.getPointAtLength(Math.max(0, len - 1));
      const b = path.getPointAtLength(Math.min(total, len + 1));
      const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      if (head.current) {
        head.current.setAttribute(
          "transform",
          `translate(${at.x} ${at.y}) rotate(${deg})`
        );
        head.current.style.opacity = len > 1 ? "1" : "0";
      }

      // A stop lights up when the head actually gets there.
      setReached(stops.filter((l) => l <= len + 1).length);
      if (drawn.current !== target) frame = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [trail]);

  const marker = (i: number) => (el: HTMLElement | null) => {
    markers.current[i] = el;
  };

  return { root, marker, head, trail, reached };
}
