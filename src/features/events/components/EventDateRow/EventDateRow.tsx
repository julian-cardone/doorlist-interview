import { useState } from "react";
import { Button } from "../../../../components/ui/Button/Button";
import { cx } from "../../../../lib/cssUtils";
import styles from "./EventDateRow.module.css";

type Props = {
  startAt: string;
  onStartAtChange: (value: string) => void;
  endAt?: string;
  onEndAtChange: (value: string) => void;
};

function formatDatetime(value: string): string {
  if (!value) return "";

  const date = new Date(value);

  return [
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  ].join(" ");
}

export function EventDateRow({
  startAt,
  onStartAtChange,
  endAt,
  onEndAtChange,
}: Props) {
  const [showEnd, setShowEnd] = useState(Boolean(endAt));

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.timeline}>
          <span className={styles.dot} />
          <span className={styles.connector} />
          <span className={styles.dot} />
        </div>

        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.label}>Starts</span>

            <DateInput
              value={startAt}
              placeholder="Select date & time"
              ariaLabel="Start date and time"
              onChange={onStartAtChange}
            />
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Ends</span>

            {showEnd ? (
              <DateInput
                value={endAt ?? ""}
                placeholder="Select date & time"
                ariaLabel="End date and time"
                onChange={onEndAtChange}
              />
            ) : (
              <Button
                variant="link"
                type="button"
                onClick={() => setShowEnd(true)}
              >
                Add End-Time
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type DateInputProps = {
  value: string;
  placeholder: string;
  ariaLabel: string;
  onChange: (value: string) => void;
};

function DateInput({
  value,
  placeholder,
  ariaLabel,
  onChange,
}: DateInputProps) {
  return (
    <div className={styles.dateValue}>
      <span
        className={cx(styles.dateDisplay, !value && styles.datePlaceholder)}
      >
        {value ? formatDatetime(value) : placeholder}
      </span>

      <input
        type="datetime-local"
        className={styles.dateInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
      />
    </div>
  );
}
