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
  // pass both to control it (e.g. one open at a time); omit for uncontrolled
  open?: boolean;
  onToggle?: () => void;
};

export default function Accordion({
  title,
  children,
  onClick,
  open,
  onToggle,
}: AccProps) {
  const id = useId();

  return (
    <div className={cn(css.box, "[&>label]:hover:outline-1 -mx-3")}>
      <input
        type="checkbox"
        id={id}
        {...(onToggle ? { checked: !!open, onChange: onToggle } : {})}
      />
      <label
        htmlFor={id}
        onClick={onClick}
        className={cn("outline-color px-3! pb-1.5! m-1", "rounded-md")}
      >
        <div>{title}</div>
      </label>
      <div className={css.content}>{children}</div>
    </div>
  );
}
