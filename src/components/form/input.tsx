import { ChangeEvent } from "react";
import css from './style.module.scss'

type props = {
  defaultValue?: string;
  name?: string;
  label?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export default function Input({
  defaultValue = "",
  name,
  label,
  required,
  onChange,
}: props) {
  return (
    <div className={css.box}>
      <label>
        {label && <span>{label}</span>}
        <input
          type="text"
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
          required={required}
        />
      </label>
    </div>
  );
}
