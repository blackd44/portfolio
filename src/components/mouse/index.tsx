"use client"

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Mouse = () => {
  const pathname = usePathname();

  const [path, setPath] = useState("");
  if (path !== pathname) {
    setPath(pathname);
  }

  const mainCursor = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  const cssVar = (val: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(val);
  };

  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;

      const mouseX = clientX;
      const mouseY = clientY;

      if (!mainCursor.current) {
        console.log("can't find cursor");
        const c = document.querySelector(".cursor");
        if (c) c.remove();
      } else {
        mainCursor.current.style.translate = `
                              ${mouseX - mainCursor.current.clientWidth / 2}px 
                              ${
                                mouseY - mainCursor.current.clientHeight / 2
                              }px 0`;
      }
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (!cursor.current) return;

    cursor.current.style.borderWidth = `2px`;
    const a = document.querySelectorAll("a");
    a.forEach((el) => {
      el.addEventListener("mouseenter", (event) => {
        if (!cursor.current) return;

        cursor.current.style.width = cssVar("--cursor-hover-size");
        cursor.current.style.height = cssVar("--cursor-hover-size");
        cursor.current.style.color = cssVar("--color-active-2");
      });
      el.addEventListener("mouseleave", (event) => {
        if (!cursor.current) return;

        cursor.current.style.width = cssVar("--cursor-size");
        cursor.current.style.height = cssVar("--cursor-size");
        cursor.current.style.color = "inherit";
      });
    });

    //back filter
    const filters = document.querySelectorAll("[data-cursor-filter]");
    filters.forEach((el) => {
      (el as HTMLDivElement).style.cursor = "none";
      el.addEventListener("mouseenter", (event) => {
        if (!cursor.current) return;

        cursor.current.style.backdropFilter = `${(el as HTMLDivElement).dataset.cursorFilter}`;
        cursor.current.style.borderWidth = "0";
      });
      el.addEventListener("mouseleave", (event) => {
        if (!cursor.current) return;

        cursor.current.style.backdropFilter = "";
        cursor.current.style.borderWidth = `2px`;
      });
    });

    //size
    const sizes = document.querySelectorAll("[data-cursor-size]");
    sizes.forEach((el) => {
      el.addEventListener("mouseenter", (event) => {
        if (!cursor.current) return;

        cursor.current.style.width = `${(el as HTMLDivElement).dataset.cursorSize}`;
        cursor.current.style.height = `${(el as HTMLDivElement).dataset.cursorSize}`;
      });
      el.addEventListener("mouseleave", (event) => {
        if (!cursor.current) return;

        cursor.current.style.width = cssVar("--cursor-size");
        cursor.current.style.height = cssVar("--cursor-size");
      });
    });
    return () => {};
  }, [path]);
  return (
    <>
      <div className="cursor" ref={mainCursor}>
        <div ref={cursor}></div>
      </div>
    </>
  );
};

export default Mouse;
