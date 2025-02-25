import { cn } from "@/utils/utils";
import React from "react";

export default function PageHeader({
  children,
  h1: useH1,
  noSpan = false,
  cursorSize,
  cursorFilter,
  className,
}: {
  children: React.ReactNode;
  h1?: boolean;
  noSpan?: boolean;
  cursorSize?: string;
  cursorFilter?: string;
  className?: string;
}) {
  const Tag = useH1 ? "h1" : "h2";

  const obj = {
    "data-cursor-filter": cursorFilter || "invert(1)",
    "data-cursor-size": cursorSize || "50px",
  };

  return (
    <Tag className={cn("uppercase font-audiowide", className)} {...(noSpan ? obj : {})}>
      {!noSpan ? <span {...obj}>{children}</span> : <>{children}</>}
    </Tag>
  );
}
