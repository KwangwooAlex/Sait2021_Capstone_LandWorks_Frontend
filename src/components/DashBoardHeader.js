import { Link } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";

const Container = styled.main`
  margin: 0 auto;
  height: 50px;
  background-color: #004070;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MiddleTitle = styled.div`
  margin-left: 90px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 15px;
  font-weight: 500;
`;

const HamburgerMenu = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const QuestionMark = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Logout = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const LeftMenu = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const RightMenu = styled.div`
  width: 120px;
  height: 100%;
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoutFn = () => {
  localStorage.removeItem("TOKEN_CAPSTONE");
  window.location.assign("/");
};

function DashBoardHeader() {
  return (
    <Container>
      <LeftMenu>
        {/* <HamburgerMenu src={hamburgerMenu} /> */}
      </LeftMenu>
      <Link to="/">
        <MiddleTitle>Landwork Resource Management Inc</MiddleTitle>
      </Link>
      <RightMenu>
        <Link to="/myProfile">
          <Avatar src={avatar} />
        </Link>
        <QuestionMark src={questionMark} />
        <Logout src={logout} onClick={LogoutFn} />
      </RightMenu>
    </Container>
  );
}

export default DashBoardHeader;
