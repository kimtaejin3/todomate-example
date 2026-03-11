import styled from "styled-components";
import { Circle, Row } from "./GraphParts";

export default function EmptyGraph() {
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
