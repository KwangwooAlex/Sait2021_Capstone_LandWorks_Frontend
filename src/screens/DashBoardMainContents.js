import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useQuery } from "@apollo/client";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { trimText } from "../components/Utils";
import {
  VictoryPie,
  VictoryLabel,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis,
} from "victory";

export const SEE_ALL_MY_TEAM_QUERY = gql`
  query seeAllMyTeam {
    seeAllMyTeam {
      id
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
        files {
          fileName
        }
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
  /* margin-right: 25px; */
`;

const SecondLine = styled.div`
  margin-top: -10px;
  width: 45%;
  height: 38vh;
  display: flex;
`;

const ThirdLine = styled.div`
  margin-top: -15px;
  width: 55%;
  height: 38vh;
  display: flex;
`;

const SmallBox = styled.div`
  /* margin-top: 40px; */
  width: 45%;
  height: 100%;
  display: flex;
  margin-right: 20px;
`;

const CountBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
  margin-right: 20px;
`;

const FirstBox20 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-shadow: 0px 3px 6px gray;
  margin-right: 15px;
  /* margin-bottom: 15px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-weight: 600;
  font-size: 15px;
  &.totalTeamBox {
    margin-bottom: 25px;
    background-color: #2784c7;
    color: white;
    /* opacity: 90%; */
  }
  &.totalProjectBox {
    background-color: #11569a;
    color: white;
    /* opacity: 90%; */
  }
`;

const TotalNum = styled.div`
  font-size: 20px;
  font-weight: 600;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  /* &.onActive {
    background-color: #12b700;
    color: white;
  } */
  &.totalTeam {
    background-color: white;
    color: black;
  }
  &.totalProject {
    background-color: white;
    color: black;
  }
`;

const CalDiv = styled.div`
  width: 100%;
  height: 100%;
  /* margin-right: 10px; */
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
  overflow: overlay;
  /* justify-content: center; */
`;

const ChartContainer = styled.div`
  display: flex;
  width: 55%;
`;

const ChartDiv = styled.div`
  width: 50%;
  height: 100%;
`;

const ChartDivBar = styled.div`
  width: 50%;
  height: 100%;
  margin-right: 20px;
`;

const ChartBox20 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  /* margin-right: 15px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 10px;
  padding-left: 20px;
  /* margin-right: -40px; */
`;

const ChartBoxNothing = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  /* margin-right: 15px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* align-items: center; */
  padding: 10px;
  padding-left: 20px;
  margin: auto;
  font-weight: 500;
  /* margin-right: -40px; */
`;

const ChartBox30 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  /* margin-right: 10px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 15px;
`;

const SecondBox30 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 10px;
`;

const ThirdBox60 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-left: 10px;
  margin-top: 5px;
`;

const TableContainerTop = styled.table`
  border: 1px solid white;
  height: 15px;
  width: 95%;
  padding: 0;
  border-collapse: collapse;
  /* border: 1px solid lightgray; */
  border-bottom: none;
  margin: 15px auto 0 auto;
`;

const TableDiv = styled.div`
  padding: 0px;
  overflow: overlay;
  height: 58%;
  width: 95%;
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
  background-color: #004070;
  color: white;
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
  padding: 5px;
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
  width: 95%;
  padding: 0;
  border-collapse: collapse;
  /* border: 1px solid lightgray; */
  border-bottom: none;
  margin: 15px auto 0 auto;
