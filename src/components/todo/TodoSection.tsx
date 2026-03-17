import { useState } from "react";
import GoalHeader from "../goal/GoalHeader";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import type { Goal, Todo } from "../../types";
import { useTodos } from "../../hooks/useTodos";

interface TodoSectionProps {
  goal: Goal;
  todos: Todo[];
  selectedDate: string;
}

const TodoSection = ({ goal, todos, selectedDate }: TodoSectionProps) => {
  const [showInput, setShowInput] = useState(false);
  const { addTodo } = useTodos();

  return (
    <>
      <GoalHeader goal={goal} onAdd={() => setShowInput(true)} />
      <TodoList todos={todos} color={goal.color} />
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
