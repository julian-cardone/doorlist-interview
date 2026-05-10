import type { ReactNode } from "react";
import styles from "./Drawer.module.css";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Drawer({ isOpen, children, className }: Props) {
  return (
    <aside className={cx(styles.drawer, isOpen && styles.open, className)}>
      {children}
    </aside>
  );
}
