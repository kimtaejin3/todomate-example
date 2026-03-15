import styled from "styled-components";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  return (
    <List>
      <TodoListItem />
    </List>
  );
};

const List = styled.ul``;

export default TodoList;
