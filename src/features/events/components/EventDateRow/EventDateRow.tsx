import { useState } from "react";
import { Button } from "../../../../components/ui/Button/Button";
import { DateTimeInput } from "../../../../components/ui/DateTimeInput/DateTimeInput";
import styles from "./EventDateRow.module.css";

type Props = {
  startAt: string;
  onStartAtChange: (value: string) => void;
  endAt?: string;
  onEndAtChange: (value: string) => void;
};

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

            <DateTimeInput
              value={startAt}
              placeholder="Select date & time"
              aria-label="Start date and time"
              onChange={onStartAtChange}
            />
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Ends</span>

            {showEnd ? (
              <DateTimeInput
                value={endAt ?? ""}
                placeholder="Select date & time"
                aria-label="End date and time"
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
