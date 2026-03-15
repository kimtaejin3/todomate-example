import styled from "styled-components";

interface GraphProps {
  colors?: string[];
}

function adjustColors(arr: string[]): string[] {
  if (arr.length === 1) return [arr[0], arr[0], arr[0], arr[0]];
  if (arr.length === 2) return [arr[0], arr[0], arr[1], arr[1]];
  if (arr.length === 3) return [arr[0], arr[0], arr[1], arr[2]];
  return [arr[0], arr[1], arr[2], arr[3]];
}

export default function Graph({ colors = [] }: GraphProps) {
  if (colors.length === 0) {
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

  const [c1, c2, c3, c4] = adjustColors(colors);

  return (
    <Container>
      <Row style={{ marginBottom: "-5px" }}>
        <Circle style={{ backgroundColor: c1 }} />
        <Circle style={{ marginLeft: "-5px", backgroundColor: c2 }} />
      </Row>
      <Row>
        <Circle style={{ marginRight: "-5px", backgroundColor: c3 }} />
        <Circle style={{ backgroundColor: c4 }} />
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
