"use client";

import Accordion from "@/app/_components/accordion";
import { NavLink } from "@/app/_components/header";
import PageHeader from "@/app/_components/ui/page-header";
import { cn } from "@/utils/utils";
import { ArrowUpRight } from "lucide-react";
import { ReactNode, useState } from "react";
import css from "./style.module.scss";

export type Entry = {
  title: string;
  subtitle: string;
  location?: string;
  date?: string;
  link?: string;
  desc: ReactNode;
};

export default function EntryList({ items }: { items: Entry[] }) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <div className={cn(css.list)}>
      {items.map((item) => (
        <Accordion
          key={item.title}
          open={openTitle === item.title}
          onToggle={() =>
            setOpenTitle((cur) => (cur === item.title ? null : item.title))
          }
          title={
            <>
              <PageHeader cursorSize="2rem" noSpan>
                {item.title}
              </PageHeader>
              <em>
                <b>{item.subtitle}</b>
                {item.location && <small> · {item.location}</small>}
                {item.date && <small>, {item.date}</small>}
                {item.link && (
                  <NavLink
                    href={item.link}
                    icon={<ArrowUpRight className="inline size-4" />}
                    className="pl-4 not-italic"
                  >
                    Visit
                  </NavLink>
                )}
              </em>
            </>
          }
        >
          {item.desc}
        </Accordion>
      ))}
    </div>
  );
}
