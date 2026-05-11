import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import { cx } from "../../../lib/cssUtils";

type ButtonVariant = "ghost" | "link" | "primary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "ghost",
  className,
  children,
  ...props
}: Props) {
  return (
    <button className={cx(styles.base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
