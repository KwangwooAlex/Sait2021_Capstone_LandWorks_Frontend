import React, { useState } from 'react';
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useQuery } from "@apollo/client";


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

// const SEE_TEAM_QUERY = gql`
//   query seeTeam($teamName: String!) {
//     seeTeam(teamName: $teamName) {
//       id
//       teamName
//       project {
//         id
//         projectName
//         projectStatus
//         projectType
//         description
//         securityLevel
//   		}
//     }
//   }
// `;

// const CREATE_PROJECT_MUTATION = gql`
//   mutation createProject(
//     $teamId: Int!
//     $projectName: String!
//     $projectStatus: String!
//     $projectType: String!
//     $description: String!
//     $securityLevel: String!
//   ) {
//     createProject(
//       teamId: $teamId
//       projectName: $projectName
//       projectStatus: $projectStatus
//       projectType: $projectType
//       description: $description
//       securityLevel: $securityLevel
//     ) {
//       ok
//       error
//       id
//     }
//   }
// `;


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
const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchProject = styled.div`
  padding: 0px;
`;


const RightSection = styled.div`
  display: flex;
`;

const MainContents = styled.div`
`;

const InputSearch = styled.input`
  margin-top: 25px;
  border: 1px solid gray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
  width: 200px;
`;

/* const = styled.div``; */
const TableDiv = styled.div`
  overflow: auto;
  height: 480px;
  width: 100%;
  border: 1px solid lightgray; 
  margin-top: 30px;
`;

const TableContainer = styled.table`
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 600px;
  width: 100%;
  padding:0;
  border-collapse: collapse;
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
  font-weight: 600;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.num { width: 3%; }
  &.pName { width: 25%; }
  &.pDesc { width: 30%; }
  &.pTeam { width: 17%; }
  &.pStatus { width: 13%; }
  &.pSecurity { width: 12%; }
`;
const Td = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  width: 100%;
  text-align: left;
  &.num { width: 3%; }
  &.pName { width: 25%; }
  &.pDesc { width: 30%; }
  &.pTeam { width: 17%; }
  &.pStatus { width: 13%; }
  &.pSecurity { width: 12%; }
`;

const CheckInput = styled.input``;



function AllProjectMainContents() {

  const {teamName} = useParams();


  const { data } = useQuery(SEE_ALL_MY_TEAM_QUERY);
  console.log("팀네임", data?.seeAllMyTeam);
    
 

  return (
  <Container>
      <MainTitle>
        ALL MY PROJECT LIST
      </MainTitle> 
      <TeamHeader>
        <SearchProject>
          <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
        </SearchProject>
      </TeamHeader>


    <MainContents>
      <TableDiv>
      <TableContainer className="sortable">
        <Thead>
            <Tr>
              <Th className="num">No.</Th>
              <Th className="pName">Name</Th>
              <Th className="pDesc">Description</Th>
              <Th className="pTeam">Team</Th>
              <Th className="pStatus">Status</Th>
              <Th className="pSecurity">Security</Th>
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
                <Td className="pDesc">{allProject.description}</Td>
                <Td className="pTeam">{projects.teamName}</Td>
                <Td className="pStatus">{allProject.projectStatus}</Td>
                <Td className="pSecurity">{allProject.securityLevel}</Td>
              </Tr>
              </Link>
            ))}
            </>
            ))}
        </Tbody>
      </TableContainer>
      </TableDiv>
    </MainContents> 
  </Container>
  )
}

export default AllProjectMainContents;
