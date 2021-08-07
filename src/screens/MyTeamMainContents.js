import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import Input from "../components/auth/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import SettingsIcon from "@material-ui/icons/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FormError from "../components/auth/FormError";
import { trimText } from "../components/Utils";
import LoadingPage from "../components/LoadingPage";

export const SEE_ALL_MY_TEAM_QUERY = gql`
  query seeAllMyTeam {
    seeAllMyTeam {
      id
      teamName
      description
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

const ADD_ROLE = gql`
  mutation addRole($roleName: String!, $teamId: Int!, $userId: Int!) {
    addRole(roleName: $roleName, teamId: $teamId, userId: $userId) {
      ok
      error
    }
  }
`;

const DELETE_TEAM = gql`
  mutation deleteTeam($teamId: Int!) {
    deleteTeam(teamId: $teamId) {
      ok
      error
    }
  }
`;

const CREATE_TEAM_MUTATION = gql`
  mutation createTeam($teamName: String!, $description: String) {
    createTeam(teamName: $teamName, description: $description) {
      ok
      error
      id
      user {
        id
        username
      }
    }
  }
`;

const SEE_TEAM_QUERY = gql`
  query seeTeam($teamName: String!) {
    seeTeam(teamName: $teamName) {
      id
      teamName
      teamMember {
        id
        username
        email
        avatar
      }
      role {
        roleName
        userId
        teamId
      }
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
  &:hover {
    background: #012f52;
  }
`;

const ModalHeader = styled.h4`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white;
  font-size: 13px;
  position: sticky;
  top: 0;
`;

const ModalBody = styled.div`
  margin: 20px 30px;
  overflow-y: overlay;
`;

const ModalInfo = styled.div``;

const TeamLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const InputTeam = styled(Input)`
  margin-top: 10px;
`;

const DesLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
`;

const Description = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 100px;
  margin-top: 10px;
`;

const ModalBtn = styled.div`
  margin: 20px auto;
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
  &:hover {
    background: #012f52;
  }
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
    boxShadow: "0px 3px 8px gray",
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
    height: "500px",
    boxShadow: "0px 3px 8px gray",
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  justify-items: stretch;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 68vh;
  overflow-y: overlay;
`;

const TeamList = styled.div`
  height: 60px;
  margin-top: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600px;
`;

const ListEachTeam = styled.li`
  font-family: Impact "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  /* font-size: 11px; */
  font-weight: 600;
  border: 1px solid lightgray;
  padding: 15px;
  box-shadow: 0px 3px 6px gray;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  /* background-color: white; */
  width: 90%;
  height: 200px;
  list-style: none;
  background-color: #f1f1f1;
  transition: 0.2s;
  /* translate: 0 */
  /* height: 150px; */
  &:hover {
    background-color: #e6e4e4;
    transform: scale(1.02);
    /* animation: backwards 2s linear; */
  }
`;

const ImageBox = styled.div`
  width: 150px;
  height: 100px;
  background-color: red;
  margin: 20px auto 0 auto;
  border-radius: 12px;
  /* margin-top: 5px; */
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const SettingBtn = styled.button`
  float: right;
  cursor: pointer;
  border: none;
  background: none;
  margin-bottom: -30px;
  color: #bcbcbc;
  &:hover {
    color: #878787;
  }
`;

const SetModalHeader = styled.div`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  align-items: center;
`;

const CancelBtn2 = styled.button`
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
  &:hover {
    background-color: lightgray;
    padding: 10px;
  }
  &.aboutTeam {
  }
  &.delete {
    margin-top: 40px;
  }
`;

const ModalBtn2 = styled.div`
  margin: 40px auto;
  /* justify-content: space-between; */
`;

const ModalBody2 = styled.div`
  margin: 25px 30px 0 30px;
  /* height: 200px; */
`;

const ModalSet = styled.div`
  /* margin-top: 30px; */
  width: 100%;
  height: 420px;
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

const ListTableContainerTop = styled.table`
  border: 1px solid white;
  height: 15px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  background-color: white;
  margin-top: 10px;
`;

const TableDiv = styled.div`
  overflow: overlay;
  height: 50%;
  width: 100%;
  background-color: white;
  /* margin: 15px auto; */
`;

const ListTableContainer = styled.table`
  border: 1px solid white;
  height: 100%;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  background-color: white;
`;

const ListThead = styled.thead`
  background-color: #f8f8f8;
`;

const ListTbody = styled.thead``;
const ListTr = styled.tr`
  display: flex;
  border-bottom: 1px solid gray;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ListTh = styled.th`
  padding: 5px 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-size: 11px;
  /* font-weight: 600; */
  &.lAvatar {
    width: 7%;
  }
  &.lName {
    width: 48%;
  }
  &.lRole {
    width: 45%;
  }
`;

const ListTd = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.lAvatar {
    width: 7%;
  }
  &.lName {
    width: 48%;
  }
  &.lRole {
    width: 45%;
  }
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
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
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
    font-weight: 600;
  }
`;

const B = styled.b`
  font-weight: 600;
  &.deleteLetter {
    color: red;
  }
  &.tNameLetter {
    color: blue;
  }
`;

function MyTeamMainContents() {
  const [teamName, setTeamName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [teamId, setTeamId] = useState();
  const [isDModalOpen, setIsDModalOpen] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [backGround, setBackGround] = useState();
  let backgroundArray = [];
  const saveBackground = () => {
    let newBackGround;
    for (var i = 0; i < allTeamData?.seeAllMyTeam?.length; i++) {
      // console.log("i", i);
      // console.log(
      //   "allTeamData?.seeAllMyTeam?.length",
      //   allTeamData.seeAllMyTeam.length
      // );
      newBackGround = `https://picsum.photos/${
        Math.floor(Math.random() * 11) + 190
      }/${Math.floor(Math.random() * 11) + 190}`;
      backgroundArray.push(newBackGround);
    }
    // console.log("backgroundArray", backgroundArray);
    setBackGround(backgroundArray);
    // console.log("배경", backGround);
  };
  // console.log("배경", backGround);

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
  const {
    data: allTeamData,
    loading: seeAllTeamLoading,
    refetch,
  } = useQuery(SEE_ALL_MY_TEAM_QUERY);

  const { data: teamData, loading: seeTeamLoading } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
  });
  console.log("teamData!!!!", teamData);

  const onCompletedDelete = () => {
    // console.log("여기오나?");
    alert("Your Project has been deleted.");
    refetch();
  };

  const [addRole, { loading: addRoleLoading }] = useMutation(ADD_ROLE);

  const [deleteTeam, { loading: deleteTeamLoading }] = useMutation(
    DELETE_TEAM,
    {
      onCompleted: onCompletedDelete,
    }
  );

  

  const { handleSubmit, setValue, watch, register, errors } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setValue("teamName", allTeamData?.seeAllMyTeam?.teamName);
    saveBackground();
  }, [allTeamData, setValue]);

  // useEffect()

  const handleChange = (e) => {
    if (e.target.name === "teamName") {
      setValue("teamName", e.target.value);
    }
  };

  const onCompleted = (data) => {
    console.log("data", data);
    if (data?.createTeam?.ok === false) {
      alert("The team name is already exist. Please Use Other Name!!");
    } else {
      addRole({
        variables: {
          roleName: "Project Manager",
          teamId: data.createTeam.id,
          userId: data?.createTeam?.user?.id,
        },
      });
      handleCreateBtnModal();
      refetch();
    }
  };

  const [createTeam, { loading }] = useMutation(CREATE_TEAM_MUTATION, {
    onCompleted,
  });

  const onSaveValid = (data) => {
    console.log("saveTeam", data);
    if (loading) {
      return;
    }
    createTeam({
      variables: {
        ...data,
      },
    });
  };

  const onSaveInvalid = (data) => {};
  // console.log("팀네임", data?.seeAllMyTeam?.teamName);

  const handleSettingModal = (teamName) => {
    // console.log("teamName", teamName);
    setIsDModalOpen(true);
    setTeamName(teamName);
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


  const handleDeleteBtnModal = (teamId) => {
    alert("Your team has been deleted.");
    setIsDModalOpen(false);
    setIsAbout(true);
    setIsDelete(false);
    // console.log("teamId", typeof teamId);
    deleteTeam({
      variables: {
        teamId,
      },
    });
  };

  console.log("allTeamData", allTeamData);

  return seeAllTeamLoading && seeTeamLoading ? (
    <LoadingPage />
  ) : (
    <Container>
      <MainTitle>MY TEAM</MainTitle>
      <TeamHeader>
        <CreateBtn onClick={handleCreateTeam}>+ Create Team</CreateBtn>
        {/* <SearchTeam>
          <InputSearch
            type="text"
            placeholder="Search Project..."
          ></InputSearch>
        </SearchTeam> */}
      </TeamHeader>

      <Modal isOpen={isModalOpen} style={customStyles}>
        <ModalHeader>NEW TEAM</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
            <ModalInfo>
              <TeamLabel>
                Team name
                <InputTeam
                  ref={register({ required: "Team name is required" })}
                  type="text"
                  name="teamName"
                  value={watch("teamName")}
                  placeholder="Enter the team name..."
                  onChange={handleChange}
                  hasError={Boolean(errors?.teamName?.message)}
                />
                <FormError message={errors?.teamName?.message} />
              </TeamLabel>

              <DesLabel>
                Description
                <Description
                  ref={register({ required: "Team description is required" })}
                  type="text"
                  name="description"
                  value={watch("description")}
                  placeholder="Let people know what this team is all about..."
                  onChange={handleChange}
                  hasError={Boolean(errors?.description?.message)}
                />
                <FormError message={errors?.description?.message} />
              </DesLabel>
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
        {backGround?.length > 0 &&
          allTeamData?.seeAllMyTeam?.map((team, index) => (
            <ListEachTeam key={team.id}>
              <SettingBtn onClick={() => handleSettingModal(team.teamName)}>
                <SettingsIcon />
              </SettingBtn>
              <Link to={`/myProject/${team.teamName}`}>
                <ImageBox src={backGround[index]} />
                <TeamList>{trimText(team.teamName, 15)}</TeamList>
              </Link>
            </ListEachTeam>
          ))}
      </TeamBody>

      <Modal isOpen={isDModalOpen} style={settingCustomStyles}>
        <SetModalHeader>
          MANAGE TEAM
          <CancelBtn2 onClick={handleXBtnModal}>X</CancelBtn2>
        </SetModalHeader>

        {/* 팀 멤버 리스트 / 팀 삭제 */}
        <ModalBody2>
          <ModalMain>
            <ModalNav>
              <NavTitle
                onClick={settingAboutClick}
                style={{ backgroundColor: isAbout.bgColor }}
                className="aboutTeam"
              >
                ABOUT TEAM
              </NavTitle>
              <NavTitle
                onClick={settingDeleteClick}
                className="delete"
                style={{ backgroundColor: isDelete.bgColor }}
              >
                DELETE TEAM
              </NavTitle>
            </ModalNav>
            {/* {allTeamData?.seeAllMyTeam?.map((team) => (
          <ListEachTeam key={team.id}>
            <SettingBtn onClick={() => handleSettingModal(team.teamName)}>
              <SettingsIcon /> */}
            {isAbout && (
              <ModalSet>
                <SetTitle>ABOUT TEAM INFORMATION</SetTitle>
                <MemberSetSub>
                  Team Name: <B>{teamData?.seeTeam?.teamName}</B>{" "}
                </MemberSetSub>
                <MemberL>
                  <MemberSetSub>Member list:</MemberSetSub>
                  <MemberSetSub>
                    Total of members ({teamData?.seeTeam?.teamMember?.length})
                  </MemberSetSub>
                </MemberL>
                <ListTableContainerTop className="sortable">
                  <ListThead>
                    <ListTr>
                      <ListTh className="lAvatar"></ListTh>
                      <ListTh className="lName">Name</ListTh>
                      <ListTh className="lRole">Role</ListTh>
                    </ListTr>
                  </ListThead>
                </ListTableContainerTop>
                <TableDiv>
                  <ListTableContainer>
                    <ListTbody>
                      {teamData?.seeTeam?.teamMember?.map((member) => (
                        <ListTr key={member.id}>
                          <ListTd className="lAvatar">
                            <Avatar src={member.avatar} />
                          </ListTd>
                          <ListTd className="lName">
                            {trimText(member.username, 15)}
                          </ListTd>
                          <ListTd className="lRole" key={member.id}>
                            {teamData !== undefined &&
                            teamData?.seeTeam?.role?.filter(
                              (role) => role.userId === member.id
                            ).length > 0 ? (
                              <>
                                {
                                  teamData.seeTeam.role.filter(
                                    (role) => role.userId === member.id
                                  )[0].roleName
                                }
                              </>
                            ) : (
                              "Guest"
                            )}
                          </ListTd>
                        </ListTr>
                      ))}
                    </ListTbody>
                  </ListTableContainer>
                </TableDiv>
              </ModalSet>
            )}

            {isDelete && (
              <ModalSet>
                <SetTitle>DELETE TEAM</SetTitle>
                <DeleteSetSub>
                  Are you sure you want to delete the team{" "}
                  <B className="tNameLetter">{teamData?.seeTeam?.teamName}</B>
                  <br />
                  If you click <B className="deleteLetter">
                    "Delete Team"
                  </B>{" "}
                  button, your all projects <br />
                  and files for this team will be delete.
                </DeleteSetSub>

                <DeleteBtn
                  onClick={() => handleDeleteBtnModal(teamData?.seeTeam?.id)}
                >
                  Delete Team
                </DeleteBtn>
              </ModalSet>
            )}
          </ModalMain>
        </ModalBody2>
      </Modal>
    </Container>
  );
}

export default MyTeamMainContents;
