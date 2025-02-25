import { ReactNode, useId } from "react";
import css from "./style.module.scss";

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
    <div className={`${css.box}`}>
      <input type="checkbox" id={id} />
      <label htmlFor={id} onClick={onClick}>
        <div>{title}</div>
      </label>
      <div className={css.content}>{children}</div>
    </div>
  );
}
