import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Todo } from "../../types";
import { useToggleTodo, useUpdateTodo, useDeleteTodo } from "../../hooks/useTodos";

interface TodoListItemProps {
  todo: Todo;
  color: string;
}

const TodoListItem = ({ todo, color }: TodoListItemProps) => {
  const toggleMutation = useToggleTodo();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const handleToggle = () => {
    toggleMutation.mutate({ id: todo.id, isCompleted: !todo.isCompleted });
  };

  const handleEdit = () => {
    const newContent = prompt("할 일 수정", todo.content);
    if (newContent && newContent.trim()) {
      updateMutation.mutate({ id: todo.id, content: newContent.trim() });
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  return (
    <ListItem>
      <CheckToggle
        onClick={handleToggle}
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
        <ActionBtn onClick={handleDelete}>
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
