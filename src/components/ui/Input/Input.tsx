import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
  variant?: "title" | "field" | "pill";
  prefix?: ReactNode;
};

export function Input({
  variant = "field",
  prefix,
  className,
  ...props
}: Props) {
  if (variant === "pill") {
    return (
      <div className={`${styles.pill} ${className ?? ""}`}>
        {prefix != null && <span className={styles.pillPrefix}>{prefix}</span>}
        <input className={styles.base} {...props} />
      </div>
    );
  }

  return (
    <input
      className={`${styles.base} ${styles[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
