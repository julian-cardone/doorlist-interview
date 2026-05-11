import type { ReactNode } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./Drawer.module.css";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};

export function Drawer({ isOpen, children, className }: Props) {
  return (
    <aside
      className={cx(styles.drawer, isOpen && styles.open, className)}
      aria-hidden={!isOpen}
    >
      {children}
    </aside>
  );
}
