import type { InputHTMLAttributes } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./DateTimeInput.module.css";

type DateTimeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> & {
  value: string;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  inputClassName?: string;
  onChange: (value: string) => void;
};

function formatDatetime(value: string): string {
  if (!value) return "";

  const date = new Date(value);

  return [
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  ].join(" ");
}

export function DateTimeInput({
  value,
  placeholder = "Select date & time",
  className,
  displayClassName,
  inputClassName,
  onChange,
  ...props
}: DateTimeInputProps) {
  return (
    <span className={cx(styles.wrapper, className)}>
      <span
        className={cx(
          styles.display,
          !value && styles.placeholder,
          displayClassName,
        )}
      >
        {value ? formatDatetime(value) : placeholder}
      </span>

      <input
        className={cx(styles.input, inputClassName)}
        type="datetime-local"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </span>
  );
}
