import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import type { Todo } from "./TodoList";

interface TodoListItemProps {
  todo: Todo;
  color: string;
  onToggle: (todo: Todo) => void;
}

const TodoListItem = ({ todo, color, onToggle }: TodoListItemProps) => {
  return (
    <ListItem>
      <CheckToggle
        onClick={() => onToggle(todo)}
        $isCompleted={todo.isCompleted}
        $color={color}
      >
        {todo.isCompleted && <FaCheck color="#fff" />}
      </CheckToggle>
      <div>{todo.content}</div>
    </ListItem>
  );
};

const ListItem = styled.li`
  margin: 3px 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CheckToggle = styled.button<{ $isCompleted: boolean; $color: string }>`
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  margin-left: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isCompleted, $color }) =>
    $isCompleted ? $color : "#d3d8db"};
`;

export default TodoListItem;
