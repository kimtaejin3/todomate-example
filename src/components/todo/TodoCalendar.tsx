import type { CSSProperties } from "react";
import Calendar from "../ui/Calendar";
import DateCell from "../ui/DateCell";
import Graph from "../ui/Graph";
import TodoGraph from "./TodoGraph";
import { useCalendar } from "../../hooks/useCalendar";
import { useGoals } from "../../hooks/useGoals";
import { useTodos } from "../../hooks/useTodos";
import { formatDate, isSameDate } from "../../util/date";

interface TodoCalendarProps {
  style?: CSSProperties;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const TodoCalendar = ({
  style,
  selectedDate,
  onSelectDate,
}: TodoCalendarProps) => {
  const { year, month, weekdays, days, navigate, check } = useCalendar();
  const { goals } = useGoals();
  const { todos } = useTodos();

  const goalColorMap = Object.fromEntries(goals.map((g) => [g.id, g.color]));

  const getTodosForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return todos.filter((t) => t.date === dateStr);
  };

  const getColorsForDate = (dateTodos: typeof todos) => {
    const completedTodos = dateTodos.filter((t) => t.isCompleted);
    const goalIds = [...new Set(completedTodos.map((t) => t.goalId))];
    return goalIds.map((id) => goalColorMap[id]).filter(Boolean);
  };

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
          isSelected={date ? isSameDate(date, selectedDate) : false}
          onClick={() => date && onSelectDate(date)}
          icon={date ? (() => {
            const dateTodos = getTodosForDate(date);
            if (dateTodos.length === 0) return <Graph />;
            const colors = getColorsForDate(dateTodos);
            const remaining = dateTodos.length - dateTodos.filter((t) => t.isCompleted).length;
            return <TodoGraph colors={colors} remaining={remaining} />;
          })() : undefined}
        />
      )}
    />
  );
};

export default TodoCalendar;
