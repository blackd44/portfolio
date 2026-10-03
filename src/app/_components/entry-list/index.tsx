"use client";

import { NavLink } from "@/app/_components/header";
import PageHeader from "@/app/_components/ui/page-header";
import { cn } from "@/utils/utils";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ReactNode, useId, useState } from "react";
import css from "./style.module.scss";

export type Entry = {
  title: string;
  subtitle: string;
  location?: string;
  date?: string;
  link?: string;
  stack?: string[];
  desc: ReactNode;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function EntryList({
  items,
  variant = "cards",
}: {
  items: Entry[];
  variant?: "timeline" | "cards";
}) {
  const baseId = useId();
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const toggle = (title: string) =>
    setOpenTitle((cur) => (cur === title ? null : title));

  return (
    <ol className={cn(css.list, variant === "timeline" && css.timeline)}>
      {items.map((item, i) => {
        const open = openTitle === item.title;
        const bodyId = `${baseId}-${i}`;
        const current = /present/i.test(item.date ?? "");
        const timeline = variant === "timeline";

        return (
          <li
            key={item.title}
            className={cn(
              css.item,
              i % 2 ? "tone-2" : "tone-1",
              open && css.open,
              current && css.current
            )}
          >
            {timeline && (
              <span aria-hidden="true" className={css.node} />
            )}

            <div className={css.card}>
              <div className={css.head} onClick={() => toggle(item.title)}>
                <p className={css.meta}>
                  <span>{timeline ? item.subtitle : pad(i + 1)}</span>
                  <ChevronDown className={css.chevron} aria-hidden="true" />
                </p>

                <PageHeader cursorSize="2rem" noSpan className={css.title}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={bodyId}
                  >
                    {item.title}
                  </button>
                </PageHeader>

                <p className={css.sub}>
                  <b>{timeline ? item.date : item.subtitle}</b>
                  {item.location && <span> · {item.location}</span>}
                  {item.link && (
                    <span
                      className={css.visit}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <NavLink
                        href={item.link}
                        icon={<ArrowUpRight className="size-4" />}
                      >
                        Visit
                      </NavLink>
                    </span>
                  )}
                </p>

                {item.stack && (
                  <ul className={css.stack}>
                    {item.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div id={bodyId} className={css.body} inert={!open}>
                <div>
                  <div className={css.desc}>{item.desc}</div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
