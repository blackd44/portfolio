"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type prop = {
  href: string;
  children?: ReactNode;
};
export function NavLink({ href = "", children }: prop) {
  const pathname = usePathname();

  return (
    <Link
      href={pathname == href ? "/" : href}
      className={
        (pathname == href ? "active" : "") +
        " " +
        (pathname.includes(href) ? "inside" : "")
      }
    >
      <span>{children}</span>
    </Link>
  );
}

export default function ContentLinks() {
  const pathname = usePathname();

  return (
    <div className="mine-content">
      <div className="mine-content-inner">
        <div>
          <NavLink href="/brain">my brain</NavLink>
        </div>
        <div>
          <NavLink href="/projects">My Experience</NavLink>
        </div>
        <div>
          <NavLink href="/contact">My contacts</NavLink>
        </div>
      </div>
    </div>
  );
}
