import Content from "@/app/_components/content";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Content type="links">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-1 text-sm font-semibold uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      {children}
    </Content>
  );
}
