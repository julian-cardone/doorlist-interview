import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "link" | "primary";
};

export function Button({ variant = "ghost", children, ...props }: Props) {
  return (
    <button className={`${styles.base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
