import Content from "@/app/_components/content";
import PageHeader from "./_components/ui/page-header";

export default function Home() {
  return (
    <Content>
      <PageHeader
        h1
        cursorSize="4rem"
        className="leading-tight opacity-85 !text-5xl pb-4"
      >
        Crafting Code, <br />
        <small>Leveling Up Experiences</small>
      </PageHeader>
      <div className="space-y-4 [&_span]:opacity-80">
        <p
          data-cursor-filter="invert(1)"
          data-cursor-size="1.5rem"
          className="paragraph"
        >
          <span>I&apos;m</span>{" "}
          <b className="contrast-125 font-audiowide">
            IRADUKUNDA Dushimimana Benn Dalton
          </b>
          <span>
            , a Full-Stack Developer who loves turning ideas into smooth and
            powerful digital experiences. From designing clean interfaces to
            building strong backends, I create solutions that work and feel
            great. Let&apos;s build something amazing! 🚀
          </span>
        </p>
      </div>
    </Content>
  );
}
