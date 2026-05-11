import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./Input.module.css";

type InputVariant = "title" | "field" | "pill";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  textPrefix?: ReactNode;
  textSuffix?: ReactNode;
};

export function Input({
  variant,
  className,
  required,
  textPrefix,
  textSuffix,
  placeholder,
  ...props
}: Props) {
  const textVariantClass = styles[`${variant}Input`];

  return (
    <div
      className={cx(
        styles.wrapper,
        variant === "pill" && styles.pillWrapper,
        className,
      )}
    >
      {textPrefix && <span className={styles.affix}>{textPrefix}</span>}

      <span className={styles.inputArea}>
        <input
          className={cx(styles.base, textVariantClass)}
          placeholder={placeholder ? " " : undefined}
          {...props}
        />

        {placeholder && (
          <span className={cx(styles.placeholder, textVariantClass)}>
            {placeholder}
            {required && <span className={styles.requiredAsterisk}>*</span>}
          </span>
        )}
      </span>

      {textSuffix && <span className={styles.affix}>{textSuffix}</span>}
    </div>
  );
}
