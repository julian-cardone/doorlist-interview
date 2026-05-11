import { useMemo, useState } from "react";
import { cx } from "../../../../lib/cssUtils";
import styles from "./DateTimePickerPanel.module.css";

type DateMode = "start" | "end";

type TimeState = {
  date: string;
  hour: number;
  minute: number;
  period: "AM" | "PM";
};

type DateTimePickerPanelProps = {
  initialMode: DateMode;
  startValue?: string;
  endValue?: string;
  onCancel: () => void;
  onSave: (start: string, end: string | null) => void;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function toDateTimeInputValue(date: Date): string {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
}

function parseToTimeState(value?: string): TimeState {
  const date = value ? new Date(value) : new Date();
  const hours = date.getHours();

  return {
    date: toDateInputValue(date),
    hour: hours % 12 || 12,
    minute: date.getMinutes(),
    period: hours >= 12 ? "PM" : "AM",
  };
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: startDay + daysInMonth }, (_, index) => {
    if (index < startDay) return null;

    return new Date(year, month, index - startDay + 1);
  });
}

function combineState(state: TimeState): string {
  let h24 = state.hour;

  if (state.period === "PM" && state.hour !== 12) h24 += 12;
  if (state.period === "AM" && state.hour === 12) h24 = 0;

  const [year, month, day] = state.date.split("-").map(Number);
  const date = new Date(year, month - 1, day, h24, state.minute);

  return toDateTimeInputValue(date);
}

export function DateTimePickerPanel({
  initialMode,
  startValue,
  endValue,
  onCancel,
  onSave,
}: DateTimePickerPanelProps) {
  const [mode, setMode] = useState<DateMode>(initialMode);
  const [startState, setStartState] = useState<TimeState>(() =>
    parseToTimeState(startValue),
  );
  const [endState, setEndState] = useState<TimeState>(() =>
    parseToTimeState(endValue),
  );
  const [endTouched, setEndTouched] = useState(Boolean(endValue));

  const [visibleMonth, setVisibleMonth] = useState(() => {
    const dateStr =
      initialMode === "start"
        ? parseToTimeState(startValue).date
        : parseToTimeState(endValue).date;
    const [y, m] = dateStr.split("-").map(Number);

    return new Date(y, m - 1, 1);
  });

  const currentState = mode === "start" ? startState : endState;
  const setCurrentState = mode === "start" ? setStartState : setEndState;

  const monthDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);

  function handleModeChange(newMode: DateMode) {
    if (newMode === "end") setEndTouched(true);
    setMode(newMode);

    const dateStr = newMode === "start" ? startState.date : endState.date;
    const [y, m] = dateStr.split("-").map(Number);

    setVisibleMonth(new Date(y, m - 1, 1));
  }

  function handlePreviousMonth() {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  }

  function handleNextMonth() {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  }

  function adjustHour(delta: number) {
    setCurrentState((prev) => {
      let h = prev.hour + delta;

      if (h > 12) h = 1;
      if (h < 1) h = 12;

      return { ...prev, hour: h };
    });
  }

  function adjustMinute(delta: number) {
    setCurrentState((prev) => {
      const snapped = Math.round(prev.minute / 5) * 5;
      const m = (((snapped + delta * 5) % 60) + 60) % 60;

      return { ...prev, minute: m };
    });
  }

  function setPeriod(period: "AM" | "PM") {
    setCurrentState((prev) => ({ ...prev, period }));
  }

  function handleSave() {
    onSave(
      combineState(startState),
      endTouched ? combineState(endState) : null,
    );
  }

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Event time</p>

          <h2 className={styles.title}>
            {mode === "start" ? "Start time" : "End time"}
          </h2>
        </div>

        <button className={styles.closeButton} type="button" onClick={onCancel}>
          ×
        </button>
      </header>

      <div className={styles.tabs}>
        <button
          type="button"
          className={cx(styles.tab, mode === "start" && styles.activeTab)}
          onClick={() => handleModeChange("start")}
        >
          Start<span className={styles.required}>*</span>
        </button>

        <button
          type="button"
          className={cx(styles.tab, mode === "end" && styles.activeTab)}
          onClick={() => handleModeChange("end")}
        >
          End
        </button>
      </div>

      <div className={styles.calendar}>
        <div className={styles.monthHeader}>
          <button
            type="button"
            className={styles.monthButton}
            onClick={handlePreviousMonth}
          >
            ‹
          </button>

          <span>
            {visibleMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <button
            type="button"
            className={styles.monthButton}
            onClick={handleNextMonth}
          >
            ›
          </button>
        </div>

        <div className={styles.dayGrid}>
          {DAYS.map((day) => (
            <span key={day} className={styles.dayLabel}>
              {day}
            </span>
          ))}

          {monthDays.map((date, index) => {
            if (!date) {
              return <span key={`empty-${index}`} />;
            }

            const dateValue = toDateInputValue(date);
            const isSelected = dateValue === currentState.date;

            return (
              <button
                key={dateValue}
                type="button"
                className={cx(
                  styles.dateButton,
                  isSelected && styles.selectedDate,
                )}
                onClick={() =>
                  setCurrentState((prev) => ({ ...prev, date: dateValue }))
                }
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

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
              {String(currentState.hour).padStart(2, "0")}
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
              {String(currentState.minute).padStart(2, "0")}
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
                currentState.period === "AM" && styles.activePeriod,
              )}
              onClick={() => setPeriod("AM")}
            >
              AM
            </button>
            <button
              type="button"
              className={cx(
                styles.periodButton,
                currentState.period === "PM" && styles.activePeriod,
              )}
              onClick={() => setPeriod("PM")}
            >
              PM
            </button>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSave}
        >
          Save
        </button>
      </footer>
    </section>
  );
}
