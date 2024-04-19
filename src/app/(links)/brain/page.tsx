import css from "./style.module.scss";

const Skills = () => {
  return (
    <>
      <h2>
        <span data-cursor-filter="invert(1)" data-cursor-size="50px">
          In My Brain
        </span>
      </h2>
      <div className={css.articles}>
        <article>
          <h3>Technical skills</h3>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>ReactJS</li>
            <li>Next.js</li>
            <li>Node.js</li>
            <li>GraphQL</li>
            <li>PostgreSQL</li>
            <li>Unit Testing</li>
          </ul>
        </article>
        <article>
          <h3>Software</h3>
          <ul>
            <li>Figma</li>
            <li>Sketch</li>
            <li>Adobe Photoshop</li>
            <li>Adobe Illustrator</li>
            <li>Adobe InDesign</li>
          </ul>
        </article>
        <article>
          <h3>Things I love</h3>
          <ul>
            <li>Problem Solving</li>
            <li>Mind Games</li>
            <li>Games</li>
            <li>Coding</li>
          </ul>
        </article>
      </div>
    </>
  );
};

export default Skills;
