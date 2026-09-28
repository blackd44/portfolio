import PageHeader from "@/app/_components/ui/page-header";
import css from "./style.module.scss";
import { cn } from "@/utils/utils";

const Skills = () => {
  return (
    <>
      <PageHeader>In My Brain</PageHeader>
      <div className={cn(css.articles, "space-y-4")}>
        {[
          {
            title: "Languages",
            list: ["TypeScript", "JavaScript", "SQL"],
          },
          {
            title: "Backend",
            list: ["Node.js", "NestJS", "Express"],
          },
          {
            title: "Frontend",
            list: ["React", "Next.js", "TailwindCSS", "HTML5", "CSS3"],
          },
          {
            title: "Databases",
            list: [
              "PostgreSQL (indexing, query optimization)",
              "MongoDB",
              "SQLite",
            ],
          },
          {
            title: "Real-time",
            list: ["WebSockets", "Socket.IO"],
          },
          {
            title: "APIs",
            list: ["REST", "GraphQL"],
          },
          {
            title: "DevOps",
            list: ["Docker", "GitHub Actions", "Git", "AWS"],
          },
          {
            title: "Practices",
            list: [
              "System design",
              "Performance optimization",
              "CI/CD",
              "Unit Testing",
            ],
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
          {
            title: "Softwares",
            list: [
              "Figma",
              "Sketch",
              "Adobe Photoshop",
              "Adobe Illustrator",
              "Adobe InDesign",
            ],
          },
          {
            title: "Certifications",
            list: [
              "freeCodeCamp: JavaScript Algorithms & Data Structures (2022)",
              "Meta: Programming with JavaScript (2022)",
              "freeCodeCamp: Responsive Web Design (2022)",
            ],
          },
          {
            title: "Spoken languages",
            list: ["English (Fluent)", "Kinyarwanda (Native)"],
          },
          {
            title: "Things I love",
            list: ["Mind Games", "Video Games", "Coding"],
          },
        ].map(({ title, list }) => (
          <article key={title}>
            <h3 className="font-semibold mb-2">{title}</h3>
            <ul className="pl-2">
              {list.map((one) => (
                <li key={one}>{one}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
};

export default Skills;
