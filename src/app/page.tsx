import Content from "@/app/_components/content";
import PageHeader from "./_components/ui/page-header";
import { cn } from "@/utils/utils";

const impact = [
  {
    value: "200K+ users",
    desc: "Scaled a real-time platform to 200K+ users within 60 days of launch.",
  },
  {
    value: "National scale",
    desc: "Backend owner of a countrywide transit payments platform, 1M+ transactions a day.",
  },
  {
    value: "2× lead roles",
    desc: "Trusted with end-to-end technical ownership and team leadership.",
  },
];

export default function Home() {
  return (
    <Content>
      <PageHeader
        h1
        cursorSize="4rem"
        className="leading-8 opacity-85 text-5xl! pb-4"
      >
        <span className="leading-none">Backend Engineer</span> <br />
        <span className="text-lg leading-none">
          Scalable APIs · Real-Time Systems
        </span>
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
            , a Backend Engineer with 4+ years of experience delivering
            production systems where scale and reliability are non-negotiable: a
            real-time gaming platform grown to 200K+ users within 60 days of
            launch, and a nationwide transit ticketing and payments backend
            processing real-money transactions every day. I specialize in
            Node.js, TypeScript, and PostgreSQL, with a focus on API design,
            real-time architecture, and performance engineering under high
            concurrency.
          </span>
        </p>
        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          {impact.map(({ value, desc }, i) => (
            <div key={value} className={cn(i % 2 ? "tone-2" : "tone-1")}>
              <PageHeader
                cursorSize="2rem"
                noSpan
                className="m-0 mb-1 text-(--tint)"
              >
                {value}
              </PageHeader>
              <p>
                <span>{desc}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Content>
  );
}
