import { ReactNode } from "react";
import ContentLinks from "./links";

type props = {
  children: ReactNode;
  type?: string;
};

const Content = ({ children, type }: props) => {
  return (
    <>
      <section className="view">
        <div className={`main-content $`}>{children}</div>
        <div className="mine">
          <div className="mine-inner">
            <h2>
              <span data-cursor-filter="invert(1)" data-cursor-size="30px">
                Check
              </span>
            </h2>
            <ContentLinks />
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
