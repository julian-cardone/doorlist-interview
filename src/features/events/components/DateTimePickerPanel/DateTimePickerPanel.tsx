import { useState } from "react";

import { cx } from "../../../../lib/cssUtils";

import { CalendarGrid } from "./CalendarGrid";
import { TimeStepper } from "./TimeStepper";

import {
  combineState,
  getMonthFromDateValue,
  parseToTimeState,
  type DateMode,
  type TimeState,
} from "./dateTimePickerUtils";

import styles from "./DateTimePickerPanel.module.css";

type DateTimePickerPanelProps = {
  initialMode: DateMode;
  startValue?: string;
  endValue?: string;
  onCancel: () => void;
  onSave: (start: string | null, end: string | null) => void;
};

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

  const [startTouched, setStartTouched] = useState(
    Boolean(startValue) || initialMode === "start",
  );

  const [endTouched, setEndTouched] = useState(
    Boolean(endValue) || initialMode === "end",
  );

  const [visibleMonth, setVisibleMonth] = useState(() => {
    const activeState =
      initialMode === "start"
        ? parseToTimeState(startValue)
        : parseToTimeState(endValue);

    return getMonthFromDateValue(activeState.date);
  });

  const currentState = mode === "start" ? startState : endState;
  const setCurrentState = mode === "start" ? setStartState : setEndState;

  function markTouched(nextMode = mode) {
    if (nextMode === "start") {
      setStartTouched(true);
      return;
    }

    setEndTouched(true);
  }

  function handleModeChange(nextMode: DateMode) {
    markTouched(nextMode);
    setMode(nextMode);

    const nextState = nextMode === "start" ? startState : endState;

    setVisibleMonth(getMonthFromDateValue(nextState.date));
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

  function handleSelectDate(date: string) {
    markTouched();

    setCurrentState((previous) => ({
      ...previous,
      date,
    }));
  }

  function handleTimeChange(nextState: TimeState) {
    markTouched();
    setCurrentState(nextState);
  }

  function handleSave() {
    onSave(
      startTouched ? combineState(startState) : null,
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

      <CalendarGrid
        visibleMonth={visibleMonth}
        selectedDate={currentState.date}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onSelectDate={handleSelectDate}
      />

      <TimeStepper
        value={currentState}
        onChange={handleTimeChange}
        onTouch={markTouched}
      />

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
