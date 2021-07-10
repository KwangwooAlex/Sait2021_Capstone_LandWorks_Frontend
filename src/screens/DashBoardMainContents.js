import React, { useState } from 'react';
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


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

const SEE_PROJECT_QUERY = gql`
  query seeProject($projectId: Int!) {
    seeProject(projectId: $projectId) {
      id
      projectName
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

const LineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 500px;
  /* justify-content: center; */
  /* align-items: baseline; */
`;

const FirstLine = styled.div`
  width: 30%;
  height: 100%;
  /* display: flex; */
  /* justify-content: space-between; */
`;

const SecondLine = styled.div`
  margin-top: 40px;
  width: 40%;
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
`;

const ThirdLine = styled.div`
  margin-top: 40px;
  width: 40%;
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
`;

const SmallBox = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 40%;
`;

const FirstBox20 = styled.div`
  width: 90%;
  height: 30%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 30px; */
`;

const CalDiv = styled.div`
  width: 100%;
  height: 60%;
`;

const CalBox20 = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
  /* padding-bottom: 20px; */
`;

const TeamCalender = styled(Calendar)`
  margin: auto;
  width: 90%;
  height: 90%;
  border: none;
  border-radius: 40px;
  /* padding-bottom: 50px; */
`;

const SecondBox30 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

const ThirdBox60 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

const TableDiv = styled.div`
  /* margin-top: 1px; */
  margin: 20px auto;
  padding: 0px;
  overflow: auto;
  height: 400px;
  width: 99%;
  border-radius: 0 0 40px 40px;
`;

const TableContainer = styled.table`
  /* margin-top: 40px; */
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 200px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  /* border-radius: 0 0 40px 40px; */
`;

const Thead = styled.thead`
  background-color: #D5EEFF;
`;

const Tbody = styled.thead`
  
`;
const Tr = styled.tr`
  display: flex;
  border-bottom: 1px solid gray;
  justify-content: center;
  align-items: center;
`;
const Th = styled.th`
  font-weight: 600;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.num { width: 5%; }
  &.pName { width: 40%; }
  &.pTeam { width: 25%; }
  &.pStatus { width: 30%; }
`;
const Td = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 5px 10px;
  width: 100%;
  text-align: left;
  &.num { width: 5%; }
  &.pName { width: 40%; overflow: hidden;}
  &.pTeam { width: 25%; }
  &.pStatus { width: 30%; }
`;

const LETTER = styled.h3`
  margin-top: 25px;
  margin-left: 25px;
  font-weight: bolder;
  font-size: large;
  /* font-style:italic */
`;

const TeamBody = styled.div`
  margin: 20px auto;
  padding: 0px;
  overflow: auto;
  height: 400px;
  width: 99%;
  border-radius: 0 0 40px 40px;
`;

const TeamTable = styled.table`
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 200px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  /* border-radius: 0 0 40px 40px; */
`;

const TeamThead = styled.thead`
  background-color: #FFEFCE;
`;

const TeamTbody = styled.thead`
`;

const TeamTr = styled.tr`
  display: flex;
  border-bottom: 1px solid gray;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TeamTh = styled.th`
  font-weight: 600;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.tAvatar { width: 10%; }
  &.tName { width: 40%; }
  &.tDesc { width: 50%; }
`; 

const TeamTd = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 3px 10px;
  width: 100%;
  text-align: left;
  &.tAvatar { width: 10%; }
  &.tName { width: 40%; }
  &.tDesc { width: 50%; }
`; 

function DashBoardMainContents() {
  const [value, onChange] = useState(new Date());

  const {teamName, projectId} = useParams();

  const { data } = useQuery(SEE_ALL_MY_TEAM_QUERY);
  const { data: list } = useQuery(SEE_PROJECT_QUERY);

  // console.log("전체 팀", data?.seeAllMyTeam);
  console.log("프로젝트 리스트", list);

  let totalTeam = data?.seeAllMyTeam?.length;
  // let totalProject = list?.seeProject?.length;
  // let countProject = projectId?.length;

  
  return (
    <Container>
      <MainTitle>DASHBOARD</MainTitle>
      <LineContainer>

        <FirstLine>
          <SmallBox>
            <FirstBox20>On Active Project</FirstBox20>
            <FirstBox20>Total Team {totalTeam}</FirstBox20>
            <FirstBox20>Total Project {totalTeam}</FirstBox20>
            {/* <FirstBox20>
                {data?.seeAllMyTeam?.map((countP) => (
              <FirstBox20 key={countP.project.id}>
                  <>
                    {countP.project.filter((allCountP) => (
                    allCountP.projectId !== null
                    ))}
                  </>
                  </FirstBox20>
                  ))}
            </FirstBox20> */}
          </SmallBox>
          <CalDiv>
            <CalBox20>
              <TeamCalender 
                onChange={onChange}
                value={value}/>
            </CalBox20>
          </CalDiv>          
        </FirstLine>

        <SecondLine>
          <SecondBox30>
          <LETTER> TEAM LIST </LETTER>
          <TeamBody>
            <TeamTable>
              <TeamThead>
                <TeamTr>
                  <TeamTh className="tAvatar"></TeamTh>
                  <TeamTh className="tName">Name</TeamTh>
                  <TeamTh className="tDesc">Description</TeamTh>
                </TeamTr>
              </TeamThead>
              <TeamTbody>
                {data?.seeAllMyTeam?.map((team) => (
                <Link to={`/myProject/${team.teamName}`}>
                <TeamTr key={team.id}>
                  <TeamTd className="tAvatar">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                  </TeamTd>
                  <TeamTd className="tName">{team.teamName}</TeamTd>
                  <TeamTd className="tDesc">{team.description}</TeamTd>
                </TeamTr>
                </Link>
              ))}
              </TeamTbody>
            </TeamTable>
          </TeamBody>
          </SecondBox30>
        </SecondLine>

        <ThirdLine>
        <ThirdBox60>
          <LETTER> PROJECT LIST </LETTER>
            <TableDiv>                    
              <TableContainer className="sortable">
                <Thead>
                  <Tr>
                    <Th className="num">No.</Th>
                    <Th className="pName">Name</Th>
                    <Th className="pTeam">Team</Th>
                    <Th className="pStatus">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.seeAllMyTeam?.map((projects) => (
                  <>
                    {projects.project.map((allProject, index) => (
                    <Link to={`/myProject/${projects?.teamName}/${allProject?.id}`}>
                    <Tr key={projects.project.id}>
                      <Td className="num">{index+1}</Td>
                      <Td className="pName">{allProject.projectName}</Td>
                      <Td className="pTeam">{projects.teamName}</Td>
                      <Td className="pStatus">{allProject.projectStatus}</Td>
                    </Tr>
                    </Link>
                    ))}
                  </>
                  ))}
                </Tbody>
              </TableContainer>
            </TableDiv> 
          </ThirdBox60>
        </ThirdLine>

      </LineContainer>
    </Container>
  );
}

export default DashBoardMainContents;
