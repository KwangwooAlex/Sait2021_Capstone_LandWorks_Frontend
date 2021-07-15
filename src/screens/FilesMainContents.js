import React from 'react'
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/auth/Input";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

const SEE_PROJECT_QUERY = gql`
  query seeProject($projectId: Int!) {
    seeProject (projectId: $projectId) {
      id
      projectName
    }
  }
`;


const Container = styled.main`
  padding: 40px 40px 0 40px;
  height: 100%;
  width: 90%;
`;


const TeamName = styled.div`
  color: Black;
  font-weight: 600;
  font-size: 20px;
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

const SixBtn = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`;

const FourBtn = styled.div`
display: flex;

`;

const TwoBtn = styled.div`
display: flex;
`;

const UploadBtn = styled.button`
  margin-top: 25px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 120px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
`;

const DownloadBtn = styled.button`
  margin-left: 10px;
  margin-top: 25px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 120px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
`;

const CopyBtn = styled.button`
  margin-left: 10px;
  margin-top: 25px;
  border-radius: 20px;
  background: #004070;
  border: 1px solid;
  color: white;
  width: 120px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
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
    width: "500px",
    height: "420px",
  },
};
const customStylesNewFolder = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "250px",
  },
};


const UploadModalContainer = styled.div``;

const NewFolderModalContainer = styled.div``;

const ModalHeader = styled.h4`
  margin: 0;
  padding: 10px;
  background: #004070;
  color: white;
  font-size: 13px;
`;

const ModalBody = styled.div`
  margin: 20px 30px;
`;

const ModalInfo = styled.div``;

const UploadHeader = styled.h3`
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const NewFolderHeader = styled.h4`
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const UploadDes = styled.p`
  margin-top: 25px;
  margin-bottom: -15px;
  font-size: 12px;
`;

const UploadInput = styled(Input)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: lightgray;
`;

const FolderInputLabel = styled.p`
  margin-top: 25px;
  margin-bottom: -15px;
  font-size: 12px;
`;

const NewFolderInput = styled(Input)`

`;

const UploadBox = styled.div`
  border: 2px dashed lightgray;
  width: 100%;
  height: 150px;
  margin: 20px auto;
  padding: 10px;
`;

const ModalBtn = styled.div`
  margin: 20px auto;
`;

const ModalUploadBtn = styled.button`
  margin-left: 18px;
  background: #004070;
  border: none;
  color: white;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;`;

const ModalCancelBtn = styled.button`
  background: white;
  border: 2x solid;
  border-color: #b8b8b8;
  color: #004070;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  `;
const TableDiv = styled.div`
overflow: auto;
height: 425px;
width: 100%;
border: 1px solid lightgray; 
`;

const TableContainer = styled.table`
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 600px;
  width: 100%;
  padding:0;
  border-collapse: collapse;
    /* overflow-y: scroll;  */
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
    width: 100%;
  `;
  const Th = styled.th`
    padding: 10px;
    margin: 0 10px;
    width: 100%;
    text-align: left;
    font-weight: 600;
    &.check { width: 3%; }
    &.num { width: 5%; }
    &.fName {width: 35%; }
    &.fUpdateBy {width: 18%; }
    &.fLast {width: 20%; }
    &.fEdit { width: 7%; }
    &.fDelete { width: 10%; }
  `;
  const Td = styled.td`
    cursor: pointer;
    padding: 10px;
    margin: 10px;
    width: 100%;
    text-align: left;
    &.check { width: 3%; }
    &.num { width: 5%; }
    &.fName {width: 35%; }
    &.fUpdateBy {width: 18%; }
    &.fLast {width: 20%; }
    &.fEdit { width: 7%; }
    &.fDelete { width: 10%; }
  `;

const CheckInput = styled.input``;

const MeditBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;

const DeleteMBtn = styled.button`
 
  background-color: white;
  border: none;
  cursor: pointer;
`;

const customStyle = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "200px",
  },
};

const RightBtn = styled.div`
`;

const OkBtn = styled.button`
  background: #004070;
  border: 2x solid;
  color: white;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const CancelBtn2 = styled.button`
  background: white;
  border: 2x solid;
  border-color:#B8B8B8;
  color: #004070;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const ModalBtn2 = styled.div`
  margin: 20px auto; 
  /* justify-content: space-between; */
  text-align: center;
`;

const ModalBody2 = styled.div`
  margin: 30px 30px;
`; 

const DeleteNotice = styled.p`
  line-height: 150%;
  text-align: center;
`;

const B = styled.b`
  font-weight: 600;
