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

const LineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: ; */
  align-items: baseline;
`;

const FirstLine = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
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
  box-shadow: 0px 5px 10px gray;
`;

const SecondBox20 = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
`;
const SecondBox30 = styled.div`
  width: 650px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
`;

const ThirdBox40 = styled.div`
  width: 550px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
`;

const ThirdBox60 = styled.div`
  width: 1070px;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 5px 10px gray;
`;


function OverviewMainContents() {
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
        OVERVIEW
      </MainTitle> 
      <RightSection>
        <NavBar>
          <Link to="/overview">
          <SelectedPage><Letter>Overview</Letter></SelectedPage>
          </Link>  
          <Link to="/files">
              <Letter>Files</Letter>
          </Link>
          <Link to="/members">
            <Letter>Members</Letter>
          </Link>
        </NavBar>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <LineContainer>
        <FirstLine>
          <FirstBox20></FirstBox20>
          <FirstBox20></FirstBox20>
          <FirstBox20></FirstBox20>
          <FirstBox20></FirstBox20>
        </FirstLine>
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
