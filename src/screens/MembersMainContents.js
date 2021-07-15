import React, { useEffect } from 'react'
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
  mutation addTeamMember(
      $teamId: Int!
      $userId: Int
    ) {
      addTeamMember(
        teamId: $teamId
        userId: $userId
      ) {
      ok
      error
      id
    }
  }
`;

const DELETE_MEMBER_MUTATION = gql`
  mutation deleteTeamMember(
      $teamId: Int!
      $teamMemberId: Int!
    ) {
      deleteTeamMember(
        teamId: $teamId
        teamMemberId: $teamMemberId
      ) {
      ok
      error
      id
    }
  }
`;

const ADD_ROLE_MUTATION = gql`
  mutation addRole(
      $roleName: String!
      $teamId: Int!
      $userId: Int!
    ) {
      addRole(
        roleName: $roleName
        teamId: $teamId
        userId: $userId
      ) {
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
  border-bottom: 2px solid #FFB41E;
  margin-right: 10px;
  &:hover {
    color: #004070;
    background-color: #FFEBC4;
    /*border-top: black 2px solid;*/
  }
  &.selected {
    background-color: #FFB41E;
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

const EditBtn = styled.button`
  margin-left: 10px;
  margin-top: 25px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 100px;
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
    height: "670px",
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

const ModalInfo = styled.div`
`;

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
  width: 85%;
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

const TableContainer = styled.table`
  margin-top: 10px;
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 200px;
  width: 100%;
  padding:0;
  border-collapse: collapse;
  /* overflow-y: scroll;  */
  font-size: 13px;
`;

const Thead = styled.thead`
  background-color: #F3F3F3;
`;
const Tbody = styled.thead`

`;
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
  &.mAvatar { width: 50px; }
  &.mBtn { width: 30px; }
`;
const Td = styled.td`
  cursor: pointer;
  padding: 5px;
  margin: 10px;
  width: 100%;
  &.mAvatar { width: 50px; }
  &.mBtn { width: 30px; }
`;

const PlusBtn = styled.button``;
const MinusBtn = styled.button``;

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
  padding:0;
  border-collapse: collapse;
  /* overflow-y: scroll;  */
`;

const ListThead = styled.thead`
  background-color: #F3F3F3;
`;
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
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  &.check { width: 3%; }
  &.lAvatar { width: 5%; }
  &.lName { width: 30%; }
  &.lRole { width: 25%; }
  &.lMail { width: 20%; }
  &.lEdit { width: 7%; }
  &.lDelete { width: 10%; }
`;

const ListTd = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  width: 100%;
  text-align: left;
  &.check { width: 3%; }
  &.lAvatar { width: 5%; }
  &.lName { width: 30%; }
  &.lRole { width: 25%; }
  &.lMail { width: 20%; }
  &.lEdit { width: 7%; }
  &.lDelete { width: 10%; }
`;

const CheckInput = styled.input``;

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

const RightBtn = styled.div`
`;

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

const DeleteBtn = styled.button`
  margin-top: 25px;
  border-radius: 20px;
  background: white;
  border: 1px solid;
  color: #004070;
  width: 150px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
`;

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
  border-color:#B8B8B8;
  color: #004070;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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


function MembersMainContents() {
  const {teamName,projectId} = useParams();
  const { data: teamData, refetch} = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
    }
  ); 
  const { data: userData } = useQuery(ME_QUERY);
  console.log("MEMBER", teamData?.seeTeam?.teamMember);

  // const [username, setUsername] = useState('');
  // const { data: searchData } = useQuery(SEARCH_USER_QUERY);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDModalOpen, setIsDModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddBtnModal = () => {
    alert("Your team has been created.");
    setIsModalOpen(false);
  };

  const handleCancelBtnModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMember = () => {
    handleOpenModal();
  };

  const handleDeleteModal = () => {
    setIsDModalOpen(true);
   };

   const handleDCancelBtnModal = () => {
    setIsDModalOpen(false);
  };

  const handleOkBtnModal = () => {
    alert("Your members have been deleted.");
    setIsDModalOpen(false);
  };


  const { handleSubmit, setValue, watch, register } = useForm({
    mode: "onChange",
  });


  const [addTeamMember, {loading}] = useMutation(ADD_MEMBER_MUTATION);

  // const [deleteTeamMember] = useMutation(DELETE_MEMBER_MUTATION);
  // const [addRole] = useMutation(ADD_ROLE_MUTATION );

  const onSaveValid = (data) => {
    handleAddBtnModal();
    console.log("addMember", data);
    if (loading) {
      return;
    }
    addTeamMember({
      variables: {
        ...data,
      },
    });
    refetch();
  };

  const onSaveInvalid = (data) => {};


  return (
    <Container>
    <TeamName>  
      <Link to={`/myProject/${teamName}`}> 
        {teamName} 
      </Link>
    </TeamName>
    <MainHeader>
      <MainTitle>
        Members
      </MainTitle> 
      <RightSection>
        <NavBar>
          {/* <Link to={`/myProject/${teamName}/${projectId}/overview`}> 
            <Letter>Overview</Letter>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/files`}>
            <Letter>Files</Letter>
          </Link> */}
          <Link to={`/myProject/${teamName}`}>
            <Letter >My Project</Letter>
          </Link>
          <Link to={`/members/${teamName}`}>
          <Letter className="selected">Members</Letter>
          </Link>
        </NavBar>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
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
                    type="text" 
                    name="searchUsers"
                    placeholder="Search members..."
                    // onChange={handleChange}
                    >
                  </SearchMemberInput>
                  <SearchMemberBtn
                    // onClick={handleSearch}
                  >Search</SearchMemberBtn>
              </SearchSection>

              <ResultSection>
                <ResultLabel>Search Result</ResultLabel>
                  <TableContainer className="sortable">
                    <Thead>
                      <Tr>
                        <Th className="mAvatar"></Th>
                        <Th className="mName">Name</Th>
                        <Th className="mTeam">Team</Th>
                        <Th className="mMail">E-mail</Th>
                        <Th className="mBtn"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        {/* {searchedName ? 
                        <>
                          <Td className="mAvatar">
                            <FontAwesomeIcon icon={faUserCircle} size="2x" />
                          </Td>
                          <Td className="mName"></Td>
                          <Td className="mTeam"></Td>
                          <Td className="mMail"></Td>
                          <Td className="mBtn"><PlusBtn>+</PlusBtn></Td>
                        </>
                        : 
                        <> */}
                          <Td className="mAvatar">
                          <Avatar src={userData?.me?.avatar} />
                          </Td>
                          <Td className="mName"></Td>
                          <Td className="mTeam"></Td>
                          <Td className="mMail"></Td>
                          <Td className="mBtn"><PlusBtn>+</PlusBtn></Td>
                        {/* </> */}
                        {/* } */}
                      </Tr>
                    </Tbody>
                  </TableContainer>
              </ResultSection>

              <SelectionSection>
                <SelectionLabel>Add Member List</SelectionLabel>
                  <TableContainer className="sortable">
                    <Thead>
                      <Tr>
                        <Th className="mAvatar"></Th>
                        <Th className="mName">Name</Th>
                        <Th className="mTeam">Team</Th>
                        <Th className="mMail">E-mail</Th>
                        <Th className="mBtn"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td className="mAvatar">
                          <Avatar src={userData?.me?.avatar} />
                        </Td>
                        <Td className="mName"></Td>
                        <Td className="mTeam"></Td>
                        <Td className="mMail"></Td>
                        <Td className="mBtn"><MinusBtn>-</MinusBtn></Td>
                      </Tr>
                    </Tbody>
                  </TableContainer>
              </SelectionSection>
            </ModalInfo>

            <ModalBtn>
              <AddModalBtn type="submit">Add</AddModalBtn>
              <CancelModalBtn onClick={handleCancelBtnModal}>Cancel</CancelModalBtn>
            </ModalBtn>
          </form>
        </ModalBody>
      </Modal>
    

      <RightBtn>
          <Modal isOpen={isDModalOpen} style={customStyle}>
            <ModalHeader>DELETE PROJECT</ModalHeader>
              <ModalBody2>
                <DeleteNotice>Are you sure you want to delete<br /> 
                  the member <B>"sdfsf"</B>?</DeleteNotice>
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
            <ListTh className="lName">Name</ListTh>
            <ListTh className="lRole">Role</ListTh>
            <ListTh className="lMail">e-mail</ListTh>
            <ListTh className="lEdit">Edit</ListTh>
            <ListTh className="lDelete">Delete</ListTh>
          </ListTr>
        </ListThead>
        <ListTbody>
          {teamData?.seeTeam?.teamMember?.map((member) => (
            <ListTr key={member.id}>
               <ListTd className="lAvatar">
                <Avatar src={userData?.me?.avatar} />
              </ListTd>
              <ListTd className="lName">{member.username}</ListTd>
              <ListTd className="lRole">Project Manager</ListTd>
              <ListTd className="lMail">{member.email}</ListTd>
              <ListTd className="lEdit"><MeditBtn><EditIcon /></MeditBtn></ListTd>
              <ListTd className="lDelete"><DeleteMBtn ><DeleteIcon /></DeleteMBtn></ListTd>
            </ListTr>
          ))}
        </ListTbody>
      </ListTableContainer>
      </TableDiv>
    </Container>
  )
}

export default MembersMainContents;
