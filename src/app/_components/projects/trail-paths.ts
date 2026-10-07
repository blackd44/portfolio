export type Pt = { x: number; y: number };

export type Layout = {
  // Marker centres, top to bottom.
  pts: Pt[];
  // Height of the gap between each pair of neighbouring stops.
  gaps: number[];
  // Two-sided layout; otherwise one rail down the left.
  wide: boolean;
};

export type Build = (layout: Layout) => string;

type Corner = "chamfer" | "round";

// Phones: a single rail with small side jogs between stops.
const jogs = (pts: Pt[], swing: number) =>
  pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const dy = p.y - prev.y;
      const out = prev.y + dy * 0.3;
      const back = p.y - dy * 0.3;
      // Short legs can't fit a full jog out and back, so shrink it.
      const s = Math.max(0, Math.min(swing, (back - out) / 2));
      const o = (i % 2 ? 1 : -1) * s;
      return `V ${out} L ${prev.x + o} ${out + s} V ${back - s} L ${p.x} ${back} V ${p.y}`;
    })
    .join(" ");

// Wide: run down beside a card, cross in the gap below it, run down the
// other side to the next stop.
const snake =
  (corner: Corner, radius: number, swing: number): Build =>
  ({ pts, gaps, wide }) => {
    if (!wide) return jogs(pts, swing);
    return pts
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = pts[i - 1];
        const g = gaps[i - 1];
        const dir = Math.sign(p.x - prev.x);
        if (!dir) return `V ${p.y}`;
        const r = Math.max(
          0,
          Math.min(radius, Math.abs(p.x - prev.x) / 2, g - prev.y, p.y - g)
        );
        const turnIn =
          corner === "round"
            ? `Q ${prev.x} ${g}, ${prev.x + dir * r} ${g}`
            : `L ${prev.x + dir * r} ${g}`;
        const turnOut =
          corner === "round"
            ? `Q ${p.x} ${g}, ${p.x} ${g + r}`
            : `L ${p.x} ${g + r}`;
        return `V ${g - r} ${turnIn} H ${p.x - dir * r} ${turnOut} V ${p.y}`;
      })
      .join(" ");
  };

export const circuit = snake("chamfer", 14, 12);
export const metro = snake("round", 28, 14);
