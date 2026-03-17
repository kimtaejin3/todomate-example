import TodoCalendar from "../components/todo/TodoCalendar";
import { CiCircleMore } from "react-icons/ci";
import { TbCardsFilled } from "react-icons/tb";
import TodoSection from "../components/todo/TodoSection";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useGoals } from "../hooks/useGoals";
import { useTodos } from "../hooks/useTodos";
import { useState } from "react";

const Feed = () => {
  const navigate = useNavigate();
  const { goals, loading: goalsLoading, error: goalsError } = useGoals();
  const { loading: todosLoading, error: todosError } = useTodos();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <Header>
        <LayoutWrapper>
          <Headings>
            <Logo>
              <TbCardsFilled />
            </Logo>
            <Button onClick={() => navigate("/goal")}>
              <CiCircleMore style={{ fontSize: "25px", cursor: "pointer" }} />
            </Button>
          </Headings>
        </LayoutWrapper>
      </Header>
      <Main>
        <LayoutWrapper>
          <Container>
            <Left>
              <Profile>
                <ProfileIcon>
                  <img
                    src="https://palmbites.ca/cdn/shop/files/Chocolatemochicookieswithpistachiofilling.png?v=1770226948&width=1780"
                    alt="profileImg"
                  />
                </ProfileIcon>
                <div>
                  <Name>doochoncoo</Name>
                  <ProfileDescription>
                    프로필에 자기소개를 입력해보세요.
                  </ProfileDescription>
                </div>
              </Profile>
              <TodoCalendar
                style={{ marginTop: "20px", width: "380px" }}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              {todosError && <ErrorMsg>{todosError}</ErrorMsg>}
            </Left>
            <Right>
              {goalsLoading || todosLoading ? (
                <LoadingMsg>로딩 중...</LoadingMsg>
              ) : goalsError ? (
                <ErrorMsg>{goalsError}</ErrorMsg>
              ) : (
                goals.map((goal) => (
                  <TodoSection
                    key={goal.id}
                    goal={goal}
                    selectedDate={selectedDate}
                  />
                ))
              )}
            </Right>
          </Container>
        </LayoutWrapper>
      </Main>
    </>
  );
};

const LayoutWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  padding: 20px 0;
`;

const Headings = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Main = styled.main``;
const Left = styled.div``;
const Right = styled.div`
  flex-grow: 1;
`;

const Logo = styled.div`
  font-size: 17px;
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 80px;
`;

const Profile = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ProfileDescription = styled.div`
  font-size: 14px;
  color: #7a7a7a;
`;

const ProfileIcon = styled.div`
  background-color: #f2f2f2;
  width: 50px;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.h2`
  font-weight: bold;
  font-size: 18px;
  margin: 0 0 5px;
`;

const LoadingMsg = styled.div`
  color: #999;
  padding: 20px 0;
`;

const ErrorMsg = styled.div`
  color: #f54e5e;
  padding: 10px 0;
  font-size: 14px;
`;

export default Feed;
