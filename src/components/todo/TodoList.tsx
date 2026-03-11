import styled from "styled-components";
import TodoListItem from "./TodoListItem";

export interface Todo {
  todoId: number;
  content: string;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: Todo[];
  color: string;
  onToggle: (todo: Todo) => void;
}

const TodoList = ({ todos, color, onToggle }: TodoListProps) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.todoId}
          todo={todo}
          color={color}
          onToggle={onToggle}
        />
      ))}
    </List>
  );
};

const List = styled.ul``;

export default TodoList;
