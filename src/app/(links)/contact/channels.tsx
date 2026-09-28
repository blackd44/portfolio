"use client";

import { GithubSvg, LinkedinSvg } from "@/assets/svg";
import { cn } from "@/utils/utils";
import {
  ArrowUpRight,
  AtSign,
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ReactNode, useState, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import css from "./style.module.scss";

type Direct = {
  label: string;
  value: string;
  copy: string;
  href: string;
  action: string;
  short: string;
  icon: ReactNode;
};

const direct: Direct[] = [
  {
    label: "Email",
    value: "irabd44@gmail.com",
    copy: "irabd44@gmail.com",
    href: "mailto:irabd44@gmail.com",
    action: "Write an email",
    short: "Email",
    icon: <Mail className="size-4" />,
  },
  {
    label: "Phone",
    value: "+250 798 895 340",
    copy: "+250798895340",
    href: "tel:+250798895340",
    action: "Call",
    short: "Call",
    icon: <Phone className="size-4" />,
  },
];

const profiles = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/iradukunda-benn-dalton/",
    icon: <LinkedinSvg size={[16, 16]} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/blackd44/",
    icon: <GithubSvg size={[18, 18]} />,
  },
];

const kigaliTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Kigali",
  hour: "2-digit",
  minute: "2-digit",
});
const subscribeTime = (cb: () => void) => {
  const timer = setInterval(cb, 30_000);
  return () => clearInterval(timer);
};
const getTime = () => kigaliTime.format(new Date());
const getServerTime = () => null;

export default function Channels() {
  const [copied, setCopied] = useState<string | null>(null);
  const time = useSyncExternalStore(subscribeTime, getTime, getServerTime);

  const copy = async (c: Direct) => {
    try {
      await navigator.clipboard.writeText(c.copy);
      setCopied(c.label);
      toast.success(`${c.label} copied`);
      setTimeout(
        () => setCopied((cur) => (cur === c.label ? null : cur)),
        1500,
      );
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <section className={cn(css.panel, css.panelRight, "tone-2")}>
      <header className={css.head}>
        <span className={css.icon}>
          <AtSign className="size-5" />
        </span>
        <span>
          <span className={css.side}>Or reach me directly</span>
          <span className={css.focus}>Email, phone & profiles</span>
        </span>
      </header>

      <ul className={css.direct}>
        {direct.map((c) => (
          <li key={c.label}>
            <span className={css.label}>
              {c.icon}
              {c.label}
            </span>
            <span className={css.row}>
              <a href={c.href} className={css.value}>
                {c.value}
              </a>
              <span className={css.actions}>
                <button
                  type="button"
                  aria-label={`Copy ${c.label}`}
                  data-cursor-size="1.5rem"
                  onClick={() => copy(c)}
                  className={cn(copied === c.label && css.copied)}
                >
                  {copied === c.label ? (
                    <Check className="size-3" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  {copied === c.label ? "Copied" : "Copy"}
                </button>
                <a href={c.href} aria-label={c.action}>
                  <ArrowUpRight className="size-3" />
                  {c.short}
                </a>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className={css.profiles}>
        {profiles.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {p.icon}
            {p.name}
            <ArrowUpRight className="size-4" />
          </a>
        ))}
      </div>

      <p className={css.where}>
        <span>
          <MapPin className="size-4" />
          Kigali, Rwanda
        </span>
        {time && <span className={css.time}>{time} in Kigali</span>}
      </p>
    </section>
  );
}
