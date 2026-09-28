import PageHeader from "@/app/_components/ui/page-header";
import css from "./style.module.scss";
import { cn } from "@/utils/utils";
import { Archive, Award, BrainCircuit, Palette } from "lucide-react";
import { Fragment, ReactNode } from "react";

type Group = { title: string; list: string[] };
type Hemisphere = {
  side: string;
  focus: string;
  mark: string;
  tone: "left" | "right";
  icon: ReactNode;
  groups: Group[];
};

const core = new Set(["TypeScript", "Node.js", "NestJS", "Express", "PostgreSQL", "WebSockets", "React", "Next.js", "Leadership"]);
const isCore = (skill: string) => core.has(skill.split(" (")[0]);

const hemispheres: Hemisphere[] = [
  {
    side: "Left brain",
    focus: "Logic & systems",
    mark: "Logic",
    tone: "left",
    icon: <BrainCircuit className="size-5" />,
    groups: [
      { title: "Languages", list: ["TypeScript", "JavaScript", "SQL"] },
      { title: "Backend", list: ["Node.js", "NestJS", "Express"] },
      {
        title: "Databases",
        list: ["PostgreSQL (indexing, query optimization)", "MongoDB", "SQLite"],
      },
      { title: "Real-time", list: ["WebSockets", "Socket.IO"] },
      { title: "APIs", list: ["REST", "GraphQL"] },
      { title: "DevOps", list: ["Docker", "GitHub Actions", "Git", "AWS"] },
      {
        title: "Practices",
        list: ["System design", "Performance optimization", "CI/CD", "Unit Testing"],
      },
    ],
  },
  {
    side: "Right brain",
    focus: "Craft & people",
    mark: "Craft",
    tone: "right",
    icon: <Palette className="size-5" />,
    groups: [
      {
        title: "Frontend",
        list: ["React", "Next.js", "TailwindCSS", "HTML5", "CSS3"],
      },
      {
        title: "Softwares",
        list: ["Figma", "Sketch", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"],
      },
      {
        title: "Soft skills",
        list: [
          "Leadership",
          "Communication",
          "Problem Solving",
          "Teamwork",
          "Time Management",
          "Attention to Detail",
          "Adaptability",
          "Flexibility",
        ],
      },
      { title: "Things I love", list: ["Mind Games", "Video Games", "Coding"] },
    ],
  },
];

const certifications = [
  { year: "2022", issuer: "freeCodeCamp", title: "JavaScript Algorithms & Data Structures" },
  { year: "2022", issuer: "Meta", title: "Programming with JavaScript" },
  { year: "2022", issuer: "freeCodeCamp", title: "Responsive Web Design" },
];

const spoken = [
  { name: "Kinyarwanda", level: "Native", value: 100 },
  { name: "English", level: "Fluent", value: 85 },
];

const pad = (n: number) => String(n).padStart(2, "0");

const Skills = () => {
  return (
    <>
      <PageHeader>In My Brain</PageHeader>
      <div className={cn(css.brain, "@container space-y-10")}>
        <div className={css.hemispheres}>
          {hemispheres.map((h, hi) => {
            const offset = hi === 0 ? 0 : hemispheres[0].groups.length;
            return (
              <Fragment key={h.side}>
                {hi > 0 && <span aria-hidden="true" className={css.synapse} />}
                <section className={cn(css.lobe, css[h.tone])}>
                  <span aria-hidden="true" className={css.mark}>
                    {h.mark}
                  </span>

                  <header className={css.lobeHead}>
                    <span className={css.icon}>{h.icon}</span>
                    <span>
                      <span className={css.side}>{h.side}</span>
                      <span className={css.focus}>{h.focus}</span>
                    </span>
                  </header>

                  <div className={css.rows}>
                    {h.groups.map((g, gi) => (
                      <article key={g.title} className={css.row}>
                        <h3>
                          <span className={css.index}>{pad(offset + gi + 1)}</span>
                          {g.title}
                        </h3>
                        <ul>
                          {g.list.map((skill) => (
                            <li key={skill} className={cn(isCore(skill) && css.isCore)}>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              </Fragment>
            );
          })}
        </div>

        <section className="space-y-6">
          <header className={css.lobeHead}>
            <span className={cn(css.icon, css.memoryIcon)}>
              <Archive className="size-5" />
            </span>
            <span>
              <span className={css.side}>Long-term memory</span>
              <span className={css.focus}>Certifications & languages</span>
            </span>
          </header>

          <div className={css.memory}>
            <ul className={css.certs}>
              {certifications.map((c) => (
                <li key={c.title} className={css.cert}>
                  <span className={css.stamp}>{c.year}</span>
                  <Award className={css.seal} />
                  <span className={css.issuer}>{c.issuer}</span>
                  <b>{c.title}</b>
                </li>
              ))}
            </ul>

            <ul className={css.meters}>
              {spoken.map((l) => (
                <li key={l.name}>
                  <p>
                    <b>{l.name}</b>
                    <span>{l.level}</span>
                  </p>
                  <span className={css.track}>
                    <span style={{ width: `${l.value}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Skills;
