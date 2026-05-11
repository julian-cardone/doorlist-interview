import { cx } from "../../../../lib/cssUtils";
import styles from "./DateTimePickerPanel.module.css";
import type { TimePeriod, TimeState } from "./dateTimePickerUtils";

type TimeStepperProps = {
  value: TimeState;
  onChange: (value: TimeState) => void;
  onTouch?: () => void;
};

export function TimeStepper({ value, onChange, onTouch }: TimeStepperProps) {
  function update(nextValue: TimeState) {
    onTouch?.();
    onChange(nextValue);
  }

  function adjustHour(delta: number) {
    let hour = value.hour + delta;

    if (hour > 12) hour = 1;
    if (hour < 1) hour = 12;

    update({ ...value, hour });
  }

  function adjustMinute(delta: number) {
    const snapped = Math.round(value.minute / 5) * 5;
    const minute = (((snapped + delta * 5) % 60) + 60) % 60;

    update({ ...value, minute });
  }

  function setPeriod(period: TimePeriod) {
    update({ ...value, period });
  }

  return (
    <div className={styles.timeSection}>
      <p className={styles.sectionLabel}>Time</p>

      <div className={styles.timePicker}>
        <div className={styles.timeUnit}>
          <button
            type="button"
            className={styles.timeArrow}
            onClick={() => adjustHour(1)}
            aria-label="Increase hour"
          >
            ▲
          </button>

          <span className={styles.timeValueDisplay}>
            {String(value.hour).padStart(2, "0")}
          </span>

          <button
            type="button"
            className={styles.timeArrow}
            onClick={() => adjustHour(-1)}
            aria-label="Decrease hour"
          >
            ▼
          </button>
        </div>

        <span className={styles.colon}>:</span>

        <div className={styles.timeUnit}>
          <button
            type="button"
            className={styles.timeArrow}
            onClick={() => adjustMinute(1)}
            aria-label="Increase minute"
          >
            ▲
          </button>

          <span className={styles.timeValueDisplay}>
            {String(value.minute).padStart(2, "0")}
          </span>

          <button
            type="button"
            className={styles.timeArrow}
            onClick={() => adjustMinute(-1)}
            aria-label="Decrease minute"
          >
            ▼
          </button>
        </div>

        <div className={styles.periodToggle}>
          <button
            type="button"
            className={cx(
              styles.periodButton,
              value.period === "AM" && styles.activePeriod,
            )}
            onClick={() => setPeriod("AM")}
          >
            AM
          </button>

          <button
            type="button"
            className={cx(
              styles.periodButton,
              value.period === "PM" && styles.activePeriod,
            )}
            onClick={() => setPeriod("PM")}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
}
