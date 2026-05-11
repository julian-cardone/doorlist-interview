import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./Avatar.module.css";

type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  name: string;
  gradient?: string;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
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
