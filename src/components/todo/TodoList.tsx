import styled from "styled-components";
import TodoListItem from "./TodoListItem";
import type { Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
  color: string;
  onToggle: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, color, onToggle, onUpdate, onDelete }: TodoListProps) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          color={color}
          onToggle={() => onToggle(todo.id)}
          onUpdate={(content) => onUpdate(todo.id, content)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </List>
  );
};

const List = styled.ul``;

export default TodoList;
