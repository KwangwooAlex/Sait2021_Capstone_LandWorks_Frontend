import React, { useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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
    }
  }
`;

const DELETE_TEAM_MEMBER = gql`
  mutation deleteTeamMember($teamId: Int!, $teamMemberId: Int!) {
    deleteTeamMember(teamId: $teamId, teamMemberId: $teamMemberId) {
      ok
      error
    }
  }
`;

const SEARCH_USERS = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      username
      email
      avatar
      phoneNumber
    }
  }
`;

const SEARCH_USER_QUERY = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      username
      email
      companyName
      avatar
    }
  }
`;

const ADD_MEMBER_MUTATION = gql`
  mutation addTeamMember($teamId: Int!, $userId: Int) {
    addTeamMember(teamId: $teamId, userId: $userId) {
      ok
      error
      id
    }
  }
`;

const DELETE_MEMBER_MUTATION = gql`
  mutation deleteTeamMember($teamId: Int!, $teamMemberId: Int!) {
    deleteTeamMember(teamId: $teamId, teamMemberId: $teamMemberId) {
      ok
      error
      id
    }
  }
`;

const ADD_ROLE_MUTATION = gql`
  mutation addRole($roleName: String!, $teamId: Int!, $userId: Int!) {
    addRole(roleName: $roleName, teamId: $teamId, userId: $userId) {
      ok
      error
      id
    }
  }
`;

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
  padding: 40px 40px 0 40px;
  height: 100%;
  /* background-color: black; */
  width: 90%;
`;

const TeamName = styled.div`
  color: Black;
  font-weight: 600;
  font-size: 20px;
  width: 100%;
  height: 40px;
  border-bottom: black 2px solid;
  box-sizing: border-box;
`;

const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

const MainTitle = styled.div`
  color: #004070;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20px;
  height: 40px;
`;

const RightSection = styled.div`
  display: flex;
`;

const NavBar = styled.div`
  display: flex;
  margin-right: 40px;
  text-align: center;
`;

const Letter = styled.div`
  padding: 5px;
  width: 100px;
  cursor: pointer;
  border-bottom: 2px solid #ffb41e;
  margin-right: 10px;
  &:hover {
    color: #004070;
    background-color: #ffebc4;
    /*border-top: black 2px solid;*/
  }
  &.selected {
    background-color: #ffb41e;
  }
`;

const InputSearch = styled.input`
  border: 1px solid gray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
  width: 200px;
`;

const TopBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AddBtn = styled.button`
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

const customStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    height: "720px",
  },
};

const ModalHeader = styled.h4`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white;
  font-size: 13px;
  width: 100%;
`;

const ModalBody = styled.div`
  margin: 20px 30px;
`;

const ModalInfo = styled.div``;

const SearchSection = styled.div``;
const ResultSection = styled.div``;
const SelectionSection = styled.div``;

const SearchMemberLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const SearchMemberInput = styled.input`
  border: 1px solid gray;
  padding: 5px 10px;
  font-size: 13px;
  /* height: 20px; */
  width: 83%;
  margin-right: 15px;
  margin-top: 5px;
`;

const SearchMemberBtn = styled.button`
  padding: 5px 10px;
  /* height: 20px; */
  font-weight: 600;
`;

const ResultLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SelectionLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TableBox = styled.div`
  /* margin-top: 10px; */
  height: 200px;
  width: 100%;
  overflow-y: scroll;
  /* background-color: red; */
  padding-top: -10px;
`;

const TableContainerTop = styled.table`
  margin-top: 10px;
  border: 1px solid white;

  height: 20px;
  /* overflow-y: auto; */
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  overflow-y: scroll;
  font-size: 13px;
`;

const TableContainer = styled.table`
  /* margin-top: 10px; */
  border: 1px solid white;
  box-shadow: 0px 3px 6px gray;
  height: 200px;
  /* overflow-y: auto; */
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  overflow-y: scroll;
  font-size: 13px;
`;

const Thead = styled.thead`
  background-color: #f3f3f3;
`;
const Tbody = styled.thead``;
const Tr = styled.tr`
  display: flex;
  border-bottom: 1px solid gray;
`;
const Th = styled.th`
  /* background-color: lightblue; */
  padding: 5px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  &.mAvatar {
    width: 10%;
  }
  &.mName {
    width: 30%;
  }
  &.mTeam {
    width: 30%;
  }
  &.mMail {
    width: 20%;
  }
  &.mBtn {
    width: 10%;
  }
