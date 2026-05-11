import type { ReactNode } from "react";
import { cx } from "../../../lib/cssUtils";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  backdropClassName?: string;
  onClose?: () => void;
};

export function Modal({
  isOpen,
  children,
  className,
  backdropClassName,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={cx(styles.backdrop, backdropClassName)} onClick={onClose}>
      <section
        className={cx(styles.modal, className)}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </section>
    </div>
  );
}
