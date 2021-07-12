import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import Input from "../components/auth/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import SettingsIcon from '@material-ui/icons/Settings';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export const SEE_ALL_MY_TEAM_QUERY = gql`
  query seeAllMyTeam {
    seeAllMyTeam {
      teamName
      teamMember {
        id
        username
      }
      role {
        teamId
        userId
        roleName
      }
      project {
        projectName
      }
    }
  }
`;

const CREATE_TEAM_MUTATION = gql`
  mutation createTeam($teamName: String!) {
    createTeam(teamName: $teamName) {
      ok
      error
      id
    }
  }
`;

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

const ModalInfo = styled.div``;

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
  width: 100%;
  height: 100px;
`;

const ModalBtn = styled.div`
  margin: 20px auto;
`;

const InputSearch = styled.input`
  margin-top: 25px;
  border: 1px solid gray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
  width: 200px;
`;

const CancelTeam = styled.button`
  background: white;
  border: 2x solid;
  border-color: #b8b8b8;
  color: #004070;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const SaveTeam = styled.button`
  margin-left: 18px;
  background: #004070;
  border: none;
  color: white;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

// const SettingIcon = styled(SettingsIcon)`
//   width: 5px;
//   height: 5px;
// `;

// Modal Size
const customStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    height: "380px",
  },
};

