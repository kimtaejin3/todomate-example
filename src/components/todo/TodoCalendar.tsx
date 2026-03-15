import type { CSSProperties } from "react";
import Calendar from "../ui/Calendar";
import DateCell from "../ui/DateCell";
import Graph from "../ui/Graph";
import { useCalendar } from "../../hooks/useCalendar";

interface TodoCalendarProps {
  style?: CSSProperties;
}

const TodoCalendar = ({ style }: TodoCalendarProps) => {
  const { year, month, weekdays, days, navigate, select, check } =
    useCalendar();

  return (
    <Calendar
      style={style}
      year={year}
      month={month}
      weekdays={weekdays}
      days={days}
      onBack={navigate.back}
      onForward={navigate.forward}
      renderCell={(date, idx) => (
        <DateCell
          key={date ? date.getTime() : `empty-${idx}`}
          date={date}
          isToday={check.isToday(date)}
          isSelected={check.isSelected(date)}
          onClick={() => date && select(date)}
          icon={date ? <Graph /> : undefined}
        />
      )}
    />
  );
};

export default TodoCalendar;
