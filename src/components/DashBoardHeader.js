import { Link } from "react-router-dom";
import styled from "styled-components";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";
import { gql, useQuery } from "@apollo/client";
import Modal from "react-modal";
import { useState } from "react";

const ME_QUERY = gql`
  query me {
    me {
      username
      email
      companyName
      phoneNumber
      avatar
      birth
      country
      state
      city
      Street
    }
  }
`;

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

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
  border: 0.1px solid lightgray; 
  /* box-shadow: 0px 1px 3px white; */
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

const contatCustomStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "470px",
  },
};

const ModalHeader = styled.div`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CloseBtn = styled.button`
  background: white;
  padding: 0 auto;
  font-size: 10px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBody = styled.div`
  background-image: url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80");
  width: 100%;
  height: 426px;
  margin-top: -3%;
  opacity: 0.9;
`;

const ModalInfo = styled.div`
  /* background-image: url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80");
  width: 100%; 
  height: 426px; */
`;

const ModalInfoTop = styled.div`
  margin-top: 3%;
`;

const CompanyName = styled.h1`
  font-size: 25px;
  text-align: center;
  padding-top: 30px;
  z-index: 1;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  color: black;
`;
const CompanyInfo = styled.div`
  padding-top: 10px;
  padding-left: 18px;
  font-size: 17px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: bold;
  z-index: 1;

  line-height: 24px;
  color: black;
`;

const CompanyInfoCard = styled.div`
  margin-left: 12%;
  margin-top: 34%;
  width: 450px;
  height: 140px;
  border-radius: 10px;
  opacity: 0.78;
  background: white;
`;

const CompanyPhoto = styled.div`
  opacity: 0.9;
`;

const CompanyLocation = styled.div``;

function DashBoardHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData } = useQuery(ME_QUERY);

  const handleQuestionModal = () => {
    setIsModalOpen(true);
  };

  const handleXBtnModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <LeftMenu>{/* <HamburgerMenu src={hamburgerMenu} /> */}</LeftMenu>
      <Link to="/">
        <MiddleTitle>Landwork Resource Management Inc</MiddleTitle>
      </Link>
      <RightMenu>
        <Link to="/myProfile">
          <Avatar src={userData?.me?.avatar} />
        </Link>
        <QuestionMark onClick={handleQuestionModal} src={questionMark} />
        <Modal isOpen={isModalOpen} style={contatCustomStyles}>
          <ModalHeader>
            CONTACT WITH
            <CloseBtn onClick={handleXBtnModal}>X</CloseBtn>
          </ModalHeader>
          <ModalBody>
            <ModalInfo>
              <ModalInfoTop>
                <CompanyName>Landwork Resource Management Inc.</CompanyName>
              </ModalInfoTop>

              <CompanyInfoCard>
                <CompanyInfo>
                  <p>Company Email : landworkinfo@gmail.com</p>
                  <p>Company number: 1-403-660-1720</p>
                  <p>Business Hours: Mon-Fri 9AM - 5PM</p>

                  <CompanyLocation>
                    <p>Location: Suite 168, 315 - 5155 - 130th Avenue S.E.</p>
                    <p>Calgary, Alberta T2Z 0N3</p>
                  </CompanyLocation>
                </CompanyInfo>
              </CompanyInfoCard>
            </ModalInfo>
          </ModalBody>
        </Modal>

        <Logout src={logout} onClick={LogoutFn} />
      </RightMenu>
    </Container>
  );
}

export default DashBoardHeader;
