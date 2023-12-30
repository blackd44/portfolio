import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import css from "./style.module.scss";

type props = {
  defaultValue?: string;
  children?: ReactNode;
  name?: string;
  label?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export default function InputAutoHeight({
  defaultValue = "",
  children,
  name,
  label,
  required,
  onChange,
}: props) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const focus = useCallback(() => {
    if (!spanRef.current) return;
    spanRef.current.focus();
  }, []);

  const change = useCallback(
    (e: Event) => {
      const input = inputRef.current;
      const span = e.target as HTMLSpanElement;
      if (!input || !span) return;
      input.value = span.innerText;

      const event = {
        ...e,
        target: { ...e.target, name: name, value: span.innerText },
      };
      if (onChange) onChange(event as any);
    },
    [name, onChange]
  );

  useLayoutEffect(() => {
    if (!spanRef.current) return;
    const input = spanRef.current;
    input.addEventListener("input", change);
    return () => {
      input.removeEventListener("input", change);
    };
  }, [change]);

  return (
    <div className={css.box}>
      <label onClick={focus}>
        {label && <span>{label}</span>}
        <span
          ref={spanRef}
          className={`${css.autoHeight} ${
            spanRef.current?.innerText?.trim() == "" ? "" : css.valid
          }`}
          role="textbox"
          contentEditable
        >
          {defaultValue || children}
        </span>
      </label>
      <textarea
        onFocus={focus}
        ref={inputRef}
        className={`${css.autoHeight} ${css.hidden}`}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}
