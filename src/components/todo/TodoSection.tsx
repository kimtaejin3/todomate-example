import GoalHeader from "../goal/GoalHeader";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

const TodoSection = () => {
  return (
    <>
      <GoalHeader />
      <TodoList />
      <TodoInput />
    </>
  );
};

export default TodoSection;
