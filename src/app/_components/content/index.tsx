import { ReactNode } from "react";
import ContentLinks from "./links";
import { cn } from "@/utils/utils";
import PageHeader from "../ui/page-header";

type props = {
  children: ReactNode;
  type?: string;
};

const Content = ({ children, type }: props) => {
  return (
    <>
      <section className="view">
        <div className={cn(`main-content  space-y-4`)}>{children}</div>
        <div className="mine">
          <div className="mine-inner">
            <PageHeader className="capitalize m-4 mx-8">Check</PageHeader>
            <ContentLinks />
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
