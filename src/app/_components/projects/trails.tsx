"use client";

import circuitCss from "./circuit.module.scss";
import metroCss from "./metro.module.scss";
import ScrollTrail from "./scroll-trail";
import { circuit, metro } from "./trail-paths";
import { ViewProps } from "./types";

// Circuit board: a trace with chips, signal pulses running along it.
export function Circuit({ items }: ViewProps) {
  return (
    <ScrollTrail
      items={items}
      build={circuit}
      theme={circuitCss}
      pulse
      head={<rect x={-7} y={-4.5} width={14} height={9} rx={2} />}
    />
  );
}

// Metro map: one line, stations, a train riding it.
export function Metro({ items }: ViewProps) {
  return (
    <ScrollTrail
      items={items}
      build={metro}
      theme={metroCss}
      head={
        <>
          <rect x={-16} y={-8} width={32} height={16} rx={8} />
          <rect x={-10} y={-3.5} width={6} height={7} rx={1.5} className={metroCss.window} />
          <rect x={-2} y={-3.5} width={6} height={7} rx={1.5} className={metroCss.window} />
          <circle cx={11} r={2.5} className={metroCss.lamp} />
        </>
      }
    />
  );
}