`;

const TeamBody = styled.div`
  padding: 0px;
  overflow: overlay;
  height: 58%;
  width: 95%;
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
  background-color: #004070;
  color: white;
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
  padding: 5px;
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
  const [totalOnHoldProjectState, setTotalOnHoldProjectState] = useState();
  const [totalCompleteProjectState, setTotalCompleteProjectState] = useState();
  // AllMyProject 필요함 (전체 리스트를 보고 총 프로젝트 수를 알 수 있다)
  // seeProject는 프로젝트 하나만 볼 수 있는거기 때문에 X
  // const { data: list } = useQuery(SEE_PROJECT_QUERY);
  const [topFiveTeam, setTopFiveTeam] = useState();
  const [firstLine, setFirstLine] = useState();
  const [secondLine, setSecondLine] = useState();
  const [thirdLine, setThirdLine] = useState();
  console.log("전체 팀", data?.seeAllMyTeam);

  useEffect(() => {
    if (data !== undefined) {
      activeProjectFunction();
      topFiveTeamFunction();
    }
  }, [data]);

  useEffect(() => {
    setLineFunction();
  }, [topFiveTeam]);

  let totalTeam = data?.seeAllMyTeam?.length;

  let activeProject = 0;
  let onHoldProject = 0;
  let completeProject = 0;
  let totalProject = 0;

  const topFiveTeamFunction = () => {
    const allTeam = [...data?.seeAllMyTeam];
    let count = 0;
    let topTeams = [];
    allTeam.sort((a, b) => a.teamMember.length - b.teamMember.length).reverse();
    console.log("솔팅결과", allTeam);
    for (let eachTeam of allTeam) {
      count += 1;
      if (count < 6) {
        topTeams.push(eachTeam);
      }
      // if(eachTeam<5){
      //   topTeams.push()
      // }
    }
    console.log("topTeams", topTeams);
    setTopFiveTeam(topTeams);
  };

  const setLineFunction = () => {
    const firstSet = topFiveTeam?.map((eachTeam, index) => {
      // const name = trimText(eachTeam?.teamName, 4);
      return {
        teamName: `${String.fromCharCode(65 + index)} team`,
        NumberOfTeamMember: eachTeam.teamMember.length,
        label: `${eachTeam?.teamName}'s number Of team member`,
      };
    });

    const secondSet = topFiveTeam?.map((eachTeam, index) => {
      // const name = trimText(eachTeam?.teamName, 4);
      return {
        teamName: `${String.fromCharCode(65 + index)} team`,
        NumberOfProject: eachTeam.project.length,
        label: `${eachTeam?.teamName}'s number of project`,
      };
    });

    setFirstLine(firstSet);
    setSecondLine(secondSet);
    // setThirdLine();
    console.log("firstSet", firstSet);
  };

  const activeProjectFunction = () => {
    const allTeam = data?.seeAllMyTeam;
    for (let eachTeam of allTeam) {
      totalProject += eachTeam.project.length;
      for (let eachProject of eachTeam.project) {
        if (eachProject.projectStatus === "Active") {
          activeProject += 1;
        } else if (eachProject.projectStatus === "On Hold") {
          onHoldProject += 1;
        } else if (eachProject.projectStatus === "Complete") {
          completeProject += 1;
        }
      }
    }

    setTotalProjectState(totalProject);
    setTotalActiveProjectState(activeProject);
    setTotalOnHoldProjectState(onHoldProject);
    setTotalCompleteProjectState(completeProject);
  };

  return (
    <Container>
      <MainTitle>DASHBOARD</MainTitle>
      <LineContainer>
        <FirstLine>
          <SmallBox>
            {/* <FirstBox20>
              On Active Project{" "}
              <TotalNum className="onActive">
                {totalActiveProjectState}
              </TotalNum>
            </FirstBox20> */}
            <CountBox>
              <FirstBox20 className="totalTeamBox">
                Total Team
                <TotalNum className="totalTeam">
                  <Link to={`/myTeam`}>{totalTeam}</Link>
                </TotalNum>
              </FirstBox20>
              <FirstBox20 className="totalProjectBox">
                Total Project
                <TotalNum className="totalProject">
                  <Link to={`/allProject`}>{totalProjectState}</Link>
                </TotalNum>
              </FirstBox20>
            </CountBox>

            <CalDiv>
              <CalBox20>
                <TeamCalender onChange={onChange} value={value} />
              </CalBox20>
            </CalDiv>
          </SmallBox>

          <ChartContainer>
            <ChartDivBar>
              <ChartBox30>
                <div>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    // domain={{ y: [0.5, 10.5] }}
                    width={420}
                    height={340}
                  >
                    <VictoryLabel
                      text="Each Team Status"
                      x={205}
                      y={30}
                      textAnchor="middle"
                    />
                    {/* <VictoryAxis
                      width={100}
                      tickFormat={[
                        `firstlabel`,
                        `secondlabel`,
                        `thirdlabel`,
                        `forthlabel`,
                        `fifthlabel`,
                      ]}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={[1, 2, 3, 4, 5, 6, 7, 8]}
                    /> */}
                    <VictoryGroup
                      horizontal
                      offset={15}
                      style={{ data: { width: 5 } }}
                      colorScale={["navy", "tomato", "gold"]}
                    >
                      <VictoryBar
                        barWidth={8}
                        // domainPadding={{ x: 4 }}
                        labelComponent={<VictoryTooltip />}
                        data={firstLine}
                        // style={{
                        //   data: {
                        //     // fill: "#c43a31",
                        //     // width: 25,
                        //     padding: 25,
                        //   },
                        // }}
                        // barRatio={0.2}
                        x="teamName"
                        y="NumberOfTeamMember"
                        // colorScale={["brown", "tomato"]}
                        // categories={{ x: ["apples", "oranges"] }}
                        // style={{ labels: { fill: "black" } }}
                      />
                      <VictoryBar
                        labelComponent={<VictoryTooltip />}
                        barWidth={8}
                        data={secondLine}
                        x="teamName"
                        y="NumberOfProject"
                      />
                      {/* <VictoryBar data={thirdLine} /> */}
                      {/* <VictoryBar
                        data={[
                          { x: "a", y: 2 },
                          { x: "b", y: 3 },
                          { x: "c", y: 4 },
                          { x: "d", y: 5 },
                          { x: "e", y: 5 },
                        ]}
                      />
                      <VictoryBar
                        data={[
                          { x: "a", y: 1 },
                          { x: "b", y: 2 },
                          { x: "c", y: 3 },
                          { x: "d", y: 4 },
                          { x: "e", y: 4 },
                        ]}
                      /> */}
                    </VictoryGroup>
                  </VictoryChart>
                </div>
              </ChartBox30>
            </ChartDivBar>
            <ChartDiv>
              {firstLine?.length > 0 ? (
                <ChartBox20>
                  <svg viewBox="0 0 450 500">
                    <VictoryPie
                      labelPosition="centroid"
                      standalone={false}
                      width={500}
                      height={500}
                      // labels={({ datum }) => `y: ${datum.y}`}
                      colorScale={["tomato", "gold", "navy"]}
                      // data={[
                      //   { x: 1, y: 50, label: "Active" },
                      //   { x: "OnHold", y: 50 },
                      //   { x: "Complete", y: 50 },
                      // ]}
                      data={[
                        {
                          x: 1,
                          y: totalActiveProjectState,
                          label: `Active: ${totalActiveProjectState}`,
                        },
                        {
                          x: 2,
                          y: totalOnHoldProjectState,
                          label: `OnHold: ${totalOnHoldProjectState}`,
                        },
                        {
                          x: 3,
                          y: totalCompleteProjectState,
                          label: `Complete: ${totalCompleteProjectState}`,
                        },
                      ]}
                      startAngle={-45}
                      endAngle={405}
                      padAngle={({ datum }) => datum.y}
                      innerRadius={100}
                      labelRadius={220}
                      style={{
                        labels: {
                          fontSize: 20,
                          fill: "black",
                          fontWeight: "400",
                        },
                      }}
                      // categories={{ x: ["dogs", "cats", "mice"] }}
                    />
                    <VictoryLabel
                      textAnchor="middle"
                      style={{ fontSize: 20, fontWeight: 600 }}
                      x={250}
                      y={250}
                      text="Projects' Status"
                    />
                  </svg>
                </ChartBox20>
              ) : (
                <ChartBoxNothing>
                  {" "}
                  Please Create Team and Project..
                </ChartBoxNothing>
              )}
            </ChartDiv>
          </ChartContainer>
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
                          <TeamTd className="tName">
                            {trimText(team?.teamName, 15)}
                          </TeamTd>
                          <TeamTd className="tDesc">
                            {team?.description !== null &&
                              trimText(team?.description, 15)}
                          </TeamTd>
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
                              <Td className="pName">
                                {trimText(project?.projectName, 15)}
                              </Td>
                              <Td className="pTeam">
                                {trimText(projects?.teamName, 8)}
                              </Td>
                              <Td className="pStatus">
                                {project.projectStatus}
                              </Td>
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