`;
const Td = styled.td`
  /* cursor: pointer; */
  padding: 5px;
  margin: 10px;
  width: 100%;

  &.mAvatar {
    width: 10%;
  }
  &.mName {
    width: 30%;
    margin-top: 18px;
  }
  &.mTeam {
    width: 30%;
    margin-top: 18px;
  }
  &.mMail {
    width: 20%;
    margin-top: 18px;
  }
  &.mBtn {
    width: 10%;
    cursor: pointer;
  }
`;

const PlusBtn = styled.span`
  width: 15px;
  height: 15px;
  padding: 12px;
  border: 1px solid lightgray;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: blue;
    color: white;
  }
`;
const MinusBtn = styled.span`
  width: 15px;
  height: 15px;
  padding: 12px;
  border: 1px solid lightgray;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const ModalBtn = styled.div`
  padding-top: 20px;
  padding-bottom: 25px;
`;

const CancelModalBtn = styled.button`
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

const AddModalBtn = styled.button`
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
const TableDiv = styled.div`
  overflow: auto;
  height: 420px;
  width: 100%;
  border: 1px solid lightgray;
`;

const ListTableContainer = styled.table`
  /* margin-top: 40px; */
  border: 1px solid white;
  box-shadow: 0px 3px 6px gray;
  height: 600px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  /* overflow-y: scroll;  */
`;

const ListThead = styled.thead`
  background-color: #f3f3f3;
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
  /* background-color: lightblue; */
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  &.check {
    width: 3%;
  }
  &.lAvatar {
    width: 5%;
  }
  &.lName {
    width: 30%;
    cursor: pointer;
  }
  &.lRole {
    width: 25%;
  }
  &.lMail {
    width: 20%;
  }
  &.lEdit {
    width: 7%;
  }
  &.lDelete {
    width: 10%;
  }
`;

const ListTd = styled.td`
  /* cursor: pointer; */
  padding: 10px;
  margin: 10px;
  width: 100%;
  text-align: left;
  &.check {
    width: 3%;
  }
  &.lAvatar {
    width: 5%;
  }
  &.lName {
    width: 30%;
  }
  &.lRole {
    width: 25%;
  }
  &.lMail {
    width: 20%;
  }
  &.lEdit {
    width: 7%;
    cursor: pointer;
  }
  &.lDelete {
    width: 10%;
    cursor: pointer;
  }
`;

const MeditBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;
const DeleteMBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;

const RightBtn = styled.div``;

const customStyle = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "200px",
  },
};

const OkBtn = styled.button`
  background: #004070;
  border: 2x solid;
  color: white;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const CancelBtn2 = styled.button`
  background: white;
  border: 2x solid;
  border-color: #b8b8b8;
  color: #004070;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const ModalBtn2 = styled.div`
  margin: 20px auto;
  /* justify-content: space-between; */
  text-align: center;
`;

const ModalBody2 = styled.div`
  margin: 30px 30px;
`;

const DeleteNotice = styled.p`
  line-height: 150%;
  text-align: center;
`;

const B = styled.b`
  font-weight: 600;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
`;

const EditRole = styled.input`
  border: 1px solid gray;
  width: 80%;
  padding: 5px;
`;

const UserBoxes = styled.div`
  height: 100%;
  width: 100%;
  background-color: red;
