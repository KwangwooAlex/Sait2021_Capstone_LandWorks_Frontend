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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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
    $startDate: String
    $endDate: String
  ) {
    createProject(
      teamId: $teamId
      projectName: $projectName
      projectStatus: $projectStatus
      projectType: $projectType
      description: $description
      securityLevel: $securityLevel
      startDate: $startDate
      endDate: $endDate
    ) {
      ok
      error
      id
    }
  }
`;

const EDIT_PROJECT_MUTATION = gql`
  mutation editProject(
    $id: Int!
    $projectName: String
    $projectStatus: String
    $projectType: String
    $description: String
    $securityLevel: String
  ) {
    editProject(
      idd: $id
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

// const DELETE_PROJECT_MUTATION = gql`

// `;

const Container = styled.main`
  padding: 40px 40px 0 40px;
  height: 100%;
  /* background-color: black; */
  width: 90%;
`;


const TableDiv = styled.div`
  overflow: auto;
  height: 420px;
  width: 100%;
  border: 1px solid lightgray; 
`;

const TableContainer = styled.table`
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 500px;
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
  justify-content: center;
  align-items: center;
`;

const Th = styled.th`
  font-weight: 600;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.check { width: 3%; }
  &.num { width: 5%; }
  &.pName { width: 25%; }
  &.pDesc { width: 25%; }
  &.pStatus { width: 12%; }
  &.pSecurity { width: 13%; }
  &.pEdit { width: 7%; }
  &.pDelete { width: 10%; }
`;
const Td = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 5px 10px;
  width: 100%;
  text-align: left;
  &.check { width: 3%; }
  &.num { width: 5%; }
  &.pName { width: 25%; }
  &.pDesc { width: 25%; }
  &.pStatus { width: 12%; }
  &.pSecurity { width: 13%; }
  &.pEdit { width: 7%; }
  &.pDelete { width: 10%; }
`;

const EditPBtn = styled.button`
  border: none;
  outline: none;
  background-color: white;
  cursor:pointer;
`;
const DeletePBtn = styled.button`
  border: none;
  outline: none;
  background-color: white;
  cursor:pointer;
`;

const EditpName = styled.input`
  border: 1px solid gray;
  width: 100%;
`;
const EditpDesc = styled.input`
  border: 1px solid gray;
  width: 100%;
`;
const EditpStatus = styled.input`
  border: 1px solid gray;
  width: 100%;
`;
const EditpSecurity = styled.input`
  border: 1px solid gray;
  width: 100%;
`;



function EditProjects() {

  const {teamName, projectId} = useParams();
  console.log("projects");

  const { data: teamData, refetch } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
    }
  ); 
  console.log("teamData", teamData?.seeTeam?.project);

  const {handleSubmit, setValue, watch, register} = useForm({
    mode: "onChange",
  });



  const [editProject, loading] = useMutation(EDIT_PROJECT_MUTATION);

  // const [isEditMode, setIsEditMode] = useState(false);
  // // const [editValue, setEditValue] = useState(false);

  // const handleEditList = (e) => {

  //     setIsEditMode(false);
  // }

  useEffect(( ) => {
    setValue("projectName", teamData?.seeTeam?.project?.projectName);
    setValue("description", teamData?.seeTeam?.project?.description);
    setValue("projectStatus", teamData?.seeTeam?.project?.projectStatus);
    setValue("projectSecurity", teamData?.seeTeam?.project?.projectSecurity);
  },[teamData, setValue]);

  const handleEditChange = (e) => {
    if(e.target.name === "projectName"){
      setValue("projectName", e.target.value);
    }
    if(e.target.name === "description"){
      setValue("description", e.target.value);
    }
    if(e.target.name === "projectStatus"){
      setValue("projectStatus", e.target.value);
    }
    if(e.target.name === "projectSecurity"){
      setValue("projectSecurity", e.target.value);
    }
  };

  const onEditValid = (data) =>  {
    // handleEditList();    
    console.log("editData", data);
    if (loading) {
      return;
    }
    editProject({
      variables: { 
        ...data,
      },
    });
    refetch();
    // setIsEditMode(false);
  };

  const onEditInvalid = (data) => {};


  return (
  
    <Tbody>
      <form onSubmit={handleSubmit(onEditValid, onEditInvalid)}>
      {teamData?.seeTeam?.project?.map((projects, index) => (
        <Link to={`/myProject/${teamName}/${projects?.id}`}>
        <Tr key={projects.id}>
          <Td className="num">{index+1}</Td>
          <Td className="pName">
            <EditpName 
              ref={register}
              type="text" 
              name="projectName"
              placeholder={projects?.projectName}
              value={watch("projectName")}
              onClick={ (event) => event.preventDefault() }
              onChange={handleEditChange}
            />
          </Td>
          <Td className="pDesc">
            <EditpDesc 
              ref={register}
              type="text" 
              name="description"
              placeholder={projects?.description}
              value={watch("description")}
              onClick={ (event) => event.preventDefault() }
              onChange={handleEditChange}
            />
          </Td>
          <Td className="pStatus">
            <EditpStatus 
              ref={register}
              type="text" 
              name="projectStatus"
              placeholder={projects?.projectStatus}
              value={watch("projectStatus")}
              onClick={ (event) => event.preventDefault() }
              onChange={handleEditChange}
            />
          </Td>
          <Td className="pSecurity">
            <EditpSecurity 
              ref={register}
              type="text"
              name="securityLevel" 
              placeholder={projects?.securityLevel}
              value={watch("securityLevel")}
              onClick={ (event) => event.preventDefault() }
              onChange={handleEditChange}
            />
          </Td>
          <Td className="pEdit" onClick={ (event) => event.preventDefault() }>
              <SaveAltIcon type="submit"/>
          </Td>
          <Td className="pDelete" onClick={ (event) => event.preventDefault() }>
            <DeletePBtn><DeleteIcon /></DeletePBtn>
          </Td> 
        </Tr>
        </Link>
      ))}              
      </form>
    </Tbody>

  )
}

export default EditProjects;
