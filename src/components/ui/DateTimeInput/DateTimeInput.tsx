import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./DateTimeInput.module.css";

type DateTimeInputProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> & {
  value: string;
  placeholder?: string;
  displayClassName?: string;
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
  placeholder = "",
  className,
  displayClassName,
  ...props
}: DateTimeInputProps) {
  return (
    <button type="button" className={cx(styles.wrapper, className)} {...props}>
      <span
        className={cx(
          styles.display,
          !value && styles.placeholder,
          displayClassName,
        )}
      >
        {value ? formatDatetime(value) : placeholder}
      </span>
    </button>
  );
}
