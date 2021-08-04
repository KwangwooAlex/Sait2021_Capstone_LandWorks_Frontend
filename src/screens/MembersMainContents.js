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
import Select from "react-select";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

const SEE_TEAM_QUERY = gql`
  query seeTeam($teamName: String!) {
    seeTeam(teamName: $teamName) {
      id
      teamName
      teamMember {
        id
        username
        email
        companyName
        phoneNumber
        avatar
        country
      }
      role {
        roleName
        userId
        teamId
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

const EDIT_ROLE = gql`
  mutation editRole($roleName: String!, $teamId: Int!, $userId: Int!) {
    editRole(roleName: $roleName, teamId: $teamId, userId: $userId) {
      ok
      error
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

const ADD_ROLE = gql`
  mutation addRole($roleName: String!, $teamId: Int!, $userId: Int!) {
    addRole(roleName: $roleName, teamId: $teamId, userId: $userId) {
      ok
      error
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

// const ADD_ROLE_MUTATION = gql`
//   mutation addRole($roleName: String!, $teamId: Int!, $userId: Int!) {
//     addRole(roleName: $roleName, teamId: $teamId, userId: $userId) {
//       ok
//       error
//       id
//     }
//   }
// `;

const ME_QUERY = gql`
  query me {
    me {
      id
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
    height: "650px",
    boxShadow: "0px 3px 8px gray",
  },
};

const editCustomStyles = {
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
    boxShadow: "0px 3px 8px gray",
    // backgroundColor: "red",
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
  height: 170px;
  width: 100%;
  overflow-y: overlay;
  /* background-color: red; */
  padding-top: -10px;
`;

const TableContainerTop = styled.table`
  margin-top: 10px;
  border: 1px solid white;
  height: 20px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  /* overflow-y: scroll; */
  font-size: 13px;
`;

const TableContainer = styled.table`
  border: 1px solid white;
  height: 170px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  /* overflow-y: scroll; */
  font-size: 13px;
`;

const Thead = styled.thead`
  background-color: #f3f3f3;
`;
const Tbody = styled.thead``;
const Tr = styled.tr`
  display: flex;
  border-bottom: 1px solid gray;
  justify-content: center;
  align-items: center;
`;
const Th = styled.th`
  /* background-color: lightblue; */
  padding: 5px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  &.mAvatar {
    width: 7%;
  }
  &.mName {
    width: 30%;
  }
  &.mTeam {
    width: 22%;
  }
  &.mMail {
    width: 30%;
  }
  &.mBtn {
    width: 10%;
  }
`;
const Td = styled.td`
  /* cursor: pointer; */
  padding: 5px;
  margin: 5px 10px;
  width: 100%;
  text-align: left;
  &.mAvatar {
    width: 7%;
    display: flex;
    justify-content: center;
  }
  &.mName {
    width: 30%;
  }
  &.mTeam {
    width: 22%;
  }
  &.mMail {
    width: 30%;
  }
  &.mBtn {
    width: 10%;
    cursor: pointer;
  }
`;

const SummaryLabel = styled.label`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  &.dateLabel {
    width: 200px;
  }
`;

const InputResult = styled.div`
  margin-left: 10px;
  font-weight: 600;
  width: 20%;
  &.desResult {
    margin-left: 0px;
    overflow: auto;
    height: 100px;
    border: 1px dashed;
    width: 100%;
    padding: 5px;
    margin-top: -10px;
  }
  &.dateResult {
    width: 50%;
  }
`;

const SelectStatus = styled(Select)`
  width: 200px;
  margin-left: 15px;
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

const NothingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  color: gray;
`;

const ModalBtn = styled.div`
  padding-top: 20px;
  margin-bottom: 25px;
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

const ListTableContainerTop = styled.table`
  margin-top: 10px;
  border: 1px solid lightgray;  
  border-bottom: none;
  height: 20px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  font-size: 13px;
`;

const TableDiv = styled.div`
  overflow-y: overlay;
  height: 50vh;
  width: 100%;
  border: 1px solid lightgray;
  border-top: none;
`;

const ListTableContainer = styled.table`
  height: 100%;
  overflow-y: auto;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  font-size: 13px;  
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
  &.lAvatar {
    width: 5%;
  }
  &.lName {
    width: 25%;
    cursor: pointer;
  }
  &.lRole {
    width: 25%;
  }
  &.lMail {
    width: 28%;
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
  &.lAvatar {
    width: 5%;
    display: flex;
    justify-content: center;
  }
  &.lName {
    width: 25%;
    /* cursor: pointer; */
  }
  &.lRole {
    width: 25%;
  }
  &.lMail {
    width: 28%;
  }
  &.lEdit {
    width: 7%;
    cursor: pointer;
    :hover {
      color: blue;
    }
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

// ---------------------------------------------
const MemberContatCustomStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "320px",
  },
};

const ModalMemberHeader = styled.div`
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

const ModalMemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* margin-right: 15px; */
`;

const MemTop = styled.div`
  width: 90%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
  padding-bottom: 25px;
  margin: 30px auto 20px auto;
`;

const MemRight = styled.div`
  margin-left: 50px;
`;

const ModalMemberProfileImageBox = styled.div`
/* margin: 34px 19.5px 10.2px 29px; */
  width: 120px;
  height: 120px; 
  margin-left: -20px; 
/* border-radius: 50%; */
/* overflow: hidden; */

`;

const ModalMemberProfileImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 50%;
margin-left: -10px;  
/* border: 0.5px solid white; */
/* box-shadow: 0px 3px 8px; */
`;

const ModalMemberName = styled.div`
/* margin: -110px 0px 0px 180px; */
font-family: Roboto;
font-size: 20px;
font-weight: bold;
margin-bottom: 15px;
/* text-align: left; */
/* color: #000000; */
`;

const ModalMemberCompanyName = styled.div`
  /* margin: 8px 0px 0px 180px;  */
  font-family: Roboto;
  font-size: 12.5px;
  margin-bottom: 10px;
  /* text-align: left; */
  /* color: #787474; */
`;

const ModalMemberTitle = styled.div`
  /* margin: 20px 0px 0px 180px;  */
  font-family: Roboto;
  font-size: 12.5px;
  /* text-align: left; */
  /* color: #787474; */
  /* float:none; */
  
`;

// const ModalMemberLine = styled.div`
//   /* margin: 85px 0px 0px 15px;  */
//   width: 330px;
//   height: 1px;
//   background-color: #c4c4c4;
//   transform: translate(30px,-35px);
//   `;

const MemBottom = styled.div`
  width: 90%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

  const ModalMemberTel = styled.div`
  /* margin: -20px 0px 5px 180px;  */
  /* margin-left: 190px; */
  margin-bottom: 5px;
  font-family: Roboto;
  font-size: 13px;
  display: flex;
  align-items: center;
  `;

  const ModalMemberEmail = styled.div`
  /* margin: 18px 0px 0px 180px;  */
  /* margin-left: 190px; */
  font-family: Roboto;
  font-size: 13px;
  display: flex;
  align-items: center;
  `;

const Icon = styled.div`
/* width: 15px; */
margin-right: 10px;
color: gray;
/* margin: 10px 0px 0px -20px;  */
/* float:left; */
`;



// ---------------------------------------------

function MembersMainContents() {
  // const [memberRole, setMemberRole] = useState("");
  const [reverseName, setReverseName] = useState(false);
  const { teamName, projectId } = useParams();
  const { data: teamData, refetch } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedMember, setSelectedMember] = useState([]);
  const [teamMemberList, setTeamMemberList] = useState([]);
  const [id, setId] = useState("");
  // const { data: searchData } = useQuery(SEARCH_USERS, {
  //   variables: {
  //     keyword,
  //   },
  // });
  const { data: userData } = useQuery(ME_QUERY);
  // console.log("teamData", teamData?.seeTeam);



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

  const optionStatus = [
    { value: "Project Manager", label: "Project Manager" },
    { value: "Project Supervisor", label: "Project Supervisor" },
    { value: "Member", label: "Member" },
  ];

  // console.log("MEMBER", teamData?.seeTeam);
  // console.log(
  //   "MEMBER role",
  //   teamData?.seeTeam?.role?.filter((role) => role.userId === 2)
  // );
  // console.log("searchData", searchData);
  // const [username, setUsername] = useState('');
  // const { data: searchData } = useQuery(SEARCH_USER_QUERY);


  const [searchWordBeforeSubmit, setSearchWordBeforeSubmit] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDModalOpen, setIsDModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [position, setPosition] = useState();
  const [addRole, { loading: addRoleLoading }] = useMutation(ADD_ROLE);
  const [editPerson, setEditPerson] = useState();
  // const handleEditRole = () => {
  //   setIsEditMode(true);
  //   if (isEditMode) {
  //     setIsEditMode(false);
  //   }
  // };
  const editRoleCompleted = (data) => {
    console.log("에딧데이터", data);
    alert("Edited Successfully!!");
    refetch();
    setIsEditMode(false);
  };

  const [editRole, { loading: editRoleLoading }] = useMutation(EDIT_ROLE, {
    onCompleted: editRoleCompleted,
  });

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
    // console.log("selected user", user);
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
    const roleName = teamData?.seeTeam?.role?.filter(
      (role) => role.userId === userData.me.id
    );
    // console.log("roleName", roleName);
    if (roleName.length > 0 && roleName[0].roleName === "Project Manager") {
      deleteTeamMember({
        variables: {
          teamId: teamData.seeTeam.id,
          teamMemberId,
        },
      });
    } else {
      alert("You do not have a permission to do it");
      return null;
    }
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
  // const [addRole] = useMutation(ADD_ROLE_MUTATION);

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
        // addRole({
        //   variables: {
        //     roleName: "Member",
        //     teamId: teamData.seeTeam.id,
        //     userId: userId,
        //   },
        // });
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

  const handleEditPosition = (e) => {
    console.log(e.value);
    setPosition(e.value);
  };

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

  const handleEditModal = () => {
    setIsEditMode(true);
  };
  const handleCancelEditBtnModal = () => {
    setIsEditMode(false);
  };

  const handleEditList = (event, member, role) => {
    event.preventDefault();
    // console.log("editmember", member, role);
    // console.log("userData", userData);
    const roleName = teamData?.seeTeam?.role?.filter(
      (role) => role.userId === userData.me.id
    );
    // console.log("roleName", roleName);
    if (roleName.length > 0 && roleName[0].roleName === "Project Manager") {
      setEditPerson(member);
      handleEditModal();
    } else {
      alert("You do not have a permission to do it");
      return null;
    }
  };

  const handleEditSubmit = () => {
    editRole({
      variables: {
        roleName: position,
        teamId: teamData.seeTeam.id,
        userId: editPerson.id,
      },
    });
  };

  // ------------------------------------------------------------------------------
  // const addMemberFunction = (user) => {
  //   if (selectedMember !== undefined) {
  //     // console.log("더추가됨");
  //     setSelectedMember([...selectedMember, user]);
  //   } else {
  //     // console.log("처음추가");
  //     setSelectedMember([user]);
  //   }
  // };
  //   // console.log("selected user", user);
  // const removeMemberFunction = (selecteduser) => {
  //   setSelectedMember(
  //     selectedMember.filter((user) => user.email !== selecteduser.email)
  //   );

  // };
  const [isModalMemberOpen, setIsModalMemberOpen] = useState(false);
  // const [id, setId] = useState("");

  const handleMemberModal = (id) => {
    setIsModalMemberOpen(true);
    setId(id);
    // console.log("selected user", id);
}

  const handleXBtnModal = () => {
    setIsModalMemberOpen(false);
  };

  // console.log("teamMemberList",teamMemberList);

  // --------------------------------------------------------------------------------


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
                            <Td>
                              <NothingList>
                                <HourglassEmptyIcon /> 
                                Please search your member...
                              </NothingList>                           
                            </Td>
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
                            <Td>
                              <NothingList>
                                <PersonAddIcon />
                                Please select your member...
                              </NothingList>
                            </Td>
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

        {/* Role Edit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <Modal isOpen={isEditMode} style={editCustomStyles}>
          <ModalHeader>EDIT TEAM MEMBERS</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
              <ModalInfo>
                <SummaryLabel>
                  Project Status:
                  <InputResult>
                    <SelectStatus
                      options={optionStatus}
                      name="projectStatus"
                      ref={register}
                      value={watch("projectStatus")}
                      onChange={handleEditPosition}
                      placeholder="Select"
                    />
                  </InputResult>
                </SummaryLabel>
              </ModalInfo>

              <ModalBtn>
                <AddModalBtn type="submit" onClick={handleEditSubmit}>
                  Save
                </AddModalBtn>
                <CancelModalBtn onClick={handleCancelEditBtnModal}>
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

        <ListTableContainerTop className="sortable">
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
          </ListTableContainerTop>

        <TableDiv>
          <ListTableContainer> 
          <ListTbody>
            {teamMemberList?.map((member) => (
              <ListTr key={member.id}>
                <ListTd className="lAvatar">
                    <Avatar 
                      src={member.avatar} 
                      onClick={() => handleMemberModal(member.id)} 
                    />
                </ListTd>
                <ListTd className="lName">{member.username}</ListTd>
                <ListTd className="lRole">
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
                  {/* {isEditMode ? (
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
                  )} */}
                </ListTd>
                <ListTd className="lMail">{member.email}</ListTd>
                {/* {teamData?.seeTeam?.role?.filter(
                  (role) => role.userId === member.id
                ).length > 0 ? (
                  teamData.seeTeam.role.filter(
                    (role) => role.userId === userData?.id
                  )[0].roleName === "Project Manager" ? (
                    <>
                      <ListTd
                        className="lEdit"
                        onClick={(event) => handleEditList(event, member)}
                      >
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
                    </>
                  ) : (
                    <>
                      <ListTd
                        className="lEdit"
                        onClick={(event) => handleEditListError(event)}
                      >
                        <MeditBtn>
                          <EditIcon />
                        </MeditBtn>
                      </ListTd>
                      <ListTd className="lDelete">
                        <DeleteMBtn>
                          <DeleteIcon />
                        </DeleteMBtn>
                      </ListTd>
                    </>
                  )
                ) : (
                  <>
                    <ListTd
                      className="lEdit"
                      onClick={(event) => handleEditListError(event)}
                    >
                      <MeditBtn>
                        <EditIcon />
                      </MeditBtn>
                    </ListTd>
                    <ListTd className="lDelete">
                      <DeleteMBtn>
                        <DeleteIcon />
                      </DeleteMBtn>
                    </ListTd>
                  </>
                )} */}
                <ListTd
                  className="lEdit"
                  onClick={(event) => handleEditList(event, member)}
                >
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

{/* /* ---------------------------------------------------------------------------------- */}
      <Modal isOpen={isModalMemberOpen} style={MemberContatCustomStyles}>
        <ModalMemberHeader>
          Member Information
          <CloseBtn onClick={handleXBtnModal}>X</CloseBtn>
        </ModalMemberHeader>
            {teamData?.seeTeam?.teamMember?.map((p) => (
              <ModalMemberInfo key={p.id}>
              {p.id === id &&
              <>
              <MemTop>
                <ModalMemberProfileImageBox>
                  <ModalMemberProfileImage src={p?.avatar} />
                </ModalMemberProfileImageBox> 

                <MemRight>     
                  <ModalMemberName>
                  {p?.username}       
                  </ModalMemberName>    

                  <ModalMemberCompanyName>
                  {p?.companyName}
                  </ModalMemberCompanyName>

                  {teamMemberList?.map((member) => (
                    <ModalMemberTitle key={member.id}>
                      {member.id === id && <> 
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
                      </>}
                  </ModalMemberTitle>
                  ))}
                </MemRight>
              </MemTop>

              <MemBottom>
                <ModalMemberTel>
                  <Icon><PhoneIcon /></Icon>
                  {p?.phoneNumber}
                </ModalMemberTel>

                <ModalMemberEmail>
                  <Icon><MailOutlineIcon /></Icon>
                  {p?.email}
                </ModalMemberEmail>         
              </MemBottom>

              </>
            }
          </ModalMemberInfo>
          ))}
        </Modal>

{/* ---------------------------------------------------------------------------------- */}
    </Container>
  );
}

export default MembersMainContents;
