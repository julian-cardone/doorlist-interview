import { useState } from "react";
import { Button } from "../../../../components/ui/Button/Button";
import styles from "./EventDateRow.module.css";

type Props = {
  startAt: string;
  onStartAtChange: (v: string) => void;
  endAt?: string;
  onEndAtChange: (v: string) => void;
};

function formatDatetime(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  return (
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) +
    " " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );
}

export function EventDateRow({
  startAt,
  onStartAtChange,
  endAt,
  onEndAtChange,
}: Props) {
  const [showEnd, setShowEnd] = useState(!!endAt);

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
            <div className={styles.dateValue}>
              <span className={[styles.dateDisplay, !startAt && styles.datePlaceholder].filter(Boolean).join(" ")}>
                {startAt ? formatDatetime(startAt) : "Select date & time"}
              </span>
              <input
                type="datetime-local"
                className={styles.dateInput}
                value={startAt}
                onChange={(e) => onStartAtChange(e.target.value)}
                aria-label="Start date and time"
              />
            </div>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Ends</span>
            {showEnd ? (
              <div className={styles.dateValue}>
                <span className={[styles.dateDisplay, !endAt && styles.datePlaceholder].filter(Boolean).join(" ")}>
                  {endAt ? formatDatetime(endAt) : "Select date & time"}
                </span>
                <input
                  type="datetime-local"
                  className={styles.dateInput}
                  value={endAt ?? ""}
                  onChange={(e) => onEndAtChange(e.target.value)}
                  aria-label="End date and time"
                />
              </div>
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