const settingCustomStyles = {
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

const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchTeam = styled.div`
  padding: 0px;
`;

const TeamBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-gap: 50px;
  justify-items: stretch;
  margin-top: 30px;
`;

const TeamList = styled.div`
  height: 100%;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600px;
`;

const ListEachTeam = styled.li`
  font-family: Impact 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid lightgray;
  padding: 15px;
  box-shadow: 0px 3px 6px gray;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  width: 100%;
  height: 100%; 
  list-style: none;
  height: 150px;
`;

const SettingBtn = styled.button`
  float: right;
  cursor: pointer;
  border: none;
  background-color: white;
  margin-bottom: -30px;
  color: lightgray;
  &:hover { color: gray; }
`;

const SetModalHeader = styled.div`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
`;

const CancelBtn2 = styled.button`
  background: white;
  padding: 0 auto;
  font-size: 10px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalMain = styled.div`
  display: flex;
`;

const ModalNav = styled.div`
  margin-right: 30px;
`;

const NavTitle = styled.h4`
  /* border-right: 1px solid; */
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid lightgray;
  margin-top: 50px;
  &:hover { background-color: lightgray; padding: 10px; }
  &.aboutTeam { }
  &.delete { margin-top: 40px; }
`;

const ModalBtn2 = styled.div`
  margin: 40px auto; 
  /* justify-content: space-between; */
`;

const ModalBody2 = styled.div`
  margin: 25px 30px;
`; 

const CheckDelete = styled.input``;

const ModalSet = styled.div`
  /* margin-top: 30px; */
  width: 100%;
`;
const SetTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 40px;
  border-bottom: 1px dashed;
  padding-bottom: 13px;
`;

const MemberSetSub = styled.p`
  margin-top: 10px;
  /* padding: 0 20px; */
`;

const MemberL = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px; 
  font-size: 12px;
`;

const TableDiv = styled.div`
  overflow: auto;
  height: 100%;
  width: 100%;
  background-color: white;
  margin: 15px auto;
`;

const ListTableContainer = styled.table`
  /* margin-top: 40px; */
  border: 1px solid white;    
  /* box-shadow: 0px 3px 6px gray; */
  height: 100%;
  width: 100%;
  padding:0;
  border-collapse: collapse;
  background-color: white;
`;

const ListThead = styled.thead`
  background-color: #F8F8F8;
`;
// const file = [{id:"", projectName:""},{}]
const ListTbody = styled.thead`

`;
const ListTr = styled.tr`
  display: flex;
  border-bottom: 1px solid gray;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ListTh = styled.th`
  /* background-color: lightblue; */
  padding: 5px 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-size: 11px;
  /* font-weight: 600; */
  &.lAvatar { width: 7%; }
  &.lName { width: 48%; }
  &.lRole { width: 45%; }
`;

const ListTd = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.lAvatar { width: 5%; }
  &.lName { width: 48%; }
  &.lRole { width: 45%; }
`;

const DeleteSetSub = styled.p`
  margin-left: 30px;
  line-height: 150%;
`;

const DeleteBtn = styled.button`
  margin-top: 50px;
  margin-left: 30px;
  width: 80%;
  border: none;
  height: 40px;
  &:hover { 
    background-color: red; 
    color: white; 
    font-weight: 600;
  }
`;

const B = styled.b`
  font-weight: 600;
`;


function MyTeamMainContents() {
  // const [TeamName, setTeamName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateBtnModal = () => {
    alert("Your team has been created.");
    setIsModalOpen(false);
  };

  const handleCancelBtnModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTeam = () => {
    handleOpenModal();
  };

  const { data, refetch } = useQuery(SEE_ALL_MY_TEAM_QUERY);

  console.log("전체팀보자", data);

  const { handleSubmit, setValue, watch, register } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setValue("teamName", data?.seeAllMyTeam?.teamName);
  }, [data, setValue]);

  const handleChange = (e) => {
    if (e.target.name === "teamName") {
      setValue("teamName", e.target.value);
    }
  };

  const [createTeam, { loading }] = useMutation(CREATE_TEAM_MUTATION);

  const onSaveValid = (data) => {
    handleCreateBtnModal();
    console.log("saveTeam", data);
    if (loading) {
      return;
    }
    createTeam({
      variables: {
        ...data,
      },
    });
    refetch();
  };

  const onSaveInvalid = (data) => {};
  console.log("팀네임", data?.seeAllMyTeam?.teamName);
  
  const [isDModalOpen, setIsDModalOpen] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  
  const handleSettingModal = () => {
    setIsDModalOpen(true);
    setIsAbout({ bgColor: "lightgray" });
   };
   
  const handleXBtnModal = () => {
    setIsDModalOpen(false);
    setIsAbout(true);
    setIsDelete(false);
  };

  const settingAboutClick = () => {
    setIsAbout(true);
    setIsAbout({ bgColor: "lightgray" });
    setIsDelete(false);
  };

  const settingDeleteClick = () => {
    setIsAbout(false);
    setIsDelete(true);
    setIsDelete({ bgColor: "lightgray" });
  };

  const handleDeleteBtnModal = () => {
    alert("Your team has been deleted.");
    setIsDModalOpen(false);
    setIsAbout(true);
    setIsDelete(false);
  };

  const [showName, setShowName] = useState('');

  const handleShowName = (e) => {
    
  };

  return (
    <Container>
      <MainTitle>MY TEAM</MainTitle>
      <TeamHeader>
        <CreateBtn onClick={handleCreateTeam}>+ Create Team</CreateBtn>
        <SearchTeam>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
        </SearchTeam>
      </TeamHeader>

      <Modal isOpen={isModalOpen} style={customStyles}>
        <ModalHeader>NEW TEAM</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
            <ModalInfo>
              <TeamLabel>Team name</TeamLabel>
              <Input
                ref={register}
                type="text"
                name="teamName"
                value={watch("teamName")}
                placeholder="Enter the team name..."
                onChange={handleChange}
              />
              <DesLabel>Description</DesLabel>
              <Description
                type="text"
                // cols="57"
                // rows="5"
                name="teamDescription"
                placeholder="Let people know what this team is all about..."
              />
            </ModalInfo>

            <ModalBtn>
              <SaveTeam type="submit">Create</SaveTeam>
              {/* <SaveTeam type="submit">Create</SaveTeam> */}
              <CancelTeam onClick={handleCancelBtnModal}>Cancel</CancelTeam>
            </ModalBtn>
          </form>
        </ModalBody>
      </Modal>

      <TeamBody>
        {data?.seeAllMyTeam?.map((team) => (
          <ListEachTeam key={team.id}>
            <SettingBtn onClick={handleSettingModal}><SettingsIcon/></SettingBtn>
              <Link to={`/myProject/${team.teamName}`}>
                <TeamList>
                  {team.teamName}
                </TeamList> 
              </Link>
                
                <Modal isOpen={isDModalOpen} style={settingCustomStyles}>
                  <SetModalHeader>MANAGE TEAM
                      <CancelBtn2 onClick={handleXBtnModal}>X</CancelBtn2>
                  </SetModalHeader>

                  {/* 팀 멤버 리스트 / 팀 삭제 */}
                    <ModalBody2>
                      <ModalMain>
                        <ModalNav>
                          <NavTitle 
                            onClick={settingAboutClick} 
                            style={{backgroundColor: isAbout.bgColor}}
                            className="aboutTeam">
                            ABOUT TEAM
                          </NavTitle>
                          <NavTitle 
                            onClick={settingDeleteClick} 
                            className="delete"
                            style={{backgroundColor: isDelete.bgColor}}>
                            DELETE TEAM
                          </NavTitle>
                        </ModalNav>

                        {isAbout &&
                          <ModalSet>
                            <SetTitle>ABOUT TEAM INFORMATION</SetTitle>
                            <MemberSetSub>Team Name: <B>{team.teamName}</B> </MemberSetSub>
                            <MemberL>
                              <MemberSetSub>Member list:</MemberSetSub>
                              <MemberSetSub>Total of members (12)</MemberSetSub>
                            </MemberL>
                            <TableDiv>
                              <ListTableContainer className="sortable">
                                <ListThead>
                                  <ListTr>
                                    <ListTh className="lAvatar"></ListTh>
                                    <ListTh className="lName">Name</ListTh>
                                    <ListTh className="lRole">Role</ListTh>
                                  </ListTr>
                                </ListThead>
                                <ListTbody>
                                  {data?.seeAllMyTeam?.teamMember?.map((member) => (
                                    <ListTr key={member.id}>
                                      <ListTd className="lAvatar">
                                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                                      </ListTd>
                                      <ListTd className="lName">{member.username}</ListTd>
                                      <ListTd className="lRole">Project Manager</ListTd>                     
                                    </ListTr>
                                  ))}
                                </ListTbody>
                              </ListTableContainer>
                            </TableDiv>
                          </ModalSet>
                        }

                        {isDelete &&
                          <ModalSet>
                            <SetTitle>DELETE TEAM</SetTitle>
                            <DeleteSetSub>Are you sure you want to delete the team <B>"Alex"</B>?<br/>
                              If you click <B>"Delete Team"</B> button, your all projects <br/>
                              and files for this team will be delete.</DeleteSetSub>
                            {/* <CheckDelete type="radio">I agree with deleting everything</CheckDelete> */}
                            <DeleteBtn onClick={handleDeleteBtnModal}>Delete Team</DeleteBtn>
                          </ModalSet>
                        } 

                      </ModalMain>
                    </ModalBody2>
                </Modal> 
          </ListEachTeam>
        ))}
      </TeamBody>


    </Container>
  );
}

export default MyTeamMainContents;
