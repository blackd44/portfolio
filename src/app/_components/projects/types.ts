import { ReactNode } from "react";

export type Project = {
  title: string;
  subtitle: string;
  link?: string;
  stack?: string[];
  desc: ReactNode;
};

export type ViewProps = { items: Project[] };

export const pad = (n: number) => String(n).padStart(2, "0");
export const tone = (i: number) => (i % 2 ? "tone-2" : "tone-1");
export const host = (link: string) =>
  new URL(link).hostname.replace(/^www\./, "");
