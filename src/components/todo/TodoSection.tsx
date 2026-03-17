import { useState } from "react";
import GoalHeader from "../goal/GoalHeader";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import type { Goal } from "../../types";
import { useTodoStore } from "../../store/useTodoStore";

interface TodoSectionProps {
  goal: Goal;
  selectedDate: string;
}

const TodoSection = ({ goal, selectedDate }: TodoSectionProps) => {
  const [showInput, setShowInput] = useState(false);
  const { todos, addTodo } = useTodoStore();

  const filteredTodos = todos.filter(
    (t) => t.goalId === goal.id && t.date === selectedDate,
  );

  return (
    <>
      <GoalHeader goal={goal} onAdd={() => setShowInput(true)} />
      <TodoList todos={filteredTodos} color={goal.color} />
      {showInput && (
        <TodoInput
          color={goal.color}
          onAdd={async (content) => {
            await addTodo(goal.id, content, selectedDate);
            setShowInput(false);
          }}
          onClose={() => setShowInput(false)}
        />
      )}
    </>
  );
};

export default TodoSection;
