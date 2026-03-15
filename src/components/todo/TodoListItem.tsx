import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

const TodoListItem = () => {
  return (
    <ListItem>
      <CheckToggle $isCompleted={false} $color="#d3d8db">
        <FaCheck color="#fff" />
      </CheckToggle>
      <Content>할 일 예시</Content>
      <Actions>
        <ActionBtn>
          <MdEdit />
        </ActionBtn>
        <ActionBtn>
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

const Content = styled.div`
  flex-grow: 1;
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
