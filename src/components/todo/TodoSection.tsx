import { useState } from "react";
import GoalHeader from "../goal/GoalHeader";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import type { Goal } from "../../types";
import { useTodos } from "../../hooks/useTodos";
import { formatDate } from "../../util/date";

interface TodoSectionProps {
  goal: Goal;
  selectedDate: Date;
}

const TodoSection = ({ goal, selectedDate }: TodoSectionProps) => {
  const [showInput, setShowInput] = useState(false);
  const { todos, addTodo } = useTodos();

  const selectedDateStr = formatDate(selectedDate);
  const filteredTodos = todos.filter(
    (t) => t.goalId === goal.id && t.date === selectedDateStr,
  );

  return (
    <>
      <GoalHeader goal={goal} onAdd={() => setShowInput(true)} />
      <TodoList todos={filteredTodos} color={goal.color} />
      {showInput && (
        <TodoInput
          color={goal.color}
          onAdd={(content) => {
            addTodo(goal.id, content, selectedDateStr);
            setShowInput(false);
          }}
          onClose={() => setShowInput(false)}
        />
      )}
    </>
  );
};

export default TodoSection;