`;


function FilesMainContents() {
  const {teamName, projectId} = useParams();
  const { data: teamData} = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName },
    }
  ); 

  console.log("teamData", teamData?.seeTeam?.project);
  // console.log("PName", teamData?.seeTeam?.project?.projectName);

  // const { projectId } = useParams();
  const { data: projectData} = useQuery(SEE_PROJECT_QUERY);  

  console.log("projectData", projectData );

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDModalOpen, setIsDModalOpen] = useState(false);

  const handleDeleteModal = () => {
    setIsDModalOpen(true);
   };

   const handleDCancelBtnModal = () => {
    setIsDModalOpen(false);
  };

  const handleOkBtnModal = () => {
    alert("Your files have been deleted.");
    setIsDModalOpen(false);
  };
  

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadOpen = () => {
    setIsUploadOpen(true);
  };


  const handleCancelBtnModal = () => {
    setIsUploadOpen(false);
  };

  const [isProject, setIsProject] = useState('');
  
  const handlePName = () => {
  if (teamData?.seeTeam?.filter(
    (projects) => projects.projectId === projectId
  ))
   return <Letter>{teamData?.seeTeam?.project?.projectName}</Letter>
  };



  return (
    <Container>
    <TeamName>  
      <Link to={`/myProject/${teamName}`}> 
        {teamName} > 
      </Link>

    </TeamName>
    <MainHeader>
      <MainTitle>
        FILES
      </MainTitle> 
      <RightSection>
        <NavBar>
          <Link to={`/myProject/${teamName}/${projectId}/overview`}> 
            <Letter>Overview</Letter>
          </Link>
          <Link to={`/myProject/${teamName}/${projectId}/files`}>
            <Letter className="selected">Files</Letter>
          </Link>
        </NavBar>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <SixBtn>
      <FourBtn>  
        <UploadBtn onClick={handleUploadOpen}>Upload</UploadBtn>
          <Modal isOpen={isUploadOpen} style={customStyles}>
            <UploadModalContainer>
              <ModalHeader>Upload Files</ModalHeader>
              <ModalBody>
                <ModalInfo>
                <UploadHeader>Upload files</UploadHeader>
                <UploadDes>You can upload files up to a maximum of 2 GB.</UploadDes>
                <UploadInput 
                  type="file"
                  name="uploadFile"
                ></UploadInput>
                <UploadBox>File 1</UploadBox>
                </ModalInfo>
                <ModalBtn>               
                  <ModalUploadBtn type="submit">Upload</ModalUploadBtn>  
                  <ModalCancelBtn onClick={handleCancelBtnModal}>Cancel</ModalCancelBtn>                
                </ModalBtn>
              </ModalBody>
            </UploadModalContainer>
          </Modal>

        <DownloadBtn>Download</DownloadBtn>
        <CopyBtn>Copy</CopyBtn>
      </FourBtn>

      <RightBtn>
          <Modal isOpen={isDModalOpen} style={customStyle}>
            <ModalHeader>DELETE FILES</ModalHeader>
              <ModalBody2>
                <DeleteNotice>Are you sure you want to delete<br /> 
                  the file <B>"project2"</B>?</DeleteNotice>
                <ModalBtn2>
                  <CancelBtn2 onClick={handleDCancelBtnModal}>Cancel</CancelBtn2>
                  <OkBtn onClick={handleOkBtnModal}>Ok</OkBtn>
                </ModalBtn2>
              </ModalBody2>
          </Modal>
      </RightBtn>
    </SixBtn>
    <TableDiv>
    <TableContainer className="sortable">
        <Thead>
          <Tr>
            <Th className="num">No.</Th>
            <Th className="fName">Name</Th>
            <Th className="fUpdateBy">Update by</Th>
            <Th className="fLast">Last Update</Th>
            <Th className="fEdit">Edit</Th>
            <Th className="fDelete">Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teamData?.seeTeam?.project?.map((projects, index) => (
            <Link to={`/myProject/${teamName}/${projects?.id}`}>
            <Tr key={projects.id, index}>
              <Td className="num">{index+1}</Td>
              <Td className="fName">{projects.projectName}</Td>
              <Td className="fUpdateBy">Update by</Td>
              <Td className="fLast">Last Update</Td>
              <Td className="fEdit"><MeditBtn><EditIcon /></MeditBtn></Td>
              <Td className="fDelete"><DeleteMBtn ><DeleteIcon /></DeleteMBtn></Td>
            </Tr>
            </Link>
          ))}
        </Tbody>
      </TableContainer>
      </TableDiv>
    </Container>
  )
}

export default FilesMainContents;
