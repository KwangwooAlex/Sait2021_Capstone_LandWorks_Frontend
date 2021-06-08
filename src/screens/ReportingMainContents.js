import { Link } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";

const Container = styled.main`
  padding: 40px 40px 0 40px;
  height: 100%;
  /* background-color: black; */
  width: 90%;
`;

const MainTitle = styled.div`
  color: #004070;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20px;
  width: 100%;
  height: 40px;
  border-bottom: black 2px solid;
  box-sizing: border-box;
`;

const LineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: ; */
  align-items: baseline;
`;

const FirstLine = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;
const SecondLine = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
`;
const ThirdLine = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
`;

const FirstBox20 = styled.div`
  width: 400px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
  background-color: #fab0ea;
`;

const SecondBox20 = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;

  background-color: #eee897;
`;
const SecondBox30 = styled.div`
  width: 650px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
`;

const ThirdBox40 = styled.div`
  width: 550px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
`;

const ThirdBox60 = styled.div`
  width: 1070px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
  background-color: #fab0ea;
`;

function ReportingMainContents() {
  return (
    <Container>
      <MainTitle>REPORTING</MainTitle>
      <LineContainer>
        <FirstLine>
          <FirstBox20></FirstBox20>
          <FirstBox20></FirstBox20>
          <FirstBox20></FirstBox20>
          <FirstBox20></FirstBox20>
        </FirstLine>
        <SecondLine>
          <SecondBox20></SecondBox20>
          <SecondBox30></SecondBox30>
          <SecondBox30></SecondBox30>
        </SecondLine>
        <ThirdLine>
          <ThirdBox40></ThirdBox40>
          <ThirdBox60></ThirdBox60>
        </ThirdLine>
      </LineContainer>
    </Container>
  );
}

export default ReportingMainContents;
