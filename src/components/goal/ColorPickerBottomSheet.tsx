import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import BottomSheet from "../ui/BottomSheet";

const COLORS = [
  "#000",
  "#282f59",
  "#1e2f98",
  "#2857aa",
  "#0076ff",
  "#1ba7ec",
  "#b964f4",
  "#785cb4",
  "#7300ab",
  "#797ef6",
  "#4b13fe",
  "#6236ff",
  "#2f9399",
  "#45a062",
  "#346f75",
  "#8dc540",
  "#00d43e",
  "#818a4b",
  "#fa9b89",
  "#ff6dc2",
  "#ff2c9e",
  "#eb7480",
  "#f54e5e",
  "#cb2f49",
  "#face34",
  "#ff910d",
  "#eb6b2b",
  "#dc9b1d",
  "#9d7856",
  "#744523",
  "#01a8a8",
  "#00c0a8",
  "#04df91",
  "#41d9e7",
  "#64c3c9",
  "#70a2db",
  "#fe6b9a",
  "#fe93b5",
  "#fcb2cb",
  "#c6d657",
  "#95bb8c",
  "#608c4d",
  "#766f85",
  "#81939c",
  "#a79b97",
  "#cfb290",
  "#b8666b",
  "#62223c",
];

interface ColorPickerBottomSheetProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onClose: () => void;
}

const ColorPickerBottomSheet = ({
  selectedColor,
  onSelectColor,
  onClose,
}: ColorPickerBottomSheetProps) => {
  const [currentColor, setCurrentColor] = useState(selectedColor);

  return (
    <BottomSheet onClose={onClose}>
      {(close) => (
        <>
          <ColorGrid>
            {COLORS.map((color) => (
              <Color
                key={color}
                $color={color}
                onClick={() => setCurrentColor(color)}
              >
                {color === currentColor && <FaCheck color="#fff" />}
              </Color>
            ))}
          </ColorGrid>
          <ConfirmBtn
            onClick={() => {
              onSelectColor(currentColor);
              close();
            }}
          >
            확인
          </ConfirmBtn>
        </>
      )}
    </BottomSheet>
  );
};

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 20px;
`;

const Color = styled.div<{ $color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBtn = styled.button`
  border: none;
  background-color: #f5f5f5;
  padding: 10px 0;
  width: 80%;
  display: block;
  margin: 40px auto 0;
  border-radius: 5px;
  cursor: pointer;
`;

export default ColorPickerBottomSheet;
