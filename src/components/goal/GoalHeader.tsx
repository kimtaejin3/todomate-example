import { TbCards } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";

const GoalHeader = () => {
  return (
    <Container>
      <TbCards style={{ fontSize: "18px" }} />
      <GoalName $color="#797ef6">목표 이름</GoalName>
      <AddBtn>
        <MdAdd id="addBtn" />
      </AddBtn>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f2f2f2;
  padding: 8px 13px;
  width: fit-content;
  border-radius: 30px;
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 30px;
  &:first-child {
    margin-top: 0;
  }
`;

const GoalName = styled.div<{ $color: string }>`
  font-weight: bold;
  font-size: 15px;
  color: ${(props) => props.$color};
`;

const AddBtn = styled.div`
  background-color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default GoalHeader;
