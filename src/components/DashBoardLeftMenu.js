import { Link } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";
import {
  faInstagram,
  faServicestack,
  faTeamspeak,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCompass,
  faHeart,
  faNewspaper,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBoxes,
  faHands,
  faHome,
  faPeopleCarry,
  faPlane,
  faProjectDiagram,
  faSearch,
  faServer,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.main`
  margin-right: auto;
  height: 100%;
  background-color: #004070;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

// const ButtonSection = styled.div`
// height: 100vh;
// `

const Letter = styled.div`
  margin-left: 10px;
`;

const DashBoardSection = styled.div`
  padding-left: 20px;
  color: #a09d9d;
  font-size: 18px;
  align-items: center;
  display: flex;
  font-weight: 600;
  cursor: pointer;
  height: 45px;
  &:hover {
    color: white;
    background-color: #fdfdfd7f;
  }
`;

const MyTeam = styled.div`
  padding-left: 20px;
  height: 45px;
  cursor: pointer;
  align-items: center;
  display: flex;
  color: #a09d9d;
  font-size: 18px;
  margin-top: 25px;
  font-weight: 600;
  &:hover {
    color: white;
    background-color: #fdfdfd7f;
  }
`;

const MyProfile = styled.div`
  padding-left: 20px;
  height: 45px;
  cursor: pointer;
  align-items: center;
  display: flex;
  color: #a09d9d;
  font-size: 18px;
  margin-top: 25px;
  font-weight: 600;
  &:hover {
    color: white;
    background-color: #fdfdfd7f;
  }
`;

const ICON = styled.div`
  width: 30px;
  height: 100%;
  /* background-color: red; */
  display: flex;
  align-items: center;
`;

function DashBoardLeftMenu() {
  return (
    <Container>
      {/* <ButtonSection> */}
      <Link to="/">
        <DashBoardSection>
          <ICON>
            <FontAwesomeIcon icon={faBoxes} size="lg" />
          </ICON>
          <Letter>DASHBOARD</Letter>
        </DashBoardSection>
      </Link>
      <Link to="/myTeam">
        <MyTeam>
          <ICON>
            <FontAwesomeIcon icon={faPeopleCarry} size="lg" />
          </ICON>
          <Letter>MY Team</Letter>
        </MyTeam>
      </Link>
      <Link to="/myProfile">
        <MyProfile>
          <ICON>
            {" "}
            <FontAwesomeIcon icon={faNewspaper} size="lg" />
          </ICON>
          <Letter>MY PROFILE</Letter>{" "}
        </MyProfile>
      </Link>

     
      {/* </ButtonSection> */}
    </Container>
  );
}

export default DashBoardLeftMenu;
