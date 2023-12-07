import Accordion from "@/components/accordion";

export default function Projects() {
  return (
    <>
      <h2>
        <span data-cursor-filter="invert(1)" data-cursor-size="3.5rem">
          Projects
        </span>
      </h2>
      <div>
        <Accordion
          title={
            <>
              <h2>Software Developer Apprenticeship</h2>
              <em>
                <b>Andela (ATLP)</b>, <small>DEC, 2022 - SEP, 2023</small>
              </em>
            </>
          }
        >
          <div>
            Throughout this Apprenticeship, I actively and passionately
            contributed to a range of challenging projects, thereby gaining
            invaluable hands-on experience.
            <ul>
              <li>
                This experience was a testament to my ability to seamlessly
                integrate into a dynamic development team, demonstrating not
                only my technical prowess but also my aptitude for effective
                collaboration.
              </li>
              <li>
                Collaborated with the product team to understand requirements
                and fix issues.
              </li>
              <li>
                Solved problems using the latest in web technologies includes
                typescript, ReactJs, GraphQL, PostgreSQL, unit testing, and
                skills in HTML5/CSS3.
              </li>
              <li>Designing and implementing the designs</li>
            </ul>
          </div>
        </Accordion>
        <p>Software</p>
        <p>Things I love</p>
      </div>
    </>
  );
}
