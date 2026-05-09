import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

type InputVariant = "title" | "field" | "pill";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  textPrefix?: ReactNode;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Input({
  variant = "field",
  className,
  required,
  textPrefix,
  placeholder,
  ...props
}: Props) {
  return (
    <div
      className={cx(
        styles.wrapper,
        variant === "pill" && styles.pillWrapper,
        className,
      )}
    >
      {textPrefix && <span className={styles.pillPrefix}>{textPrefix}</span>}

      <span className={styles.inputArea}>
        <input
          className={cx(styles.base, styles[`${variant}Input`])}
          placeholder={placeholder ? " " : undefined}
          {...props}
        />

        {placeholder && (
          <span className={cx(styles.placeholder, styles[`${variant}Input`])}>
            {placeholder}
            {required && <span className={styles.requiredAsterisk}>*</span>}
          </span>
        )}
      </span>
    </div>
  );
}