`;

function MembersMainContents() {
  // const [memberRole, setMemberRole] = useState("");
  const [reverseName, setReverseName] = useState(false);
  const { teamName, projectId } = useParams();
  const { data: teamData, refetch } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
  });
  const [keyword, setKeyword] = useState("");
  const [selectedMember, setSelectedMember] = useState([]);
  const [teamMemberList, setTeamMemberList] = useState([]);
  // const { data: searchData } = useQuery(SEARCH_USERS, {
  //   variables: {
  //     keyword,
  //   },
  // });
  const [searchUsersQuery, { loading: SearchLoading, data: searchData }] =
    useLazyQuery(SEARCH_USERS);

  const onCompletedDeleteTeamMember = () => {
    alert("Team Member has been deleted.");
    refetch();
  };

  const [deleteTeamMember, { loading: deleteTeamMemberLoading }] = useMutation(
    DELETE_TEAM_MEMBER,
    {
      onCompleted: onCompletedDeleteTeamMember,
    }
  );

  const { data: userData } = useQuery(ME_QUERY);
  console.log("MEMBER", teamData?.seeTeam?.teamMember);
  // console.log("searchData", searchData);
  // const [username, setUsername] = useState('');
  // const { data: searchData } = useQuery(SEARCH_USER_QUERY);

  const [searchWordBeforeSubmit, setSearchWordBeforeSubmit] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDModalOpen, setIsDModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditRole = () => {
    setIsEditMode(true);
    if (isEditMode) {
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    if (teamData !== undefined) {
      setTeamMemberList(teamData?.seeTeam?.teamMember);
    }
  }, [teamData]);
  // console.log("teamMemberList", teamMemberList);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const searchingFunction = (e) => {
    // console.log(e.target.value);
    // setProjectList(teamData?.seeTeam?.project);
    // console.log("projectList", projectList);
    // setSearchWord(e.target.value);
    const filterMember = teamData?.seeTeam?.teamMember.filter((teamMember) =>
      teamMember.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // console.log("filterProject", filterProject);
    setTeamMemberList(filterMember);
  };

  const handleAddBtnModal = () => {
    alert("Your team has been created.");
    setIsModalOpen(false);
  };

  const handleCancelBtnModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMember = () => {
    searchUsersQuery({
      variables: {
        keyword: "waefjlkwekfgjkljgalgj",
      },
    });
    handleOpenModal();
  };

  const handleDeleteModal = () => {
    setIsDModalOpen(true);
  };

  const handleDCancelBtnModal = () => {
    setIsDModalOpen(false);
  };

  const addMemberFunction = (user) => {
    // console.log("selected user", user);
    if (selectedMember !== undefined) {
      // console.log("더추가됨");
      setSelectedMember([...selectedMember, user]);
    } else {
      // console.log("처음추가");
      setSelectedMember([user]);
    }
  };

  const removeMemberFunction = (selecteduser) => {
    // console.log("selected user", user);
    // console.log("삭제");
    setSelectedMember(
      selectedMember.filter((user) => user.email !== selecteduser.email)
    );

    // setSelectedMember([user]);
  };
  // console.log("selectedMember", selectedMember);

  const deleteTeamMemberFunction = (teamMemberId) => {
    deleteTeamMember({
      variables: {
        teamId: teamData.seeTeam.id,
        teamMemberId,
      },
    });
  };
  const handleSearchWord = (data) => {
    // console.log("입력", data.target.value);
    setSearchWordBeforeSubmit(data.target.value);
  };

  const handleOkBtnModal = () => {
    alert("Your members have been deleted.");
    setIsDModalOpen(false);
  };

  const { handleSubmit, setValue, watch, register } = useForm({
    mode: "onChange",
  });

  // console.log("searchWordBeforeSubmit", searchWordBeforeSubmit);
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("서치누른다");
    searchUsersQuery({
      variables: {
        keyword: searchWordBeforeSubmit,
      },
    });
  };
  const onCompleted = () => {
    // console.log("리패치오나?");
    refetch();
  };

  const [addTeamMember, { loading }] = useMutation(ADD_MEMBER_MUTATION, {
    onCompleted,
  });

  // const [deleteTeamMember] = useMutation(DELETE_MEMBER_MUTATION);
  const [addRole] = useMutation(ADD_ROLE_MUTATION);

  const onSaveValid = (data) => {
    // console.log("submiting.............................");
    // handleAddBtnModal();
    // console.log("selectedMember", selectedMember);
    // if (data.keyword !== "") {
    //   setKeyword(searchWordBeforeSubmit);
    // }
    if (selectedMember.length > 0 && selectedMember !== undefined) {
      // console.log("추가");
      selectedMember.forEach((user) => {
        const userId = user.id;
        // console.log("teamData?.seeTeam?.id,", teamData?.seeTeam?.id);
        // console.log("userID", userId);
        addTeamMember({
          variables: {
            teamId: teamData?.seeTeam?.id,
            userId,
          },
        });
      });
      setSelectedMember([]);
      handleCancelBtnModal();
    }
    // if (selectedMember.length === 0) {
    //   console.log("오나?경고창");
    //   alert("You need to add a member for this button!");
    // }
  };

  const onSaveInvalid = (data) => {};

  const nameSorting = () => {
    const sortingList = [...teamMemberList];
    if (reverseName === false) {
      sortingList.sort((a, b) => a.username.localeCompare(b.username));
      setReverseName(true);
    } else {
      sortingList
        .sort((a, b) => a.username.localeCompare(b.username))
        .reverse();
      setReverseName(false);
    }
    console.log("솔팅결과", sortingList);
    setTeamMemberList(sortingList);
    // users.sort((a, b) => a.firstname.localeCompare(b.firstname))
  };

  return (
    <Container>
      <TeamName>
        <Link to={`/myProject/${teamName}`}>{teamName}</Link>
      </TeamName>
      <MainHeader>
        <MainTitle>Members</MainTitle>
        <RightSection>
          <NavBar>
            <Link to={`/myProject/${teamName}`}>
              <Letter>My Project</Letter>
            </Link>
            <Link to={`/members/${teamName}`}>
              <Letter className="selected">Members</Letter>
            </Link>
          </NavBar>
          <InputSearch
            type="text"
            placeholder="Search Member By Name..."
            onChange={searchingFunction}
          ></InputSearch>
        </RightSection>
      </MainHeader>

      <TopBtn>
        <AddBtn onClick={handleAddMember}>Add</AddBtn>
        <Modal isOpen={isModalOpen} style={customStyles}>
          <ModalHeader>ADD TEAM MEMBERS</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
              <ModalInfo>
                <SearchSection>
                  <SearchMemberLabel>Search Member</SearchMemberLabel>
                  <SearchMemberInput
                    ref={register}
                    type="text"
                    name="keyword"
                    placeholder="Search members..."
                    onChange={handleSearchWord}
                  ></SearchMemberInput>
                  <SearchMemberBtn onClick={(e) => handleSearch(e)}>
                    Search
                  </SearchMemberBtn>
                </SearchSection>

                <ResultSection>
                  <ResultLabel>Search Result</ResultLabel>

                  <TableContainerTop className="sortable">
                    <Thead>
                      <Tr>
                        <Th className="mAvatar"></Th>
                        <Th className="mName">Name</Th>
                        <Th className="mTeam">Phone Number</Th>
                        <Th className="mMail">E-mail</Th>
                        <Th className="mBtn"></Th>
                      </Tr>
                    </Thead>
                  </TableContainerTop>
                  <TableBox>
                    <TableContainer className="sortable">
                      {/* <Thead>
                        <Tr>
                          <Th className="mAvatar"></Th>
                          <Th className="mName">Name</Th>
                          <Th className="mTeam">Phone Number</Th>
                          <Th className="mMail">E-mail</Th>
                          <Th className="mBtn"></Th>
                        </Tr>
                      </Thead> */}

                      {searchData?.searchUsers.length !== 0 ? (
                        <Tbody>
                          {searchData?.searchUsers.map((user) =>
                            teamData?.seeTeam?.teamMember.filter(
                              (alreadyMember) =>
                                user.email === alreadyMember.email
                            ).length > 0 ? null : (
                              <Tr key={user.id}>
                                <Td className="mAvatar">
                                  <Avatar src={user?.avatar} />
                                </Td>
                                <Td className="mName">{user?.username} </Td>
                                <Td className="mTeam">{user?.phoneNumber}</Td>
                                <Td className="mMail">{user?.email} </Td>
                                <Td className="mBtn">
                                  {selectedMember?.filter(
                                    (selectedUser) =>
                                      selectedUser.email === user.email
                                  ).length > 0 ? null : (
                                    <PlusBtn>
                                      <AddIcon
                                        onClick={() => addMemberFunction(user)}
                                      />
                                    </PlusBtn>
                                  )}
                                </Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      ) : (
                        <Tbody>
                          <Tr>
                            <Td className="mAvatar">nothing </Td>
                          </Tr>
                        </Tbody>
                      )}
                    </TableContainer>
                  </TableBox>
                </ResultSection>

                <SelectionSection>
                  <SelectionLabel>Add Member List</SelectionLabel>
                  <TableContainerTop className="sortable">
                    <Thead>
                      <Tr>
                        <Th className="mAvatar"></Th>
                        <Th className="mName">Name</Th>
                        <Th className="mTeam">Phone Number</Th>
                        <Th className="mMail">E-mail</Th>
                        <Th className="mBtn"></Th>
                      </Tr>
                    </Thead>
                  </TableContainerTop>
                  <TableBox>
                    <TableContainer className="sortable">
                      {/* <Thead>
                        <Tr>
                          <Th className="mAvatar"></Th>
                          <Th className="mName">Name</Th>
                          <Th className="mTeam">Phone Number</Th>
                          <Th className="mMail">E-mail</Th>
                          <Th className="mBtn"></Th>
                        </Tr>
                      </Thead> */}

                      {selectedMember.length > 0 ? (
                        <Tbody>
                          {selectedMember.map((user) => (
                            <Tr key={user.id}>
                              <Td className="mAvatar">
                                <Avatar src={user?.avatar} />
                              </Td>
                              <Td className="mName">{user.username} </Td>
                              <Td className="mTeam">{user.phoneNumber}</Td>
                              <Td className="mMail">{user.email} </Td>
                              <Td className="mBtn">
                                <PlusBtn>
                                  <RemoveIcon
                                    onClick={() => removeMemberFunction(user)}
                                  />
                                </PlusBtn>
                              </Td>
                            </Tr>
                          ))}
                          {/* <Tr>
                            <Td className="mAvatar">something </Td>
                          </Tr> */}
                        </Tbody>
                      ) : (
                        <Tbody>
                          <Tr>
                            <Td className="mAvatar">nothing </Td>
                          </Tr>
                        </Tbody>
                      )}
                    </TableContainer>
                  </TableBox>
                </SelectionSection>
              </ModalInfo>

              <ModalBtn>
                <AddModalBtn type="submit">Add</AddModalBtn>
                <CancelModalBtn onClick={handleCancelBtnModal}>
                  Cancel
                </CancelModalBtn>
              </ModalBtn>
            </form>
          </ModalBody>
        </Modal>

        <RightBtn>
          <Modal isOpen={isDModalOpen} style={customStyle}>
            <ModalHeader>DELETE PROJECT</ModalHeader>
            <ModalBody2>
              <DeleteNotice>
                Are you sure you want to delete
                <br />
                the member <B>"sdfsf"</B>?
              </DeleteNotice>
              <ModalBtn2>
                <CancelBtn2 onClick={handleDCancelBtnModal}>Cancel</CancelBtn2>
                <OkBtn onClick={handleOkBtnModal}>Ok</OkBtn>
              </ModalBtn2>
            </ModalBody2>
          </Modal>
        </RightBtn>
      </TopBtn>

      <TableDiv>
        <ListTableContainer className="sortable">
          <ListThead>
            <ListTr>
              <ListTh className="lAvatar"></ListTh>
              <ListTh className="lName" onClick={nameSorting}>
                Name &darr;
              </ListTh>
              <ListTh className="lRole">Role</ListTh>
              <ListTh className="lMail">e-mail</ListTh>
              <ListTh className="lEdit">Edit</ListTh>
              <ListTh className="lDelete">Delete</ListTh>
            </ListTr>
          </ListThead>
          <ListTbody>
            {teamMemberList?.map((member) => (
              <ListTr key={member.id}>
                <ListTd className="lAvatar">
                  <Avatar src={member.avatar} />
                </ListTd>
                <ListTd className="lName">{member.username}</ListTd>
                <ListTd className="lRole">
                  {isEditMode ? (
                    <EditRole
                      ref={register}
                      type="text"
                      name="projectStatus"
                      // placeholder={projects.projectStatus}
                      value={watch("projectStatus")}
                      onClick={(event) => event.preventDefault()}
                      // onChange={handleEditChange}
                    />
                  ) : (
                    <> Project Manager </>
                  )}
                </ListTd>
                <ListTd className="lMail">{member.email}</ListTd>
                <ListTd className="lEdit" onClick={handleEditRole}>
                  <MeditBtn>
                    <EditIcon />
                  </MeditBtn>
                </ListTd>
                <ListTd className="lDelete">
                  <DeleteMBtn
                    onClick={() => deleteTeamMemberFunction(member.id)}
                  >
                    <DeleteIcon />
                  </DeleteMBtn>
                </ListTd>
              </ListTr>
            ))}
          </ListTbody>
        </ListTableContainer>
      </TableDiv>
    </Container>
  );
}

export default MembersMainContents;
