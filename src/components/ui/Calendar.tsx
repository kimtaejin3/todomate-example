import styled from "styled-components";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import type { CSSProperties, ReactNode } from "react";

interface CalendarProps {
  style?: CSSProperties;
  year: number;
  month: number;
  weekdays: string[];
  days: (Date | null)[];
  onBack: () => void;
  onForward: () => void;
  renderCell: (date: Date | null, idx: number) => ReactNode;
}

const Calendar = ({
  style,
  year,
  month,
  weekdays,
  days,
  onBack,
  onForward,
  renderCell,
}: CalendarProps) => {
  return (
    <Container style={style}>
      <Header>
        <CurrentDate>
          {year}년 {month}월
        </CurrentDate>
        <Control>
          <MdArrowBackIos onClick={onBack} />
          <MdArrowForwardIos onClick={onForward} />
        </Control>
      </Header>
      <Weekdays>
        {weekdays.map((day) => (
          <WeekdayCell key={day}>{day}</WeekdayCell>
        ))}
      </Weekdays>
      <Days>{days.map((date, idx) => renderCell(date, idx))}</Days>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 -15px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CurrentDate = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-left: 17px;
`;

const Control = styled.div`
  cursor: pointer;
  margin-right: 15px;
  display: flex;
  gap: 13px;
`;

const Weekdays = styled.div`
  display: flex;
  font-size: 13px;
  margin-bottom: 10px;
`;

const WeekdayCell = styled.div`
  text-align: center;
  width: 14.2%;
`;

const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  margin-bottom: 10px;
`;

export default Calendar;
