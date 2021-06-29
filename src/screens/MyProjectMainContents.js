import React, { useState } from 'react';
import styled from "styled-components";
import Modal from "react-modal";
import { Link } from "react-router-dom";
// import Input from "../components/auth/Input";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

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
  color: #004070;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 13px;
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
`;

const Letter = styled.div`
  padding: 10px;

  width: 90px;
  cursor: pointer;
  &:hover {
    color: #FFB41E;
    background-color: #004070;
    border-top: black 2px solid;
  }
`;

const MainContents = styled.div`
`;

const NewProjectBtn = styled.button``;
const CopyBtn = styled.button``;
const DeleteBtn = styled.button``;

const InputSearch = styled.input`
  border: 1px solid black;
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

// const ModalContainer = styled.div`

// `;

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


const ListBox = styled.div`
  margin-top: 40px;
  border: 1px solid white;    
  box-shadow: 0px 3px 6px gray;
  height: 600px;
`;

const ListHeader = styled.th`
`;


function MyProjectMainContents() {

  const { data, refetch } = useQuery(SEE_PROJECT_QUERY);

  // console.log("data", data);

  const {handleSubmit, setValue, watch, register} = useForm({
    mode: "onChange",
  });

  useEffect(( ) => {
    setValue("projectName", data?.seeProject?.projectName);
  },[data, setValue]);

  const handleChange = (e) => {
    if(e.target.name === "projectName"){
      setValue("projectName", e.target.value);
    };
  };

  const [createProject, { loading }] = useMutation(CREATE_PROJECT_MUTATION);
  
  const onSaveValid = (data) =>  {    
    console.log("saveProject", data);
    if (loading) {
      return;
    }
    createProject({
      variables: { 
        ...data,
      },
    });
    refetch();
  };

  const onSaveInvalid = (data) => {};
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const handleOpenModal = () => {
  setIsModalOpen(true);
  };

  // const handleCreateTeam = () => {
  //     handleOpenModal();
  // };
  const handleCreateModal = () => {
    setIsSummaryOpen(false);
    setIsModalOpen(false);
  }

  const handleBackModal = () => {
    setIsSummaryOpen(false);
    setIsModalOpen(true);
  }

  const handleNextModal = () => {
      // setIsModalOpen(false);
      setIsSummaryOpen(true);
    };
  
    const handleCancelModal = () => {
      setIsModalOpen(false);
    };
    const optionStatus = [
      { value: 'Active', label: 'Active' },
      { value: 'On Hold', label: 'On Hold' },
      { value: 'Complete', label: 'Complete' },
    ];
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  return (
  <Container>
    <TeamName>
      {/* 선택한 팀 네임이 불러져와야함 */}
      Teamname
    </TeamName>
    <MainHeader>
      <MainTitle>
        MY PROJECT
      </MainTitle> 
      <RightSection>
        <NavBar>
          <Link to="/myProject">
              <Letter>My Project</Letter>
          </Link>  
          <Link to="/files">
              <Letter>Files</Letter>
          </Link>
          {/* <Link to="/members">
              <Letter>Members</Letter>
          </Link>     */}
        </NavBar>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
      </RightSection>
    </MainHeader>

    <MainContents>
    <AllBtn> 
      <LeftBtn> 
        <NewProjectBtn onClick={handleOpenModal}>New Project</NewProjectBtn>     
        <Modal isOpen={isModalOpen} style={customStyles}>
          <ModalHeader>NEW PROJECT</ModalHeader>
            <ModalBody>
              <ModalInfo>
                  <ProjectLabel>Project name: 
                    <InputText
                    // ref={register}
                    type="text"
                    name="teamName"
                    // value={watch("projectName")}
                    placeholder="Enter the team name..."
                    // onChange={handleChange}
                    />
                  </ProjectLabel>

                  <ProjectLabel>Project Status: 
                    <SelectStatus options = {optionStatus}/>
                  </ProjectLabel>

                  <ProjectLabel>Project Type: 
                    <InputText
                    // ref={register}
                    type="text"
                    name="teamName"
                    // value={watch("teamName")}
                    placeholder="Enter the project type..."
                    // onChange={handleChange}
                    />
                  </ProjectLabel>

                  <ProcessDate>
                    <StartD>
                      <ProjectLabel>Start Date: 
                        <DatePickerForm
                            selected={startDate}
                            dateFormat="yy-MM-dd"
                            onChange={(date) => setStartDate(date)}
                        />
                      </ProjectLabel>
                    </StartD>
                    <EndD>
                      <ProjectLabel>End Date: 
                        <DatePickerForm
                            selected={endDate}
                            dateFormat="yy-MM-dd"
                            onChange={(date) => setEndDate(date)}
                        />
                      </ProjectLabel>
                    </EndD>
                  </ProcessDate>

                  <DesLabel>Description</DesLabel>
                  <Description
                    type="text"
                    cols='72'
                    rows='5'
                    name="teamDescription"
                    placeholder="Let people know what this team is all about..."
                  />
              </ModalInfo>
              <ModalBtn>         
                <NextBtn onClick={handleNextModal}>Next</NextBtn>            
                <CancelBtn onClick={handleCancelModal}>Cancel</CancelBtn>
              </ModalBtn> 
            </ModalBody>
        </Modal>    

        <Modal isOpen={isSummaryOpen} style={customStyles}>
          <ModalHeader>NEW PROJECT</ModalHeader>
          <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
          <ModalBody> 
              <ModalInfo>
               <ProjectLabel>Project name:  
                    <InputText
                    ref={register}
                    type="text"
                    name="projectName"
                    value={watch("projectName")}
                    placeholder="Enter the project name..."
                    onChange={handleChange}
                    />
                  </ProjectLabel>

                  <ProjectLabel>Project Status: 
                    <SelectStatus options = {optionStatus}/>
                  </ProjectLabel>

                  <ProjectLabel>Project Type: 
                    <InputText
                    // ref={register}
                    type="text"
                    name="projectName"
                    // value={watch("teamName")}
                    placeholder="Enter the project type..."
                    // onChange={handleChange}
                    />
                  </ProjectLabel>

                  <ProcessDate>
                    <StartD>
                      <ProjectLabel>Start Date: 
                        <DatePickerForm
                            selected={startDate}
                            dateFormat="yy-MM-dd"
                            onChange={(date) => setStartDate(date)}
                        />
                      </ProjectLabel>
                    </StartD>
                    <EndD>
                      <ProjectLabel>End Date: 
                        <DatePickerForm
                            selected={endDate}
                            dateFormat="yy-MM-dd"
                            onChange={(date) => setEndDate(date)}
                        />
                      </ProjectLabel>
                    </EndD>
                  </ProcessDate>

                  <DesLabel>Description</DesLabel>
                   <Description
                    type="text"
                    cols='72'
                    rows='5'
                    name="teamDescription"
                    placeholder="Let people know what this team is all about..."
                  /> 
              </ModalInfo>
            <ModalBtn>         
              <NextBtn onClick={handleCreateModal}>Create</NextBtn> 
              <NextBtn type="submit">Test</NextBtn>            
              <CancelBtn onClick={handleBackModal}>Back</CancelBtn>
            </ModalBtn>
          </ModalBody>
          </form>
        </Modal>            

      </LeftBtn>
      <RightBtn>
          <DeleteBtn>Delete Project</DeleteBtn>
      </RightBtn>
    </AllBtn>

    <ListBox>
        <ListHeader></ListHeader>
    </ListBox>
    </MainContents> 
  </Container>
  )
}

export default MyProjectMainContents;
