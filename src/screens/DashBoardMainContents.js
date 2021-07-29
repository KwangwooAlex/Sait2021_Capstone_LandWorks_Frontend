import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useQuery } from "@apollo/client";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { trimText } from '../components/Utils';

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
  flex-direction: column;
  height: 80vh;
`;

const FirstLine = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  margin-top: 40px;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 40px;
`;

const SecondLine = styled.div`
  margin-top: -10px;
  width: 50%;
  height: 38vh;
  display: flex;
`;

const ThirdLine = styled.div`
  margin-top: -15px;
  width: 50%;
  height: 38vh;
  display: flex;
`;

const SmallBox = styled.div`
  /* margin-top: 40px; */
  width: 100%;
  height: 100%;
  display: flex;
  margin-right: 25px;
`;

const FirstBox20 = styled.div`
  width: 20%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0px 3px 6px gray;
  margin-right: 15px;
  /* margin-bottom: 15px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
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
  &.onActive {
    background-color: #12b700;
    color: white;
  }
  &.totalTeam {
    background-color: #ff50b9;
    color: white;
  }
  &.totalProject {
    background-color: #00b0ff;
    color: white;
  }
`;

const CalDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const CalBox20 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 6px gray;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding: 15px;
`;

const TeamCalender = styled(Calendar)`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
`;

const ChartDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const ChartBox20 = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
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

const TableContainerTop = styled.table`
  border: 1px solid white;
  height: 15px;
  width: 99%;
  padding: 0;
  border-collapse: collapse;
  border: 1px solid lightgray; 
  border-bottom: none;
  margin: 10px auto 0 auto;
`;

const TableDiv = styled.div`
  padding: 0px;
  overflow: overlay;
  height: 58%;
  width: 99%;
  margin: 0 auto;
`;

const TableContainer = styled.table`
  border: 1px solid white;
  height: 10%;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #d5eeff;
`;

const Tbody = styled.thead``;

const Tr = styled.tr`
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Th = styled.th`
  font-weight: 600;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.num {
    width: 5%;
  }
  &.pName {
    width: 40%;
  }
  &.pTeam {
    width: 25%;
  }
  &.pStatus {
    width: 30%;
  }
`;
const Td = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 0px 10px;
  width: 100%;
  text-align: left;
  &.num {
    width: 5%;
  }
  &.pName {
    width: 40%;
    overflow: hidden;
  }
  &.pTeam {
    width: 25%;
  }
  &.pStatus {
    width: 30%;
  }
`;

const LETTER = styled.h3`
  margin-top: 25px;
  margin-left: 25px;
  font-weight: bolder;
  font-size: large;
`;

const TeamTableTop = styled.table`
  border: 1px solid white;
  height: 15px;
  width: 99%;
  padding: 0;
  border-collapse: collapse;
  border: 1px solid lightgray; 
  border-bottom: none;
  margin: 10px auto 0 auto;
`;

const TeamBody = styled.div`
  padding: 0px;
  overflow: overlay;
  height: 58%;
  width: 99%;
  margin: 0 auto;
`;

const TeamTable = styled.table`
  border: 1px solid white;
  height: 100%;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
`;

const TeamThead = styled.thead`
  background-color: #ffefce;
`;

const TeamTbody = styled.thead``;

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
  &.tAvatar {
    width: 10%;
  }
  &.tName {
    width: 40%;
  }
  &.tDesc {
    width: 50%;
  }
`;

const TeamTd = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 0px 10px;
  width: 100%;
  text-align: left;
  &.tAvatar {
    width: 10%;
  }
  &.tName {
    width: 40%;
  }
  &.tDesc {
    width: 50%;
  }
