import React, { useState } from 'react';
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import FormError from "../components/auth/FormError";
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import { useTable } from "react-table";

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

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $teamId: Int!
    $projectName: String!
    $projectStatus: String!
    $projectType: String!
    $description: String!
    $securityLevel: String!
  ) {
    createProject(
      teamId: $teamId
      projectName: $projectName
      projectStatus: $projectStatus
      projectType: $projectType
      description: $description
      securityLevel: $securityLevel
    ) {
      ok
      error
      id
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

const MainContents = styled.div`
`;

const NewProjectBtn = styled.button`
  margin-top: 25px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 150px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;  
`;

const DeleteBtn = styled.button`
  margin-top: 25px;
  border-radius: 20px;
  background: white;
  border: 1px solid;
  color: #004070;
  width: 150px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
`;

const InputSearch = styled.input`
  border: 1px solid gray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
  width: 200px;
`;

const customStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "500px",
  },
};

const AllBtn =  styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightBtn = styled.div`
`;

const LeftBtn = styled.div`

`;

const ModalInfo = styled.div`
`;

const ModalHeader = styled.h4`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white; 
  font-size: 13px;
`;

const ModalBody = styled.div`
  margin: 30px 30px;
`; 

const ProjectLabel = styled.label`
  display: flex;
  /* flex-direction: column; */
  margin-bottom: 15px;
  width: 100%;
`;

const InputText =styled.input`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-left: 15px;
  padding: 5px;
  width: 500px;  
`;

const SelectStatus = styled(Select)`
  width: 150px;
  margin-left: 15px;
`;

const ProcessDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StartD = styled.div`
  display: flex;
`;

const EndD = styled.div`
  display: flex;
`;

const DatePickerForm = styled(DatePicker)`
  height: 20px;
  width: 150px;
  font-size: 15px;
  text-align: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 15px;
  padding: 5px;
`;

const DesLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Description = styled.textarea`
  padding: 10px;
`;

const ModalBtn = styled.div`
  margin: 20px auto;
`;

const NextBtn = styled.button`
  margin-left:18px;
  background: #004070;
  border: none;
  color: white;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const CancelBtn = styled.button`
  background: white;
  border: 2x solid;
  border-color:#B8B8B8;
  color: #004070;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const InputResult = styled.div``;

/* const = styled.div``; */

const TableContainer = styled.table`
  margin-top: 40px;
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 600px;
  width: 100%;
  padding:0;
  border-collapse: collapse;
`;
const Thead = styled.thead`
  background-color: lightgray;
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
  &.check { width: 10px; }
  &.num { width: 40px; }
  &.pEdit { width: 50px; }
`;
const Td = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  width: 100%;
  &.check { width: 10px; }
  &.num { width: 40px; }
  &.pName {margin-left: 20px;}
  &.pEdit { width: 50px; }
`;
const CheckInput = styled.input``;

function AllProjectMainContents() {

  const {teamName} = useParams();


  const { data } = useQuery(SEE_ALL_MY_TEAM_QUERY);
  console.log("팀네임", data?.seeAllMyTeam);
    
 

  return (
  <Container>
    <MainHeader>
      <MainTitle>
        ALL MY PROJECT List
      </MainTitle> 
      <RightSection>

        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <MainContents>

      <TableContainer className="sortable">
        <Thead>
            <Tr>
              {/* <Th>No.</Th>
              <Th>Type</Th>
              <Th className="check"><CheckInput type="checkbox"></CheckInput></Th>
              <Th className="num">No.</Th> */}
              <Th className="pName">Name</Th>
              {/* <Th>Type</Th> */}
              <Th className="pDesc">Description</Th>
              <Th className="pTeam">Team</Th>
              <Th className="pStatus">Status</Th>
              <Th className="pSecurity">Security</Th>
              {/* <Th className="pEdit">Edit</Th>
              <Th className="pEdit">Delete</Th> */}

            </Tr>
        </Thead>
        <Tbody>
            {data?.seeAllMyTeam?.map((projects) => (
                <>
                {projects.project.map((allProject) => (
              <Link to={`/myProject/${projects?.teamName}/${allProject?.id}`}>
              <Tr key={projects.project.id}>
                {/* <Td className="check" onClick={ (event) => event.preventDefault() }>O</Td>
                <Td className="num">{index+1}</Td> */}
                <Td className="pName">{allProject.projectName}</Td>
                <Td className="pDesc">{allProject.description}</Td>
                <Td className="pDesc">{projects.teamName}</Td>
                <Td className="pStatus">{allProject.projectStatus}</Td>
                <Td className="pSecurity">{allProject.securityLevel}</Td>
                {/* <Td className="pEdit"><EditIcon /></Td>
                <Td className="pEdit"><DeleteIcon /></Td> */}
              </Tr>
              </Link>
            ))}
            </>
            ))}
        </Tbody>
      </TableContainer>
    </MainContents> 
  </Container>
  )
}

export default AllProjectMainContents;
