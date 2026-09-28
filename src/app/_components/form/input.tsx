import { cn } from "@/utils/utils";
import { ChangeEvent, HTMLInputTypeAttribute, useId } from "react";
import css from "./style.module.scss";

type props = {
  defaultValue?: string;
  name?: string;
  label?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
};

export default function Input({
  defaultValue = "",
  name,
  label,
  required,
  type = "text",
  onChange,
  onBlur,
  error,
}: props) {
  const errorId = useId();

  return (
    <div className={cn(css.box, error && css.invalid)}>
      <label>
        {label && <span>{label}</span>}
        <input
          type={type}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
          required={required}
          placeholder=" "
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      </label>
      {error && (
        <p id={errorId} className={css.error}>
          {error}
        </p>
      )}
    </div>
  );
}
