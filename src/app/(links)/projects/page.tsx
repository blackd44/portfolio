import Accordion from "@/app/_components/accordion";
import css from "./style.module.scss";
import PageHeader from "@/app/_components/ui/page-header";
import { cn } from "@/utils/utils";
import { NavLink } from "@/app/_components/header";

export default function Projects() {
  const experience = [
    {
      title: "Full-Stack Developer",
      company: "Blockchain Tech Solutions Ltd",
      date: "JUN 2024 - AUG 2025",
      desc: (
        <ul>
          <li>
            <span>
              Worked in partnership with Kokomo-games and make those projects
              bellow
            </span>
            <ul>
              <li>
                <b>1M1KOKOs</b>, an innovative tap-to-win game with system
                mechanics such as streaks and missions that achieved 200,000
                users in 2 months.
                <br />
                <NavLink
                  href="https://t.me/One_Million_One_bot?startapp=rs_5679160628"
                  className="font-bold italic ml-4"
                >
                  (Preview)
                </NavLink>
              </li>
              <li>
                <b>KOKO Snake</b>, a skill-based variant of Snake introducing a
                specialized economic system for users to earn KOKOs, which are
                then converted to real money value contingent on player skill.
                <br />
                <NavLink
                  href="https://t.me/Koko_Snake_Bot?startapp=rs_5679160628"
                  className="font-bold italic ml-4"
                >
                  (Preview)
                </NavLink>
              </li>
              <li>
                KOKO Snake has achieved over 100,000 users in less than two
                weeks
              </li>
            </ul>
          </li>
          <li>
            Skills: Nestjs, Next.js, postgreSQL, server management, algorithm,
            web sockets
          </li>
        </ul>
      ),
    },
    {
      title: "Frontend Developer",
      company: "Uruti Hub",
      date: "DEC 2023 - JULY 2024",
      desc: (
        <ul>
          <li>Expertising ReactJs with typescript</li>
          <li>
            Solved problems using the latest in web technologies includes,AWS,
            PostgreSQL, unit testing, and skills in HTML5/CSS3.
          </li>
          <li>Working in SaaS projects</li>
        </ul>
      ),
    },
    {
      title: "Software Developer Apprenticeship",
      company: "Blockchain Tech Solutions Ltd",
      date: "DEC 2022 - SEP 2023",
      desc: (
        <div>
          Throughout this Apprenticeship, I actively and passionately
          contributed to a range of challenging projects, thereby gaining
          invaluable hands-on experience.
          <ul>
            <li>
              This experience was a testament to my ability to seamlessly
              integrate into a dynamic development team, demonstrating not only
              my technical prowess but also my aptitude for effective
              collaboration.
            </li>
            <li>
              Collaborated with the product team to understand requirements and
              fix issues.
            </li>
            <li>
              Solved problems using the latest in web technologies includes
              typescript, ReactJs, GraphQL, PostgreSQL, unit testing, and skills
              in HTML5/CSS3.
            </li>
            <li>Designing and implementing the designs</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader>My Experience</PageHeader>
      <div className={cn(css.list)}>
        {experience.map((item, index) => (
          <Accordion
            key={index}
            title={
              <>
                <PageHeader cursorSize="2rem" noSpan>
                  {item.title}
                </PageHeader>
                <em>
                  <b>{item.company}</b>, <small>{item.date}</small>
                </em>
              </>
            }
          >
            {item.desc}
          </Accordion>
        ))}
      </div>
    </>
  );
}
