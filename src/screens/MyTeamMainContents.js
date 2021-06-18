import { Link } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";
import teamImg from "../asset/teamImg.PNG";

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

const CreateBtn = styled.button` 
  margin-top: 10px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 200px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
`;
const TeamImg = styled.img`

`;
function MyTeamMainContents() {
  return (
    <Container>
      <MainTitle>MY TEAM</MainTitle>
      <CreateBtn>+ Create or Join Team</CreateBtn>
      <TeamImg src={teamImg}></TeamImg>
    </Container>
  );
}

export default MyTeamMainContents;
