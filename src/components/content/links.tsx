"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ContentLinks() {
  const pathname = usePathname();

  return (
    <div className="mine-content">
      <div className="mine-content-inner">
        <div>
          <Link
            href={pathname == "/brain" ? "/" : "/brain"}
            className={
              (pathname == "/brain" ? "active" : "") +
              " " +
              (pathname.includes("/brain") ? "inside" : "")
            }
          >
            <span>my brain</span>
          </Link>
        </div>
        <div>
          <Link href="">
            <span>my Achievements</span>
          </Link>
        </div>
        <div>
          <Link
            href={pathname == "/contact" ? "/" : "/contact"}
            className={
              (pathname == "/contact" ? "active" : "") +
              " " +
              (pathname.includes("/contact") ? "inside" : "")
            }
          >
            <span>contact me</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
