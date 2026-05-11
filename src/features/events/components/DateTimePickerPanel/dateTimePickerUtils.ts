export type DateMode = "start" | "end";

export type TimePeriod = "AM" | "PM";

export type TimeState = {
  date: string;
  hour: number;
  minute: number;
  period: TimePeriod;
};

export function toDateInputValue(date: Date): string {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 10);
}

export function toDateTimeInputValue(date: Date): string {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
}

export function parseToTimeState(value?: string): TimeState {
  const date = value ? new Date(value) : new Date();
  const hours = date.getHours();

  return {
    date: toDateInputValue(date),
    hour: hours % 12 || 12,
    minute: date.getMinutes(),
    period: hours >= 12 ? "PM" : "AM",
  };
}

export function getMonthDays(monthDate: Date): Array<Date | null> {
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

export function getMonthFromDateValue(dateValue: string): Date {
  const [year, month] = dateValue.split("-").map(Number);

  return new Date(year, month - 1, 1);
}

export function combineState(state: TimeState): string {
  let hour24 = state.hour;

  if (state.period === "PM" && state.hour !== 12) hour24 += 12;
  if (state.period === "AM" && state.hour === 12) hour24 = 0;

  const [year, month, day] = state.date.split("-").map(Number);
  const date = new Date(year, month - 1, day, hour24, state.minute);

  return toDateTimeInputValue(date);
}

export function formatDatetime(value: string): string {
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

export function formatDateRange(
  startDate: Date,
  endDate?: Date,
): string {
  const startOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  if (endDate && startDate.toDateString() !== endDate.toDateString()) {
    return `${startDate.toLocaleDateString("en-US", startOptions)} - ${endDate.getDate()}`;
  }

  return startDate.toLocaleDateString("en-US", startOptions);
}

export function formatTimeRange(
  startTime: Date,
  endTime?: Date,
): string {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const startTimeStr = startTime.toLocaleTimeString("en-US", timeOptions);

  if (endTime) {
    const endTimeStr = endTime.toLocaleTimeString("en-US", timeOptions);
    return `${startTimeStr} - ${endTimeStr}`;
  }

  return startTimeStr;
}

export function formatDateRangeFromString(
  startDateStr: string,
  endDateStr?: string,
): string {
  const startDate = new Date(startDateStr);
  const endDate = endDateStr ? new Date(endDateStr) : undefined;
  return formatDateRange(startDate, endDate);
}

export function formatTimeRangeFromString(
  startDateStr: string,
  endDateStr?: string,
): string {
  const startDate = new Date(startDateStr);
  const endDate = endDateStr ? new Date(endDateStr) : undefined;
  return formatTimeRange(startDate, endDate);
}

