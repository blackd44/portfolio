import { NavLink } from "@/app/_components/header";
import { cn } from "@/utils/utils";
import { ArrowUpRight } from "lucide-react";
import css from "./briefing.module.scss";
import { host, pad, Project } from "./types";

type Props = {
  p: Project;
  i: number;
  // Hide the description and stack (their space is kept).
  collapsed?: boolean;
  // Makes the title a button, e.g. to scroll to this stage.
  onSelect?: () => void;
};

// A stage's details. The parent sets --tint and draws the frame.
export default function Briefing({ p, i, collapsed, onSelect }: Props) {
  return (
    <>
      <div className={css.head}>
        <p className={css.stage}>
          Stage {pad(i + 1)} · {p.subtitle}
        </p>
        {p.link && (
          <NavLink
            href={p.link}
            icon={<ArrowUpRight className="size-4" />}
            className={css.enter}
          >
            Enter {host(p.link)}
          </NavLink>
        )}
      </div>
      <h3 className={css.title}>
        {onSelect ? (
          <button type="button" onClick={onSelect}>
            {p.title}
          </button>
        ) : (
          p.title
        )}
      </h3>
      <div
        className={cn(css.more, collapsed && css.collapsed)}
        inert={collapsed}
      >
        <div className={css.desc}>{p.desc}</div>
        {p.stack && <p className={css.stack}>{p.stack.join("  ·  ")}</p>}
      </div>
    </>
  );
}
