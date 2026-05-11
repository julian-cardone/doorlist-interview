import { useState } from "react";
import { Button } from "../../../../components/ui/Button/Button";
import { DateTimeInput } from "../../../../components/ui/DateTimeInput/DateTimeInput";
import { Modal } from "../../../../components/ui/Modal/Modal";
import { DateTimePickerPanel } from "../DateTimePickerPanel/DateTimePickerPanel";
import styles from "./EventDateRow.module.css";

type ActiveDateField = "start" | "end";

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
  const [activeField, setActiveField] = useState<ActiveDateField | null>(null);

  function closePicker() {
    setActiveField(null);
  }

  function handleSave(start: string | null, end: string | null) {
    if (start !== null) {
      onStartAtChange(start);
    }

    if (end !== null) {
      onEndAtChange(end);
      setShowEnd(true);
    }

    closePicker();
  }

  function handleOpenEndPicker() {
    setShowEnd(true);
    setActiveField("end");
  }

  return (
    <>
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

              {startAt ? (
                <DateTimeInput
                  value={startAt}
                  aria-label="Start date and time"
                  onClick={() => setActiveField("start")}
                />
              ) : (
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setActiveField("start")}
                >
                  Add Start-Time
                </Button>
              )}
            </div>

            <div className={styles.row}>
              <span className={styles.label}>Ends</span>

              {showEnd && endAt ? (
                <DateTimeInput
                  value={endAt}
                  aria-label="End date and time"
                  onClick={() => setActiveField("end")}
                />
              ) : (
                <Button
                  variant="link"
                  type="button"
                  onClick={handleOpenEndPicker}
                >
                  Add End-Time
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={activeField !== null} onClose={closePicker}>
        <DateTimePickerPanel
          initialMode={activeField ?? "start"}
          startValue={startAt}
          endValue={endAt}
          onCancel={closePicker}
          onSave={handleSave}
        />
      </Modal>
    </>
  );
}
