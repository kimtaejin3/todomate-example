import styled from "styled-components";

const TodoInput = () => {
  return (
    <Container>
      <Input type="text" placeholder="할 일 입력" $color="#000" />
      <Btn>추가</Btn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const Input = styled.input<{ $color: string }>`
  margin-top: 20px;
  border: none;
  border-bottom: 2px solid ${(props) => props.$color};
  width: 50%;
  font-size: 14px;
  padding-bottom: 5px;
  &:focus {
    outline: none;
  }
`;

const Btn = styled.button`
  background-color: #f2f2f2;
  border: none;
  padding: 8px;
  font-weight: bold;
  font-size: 11px;
  border-radius: 10px;
  cursor: pointer;
`;

export default TodoInput;
