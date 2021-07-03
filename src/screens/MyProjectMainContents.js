import React, { useState } from 'react';
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
// import Input from "../components/auth/Input";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useUser from "../components/hooks/useUser";
import FormError from "../components/auth/FormError";

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
    seeProject(projectId: $projectId) {
      id
      projectName
      projectStatus
      projectType
      description
      securityLevel
      createdAt
      updatedAt
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
  border: 1px solid lightgray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
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
  width: 100%
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

const ListBox = styled.div`
  margin-top: 40px;
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 600px;
  width: 100%;
  padding:0;
`;

const ListTop= styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: lightgray;
`;

const ListHeader = styled.h3`
  margin: 5px 15px;
`;

const ProjectBody = styled.div`

`;

const ListSection = styled.div`
  display: flex;
  margin: 5px 20px;

`;

const ListEachProject = styled.li`
  display: flex;
  cursor: pointer;
`;


/* const = styled.div``; */


function MyProjectMainContents() {

  const [submitData, setSubmitData] = useState({});
  const {teamName} = useParams();
console.log("projects");
console.log("submitData",submitData);
  const { data: teamData, refetch } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
    }
  ); 
  console.log("teamData", teamData?.seeTeam?.project);

  const { data } = useQuery(SEE_PROJECT_QUERY); 
  // console.log("projectData", data);

  const {handleSubmit, setValue, watch, register, errors} = useForm({
    mode: "onChange",
  });


  const handleChange = (e) => {
    if(e.target.name === "projectName"){
      setValue("projectName", e.target.value);
    };
  }; 

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT_MUTATION);
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateBtnModal = () => {
    alert("Your Project has been created.");
    setIsSummaryOpen(false);
    setIsModalOpen(false);
  }

  const handleBackBtnModal = () => {
    setIsSummaryOpen(false);
    setIsModalOpen(true);
  }

  const handleNextBtnModal = () => {
    // setIsModalOpen(false);
    setIsSummaryOpen(true);
  };
  
  const handleCancelBtnModal = () => {
    setIsModalOpen(false);
  };


  const onSaveValid = (data) =>  {     
    handleNextBtnModal();
    console.log("saveProject", data);
    console.log("status", status);
    console.log("security", security);
    setSubmitData(data);
    if (loading) {
      return;
    }
  }; 

  const createButton=()=>{
    if (loading) {
      return;
    }
    createProject({
      variables: { 
        ...submitData,
        projectStatus:status,
        securityLevel:security,
        teamId:teamData.seeTeam.id,       
      },
    });
    refetch();
    handleCreateBtnModal();
    setSubmitData(null);
  }

  const onSaveInvalid = (data) => {};
    
  
  const optionStatus = [
    { value: 'Active', label: 'Active' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Complete', label: 'Complete' },
  ];

  const optionSecurity = [
    { value: 'Open', label: 'Open' },
    { value: 'Protected', label: 'Protected' },
    { value: 'Confidential', label: 'Confidential' },
  ];

  const [status, setStatus] = useState(null);
  const [security, setSecurity] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStatus = (e)=>{
   setStatus(e.value);
  }

  const handleSecurity = (e)=>{
    setSecurity(e.value);
  }

  return (
  <Container>
    <TeamName>
      {teamData?.seeTeam?.teamName}
    </TeamName>
    <MainHeader>
      <MainTitle>
        MY PROJECT
      </MainTitle> 
      <RightSection>

        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <MainContents>
    <AllBtn> 
      <LeftBtn> 
        <NewProjectBtn onClick={handleOpenModal}>New Project</NewProjectBtn>     
        <Modal isOpen={isModalOpen} style={customStyles}>
          <ModalHeader>NEW PROJECT</ModalHeader>
           <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
            <ModalBody>
            <FormError message={errors?.projectName?.message} />
            <FormError message={errors?.projectType?.message} />
            <FormError message={errors?.description?.message} />
              <ModalInfo>
 
                  <ProjectLabel>Project name: 
                    <InputText
                    ref={register({
                    required: "Project Name is required",
                    })}
                      type="text"
                      name="projectName"
                      value={watch("projectName")}
                      placeholder="Enter the project name..."
                      onChange={handleChange}
                      hasError={Boolean(errors?.projectName?.message)}
                    />
                  </ProjectLabel>

                  <ProjectLabel>Project Status: 
                    <SelectStatus 
                      options = {optionStatus}
                      name="projectStatus"
                      ref={register}
                      value={watch("projectStatus")}   
                      onChange={handleStatus}                   
                    />
                  </ProjectLabel>


                  <ProjectLabel>Project Type: 
                    <InputText
                    ref={register({
                    required: "Project Type is required",
                    })}
                      type="text"
                      name="projectType"
                      value={watch("projectType")}
                      placeholder="Enter the Project type..."
                      onChange={handleChange}
                      hasError={Boolean(errors?.projectType?.message)}
                    />
                  </ProjectLabel>

                  <ProcessDate>
                    <StartD>
                      <ProjectLabel>Start Date: 
                        <DatePickerForm
                          ref={register}
                          selected={startDate}
                          name="startDate"
                          dateFormat="yy-MM-dd"
                          onChange={(date) => setStartDate(date)}
                          value={watch("startDate")}
                        />
                      </ProjectLabel>
                    </StartD>
                    <EndD>
                      <ProjectLabel>End Date: 
                        <DatePickerForm
                          ref={register}
                          selected={endDate}
                          name="endDate"
                          dateFormat="yy-MM-dd"
                          onChange={(date) => setEndDate(date)}
                          value={watch("endDate")}
                        />
                      </ProjectLabel>
                    </EndD>
                  </ProcessDate>
                  <DesLabel>Description</DesLabel>
                  <Description
                    type="text"
                    cols='70'
                    rows='5'
                    ref={register}
                    // onChange={handleChange}
                    value={watch("description")}
                    name="description"
                    placeholder="Let people know what this team is all about..."
                    hasError={Boolean(errors?.description?.message)}
                  />

                  <ProjectLabel>Security Level: </ProjectLabel>
                    <SelectStatus 
                      options = {optionSecurity}
                      name="securityLevel"
                      ref={register}
                      value={watch("securityLevel")}   
                      onChange={handleSecurity}                   
                    />
                  
              </ModalInfo>
              <ModalBtn>         
                <NextBtn type="submit">Next</NextBtn>            
                <CancelBtn onClick={handleCancelBtnModal}>Cancel</CancelBtn>
              </ModalBtn> 
            </ModalBody>
            </form>
        </Modal>    

        <Modal isOpen={isSummaryOpen} style={customStyles}>
          <ModalHeader>NEW PROJECT</ModalHeader>
          
          <ModalBody> 
              <ModalInfo>
              <ProjectLabel>Project name: 
                    <InputResult>{submitData?.projectName}</InputResult>
                  </ProjectLabel>

                  <ProjectLabel>Project Status: 
                  <InputResult>{status}</InputResult>
                  </ProjectLabel>

                  <ProjectLabel>Project Type: 
                  <InputResult>{submitData?.projectType}</InputResult>
                  </ProjectLabel>

                  <ProcessDate>
                    <StartD>
                      <ProjectLabel>Start Date: 
                      <InputResult>{submitData?.projectName}</InputResult>
                      </ProjectLabel>
                    </StartD>
                    <EndD>
                      <ProjectLabel>End Date: 
                      <InputResult>{submitData?.projectName}</InputResult>
                      </ProjectLabel>
                    </EndD>
                  </ProcessDate>

                  <DesLabel>Description: </DesLabel>
                  <InputResult>{submitData?.description}</InputResult>

                  <ProjectLabel>Security Level: 
                  <InputResult>{security}</InputResult>
                  </ProjectLabel>

              </ModalInfo>
            <ModalBtn>         
              <NextBtn onClick={()=>createButton()}>Create</NextBtn>         
              <CancelBtn onClick={handleBackBtnModal}>Back</CancelBtn>
            </ModalBtn>
          </ModalBody>
          
        </Modal>            

      </LeftBtn>
      <RightBtn>
          <DeleteBtn>Delete Project</DeleteBtn>
      </RightBtn>
    </AllBtn>

    <ListBox>
      <ListTop>
        <ListHeader>O</ListHeader>
        <ListHeader>No.</ListHeader>
        <ListHeader>Type</ListHeader>
        <ListHeader>Name</ListHeader>
        <ListHeader>Status</ListHeader>
        <ListHeader>Description</ListHeader>
        <ListHeader>Security</ListHeader>
        <ListHeader>End Date</ListHeader>
        <ListHeader>Edit icon</ListHeader>
      </ListTop>

      <ProjectBody>
        {teamData?.seeTeam?.project?.map((projects) => (
            <Link to={`/myProject/${teamName}/${projects?.id}`}>
          <ListEachProject key={projects.id}>
              <ListSection>{projects.projectName}</ListSection>
              <ListSection>{projects.projectType}</ListSection>
              <ListSection>{projects.description}</ListSection>
              <ListSection>{projects.projectStatus}</ListSection>
              <ListSection>{projects.securityLevel}</ListSection>
          </ListEachProject>
            </Link>
        ))}
      </ProjectBody>
    </ListBox>
    </MainContents> 
  </Container>
  )
}

export default MyProjectMainContents;
