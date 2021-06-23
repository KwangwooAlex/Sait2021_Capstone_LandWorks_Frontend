import { Link } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";
import teamImg from "../asset/teamImg.PNG";
import Modal from "react-modal";
import { useState } from "react";
import Input from "../components/auth/Input";

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
  margin-top: 25px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 150px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
`;

// const TeamImg = styled.img`

// `;


const ModalHeader = styled.h4`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white; 
  font-size: 13px;
`;

const ModalBody = styled.div`
  margin: 20px 30px;
`; 

const ModalInfo = styled.div`
`;

const TeamLabel = styled.label`
  display: flex;
  flex-direction: column;

`;

const DesLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Description = styled.textarea`
  padding: 10px;
`;

const ModalBtn = styled.div`
  margin: 20px auto;
`;

const CancelTeam = styled.button`
  background: white;
  border: 2x solid;
  border-color:#B8B8B8;
  color: #004070;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const SaveTeam = styled.button`
  margin-left:18px;
  background: #004070;
  border: none;
  color: white;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const customStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "380px",
  },
};

const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchTeam = styled.div`
  padding 0;
`;

const TeamBody = styled.div`

`;




function MyTeamMainContents() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleSaveModal = () => {
    alert("Your changed has been saved.");
    setIsModalOpen(false);
  };
  
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTeam = () => {
    handleOpenModal();
  };
  


  return (
    <Container>
      <MainTitle>MY TEAM</MainTitle>
      <TeamHeader>
      <CreateBtn onClick={handleCreateTeam}>+ Create Team</CreateBtn>
        <SearchTeam>
          <Input 
            type="text"
            placeholder="Search.." />
        </SearchTeam>
      </TeamHeader>

      <Modal isOpen={isModalOpen} style={customStyles}>
        <ModalHeader>NEW TEAM</ModalHeader>

        <ModalBody>
          <ModalInfo>
            <TeamLabel>Team name</TeamLabel>
            <Input
              type="text"
              name="teamName"
              placeholder="Enter the team name..."
            />          
            <DesLabel>Description</DesLabel>
            <Description
              type="text"
              cols='57'
              rows='5'
              name="teamDescription"
              placeholder="Let people know what this team is all about..."
            />
          </ModalInfo>

          <ModalBtn>        
            <SaveTeam onClick={handleSaveModal}>Save</SaveTeam>
            <CancelTeam onClick={handleCancelModal}>Cancel</CancelTeam>
          </ModalBtn> 
        </ModalBody>
      </Modal>

      <TeamBody>
        {/* Team list */}
      </TeamBody>

    </Container>
  );
}

export default MyTeamMainContents;
