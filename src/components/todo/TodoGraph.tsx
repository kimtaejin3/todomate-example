import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import Graph from "../ui/Graph";

interface TodoGraphProps {
  colors: string[];
  remaining: number;
}

const TodoGraph = ({ colors, remaining }: TodoGraphProps) => {
  return (
    <Container>
      <Count>{remaining === 0 ? <FaCheck size={8} /> : remaining}</Count>
      <Graph colors={colors} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Count = styled.div`
  position: absolute;
  z-index: 4;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TodoGraph;
