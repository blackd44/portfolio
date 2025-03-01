import { ReactNode, useId } from "react";
import css from "./style.module.scss";
import { cn } from "@/utils/utils";

type ItemProps = {
  children?: ReactNode;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

type AccProps = ItemProps & {
  title?: ReactNode | string;
};

export default function Accordion({ title, children, onClick }: AccProps) {
  const id = useId();

  return (
    <div className={cn(css.box, "[&>label]:hover:outline-1 -mx-3")}>
      <input type="checkbox" id={id} />
      <label
        htmlFor={id}
        onClick={onClick}
        className={cn("outline-color !outline outline-0 !px-3 !pb-1.5 m-1", "rounded-md")}
      >
        <div>{title}</div>
      </label>
      <div className={css.content}>{children}</div>
    </div>
  );
}