`;

function DashBoardMainContents() {
  const [value, onChange] = useState(new Date());

  // const {teamName, projectId} = useParams();

  const { data } = useQuery(SEE_ALL_MY_TEAM_QUERY);
  const [totalProjectState, setTotalProjectState] = useState();
  const [totalActiveProjectState, setTotalActiveProjectState] = useState();
  // AllMyProject 필요함 (전체 리스트를 보고 총 프로젝트 수를 알 수 있다)
  // seeProject는 프로젝트 하나만 볼 수 있는거기 때문에 X
  // const { data: list } = useQuery(SEE_PROJECT_QUERY);

  console.log("전체 팀", data?.seeAllMyTeam);

  useEffect(() => {
    if (data !== undefined) {
      activeProjectFunction();
    }
  }, [data]);

  let totalTeam = data?.seeAllMyTeam?.length;

  let activeProject = 0;
  let totalProject = 0;

  const activeProjectFunction = () => {
    const allTeam = data?.seeAllMyTeam;
    for (let eachTeam of allTeam) {
      totalProject += eachTeam.project.length;
      for (let eachProject of eachTeam.project) {
        if (eachProject.projectStatus === "Active") {
          activeProject += 1;
        }
      }
    }

    setTotalProjectState(totalProject);
    setTotalActiveProjectState(activeProject);
  };

  return (
    <Container>
      <MainTitle>DASHBOARD</MainTitle>
      <LineContainer>
        <FirstLine>
          <SmallBox>
            <FirstBox20>
              On Active Project{" "}
              <TotalNum className="onActive">
                {totalActiveProjectState}
              </TotalNum>
            </FirstBox20>
            <FirstBox20>
              Total Team
              <TotalNum className="totalTeam">
                <Link to={`/myTeam`}>{totalTeam}</Link>
              </TotalNum>
            </FirstBox20>
            <FirstBox20>
              Total Project
              <TotalNum className="totalProject">
                <Link to={`/allProject`}>{totalProjectState}</Link>
              </TotalNum>
            </FirstBox20>

          <CalDiv>
            <CalBox20>
              <TeamCalender onChange={onChange} value={value} />
            </CalBox20>
          </CalDiv>

          </SmallBox>

          <ChartDiv>
            <ChartBox20>
              This for chart              
            </ChartBox20>
          </ChartDiv>
        </FirstLine>

        <ListContainer>
          <SecondLine>
            <SecondBox30>
              <LETTER> TEAM LIST </LETTER>
                <TeamTableTop>
                  <TeamThead>
                    <TeamTr>
                      <TeamTh className="tName">Name</TeamTh>
                      <TeamTh className="tDesc">Description</TeamTh>
                    </TeamTr>
                  </TeamThead>
                  </TeamTableTop>

              <TeamBody>
                  <TeamTable>
                  <TeamTbody>
                    {data?.seeAllMyTeam?.map((team) => (
                      <Link to={`/myProject/${team.teamName}`}>
                        <TeamTr key={team.id}>
                          <TeamTd className="tName">{trimText(team.teamName, 15)}</TeamTd>
                          <TeamTd className="tDesc">{trimText(team.description, 15)}</TeamTd>
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
                <TableContainerTop className="sortable">
                  <Thead>
                    <Tr>
                      <Th className="num">No.</Th>
                      <Th className="pName">Name</Th>
                      <Th className="pTeam">Team</Th>
                      <Th className="pStatus">Status</Th>
                    </Tr>
                  </Thead>
                  </TableContainerTop>

              <TableDiv>
                  <TableContainer>
                  <Tbody>
                    {data?.seeAllMyTeam?.map((projects) => (
                      <>
                        {projects.project.map((project, index) => (
                          <Link
                            to={`/myProject/${projects?.teamName}/${project?.id}`}
                          >
                            <Tr key={projects.project.id}>
                              <Td className="num">{project.id}</Td>
                              <Td className="pName">{trimText(project.projectName, 15)}</Td>
                              <Td className="pTeam">{trimText(projects.teamName, 8)}</Td>
                              <Td className="pStatus">{project.projectStatus}</Td>
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
        </ListContainer>
      </LineContainer>
    </Container>
  );
}

export default DashBoardMainContents;
