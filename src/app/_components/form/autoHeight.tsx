import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  ReactNode,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils/utils";
import css from "./style.module.scss";

type props = {
  defaultValue?: string;
  children?: ReactNode;
  name?: string;
  label?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  hint?: ReactNode;
};

export default function InputAutoHeight({
  defaultValue = "",
  children,
  name,
  label,
  required,
  onChange,
  onBlur,
  error,
  hint,
}: props) {
  const errorId = useId();
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [filled, setFilled] = useState(Boolean(defaultValue || children));

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
      setFilled(span.innerText.trim() !== "");

      const event = {
        ...e,
        target: { ...e.target, name: name, value: span.innerText },
      };
      if (onChange)
        onChange(event as unknown as ChangeEvent<HTMLTextAreaElement>);
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
    <div className={cn(css.box, error && css.invalid)}>
      <label onClick={focus}>
        {label && <span>{label}</span>}
        <span
          ref={spanRef}
          className={`${css.autoHeight} ${filled ? css.valid : ""}`}
          role="textbox"
          aria-label={label}
          aria-multiline="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onBlur={onBlur}
          contentEditable
        >
          {defaultValue || children}
        </span>
      </label>
      {(error || hint) && (
        <p className={css.hint}>
          <span id={errorId} className={css.error}>
            {error}
          </span>
          {hint && <span>{hint}</span>}
        </p>
      )}
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
