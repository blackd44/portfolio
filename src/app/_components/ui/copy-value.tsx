"use client";

import { cn } from "@/utils/utils";
import { Copy } from "lucide-react";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

export default function CopyValue({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [value]);

  return (
    <p
      className={cn(
        "relative text-foreground cursor-none",
        className,
        "[&>.copy-span]:hover:opacity-100"
      )}
    >
      <>{children}</>
      <span
        onClick={handleCopy}
        className={cn(
          "copy-span opacity-0 transition-all duration-300",
          "p-1 rounded-md h-fit bg-gray-500/40 cursor-pointer"
        )}
      >
        <Copy className="size-4" />
      </span>
    </p>
  );
}
