import PageHeader from "@/app/_components/ui/page-header";
import EntryList, { Entry } from "@/app/_components/entry-list";

const experience: Entry[] = [
  {
    title: "Lead Backend Engineer",
    subtitle: "AC Mobility · Tap & Go",
    location: "Kigali, Rwanda",
    date: "OCT 2025 - PRESENT",
    desc: (
      <ul>
        <li>
          <b>Own the backend of Rwanda&apos;s</b> public transport ticketing and
          payments platform serving daily fare transactions at national scale.
        </li>
        <li>
          Architected fault-tolerant REST services on Node.js (Express) and
          PostgreSQL, guaranteeing data consistency in a high-transaction,
          real-money environment.
        </li>
        <li>
          Delivered real-time fare validation and trip tracking operating
          reliably across a fleet of distributed devices.
        </li>
        <li>
          Cut latency on the platform&apos;s most critical endpoints through
          query tuning, indexing strategy, and systematic profiling.
        </li>
      </ul>
    ),
  },
  {
    title: "Lead Full-Stack Engineer",
    subtitle: "Blockchain Tech Solutions",
    location: "Remote · UK",
    date: "JUN 2024 - SEP 2025",
    desc: (
      <ul>
        <li>
          <b>Directed end-to-end delivery of</b> real-time gaming platforms for
          international clients, including Kokomo Games.
        </li>
        <li>
          Architected NestJS + PostgreSQL services that absorbed growth to 200K+
          users within 60 days of launch, sustaining stability under peak
          concurrency.
        </li>
        <li>
          Engineered the WebSocket infrastructure powering live gameplay,
          leaderboards, and event systems, including reward logic and
          anti-cheat mechanisms.
        </li>
        <li>
          Raised team velocity and code quality through mentorship, structured
          reviews, and shared engineering standards.
        </li>
      </ul>
    ),
  },
  {
    title: "Frontend Developer",
    subtitle: "Uruti Hub",
    location: "Kigali, Rwanda",
    date: "DEC 2023 - JUL 2024",
    desc: (
      <ul>
        <li>
          <b>Built</b> enterprise SaaS interfaces and data-heavy analytics
          dashboards in React and TypeScript.
        </li>
        <li>
          Introduced component-based patterns that improved rendering
          performance and long-term maintainability.
        </li>
        <li>
          Partnered with backend engineers on API contracts and contributed to
          CI/CD pipelines.
        </li>
      </ul>
    ),
  },
  {
    title: "Software Developer Apprenticeship",
    subtitle: "Andera",
    date: "DEC 2022 - SEP 2023",
    desc: (
      <ul>
        <li>
          Contributed to a range of challenging projects as part of a dynamic
          development team, gaining hands-on production experience.
        </li>
        <li>
          Collaborated with the product team to understand requirements and fix
          issues.
        </li>
        <li>
          Built features with TypeScript, React, GraphQL, and PostgreSQL, backed
          by unit tests.
        </li>
        <li>Designed and implemented user interfaces in HTML5/CSS3.</li>
      </ul>
    ),
  },
];

export default function Experience() {
  return (
    <>
      <PageHeader>My Experience</PageHeader>
      <EntryList items={experience} />
    </>
  );
}
