import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./DateTimeInput.module.css";
import { formatDatetime } from "../../../features/events/components/DateTimePickerPanel/dateTimePickerUtils";

type DateTimeInputProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> & {
  value: string;
  placeholder?: string;
  displayClassName?: string;
};

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
