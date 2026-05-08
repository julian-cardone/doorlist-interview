import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "title" | "field";
};

export function Input({ variant = "field", className, ...props }: Props) {
  return <input className={`${styles.base} ${styles[variant]} ${className ?? ""}`} {...props} />;
}
