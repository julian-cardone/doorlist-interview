import { useMemo } from "react";

import { cx } from "../../../../lib/cssUtils";

import { getMonthDays, toDateInputValue } from "./dateTimePickerUtils";

import styles from "./DateTimePickerPanel.module.css";

type CalendarGridProps = {
  visibleMonth: Date;
  selectedDate: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: string) => void;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CalendarGrid({
  visibleMonth,
  selectedDate,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
}: CalendarGridProps) {
  const monthDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);

  return (
    <div className={styles.calendar}>
      <div className={styles.monthHeader}>
        <button
          type="button"
          className={styles.monthButton}
          onClick={onPreviousMonth}
          aria-label="Previous month"
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
          onClick={onNextMonth}
          aria-label="Next month"
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
          const isSelected = dateValue === selectedDate;

          return (
            <button
              key={dateValue}
              type="button"
              className={cx(
                styles.dateButton,
                isSelected && styles.selectedDate,
              )}
              onClick={() => onSelectDate(dateValue)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
