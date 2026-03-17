import { useMemo, useState } from "react";
import { isSameDate } from "../util/date";

const TODAY = new Date();
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function useCalendar() {
  const [currentYear, setCurrentYear] = useState(TODAY.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(TODAY.getMonth() + 1);

  const days = useMemo(
    () => getDayesByMon(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  const goBack = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goForward = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return isSameDate(date, TODAY);
  };

  return {
    year: currentYear,
    month: currentMonth,
    weekdays: DAYS,
    days,
    navigate: {
      back: goBack,
      forward: goForward,
    },
    isToday,
  };
}

function getDayesByMon(year: number, mon: number): (Date | null)[] {
  const days = new Date(year, mon, 0).getDate();
  const firstDay = new Date(year, mon - 1, 1).getDay();
  const startDay = DAYS.indexOf("일"); // DAYS 배열의 시작 요일 기준
  const blanks: (Date | null)[] = Array((firstDay - startDay + 7) % 7).fill(
    null,
  );
  const dates: (Date | null)[] = Array(days)
    .fill(0)
    .map((_, i) => new Date(year, mon - 1, i + 1));

  return [...blanks, ...dates];
}

