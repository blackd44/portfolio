"use client";

import { Settings } from "@/assets/svg";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

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

export default function HeaderSettings() {
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
  }, [set]);

  useEffect(() => {
    const activeColors = localStorage.getItem("--color-active");
    const activeColors2 = localStorage.getItem("--color-active-2");
    const brightColors = localStorage.getItem("--color-bright");
    const darkColors = localStorage.getItem("--color-dark");

    if (activeColors) set(`--color-active`, activeColors);
    if (activeColors2) set(`--color-active-2`, activeColors2);
    if (brightColors) set(`--color-bright`, brightColors);
    if (darkColors) set(`--color-dark`, darkColors);
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
