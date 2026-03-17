import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Todo } from "../../types";
import { useTodoStore } from "../../store/useTodoStore";

interface TodoListItemProps {
  todo: Todo;
  color: string;
}

const TodoListItem = ({ todo, color }: TodoListItemProps) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleEdit = () => {
    const newContent = prompt("할 일 수정", todo.content);
    if (newContent && newContent.trim()) {
      updateTodo(todo.id, newContent.trim());
    }
  };

  return (
    <ListItem>
      <CheckToggle
        onClick={() => toggleTodo(todo.id)}
        $isCompleted={todo.isCompleted}
        $color={color}
      >
        {todo.isCompleted && <FaCheck color="#fff" />}
      </CheckToggle>
      <Content $completed={todo.isCompleted}>{todo.content}</Content>
      <Actions>
        <ActionBtn onClick={handleEdit}>
          <MdEdit />
        </ActionBtn>
        <ActionBtn onClick={() => deleteTodo(todo.id)}>
          <MdDelete />
        </ActionBtn>
      </Actions>
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

const Content = styled.div<{ $completed: boolean }>`
  flex-grow: 1;
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
  color: ${({ $completed }) => ($completed ? "#999" : "inherit")};
`;

const Actions = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  color: #999;

  &:hover {
    color: #333;
  }
`;

export default TodoListItem;
