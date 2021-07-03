import React from 'react'
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

const SEE_TEAM_QUERY = gql`
  query seeTeam($teamName: String!) {
    seeTeam(teamName: $teamName) {
      id
      teamName
      project {
        id
        projectName
        projectStatus
        projectType
        description
        securityLevel
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


const SixBtn = styled.div`
display: flex;
justify-content: space-between;
`;

const FourBtn = styled.div`
display: flex;

`;

const TwoBtn = styled.div`
display: flex;
`;

const UploadBtn = styled.button`
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

const DownloadBtn = styled.button`
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
  cursor: pointer
`;

const NewFolderBtn = styled.button`
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
  cursor: pointer
`;

const CopyBtn = styled.button`
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
  cursor: pointer
`;

const MoveBtn = styled.button`
margin-top: 25px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 100px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer
`;

const DeleteBtn = styled.button`
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
  cursor: pointer
`;

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


function FilesMainContents() {
  const {teamName,projectId} = useParams();
  const { data: teamData} = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
    }
  ); 

  return (
    <Container>
    <TeamName>  
    {/* {teamData?.seeTeam?.teamName} */}
    </TeamName>
    <MainHeader>
      <MainTitle>
        Files
      </MainTitle> 
      <RightSection>
        <NavBar>
          <Link to={`/myProject/${teamName}/${projectId}/overview`}> 
            <Letter>Overview</Letter>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/files`}>
            <SelectedPage><Letter>Files</Letter></SelectedPage>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/members`}>
          <Letter>Members</Letter>
          </Link>
        </NavBar>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <SixBtn>
      <FourBtn>  
        <UploadBtn>Upload</UploadBtn>
        <DownloadBtn>Download</DownloadBtn>
        <NewFolderBtn>New Folder</NewFolderBtn>
        <CopyBtn>Copy</CopyBtn>
      </FourBtn>
      <TwoBtn>
        <MoveBtn>Move</MoveBtn>
        <DeleteBtn>Delete</DeleteBtn>
      </TwoBtn>
    </SixBtn>

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

export default FilesMainContents;
