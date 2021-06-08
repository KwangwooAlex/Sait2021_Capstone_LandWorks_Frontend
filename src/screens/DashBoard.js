import styled from "styled-components";

const Logout = () => {
  localStorage.removeItem("TOKEN_CAPSTONE");
  window.location.assign("/");
};

const LogoutBtn = styled.button`
  width: 100px;
  height: 30px;
  background-color: white;
  margin-left: 20px;
`;

const DashBoardContainer = styled.div`
  height: 100vh;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DashBoard() {
  return (
    <DashBoardContainer onClick={Logout}>
      Login Successfully<LogoutBtn onClick={Logout}>Log out</LogoutBtn>
    </DashBoardContainer>
  );
}
export default DashBoard;
