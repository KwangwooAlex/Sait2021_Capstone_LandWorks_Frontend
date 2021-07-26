import React, { useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Chart from "../asset/chart.PNG";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

const SEE_FILES = gql`
  query seeFiles($projectId: Int!) {
    seeFiles(projectId: $projectId) {
      id
      fileName
      fileUrl
      createdAt
      updatedAt
    }
  }
`;

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

const SEE_PROJECT_QUERY = gql`
  query seeProject($projectId: Int!) {
    seeProject(projectId: $projectId) {
      id
      projectName
      startDate
      endDate
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
  color: gray;
  font-weight: 600;
  font-size: 20px;
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
  border-bottom: 2px solid #ffb41e;
  margin-right: 10px;
  &:hover {
    color: #004070;
    background-color: #ffebc4;
    /*border-top: black 2px solid;*/
  }
  &.selected {
    background-color: #ffb41e;
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
  margin-top: 25px;
  width: 40%;
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
`;

const ThirdLine = styled.div`
  margin-top: 25px;
  width: 40%;
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
`;

const SmallBox = styled.div`
  margin-top: 25px;
  width: 100%;
  height: 30%;
`;

const FirstBox20 = styled.div`
  width: 90%;
  height: 45%;
  border-radius: 20px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 30px; */
`;

const CalDiv = styled.div`
  width: 100%;
  height: 60%;
  margin-top: 10%;
  /* margin-top: 25px; */
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

const SecondBox20 = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

const SecondBox30 = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
`;

const ThirdBox60 = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 40px;
  box-shadow: 0px 3px 8px gray;
  margin-right: 25px;
  margin-left: 10px;
`;

const TableDiv = styled.div`
  overflow: auto;
  height: 90%;
  width: 90%;
  /* border: 1px solid lightgray;  */
  margin: 15px auto;
`;

const ListTableContainer = styled.table`
  /* margin-top: 40px; */
  border: 1px solid white;
  box-shadow: 0px 3px 6px gray;
  height: 100%;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  /* overflow-y: scroll;  */
`;

const ListThead = styled.thead`
  background-color: #f3f3f3;
`;
// const file = [{id:"", projectName:""},{}]
const ListTbody = styled.thead``;
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
  &.lAvatar {
    width: 7%;
  }
  &.lName {
    width: 48%;
  }
  &.lRole {
    width: 45%;
  }
`;

const ListTd = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 5px 10px;
  width: 100%;
  text-align: left;
  &.lAvatar {
    width: 5%;
  }
  &.lName {
    width: 48%;
  }
  &.lRole {
    width: 45%;
  }
`;
const LETTER = styled.h3`
  margin-top: 25px;
  margin-left: 25px;
  font-weight: bolder;
  font-size: large;
  align-items: center;
  justify-content: center;
`;

const LETTERS = styled.h4`
  color: Black;
  font-weight: 600;
  font-size: 20px;
  margin-left: 15px;
`;

const ProjectPath = styled.div`
  color: Black;
  font-weight: 600;
  font-size: 20px;
  margin-left: 15px;
`;

const TeamPath = styled.div`
  display: flex;
  border-bottom: black 2px solid;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
`;

const ChartImg = styled.img`
  margin: 25px auto;
  width: 95%;
  height: 75%;
  /* border: none; */
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
`;

const DateBox = styled.div`
  height: 100%;
`;

function OverviewMainContents() {
  const [value, onChange] = useState(new Date());
  const { teamName, projectId } = useParams();

  const { data: seeFilesData, refetch } = useQuery(SEE_FILES, {
    variables: { projectId: +projectId },
  });

  console.log("seeFilesData", seeFilesData);

  const { data: userData } = useQuery(ME_QUERY);

  const { data: teamData } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
  });
  const { data: projectData } = useQuery(SEE_PROJECT_QUERY, {
    variables: { projectId: +projectId },
  });

  const { data } = useQuery(SEE_ALL_MY_TEAM_QUERY);

  // console.log("teamData", teamData);
  console.log("projectData", projectData?.seeProject);
  console.log("projectId", typeof projectId);
  // {`/myProject/${teamName}/${projects?.id}`}

  // const [isProject, setIsProject] = useState();

  // const handleProjectName = () => {
  //   if ()
  // }

  const { format } = require("date-fns");
  const sDate = new Date(projectData?.seeProject?.startDate);
  const eDate = new Date(projectData?.seeProject?.endDate);
  console.log("sDate", sDate);
  // console.log(`${format(date, 'dd.MM.yyyy')}`);
  // console.log(format(sDate, "yyyy-MM-dd")?.toString());
  // console.log(format(eDate, "yyyy-MM-dd")?.toString());

  return (
    <Container>
      <TeamPath>
        <TeamName>
          <Link to={`/myProject/${teamName}`}>{teamName}</Link>
        </TeamName>
        <LETTERS>&#10154;</LETTERS>
        {/* 수정해야함 */}
        <ProjectPath>
          <Link to={`/myProject/${teamName}/${projectId}`}>
            {projectData?.seeProject?.projectName}
          </Link>
        </ProjectPath>
      </TeamPath>
      <MainHeader>
        <MainTitle>OVERVIEW</MainTitle>
        <RightSection>
          <NavBar>
            <Link to={`/myProject/${teamName}/${projectId}/overview`}>
              <Letter className="selected">Overview</Letter>
            </Link>
            <Link to={`/myProject/${teamName}/${projectId}/files`}>
              <Letter>Files</Letter>
            </Link>
          </NavBar>
          {/* <InputSearch
            type="text"
            placeholder="Search Project..."
          ></InputSearch> */}
        </RightSection>
      </MainHeader>

      <LineContainer>
        <FirstLine>
          <SmallBox>
            {/* <FirstBox20>Start Date: { projectData?.seeProject?.startDate } </FirstBox20> */}
            {/* <FirstBox20>Start Date: { `${format(sDate, 'yyyy-MM-dd')?.toString()}` } </FirstBox20> */}
            {projectData !== undefined && (
              <DateBox>
                <FirstBox20>
                  Start Date: {`${format(sDate, "yyyy-MM-dd")?.toString()}`}
                </FirstBox20>
                <FirstBox20>
                  End Date: {`${format(eDate, "yyyy-MM-dd")?.toString()}`}
                </FirstBox20>
              </DateBox>
            )}
          </SmallBox>
          <CalDiv>
            <SecondBox20>
              <TeamCalender onChange={onChange} value={value} />
              {/* <ChartImg src={Chart} /> */}
            </SecondBox20>
          </CalDiv>
        </FirstLine>

        <SecondLine>
          <SecondBox30>
            <Link to={`/members/${teamName}`}>
              <LETTER> MEMBER LIST </LETTER>
            </Link>
            <TableDiv>
              <ListTableContainer className="sortable">
                <ListThead>
                  <ListTr>
                    <ListTh className="lAvatar"></ListTh>
                    <ListTh className="lName">Name</ListTh>
                    <ListTh className="lRole">Role</ListTh>
                  </ListTr>
                </ListThead>
                <ListTbody>
                  {teamData?.seeTeam?.teamMember?.map((member) => (
                    <ListTr key={member.id}>
                      <ListTd className="lAvatar">
                        <Avatar src={member.avatar} />
                      </ListTd>
                      <ListTd className="lName">{member.username}</ListTd>
                      <ListTd className="lRole">Project Manager</ListTd>
                    </ListTr>
                  ))}
                </ListTbody>
              </ListTableContainer>
            </TableDiv>
          </SecondBox30>
        </SecondLine>

        <ThirdLine>
          <ThirdBox60>
            <LETTER> FILE LIST </LETTER>
            <TableDiv>
              <ListTableContainer className="sortable">
                <ListThead>
                  <ListTr>
                    <ListTh className="lAvatar">Type</ListTh>
                    <ListTh className="lName">File Name</ListTh>
                    <ListTh className="lRole">Uploaded Date</ListTh>
                  </ListTr>
                </ListThead>
                <ListTbody>
                  {seeFilesData?.seeFiles?.map((file) => (
                    <ListTr key={file.id}>
                      <ListTd className="lAvatar">
                        {
                          file.fileUrl.split(".")[
                            file.fileUrl.split(".").length - 1
                          ]
                        }
                      </ListTd>
                      <ListTd className="lName">{file.fileName}</ListTd>
                      <ListTd className="lRole">{file.createdAt}</ListTd>
                    </ListTr>
                  ))}
                </ListTbody>
              </ListTableContainer>
            </TableDiv>
          </ThirdBox60>
        </ThirdLine>
      </LineContainer>
    </Container>
  );
}

export default OverviewMainContents;
