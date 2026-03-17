import styled from "styled-components";
import TodoListItem from "./TodoListItem";
import type { Todo } from "../../types";

interface TodoListProps {
  todos: Todo[];
  color: string;
}

const TodoList = ({ todos, color }: TodoListProps) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} color={color} />
      ))}
    </List>
  );
};

const List = styled.ul``;

export default TodoList;
