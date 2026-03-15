import styled from "styled-components";
import { GrFormPrevious } from "react-icons/gr";
import { FaAngleDown } from "react-icons/fa";
import ColorPickerBottomSheet from "../components/goal/ColorPickerBottomSheet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const AddGoal = () => {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("#000");
  const [goal, setGoal] = useState("");

  const navigate = useNavigate();

  const handleColorBtnClick = () => {
    setShow(true);
  };

  const handleSubmit = () => {
    navigate("/feed");
  };

  return (
    <Container>
      <Header>
        <Link to="/feed">
          <GrFormPrevious fontSize={32} />
        </Link>
        <HeaderTitle>목표</HeaderTitle>
        <Button onClick={handleSubmit}>확인</Button>
      </Header>
      <Contents>
        <div>
          <Input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            $color={color}
            type="text"
            placeholder="목표 입력"
          />
        </div>

        <SelectColor>
          <span>색상</span>
          <ColorBtn onClick={handleColorBtnClick}>
            <Preview $color={color} />
            <FaAngleDown />
          </ColorBtn>
        </SelectColor>

        {show && (
          <ColorPickerBottomSheet
            selectedColor={color}
            onSelectColor={setColor}
            onClose={() => setShow(false)}
          />
        )}
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  padding: 20px 30px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    &:active {
      color: #000;
    }
  }
`;

const HeaderTitle = styled.h1`
  font-size: 17px;
`;

const Contents = styled.div`
  padding-top: 20px;
`;

const Input = styled.input<{ $color: string }>`
  width: 100%;
  border: none;
  border-bottom: 3px solid ${({ $color }) => $color};
  padding-bottom: 5px;
  &:focus {
    outline: none;
  }
`;

const SelectColor = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ColorBtn = styled.button`
  background-color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
const Preview = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

export default AddGoal;
