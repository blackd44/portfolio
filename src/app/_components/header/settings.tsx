"use client";

import { Settings } from "@/assets/svg";
import { cn } from "@/utils/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
} from "react";

function ColorInput({
  color,
  id,
  setColor,
  label,
}: {
  color: string;
  id: string;
  label: string;
  setColor: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <p className="flex items-center gap-2 px-4 font-semibold">
      <label style={{ backgroundColor: `var(--color-${color})` }}>
        <input type="color" id={id} data-color={color} onChange={setColor} />
      </label>
      <label htmlFor={id} data-cursor-filter="invert(1)">
        {label}
      </label>
    </p>
  );
}

const defaultColors = {
  active: "#00ffff",
  "active-2": "#ff00ff",
  bright: "#d1d1d1",
  dark: "#131314",
};

const backgrounds = [
  { id: "dots", name: "Dots" },
  { id: "grain", name: "Grain" },
  { id: "circuit", name: "Circuit" },
  { id: "seal", name: "Seal" },
];
const defaultBg = backgrounds[0].id;

const bgListeners = new Set<() => void>();
const subscribeBg = (cb: () => void) => {
  bgListeners.add(cb);
  return () => {
    bgListeners.delete(cb);
  };
};
const getBg = () => {
  const saved = localStorage.getItem("page-bg");
  return backgrounds.some((b) => b.id === saved) ? saved! : defaultBg;
};
const applyBg = (id: string, isReset = false) => {
  document.documentElement.dataset.bg = id;
  if (!isReset) localStorage.setItem("page-bg", id);
  else localStorage.removeItem("page-bg");
  bgListeners.forEach((cb) => cb());
};

export default function HeaderSettings() {
  const bg = useSyncExternalStore(subscribeBg, getBg, () => defaultBg);
  const bgIndex = Math.max(
    0,
    backgrounds.findIndex((b) => b.id === bg)
  );
  const stepBg = (dir: number) =>
    applyBg(
      backgrounds[(bgIndex + dir + backgrounds.length) % backgrounds.length].id
    );

  const set = useCallback(
    (el: string, val: string, isReset: boolean = false) => {
      document.documentElement.style.setProperty(el, val);
      if (!isReset) localStorage.setItem(el, val);
      else localStorage.removeItem(el);
    },
    []
  );

  const colorchange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      set(`--color-${e.target.dataset.color}`, e.target.value);
    },
    [set]
  );

  const resetColors = useCallback(() => {
    Object.entries(defaultColors).forEach(([el, val]) => {
      set(`--color-${el}`, val, true);
    });
    applyBg(defaultBg, true);
  }, [set]);

  useLayoutEffect(() => {
    const activeColors = localStorage.getItem("--color-active");
    const activeColors2 = localStorage.getItem("--color-active-2");
    const brightColors = localStorage.getItem("--color-bright");
    const darkColors = localStorage.getItem("--color-dark");

    if (activeColors) set(`--color-active`, activeColors);
    if (activeColors2) set(`--color-active-2`, activeColors2);
    if (brightColors) set(`--color-bright`, brightColors);
    if (darkColors) set(`--color-dark`, darkColors);
    document.documentElement.dataset.bg = getBg();
  }, [set]);

  return (
    <div className="settings">
      <Link href="">
        <span>Settings</span>
        <span>
          <Settings />
        </span>
      </Link>
      <div className="rounded-xl rounded-tr-md border border-gray-400/10">
        <div className="py-4 space-y-6">
          <article className="space-y-2">
            <p className="font-audiowide">Page colors</p>
            <ColorInput
              id="bright"
              color="bright"
              setColor={colorchange}
              label="text color"
            />
            <ColorInput
              id="dark"
              color="dark"
              setColor={colorchange}
              label="back color"
            />
          </article>
          <article className="space-y-2">
            <p className="font-audiowide">Line colors</p>
            <ColorInput
              id="active"
              color="active"
              setColor={colorchange}
              label="Color 1"
            />
            <ColorInput
              id="active-2"
              color="active-2"
              setColor={colorchange}
              label="Color 2"
            />
          </article>
          <article className="space-y-2">
            <p className="font-audiowide">Background</p>
            <div className="flex items-center justify-between gap-2 px-4 font-semibold">
              <button
                type="button"
                aria-label="Previous background"
                onClick={() => stepBg(-1)}
              >
                <ChevronLeft className="size-5" />
              </button>
              <span>{backgrounds[bgIndex].name}</span>
              <button
                type="button"
                aria-label="Next background"
                onClick={() => stepBg(1)}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 px-4">
              {backgrounds.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  title={b.name}
                  aria-label={`${b.name} background`}
                  aria-pressed={b.id === bg}
                  data-bg={b.id}
                  onClick={() => applyBg(b.id)}
                  style={{ background: "var(--page-bg)" }}
                  className={cn(
                    "size-8 rounded-md border",
                    b.id === bg && "outline-2 outline-offset-2 outline-foreground"
                  )}
                />
              ))}
            </div>
          </article>
          <button
            onClick={resetColors}
            className="border-2 w-full p-1 rounded-md font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
