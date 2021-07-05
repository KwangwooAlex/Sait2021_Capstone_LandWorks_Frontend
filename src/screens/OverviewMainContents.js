import React from 'react'
import styled from "styled-components";
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
  width: 85%;
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

const LineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: ; */
  align-items: baseline;
`;

const SecondLine = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
`;
const ThirdLine = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
`;

const FirstBox20 = styled.div`
  width: 400px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

const SecondBox20 = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;
const SecondBox30 = styled.div`
  width: 650px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

const ThirdBox40 = styled.div`
  width: 550px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

const ThirdBox60 = styled.div`
  width: 1070px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

// const file = [{id:"", projectName:""},{}]


function OverviewMainContents() {
  
  const {teamName,projectId} = useParams();
  const { data: teamData} = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
    }
  ); 
  // {`/myProject/${teamName}/${projects?.id}`}
  
return (
    <Container>
    <TeamName>  
      <Link to={`/myProject/${teamName}`}> 
        {teamName} 
      </Link>
    </TeamName>
    <MainHeader>
      <MainTitle>
        OVERVIEW
      </MainTitle> 
      <RightSection>
        <NavBar>
          <Link to={`/myProject/${teamName}/${projectId}/overview`}> 
            <Letter className="selected">Overview</Letter>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/files`}>
            <Letter>Files</Letter>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/members`}>
            <Letter>Members</Letter>
          </Link>
        </NavBar>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <LineContainer>
        <SecondLine>
          <SecondBox20></SecondBox20>
          <SecondBox30></SecondBox30>
          <SecondBox30></SecondBox30>
        </SecondLine>
        <ThirdLine>
          <ThirdBox40></ThirdBox40>
          <ThirdBox60></ThirdBox60>
        </ThirdLine>
      </LineContainer>

    
    </Container>
  )
}

export default OverviewMainContents
