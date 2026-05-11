import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./Avatar.module.css";

type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  name: string;
  gradient?: string;
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  name,
  gradient,
  className,
  style,
  ...props
}: AvatarProps) {
  return (
    <span
      className={cx(styles.avatar, className)}
      style={
        {
          background: gradient,
          ...style,
        } as CSSProperties
      }
      aria-label={name}
      {...props}
    >
      {initials(name)}
    </span>
  );
}
