import PageHeader from "@/app/_components/ui/page-header";
import EntryList, { Entry } from "@/app/_components/entry-list";
import { NavLink } from "@/app/_components/header";

const projects: Entry[] = [
  {
    title: "Taxacle",
    subtitle: "Online Tax Filing Platform",
    link: "https://taxacle.com/",
    desc: (
      <ul>
        <li>
          Tax preparation and filing platform for individuals and businesses in
          Rwanda, guiding users step by step through their tax declarations.
        </li>
        <li>
          Covers freelancers, individual taxpayers, and companies, with
          deduction identification and multi-user collaboration.
        </li>
      </ul>
    ),
  },
  {
    title: "Kokomo Games",
    subtitle: "Real-Time Gaming Platform",
    link: "https://play.kokomo.games/",
    stack: ["NestJS", "PostgreSQL", "WebSockets"],
    desc: (
      <ul>
        <li>
          WebSocket-driven multiplayer backend: live gameplay, leaderboards,
          rewards, and anti-cheat, scaled to 200K+ users in its first 60 days.
        </li>
        <li>
          <b>1M1KOKOs</b>, a tap-to-win game with streaks and missions.
          <NavLink
            href="https://t.me/One_Million_One_bot?startapp=rs_5679160628"
            className="font-bold italic ml-2"
          >
            (Preview)
          </NavLink>
        </li>
        <li>
          <b>KOKO Snake</b>, a skill-based Snake where players earn KOKOs that
          convert to real money value.
          <NavLink
            href="https://t.me/Koko_Snake_Bot?startapp=rs_5679160628"
            className="font-bold italic ml-2"
          >
            (Preview)
          </NavLink>
        </li>
      </ul>
    ),
  },
  {
    title: "Tap & Go",
    subtitle: "National Transit E-Ticketing",
    link: "https://www.acgroup.rw/",
    stack: ["Node.js", "Express", "PostgreSQL"],
    desc: (
      <ul>
        <li>
          Digital ticketing backend with real-time validation, trip tracking,
          and low-latency APIs handling high-volume daily transactions.
        </li>
      </ul>
    ),
  },
  {
    title: "Rwanda Villages",
    subtitle: "Administrative Location Search",
    link: "https://rwanda-villages.vercel.app/",
    desc: (
      <ul>
        <li>
          Search any administrative location in Rwanda and see its full
          hierarchy, from village up through cell, sector, district, and
          province to country.
        </li>
      </ul>
    ),
  },
];

export default function Projects() {
  return (
    <>
      <PageHeader>Key Projects</PageHeader>
      <EntryList items={projects} />
    </>
  );
}
