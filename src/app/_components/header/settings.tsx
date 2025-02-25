"use client";

import { Settings } from "@/assets/svg";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

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
    <p>
      <label style={{ backgroundColor: `var(--color-${color})` }}>
        <input type="color" id={id} data-color={color} onChange={setColor} />
      </label>
      <label htmlFor={id} data-cursor-filter="invert(1)">
        {label}
      </label>
    </p>
  );
}

export default function HeaderSettings() {
  type colorType = "line1" | "line1" | "text1" | "text2";
  const [colors, setColors] = useState({
    line1: "#00ffff",
    line2: "#ff00ff",
    text1: "#d1d1d1",
    text2: "#1d1d20",
  });

  const set = (el: string, val: string) => {
    document.documentElement.style.setProperty(el, val);
  };

  const colorchange = (e: ChangeEvent<HTMLInputElement>) => {
    setColors((p) => {
      p[e.target.id as colorType] = e.target.value;
      return p;
    });
    set(`--color-${e.target.dataset.color}`, e.target.value);
  };

  return (
    <div className="settings">
      <Link href="">
        <span>Settings</span>
        <span>
          <Settings />
        </span>
      </Link>
      <div>
        <div>
          <article>
            <p>Page colors</p>
            <ColorInput
              id="text1"
              color="bright"
              setColor={colorchange}
              label="text color"
            />
            <ColorInput
              id="text2"
              color="dark"
              setColor={colorchange}
              label="back color"
            />
          </article>
          <article>
            <p>Line colors</p>
            <ColorInput
              id="line1"
              color="active"
              setColor={colorchange}
              label="Color 1"
            />
            <ColorInput
              id="line2"
              color="active-2"
              setColor={colorchange}
              label="Color 2"
            />
          </article>
        </div>
      </div>
    </div>
  );
}
