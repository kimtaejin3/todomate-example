import styled from "styled-components";
import EmptyGraph from "./EmptyGraph";

interface DateCellProps {
  date: Date | null;
  isToday?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const DateCell = ({ date, isToday = false, isSelected = false, onClick }: DateCellProps) => {
  if (!date) {
    return <Wrapper />;
  }

  return (
    <Wrapper onClick={onClick}>
      <EmptyGraph />
      {isToday ? (
        <TodayNum $selected={isSelected}>{date.getDate()}</TodayNum>
      ) : (
        <DateNum $selected={isSelected}>{date.getDate()}</DateNum>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 14.2%;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const DateNum = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: ${(props) => (props.$selected ? "white" : "black")};
  background-color: ${(props) => (props.$selected ? "black" : "white")};
`;

const TodayNum = styled(DateNum)`
  color: white;
  background-color: ${(props) => (props.$selected ? "black" : "#dadde2")};
`;

export default DateCell;
