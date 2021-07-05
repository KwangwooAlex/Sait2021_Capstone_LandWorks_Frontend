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


const Container = styled.main`
  padding: 40px 40px 0 40px;
  height: 100%;
  /* background-color: black; */
  width: 90%;
`;


const TeamName = styled.div`
  color: Black;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 15px;
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
`;

const AddBtn = styled.button`
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
    height: "500px",
  },
};

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
  margin: 20px auto;
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

const ListTableContainer = styled.table`
  margin-top: 40px;
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
`;
const ListTh = styled.th`
  /* background-color: lightblue; */
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  &.check { width: 10px; }
  &.num { width: 40px; }
  &.lAvatar { width: 120px }
  &.lEdit { width: 50px; }
  &.lDelete { width: 50px; }
`;
const ListTd = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  width: 100%;
  &.check { width: 10px; }
  &.num { width: 40px; }
  &.lAvatar { width: 40px }
  &.lEdit { width: 50px; }
  &.lDelete { width: 50px; }
`;
const CheckInput = styled.input``;



function MembersMainContents() {
  const {teamName,projectId} = useParams();
  const { data: teamData, refetch} = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
    }
  ); 
  console.log("MEMBER", teamData?.seeTeam?.teamMember);

  // const [username, setUsername] = useState('');
  // const { data: searchData } = useQuery(SEARCH_USER_QUERY);



  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Link to={`/myProject/${teamName}/${projectId}/overview`}> 
            <Letter>Overview</Letter>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/files`}>
            <Letter>Files</Letter>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/members`}>
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
                            <FontAwesomeIcon icon={faUserCircle} size="2x" />
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
                          <FontAwesomeIcon icon={faUserCircle} size="2x" />
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
      <EditBtn>Edit</EditBtn>
    </TopBtn>

    <ListTableContainer className="sortable">
        <ListThead>
          <ListTr>
            <ListTh className="check"></ListTh>
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
              <ListTd className="check">O</ListTd>
              <ListTd className="lAvatar">
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </ListTd>
              <ListTd className="lName">{member.username}</ListTd>
              <ListTd className="lRole">Project Manager</ListTd>
              <ListTd className="lMail">{member.email}</ListTd>
              <ListTd className="lEdit">Edit</ListTd>
              <ListTd className="lDelete">Delete</ListTd>
            </ListTr>
          ))}
        </ListTbody>
      </ListTableContainer>
    
    </Container>
  )
}

export default MembersMainContents;
