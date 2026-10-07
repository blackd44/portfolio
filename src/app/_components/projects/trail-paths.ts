export type Pt = { x: number; y: number };

export type Layout = {
  // Marker centres, top to bottom.
  pts: Pt[];
  // Height of the gap between each pair of neighbouring stops.
  gaps: number[];
  // Two-sided layout; otherwise one rail down the left.
  wide: boolean;
};

export type Route = {
  // The trail itself, drawn as you scroll.
  d: string;
  // Static decoration around it, e.g. side traces and vias.
  deco?: string;
};

export type Build = (layout: Layout) => Route;

type Snake = {
  corner: "chamfer" | "round";
  // Corner size where the trail turns to cross.
  radius: number;
  // Side jog size on phones.
  swing: number;
  // Wide only: 45° kinks in the runs beside each card, plus traces and vias
  // alongside each crossing, so it reads as a circuit board.
  board?: boolean;
};

// A ring at (x, y), as path commands.
const via = (x: number, y: number, r = 3.5) =>
  `M ${x - r} ${y} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0`;

// A straight trace from x1 to x2 at height y, ending in a via each side.
const trace = (x1: number, x2: number, y: number) =>
  `M ${x1 + 3.5} ${y} H ${x2 - 3.5} ${via(x1, y)} ${via(x2, y)}`;

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
  ({ corner, radius, swing, board }: Snake): Build =>
  ({ pts, gaps, wide }) => {
    if (!wide) return { d: jogs(pts, swing) };
    const deco: string[] = [];
    const d = pts
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

        // Kink out away from the card and back, partway down the run.
        let run = "";
        const len = g - r - prev.y;
        const k = 10;
        if (board && len > k * 6) {
          const out = -dir * k;
          const a = prev.y + len * 0.35;
          const b = prev.y + len * 0.7;
          run = `V ${a} L ${prev.x + out} ${a + k} V ${b} L ${prev.x} ${b + k} `;
        }

        if (board) {
          const lo = Math.min(prev.x, p.x);
          const hi = Math.max(prev.x, p.x);
          deco.push(trace(lo + 70, hi - 40, g - 13), trace(lo + 40, hi - 90, g + 13));
        }

        const turnIn =
          corner === "round"
            ? `Q ${prev.x} ${g}, ${prev.x + dir * r} ${g}`
            : `L ${prev.x + dir * r} ${g}`;
        const turnOut =
          corner === "round"
            ? `Q ${p.x} ${g}, ${p.x} ${g + r}`
            : `L ${p.x} ${g + r}`;
        return `${run}V ${g - r} ${turnIn} H ${p.x - dir * r} ${turnOut} V ${p.y}`;
      })
      .join(" ");
    return { d, deco: deco.join(" ") || undefined };
  };

export const circuit = snake({ corner: "chamfer", radius: 14, swing: 12, board: true });
export const metro = snake({ corner: "round", radius: 28, swing: 14 });
