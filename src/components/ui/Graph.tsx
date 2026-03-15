import styled from "styled-components";

export default function Graph() {
  return (
    <Container>
      <Row style={{ marginBottom: "-5px" }}>
        <Circle />
        <Circle style={{ marginLeft: "-5px" }} />
      </Row>
      <Row>
        <Circle style={{ marginRight: "-5px" }} />
        <Circle />
      </Row>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

export const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #d3d8db;
`;

export const Row = styled.div`
  display: flex;
`;

export const Count = styled.div`
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
