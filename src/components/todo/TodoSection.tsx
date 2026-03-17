import { useState } from "react";
import GoalHeader from "../goal/GoalHeader";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import type { Goal, Todo } from "../../types";

interface TodoSectionProps {
  goal: Goal;
  todos: Todo[];
  selectedDate: string;
  onAddTodo: (goalId: string, content: string, date: string) => void;
  onToggleTodo: (id: string) => void;
  onUpdateTodo: (id: string, content: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateGoal: (id: string, name: string) => void;
  onDeleteGoal: (id: string) => void;
}

const TodoSection = ({
  goal,
  todos,
  selectedDate,
  onAddTodo,
  onToggleTodo,
  onUpdateTodo,
  onDeleteTodo,
  onUpdateGoal,
  onDeleteGoal,
}: TodoSectionProps) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <>
      <GoalHeader
        goal={goal}
        onAdd={() => setShowInput(true)}
        onUpdate={(name) => onUpdateGoal(goal.id, name)}
        onDelete={() => onDeleteGoal(goal.id)}
      />
      <TodoList
        todos={todos}
        color={goal.color}
        onToggle={onToggleTodo}
        onUpdate={onUpdateTodo}
        onDelete={onDeleteTodo}
      />
      {showInput && (
        <TodoInput
          color={goal.color}
          onAdd={(content) => {
            onAddTodo(goal.id, content, selectedDate);
            setShowInput(false);
          }}
          onClose={() => setShowInput(false)}
        />
      )}
    </>
  );
};

export default TodoSection;
