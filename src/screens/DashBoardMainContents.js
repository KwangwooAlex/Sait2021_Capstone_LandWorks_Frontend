import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useQuery } from "@apollo/client";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


export const SEE_ALL_MY_TEAM_QUERY = gql`
  query seeAllMyTeam {
    seeAllMyTeam {
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
  height: 83%;
  `;

const FirstLine = styled.div`
  width: 30%;
  height: 100%;
  `;

const SecondLine = styled.div`
  margin-top: 40px;
  width: 40%;
  height: 100%;
  display: flex;
  `;

const ThirdLine = styled.div`
  margin-top: 40px;
  width: 40%;
  height: 100%;
  display: flex;
  `;

const SmallBox = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 40%;
  `;

const FirstBox20 = styled.div`
  width: 90%;
  height: 25%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  font-weight: 600;
  `;

const TotalNum = styled.div`
  font-size: 15px;
  font-weight: 600;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.onActive { background-color: #12B700; color: white; }
  &.totalTeam { background-color: #FF50B9; color: white; }
  &.totalProject { background-color: #00B0FF; color: white; }
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
`;

const TeamCalender = styled(Calendar)`
  margin: auto;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin: 20px auto;
  padding: 0px;
  overflow: auto;
  height: 80%;
  width: 99%;
`;

const TeamBody = styled.div`
  margin: 20px auto;
  padding: 0px;
  overflow: auto;
  height: 80%;
  width: 99%;
`;

const TeamTable = styled.table`
  border: 1px solid white;    
  height: 100%;
  width: 100%;
  padding: 0;
  position: relative;
  border-collapse: collapse;
`;


const TableContainer = styled.table`
  border: 1px solid white;    
  height: 100%;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
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

  // const {teamName, projectId} = useParams();

  const { data } = useQuery(SEE_ALL_MY_TEAM_QUERY);

  // AllMyProject 필요함 (전체 리스트를 보고 총 프로젝트 수를 알 수 있다)
  // seeProject는 프로젝트 하나만 볼 수 있는거기 때문에 X
  // const { data: list } = useQuery(SEE_PROJECT_QUERY);

  console.log("전체 팀", data?.seeAllMyTeam);


  let totalTeam = data?.seeAllMyTeam?.length;


  
  return (
    <Container>
      <MainTitle>DASHBOARD</MainTitle>
      <LineContainer>

        <FirstLine>
          <SmallBox>
            {/* 하드코딩 부분 수정해야함 - Total On Active project 숫자 */}
            <FirstBox20>On Active Project <TotalNum className="onActive">11</TotalNum></FirstBox20>
            <FirstBox20>
              Total Team 
                <TotalNum className="totalTeam">
                  <Link to={`/myTeam`}>
                    {totalTeam}
                  </Link>
                </TotalNum>
            </FirstBox20>
            {/* 하드코딩 부분 수정해야함 - TotalProject 숫자 */}
            <FirstBox20>
              Total Project 
              <TotalNum className="totalProject">
                <Link to={`/allProject`}>
                    12
                </Link>
              </TotalNum>
            </FirstBox20>
          </SmallBox>
          <CalDiv>
            <CalBox20>
              <TeamCalender 
                onChange={onChange}
                value={value} />
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
                  <TeamTh className="tName">Name</TeamTh>
                  <TeamTh className="tDesc">Description</TeamTh>
                </TeamTr>
              </TeamThead>
              <TeamTbody>
                {data?.seeAllMyTeam?.map((team) => (
                <Link to={`/myProject/${team.teamName}`}>
                  <TeamTr key={team.id}>
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
