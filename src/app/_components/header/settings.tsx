"use client";

import { Settings } from "@/assets/svg";
import { cn } from "@/utils/utils";
import { applyBgPatterns } from "./bg-patterns";
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
  value,
}: {
  color: string;
  id: string;
  label: string;
  value: string;
  setColor: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <p className="flex items-center gap-2 px-4 font-semibold">
      <label style={{ backgroundColor: `var(--color-${color})` }}>
        <input
          type="color"
          id={id}
          data-color={color}
          value={value}
          onChange={setColor}
        />
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

type ColorKey = keyof typeof defaultColors;

const colorListeners = new Set<() => void>();
let currentColors: Record<ColorKey, string> = { ...defaultColors };
const subscribeColors = (cb: () => void) => {
  colorListeners.add(cb);
  return () => {
    colorListeners.delete(cb);
  };
};
const getColors = () => currentColors;
const getDefaultColors = () => defaultColors;
const storeColor = (key: string, val: string) => {
  if (!(key in defaultColors)) return;
  currentColors = { ...currentColors, [key]: val };
  colorListeners.forEach((cb) => cb());
};

const themes = [
  { name: "Default", colors: defaultColors },
  { name: "Ember", colors: { active: "#ff8a00", "active-2": "#ff2e63", bright: "#e4dcd4", dark: "#151211" } },
  { name: "Ocean", colors: { active: "#3aebf8", "active-2": "#6600ff", bright: "#d3dbe6", dark: "#0e1320" } },
  { name: "Forest", colors: { active: "#27dadd", "active-2": "#0dd95b", bright: "#d6ddd8", dark: "#0f1412" } },
  { name: "Violet", colors: { active: "#a78bfa", "active-2": "#f472b6", bright: "#ddd6e8", dark: "#141118" } },
  { name: "Mono", colors: { active: "#ffffff", "active-2": "#8a8a8a", bright: "#d1d1d1", dark: "#111111" } },
];

const themePreview = ({ colors: c }: (typeof themes)[number]) => ({
  background: `linear-gradient(135deg, ${c.active} 0 28%, transparent 28%), linear-gradient(315deg, ${c["active-2"]} 0 28%, transparent 28%), ${c.dark}`,
  borderColor: `${c.bright}66`,
});

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
  const colors = useSyncExternalStore(subscribeColors, getColors, getDefaultColors);
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
      if (el.startsWith("--color-")) storeColor(el.slice("--color-".length), val);
      if (el === "--color-bright") applyBgPatterns(val);
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

  const themeIndex = themes.findIndex(({ colors: c }) =>
    (Object.keys(c) as ColorKey[]).every(
      (k) => c[k].toLowerCase() === colors[k].toLowerCase()
    )
  );
  const applyTheme = (i: number) =>
    Object.entries(themes[i].colors).forEach(([el, val]) => {
      set(`--color-${el}`, val);
    });
  const stepTheme = (dir: number) =>
    applyTheme(
      themeIndex === -1
        ? dir > 0
          ? 0
          : themes.length - 1
        : (themeIndex + dir + themes.length) % themes.length
    );

  const swapColors = useCallback(
    (a: string, b: string) => {
      const style = getComputedStyle(document.documentElement);
      const one = style.getPropertyValue(`--color-${a}`).trim();
      const two = style.getPropertyValue(`--color-${b}`).trim();
      set(`--color-${a}`, two);
      set(`--color-${b}`, one);
    },
    [set]
  );

  const resetColors = useCallback(() => {
    Object.entries(defaultColors).forEach(([el, val]) => {
      set(`--color-${el}`, val, true);
    });
    applyBg(defaultBg, true);
    localStorage.removeItem("color-theme");
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
    if (!brightColors) applyBgPatterns(defaultColors.bright);
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
            <p className="font-audiowide">Theme</p>
            <div className="flex items-center justify-between gap-2 px-4 font-semibold">
              <button
                type="button"
                aria-label="Previous theme"
                data-cursor-size="1.5rem"
                onClick={() => stepTheme(-1)}
              >
                <ChevronLeft className="size-5" />
              </button>
              <span>{themeIndex === -1 ? "Custom" : themes[themeIndex].name}</span>
              <button
                type="button"
                aria-label="Next theme"
                data-cursor-size="1.5rem"
                onClick={() => stepTheme(1)}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 px-4">
              {themes.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  title={t.name}
                  aria-label={`${t.name} theme`}
                  aria-pressed={i === themeIndex}
                  data-cursor-size="1.5rem"
                  onClick={() => applyTheme(i)}
                  style={themePreview(t)}
                  className={cn(
                    "size-8 rounded-md border",
                    i === themeIndex && "outline-2 outline-offset-2 outline-foreground"
                  )}
                />
              ))}
            </div>
          </article>
          <article className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="font-audiowide">Page colors</p>
              <button
                type="button"
                data-cursor-size="1.5rem"
                onClick={() => swapColors("bright", "dark")}
                className="text-sm font-semibold opacity-60 hover:opacity-100 hover:underline"
              >
                swap
              </button>
            </div>
            <ColorInput
              id="bright"
              color="bright"
              value={colors["bright"]}
              setColor={colorchange}
              label="text color"
            />
            <ColorInput
              id="dark"
              color="dark"
              value={colors["dark"]}
              setColor={colorchange}
              label="back color"
            />
          </article>
          <article className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="font-audiowide">Line colors</p>
              <button
                type="button"
                data-cursor-size="1.5rem"
                onClick={() => swapColors("active", "active-2")}
                className="text-sm font-semibold opacity-60 hover:opacity-100 hover:underline"
              >
                swap
              </button>
            </div>
            <ColorInput
              id="active"
              color="active"
              value={colors["active"]}
              setColor={colorchange}
              label="Color 1"
            />
            <ColorInput
              id="active-2"
              color="active-2"
              value={colors["active-2"]}
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
                data-cursor-size="1.5rem"
                onClick={() => stepBg(-1)}
              >
                <ChevronLeft className="size-5" />
              </button>
              <span>{backgrounds[bgIndex].name}</span>
              <button
                type="button"
                aria-label="Next background"
                data-cursor-size="1.5rem"
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
                  data-cursor-size="1.5rem"
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
          <div className="space-y-2">
            <button
              onClick={resetColors}
              className="border-2 w-full p-1 rounded-md font-semibold"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
