import React from 'react'
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";



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
  border-bottom: 1px solid #FFB41E;
  margin-right: 10px;
  &:hover {
    color: #004070;
    background-color: #FFB41E;
    /*border-top: black 2px solid;*/
  }
`;

const SelectedPage = styled.div`
  background-color: #FFB41E;
`;


const MainContents = styled.div`
`;

const InputSearch = styled.input`
  border: 1px solid lightgray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
`;

const TopBtn = styled.div`
`;

const AddBtn = styled.button``;
const EditBtn = styled.button``;

const ListBox = styled.div`
  margin-top: 40px;
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 600px;
  width: 100%;
  padding:0;
`;

const ListTop= styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: lightgray;
`;

const ListHeader = styled.h3`
  margin: 5px 15px;
`;


function MembersMainContents() {
  // const {teamName} = useParams();
  //   const { data: teamData, refetch } = useQuery(SEE_TEAM_QUERY, {
  //   variables: { teamName: teamName },
  //   }
  // ); 

  return (
    <Container>
    <TeamName>  
    {/* {teamData?.seeTeam?.teamName} */}
    </TeamName>
    <MainHeader>
      <MainTitle>
        Members
      </MainTitle> 
      <RightSection>
        <NavBar>
          <Link to="/overview">
          <Letter>Overview</Letter>
          </Link>  
          <Link to="/files">
          <Letter>Files</Letter>
          </Link>
          <Link to="/members">
          <SelectedPage><Letter>Members</Letter></SelectedPage>
          </Link>
        </NavBar>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <TopBtn>        
      <AddBtn>Add</AddBtn>
      <EditBtn>Edit</EditBtn>
    </TopBtn>

    <ListBox>
      <ListTop>
        <ListHeader>O</ListHeader>
        <ListHeader>No.</ListHeader>
        <ListHeader>Type</ListHeader>
        <ListHeader>Name</ListHeader>
        <ListHeader>Status</ListHeader>
        <ListHeader>Description</ListHeader>
        <ListHeader>Security</ListHeader>
        <ListHeader>End Date</ListHeader>
        <ListHeader>Edit icon</ListHeader>
      </ListTop>
    </ListBox>
    
    </Container>
  )
}

export default MembersMainContents;
