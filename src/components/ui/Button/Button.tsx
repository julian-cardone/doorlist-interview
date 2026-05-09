import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "link" | "primary";
};

export function Button({
  variant = "ghost",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={`${styles.base} ${styles[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
