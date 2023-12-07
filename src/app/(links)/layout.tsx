import Content from "@/components/content";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Content type="links">
      {children}
    </Content>
  );
}
