import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBoxes,
  faPeopleCarry,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.main`
  margin-right: auto;
  height: 1500px;
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
  color: #CDCDCD;
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
  color: #CDCDCD;
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
  color: #CDCDCD;
  font-size: 18px;
  margin-top: 25px;
  font-weight: 600;
  &:hover {
    color: white;
    background-color: #fcfcfd7f;
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
      <Link to="/myProfile">
        <MyProfile>
          <ICON>
            {" "}
            <FontAwesomeIcon icon={faNewspaper} size="lg" />
          </ICON>
          <Letter>MY PROFILE</Letter>{" "}
        </MyProfile>
      </Link>
      <Link to="/myTeam">
        <MyTeam>
          <ICON>
            <FontAwesomeIcon icon={faPeopleCarry} size="lg" />
          </ICON>
          <Letter>MY Team</Letter>
        </MyTeam>
      </Link>
      <Link to="/allProject">
        <MyTeam>
          <ICON>
            <FontAwesomeIcon icon={faProjectDiagram} size="lg" />
          </ICON>
          <Letter>All Project</Letter>
        </MyTeam>
      </Link>

     
      {/* </ButtonSection> */}
    </Container>
  );
}

export default DashBoardLeftMenu;
