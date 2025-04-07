import PageHeader from "@/app/_components/ui/page-header";
import css from "./style.module.scss";
import { cn } from "@/utils/utils";
import { title } from "process";

const Skills = () => {
  return (
    <>
      <PageHeader>In My Brain</PageHeader>
      <div className={cn(css.articles, "space-y-4")}>
        {[
          {
            title: "Technical skills",
            list: [
              "HTML5",
              "CSS3",
              "TailwindCSS",
              "JavaScript",
              "TypeScript",
              "ReactJS",
              "Nextjs",
              "Nestjs",
              "Node.js",
              "GraphQL",
              "PostgreSQL",
              "MongoDB",
              "Unit Testing",
              "Git",
              "AWS",
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
            title: "Languages",
            list: ["English"],
          },
          {
            title: "Things I love",
            list: ["Mind Games", "video games", "Coding"],
          },
        ]?.map(({ title, list }) => (
          <article key={title}>
            <h3 className="font-semibold mb-2">{title}</h3>
            <ul className="pl-2">
              {list?.map((one) => (
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
