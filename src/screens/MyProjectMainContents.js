import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import FormError from "../components/auth/FormError";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import EditProjects from "../components/EditProjects";

const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: Int!) {
    deleteProject(projectId: $projectId) {
      ok
      error
    }
  }
`;

const EDIT_PROJECT = gql`
  mutation editProject(
    $id: Int!
    $projectName: String
    $projectStatus: String
    $projectType: String
    $description: String
    $securityLevel: String
  ) {
    editProject(
      id: $id
      projectName: $projectName
      projectStatus: $projectStatus
      projectType: $projectType
      description: $description
      securityLevel: $securityLevel
    ) {
      ok
      error
    }
  }
`;

const SEE_TEAM_QUERY = gql`
  query seeTeam($teamName: String!) {
    seeTeam(teamName: $teamName) {
      id
      teamName
      description
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

const Container = styled.main`
  padding: 40px 40px 0 40px;
  height: 100%;
  /* background-color: black; */
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

const MainContents = styled.div``;

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
    height: "530px",
  },
};

const summaryCustomStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "440px",
  },
};

const editCustomStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "520px",
  },
};

const AllBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const LeftBtn = styled.div``;

const ModalInfo = styled.div``;

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

const ErrorSection = styled.div`
  flex-direction: column;
`;

const InputText = styled.input`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-left: 20px;
  padding: 5px;
  width: 75%;
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
  /* margin-left: 5px; */
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
  width: 100%;
  height: 100px;
`;

const ModalBtn = styled.div`
  margin: 20px auto;
`;

const NextBtn = styled.button`
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
  font-weight: bold;
`;

const CancelBtn = styled.button`
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

const SummaryLabel = styled.label`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  &.dateLabel {
    width: 200px;
  }
`;

const InputResult = styled.div`
  margin-left: 10px;
  font-weight: 600;
  width: 20%;
  &.desResult {
    margin-left: 0px;
    overflow: auto;
    height: 100px;
    border: 1px dashed;
    width: 100%;
    padding: 5px;
    margin-top: -10px;
  }
  &.dateResult {
    width: 50%;
  }
`;

const TableDiv = styled.div`
  overflow: auto;
  height: 430px;
  width: 100%;
  border: 1px solid lightgray;
`;

const TableContainer = styled.table`
  border: 1px solid white;
  height: 100%;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
`;
const Thead = styled.thead`
  background-color: #f3f3f3;
`;
const Tbody = styled.thead``;
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
  &.num {
    width: 5%;
    cursor: pointer;
  }
  &.pName {
    width: 25%;
    cursor: pointer;
  }
  &.pDesc {
    width: 25%;
  }
  &.pStatus {
    width: 12%;
  }
  &.pSecurity {
    width: 16%;
  }
  &.pEdit {
    width: 7%;
  }
  &.pDelete {
    width: 10%;
  }
`;

const Td = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 5px 10px;
  width: 100%;
  text-align: left;
  &.num {
    width: 5%;
  }
  &.pName {
    width: 25%;
  }
  &.pDesc {
    width: 25%;
  }
  &.pStatus {
    width: 12%;
  }
  &.pSecurity {
    width: 16%;
  }
  &.pEdit {
    width: 7%;
  }
  &.pDelete {
    width: 10%;
  }
`;

const EditPBtn = styled.button`
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;
`;
const DeletePBtn = styled.button`
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;
`;

const Input = styled.input`
  width: 250px;
  height: 25px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  background-color: white;
`;

// const EditpName = styled.input`
//   border: 1px solid gray;
//   width: 100%;
// `;
// const EditpDesc = styled.input`
//   border: 1px solid gray;
//   width: 100%;
// `;
// const EditpStatus = styled.input`
//   border: 1px solid gray;
//   width: 100%;
// `;
// const EditpSecurity = styled.input`
//   border: 1px solid gray;
//   width: 100%;
// `;

function MyProjectMainContents() {
  const [submitData, setSubmitData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [status, setStatus] = useState(null);
  const [security, setSecurity] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [searchWord, setSearchWord] = useState("");
  const [isEditMode, setIsEditMode] = useState();
  const [projectList, setProjectList] = useState([]);
  const [reverseName, setReverseName] = useState(false);
  const [reverseNumber, setReverseNumber] = useState(false);
  const { teamName } = useParams();
  const [editState, setEditState] = useState(false);
  const [pName, setPname] = useState();
  const [pStatus, setPstatus] = useState();
  const [pType, setPtype] = useState();
  const [pLevel, setPlevel] = useState();
  const [pDescription, setPdescription] = useState();
  // console.log("projects");
  // console.log("submitData", submitData);

  const { data: teamData, refetch } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName: teamName },
  });
  // console.log("teamData", teamData?.seeTeam?.project);

  const onCompletedDelete = (data) => {
    alert("Your Project has been deleted.");
    refetch();
  };

  const onCompletedEdit = (data) => {
    console.log("editData", data);
    closeEditModal();
    alert("Your Project has been edited.");
    refetch();
  };

  const [deleteProject, { loading: deleteProjectLoading }] = useMutation(
    DELETE_PROJECT,
    {
      onCompleted: onCompletedDelete,
    }
  );

  const [editProject, { loading: editProjectLoading }] = useMutation(
    EDIT_PROJECT,
    {
      onCompleted: onCompletedEdit,
    }
  );

  const { handleSubmit, setValue, watch, register, errors } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (teamData !== undefined) {
      setProjectList(teamData?.seeTeam?.project);
    }
  }, [teamData]);
  console.log("projectList", projectList);

  const handleChange = (e) => {
    if (e.target.name === "projectName") {
      setValue("projectName", e.target.value);
    }
  };

  const onCompleted = (data) => {
    console.log("data", data);
    if (data?.createProject?.ok === false) {
      alert(
        "The project name is already exist. Please Use Other Project Name!!"
      );
    } else {
      refetch();
      setSubmitData(null);
      handleCreateBtnModal();
    }
  };

  const [createProject, { loading }] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateBtnModal = () => {
    alert("Your Project has been created.");
    setIsSummaryOpen(false);
    setIsModalOpen(false);
  };

  const handleBackBtnModal = () => {
    setIsSummaryOpen(false);
    setIsModalOpen(true);
  };

  const handleNextBtnModal = () => {
    // setIsModalOpen(false);
    setIsSummaryOpen(true);
  };

  const handleEditModal = () => {
    setIsEditOpen(true);
    setEditState(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditState(false);
    console.log(pName);
    console.log(pStatus);
    console.log(pType);
    console.log(pLevel);
    console.log(pDescription);
  };

  const handleCancelBtnModal = () => {
    setIsModalOpen(false);
  };

  const onSaveValid = (data) => {
    handleNextBtnModal();
    console.log("지금의", editState);
    console.log("saveProject", data);
    console.log("status", status);
    console.log("security", security);
    console.log("startDate", typeof String(startDate));
    console.log("endDate", typeof String(endDate));
    setSubmitData(data);
    if (loading) {
      return;
    }
  };

  const createButton = () => {
    if (loading) {
      return;
    }
    createProject({
      variables: {
        ...submitData,
        startDate: String(startDate),
        endDate: String(endDate),
        projectStatus: status,
        securityLevel: security,
        teamId: teamData.seeTeam.id,
      },
    });
  };

  const onSaveInvalid = (data) => {};

  const optionStatus = [
    { value: "Active", label: "Active" },
    { value: "On Hold", label: "On Hold" },
    { value: "Complete", label: "Complete" },
  ];

  const optionSecurity = [
    { value: "Open", label: "Open" },
    { value: "Protected", label: "Protected" },
    { value: "Confidential", label: "Confidential" },
  ];

  const handleStatus = (e) => {
    setStatus(e.value);
  };

  const handleSecurity = (e) => {
    setSecurity(e.value);
  };

  // const [editProject] = useMutation(EDIT_PROJECT_MUTATION);

  const handleEditList = (event, project) => {
    event.preventDefault();
    console.log("editproject", project);
    setIsEditMode(project);
    console.log("isEditMode", isEditMode);
    handleEditModal();
    // if (isEditMode) {
    //   setIsEditMode(false);
    // }
  };
  // console.log("editid", isEditMode === null ? false : true);

  const handleDeleteProject = (event, projectId) => {
    event.preventDefault();
    console.log(projectId);
    deleteProject({
      variables: {
        projectId,
      },
    });
  };
  const handleEdit = (e) => {
    console.log(e.target.name);
    if (e.target.name === "projectName") {
      setPname(e.target.value);
    } else if (e.target.name === "projectType") {
      setPtype(e.target.value);
    } else if (e.target.name === "description") {
      setPdescription(e.target.value);
    }
  };

  const handleEditLevel = (e) => {
    console.log(e.value);
    setPlevel(e.value);
  };
  const handleEditStatus = (e) => {
    console.log(e.value);
    setPstatus(e.value);
  };
  console.log("isEditMode", isEditMode);
  const editSubmit = () => {
    console.log(pName, pStatus, pType, pLevel, pDescription);
    editProject({
      variables: {
        id: +isEditMode.id,
        projectName: pName,
        projectStatus: pStatus,
        projectType: pType,
        description: pDescription,
        securityLevel: pLevel,
      },
    });
  };

  const searchingFunction = (e) => {
    // console.log(e.target.value);
    // setProjectList(teamData?.seeTeam?.project);
    // console.log("projectList", projectList);
    // setSearchWord(e.target.value);
    const filterProject = teamData?.seeTeam?.project.filter((project) =>
      project.projectName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // console.log("filterProject", filterProject);
    setProjectList(filterProject);
  };

  // const { handleEditSubmit } = useForm({
  //   mode: "onChange",
  // });

  // useEffect(( ) => {
  //   setValue("projectName", teamData?.seeTeam?.project?.projectName);
  //   setValue("description", teamData?.seeTeam?.project?.description);
  //   setValue("projectStatus", teamData?.seeTeam?.project?.projectStatus);
  //   setValue("projectSecurity", teamData?.seeTeam?.project?.projectSecurity);
  // },[teamData, setValue]);

  // const handleEditChange = (e) => {
  //   if(e.target.name === "projectName"){
  //     setValue("projectName", e.target.value);
  //   }
  //   if(e.target.name === "description"){
  //     setValue("description", e.target.value);
  //   }
  //   if(e.target.name === "projectStatus"){
  //     setValue("projectStatus", e.target.value);
  //   }
  //   if(e.target.name === "projectSecurity"){
  //     setValue("projectSecurity", e.target.value);
  //   }
  // };

  // const onEditValid = (data) =>  {
  //   handleEditList();
  //   console.log("editData", data);
  //   if (loading) {
  //     return;
  //   }
  //   editProject({
  //     variables: {
  //       ...data,
  //     },
  //   });
  //   refetch();
  // };

  // const onEditInvalid = (data) => {};

  // const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION);

  // prrojectDelete
  const [id, setId] = useState();

  const onRemove = (id) => {};

  const { format } = require("date-fns");
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);
  // console.log(`${format(date, 'dd.MM.yyyy')}`);
  // console.log(`${format(sDate, "yyyy-MM-dd")?.toString()}`);
  // console.log(`${format(eDate, "yyyy-MM-dd")?.toString()}`);

  const nameSorting = () => {
    const sortingList = [...projectList];
    if (reverseName === false) {
      sortingList.sort((a, b) => a.projectName.localeCompare(b.projectName));
      setReverseName(true);
    } else {
      sortingList
        .sort((a, b) => a.projectName.localeCompare(b.projectName))
        .reverse();
      setReverseName(false);
    }
    console.log("솔팅결과", sortingList);
    setProjectList(sortingList);
    // users.sort((a, b) => a.firstname.localeCompare(b.firstname))
  };

  const numberSorting = () => {
    const sortingList = [...projectList];
    if (reverseNumber === false) {
      sortingList.sort((a, b) => a.id - b.id);
      setReverseNumber(true);
    } else {
      sortingList.sort((a, b) => a.id - b.id).reverse();
      setReverseNumber(false);
    }

    console.log("솔팅결과", sortingList);
    setProjectList(sortingList);
    // users.sort((a, b) => a.idex.localeCompare(b.firstname))
  };
  return (
    <Container>
      <TeamName>
        <Link to={`/myTeam`}>{teamName}</Link>
      </TeamName>
      <MainHeader>
        <MainTitle>MY PROJECT</MainTitle>
        <RightSection>
          <NavBar>
            <Link to={`/myProject/${teamName}`}>
              <Letter className="selected">My Project</Letter>
            </Link>
            <Link to={`/members/${teamName}`}>
              <Letter>Members</Letter>
            </Link>
          </NavBar>
          <InputSearch
            type="text"
            onChange={searchingFunction}
            placeholder="Search Project By Name..."
          ></InputSearch>
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
                  <ModalInfo>
                    {/* <ErrorSection> */}
                    <ProjectLabel>
                      Project name:
                      <InputText
                        ref={register({ required: "Project Name is required" })}
                        type="text"
                        name="projectName"
                        value={watch("projectName")}
                        placeholder="Enter the project name..."
                        onChange={handleChange}
                        hasError={Boolean(errors?.projectName?.message)}
                      />
                    </ProjectLabel>
                    <FormError message={errors?.projectName?.message} />
                    {/* </ErrorSection> */}

                    <ProjectLabel>
                      Project Status:
                      <SelectStatus
                        options={optionStatus}
                        name="projectStatus"
                        ref={register}
                        value={watch("projectStatus")}
                        onChange={handleStatus}
                      />
                    </ProjectLabel>

                    <ProjectLabel>
                      Project Type:
                      <InputText
                        ref={register({ required: "Project Type is required" })}
                        type="text"
                        name="projectType"
                        value={watch("projectType")}
                        placeholder="Enter the Project type..."
                        onChange={handleChange}
                        hasError={Boolean(errors?.projectType?.message)}
                      />
                    </ProjectLabel>
                    <FormError message={errors?.projectType?.message} />

                    <ProcessDate>
                      <StartD>
                        <ProjectLabel>
                          Start Date:
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
                        <ProjectLabel>
                          End Date:
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

                    <ProjectLabel>
                      Security Level:
                      <SelectStatus
                        options={optionSecurity}
                        name="securityLevel"
                        ref={register}
                        value={watch("securityLevel")}
                        onChange={handleSecurity}
                      />
                    </ProjectLabel>

                    <DesLabel>Description</DesLabel>
                    <>
                      <Description
                        type="text"
                        ref={register({
                          required: "Project description is required",
                        })}
                        value={watch("description")}
                        name="description"
                        placeholder="Let people know what this project is about..."
                        hasError={Boolean(errors?.description?.message)}
                      />
                      <FormError message={errors?.description?.message} />
                    </>
                  </ModalInfo>
                  <ModalBtn>
                    <NextBtn type="submit">Next</NextBtn>
                    <CancelBtn onClick={handleCancelBtnModal}>Cancel</CancelBtn>
                  </ModalBtn>
                </ModalBody>
              </form>
            </Modal>

            <Modal isOpen={isSummaryOpen} style={summaryCustomStyles}>
              <ModalHeader>NEW PROJECT</ModalHeader>

              <ModalBody>
                <ModalInfo>
                  <SummaryLabel>
                    Project name:
                    <InputResult>{submitData?.projectName}</InputResult>
                  </SummaryLabel>

                  <SummaryLabel>
                    Project Status:
                    <InputResult>{status}</InputResult>
                  </SummaryLabel>

                  <SummaryLabel>
                    Project Type:
                    <InputResult>{submitData?.projectType}</InputResult>
                  </SummaryLabel>

                  <ProcessDate>
                    <StartD>
                      <SummaryLabel className="dateLabel">
                        Start Date:
                        <InputResult className="dateResult">{`${format(
                          sDate,
                          "yyyy-MM-dd"
                        )?.toString()}`}</InputResult>
                        {/* <InputResult>{String(startDate)}</InputResult> */}
                      </SummaryLabel>
                    </StartD>
                    <EndD>
                      <SummaryLabel className="dateLabel endDate">
                        End Date:
                        <InputResult className="dateResult">{`${format(
                          eDate,
                          "yyyy-MM-dd"
                        )?.toString()}`}</InputResult>
                      </SummaryLabel>
                    </EndD>
                  </ProcessDate>

                  <SummaryLabel>
                    Security Level:
                    <InputResult>{security}</InputResult>
                  </SummaryLabel>

                  <DesLabel>Description: </DesLabel>
                  <InputResult className="desResult">
                    {submitData?.description}
                  </InputResult>
                </ModalInfo>
                <ModalBtn>
                  <NextBtn onClick={() => createButton()}>Create</NextBtn>
                  <CancelBtn onClick={handleBackBtnModal}>Back</CancelBtn>
                </ModalBtn>
              </ModalBody>
            </Modal>
          </LeftBtn>
        </AllBtn>
        <Modal isOpen={isEditOpen} style={editCustomStyles}>
          <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
            <ModalHeader>Edit PROJECT</ModalHeader>
            <ModalBody>
              <ModalInfo>
                <SummaryLabel>
                  Project name:
                  <InputResult>
                    <Input
                      ref={register({ required: "Project Name is required" })}
                      type="text"
                      name="projectName"
                      value={watch("projectName")}
                      placeholder={isEditMode?.projectName}
                      onChange={handleEdit}
                      hasError={Boolean(errors?.projectName?.message)}
                    ></Input>
                  </InputResult>
                </SummaryLabel>

                <SummaryLabel>
                  Project Status:
                  <InputResult>
                    <SelectStatus
                      options={optionStatus}
                      name="projectStatus"
                      ref={register}
                      value={watch("projectStatus")}
                      onChange={handleEditStatus}
                      placeholder={isEditMode?.projectStatus}
                    />
                  </InputResult>
                </SummaryLabel>

                <SummaryLabel>
                  Project Type:
                  <InputResult>
                    <Input
                      ref={register({ required: "Project Type is required" })}
                      type="text"
                      name="projectType"
                      value={watch("projectType")}
                      placeholder={isEditMode?.projectType}
                      onChange={handleEdit}
                      hasError={Boolean(errors?.projectType?.message)}
                    ></Input>
                  </InputResult>
                </SummaryLabel>

                <SummaryLabel>
                  Security Level:
                  <InputResult>
                    <SelectStatus
                      options={optionSecurity}
                      name="securityLevel"
                      ref={register}
                      value={watch("securityLevel")}
                      onChange={handleEditLevel}
                      placeholder={isEditMode?.securityLevel}
                    />
                  </InputResult>
                </SummaryLabel>

                <DesLabel>Description: </DesLabel>
                {/* <InputResult className="desResult"> */}
                <Description
                  type="text"
                  ref={register({
                    required: "Project description is required",
                  })}
                  value={watch("description")}
                  name="description"
                  onChange={handleEdit}
                  placeholder={isEditMode?.description}
                  hasError={Boolean(errors?.description?.message)}
                />
                {/* </InputResult> */}
              </ModalInfo>
              <ModalBtn>
                <NextBtn type="button" onClick={editSubmit}>
                  Save
                </NextBtn>
                <CancelBtn onClick={closeEditModal}>Cancel</CancelBtn>
              </ModalBtn>
            </ModalBody>
          </form>
        </Modal>
        <TableDiv>
          <TableContainer className="sortable">
            <Thead>
              <Tr>
                <Th className="num" onClick={numberSorting}>
                  No. &darr;
                </Th>
                <Th className="pName" onClick={nameSorting}>
                  Name &darr;
                </Th>
                <Th className="pDesc">Description</Th>
                <Th className="pStatus">Status</Th>
                <Th className="pSecurity">Security</Th>
                <Th className="pEdit">Edit</Th>
                <Th className="pDelete">Delete</Th>
              </Tr>
            </Thead>

            <Tbody>
              {projectList?.map((projects, index) => (
                <>
                  {isEditMode === projects.id ? (
                    <Link to={`/myProject/${teamName}/${projects?.id}`}>
                      <Tr key={projects.id}>
                        <Td className="num">{projects.id}</Td>
                        <Td className="pName">{projects.projectName}aa</Td>
                        <Td className="pDesc">{projects.description}</Td>
                        <Td className="pStatus">{projects.projectStatus}</Td>
                        <Td className="pSecurity">{projects.securityLevel}</Td>
                        <Td
                          className="pEdit"
                          onClick={(event) => handleEditList(event, projects)}
                        >
                          <EditPBtn>
                            <EditIcon />
                          </EditPBtn>
                        </Td>
                        <Td
                          className="pDelete"
                          onClick={(event) =>
                            handleDeleteProject(event, projects.id)
                          }
                        >
                          <DeletePBtn onRemove={onRemove}>
                            <DeleteIcon />
                          </DeletePBtn>
                        </Td>
                      </Tr>
                    </Link>
                  ) : (
                    <Link to={`/myProject/${teamName}/${projects?.id}`}>
                      <Tr key={projects.id}>
                        <Td className="num">{projects.id}</Td>
                        <Td className="pName">{projects.projectName}</Td>
                        <Td className="pDesc">{projects.description}</Td>
                        <Td className="pStatus">{projects.projectStatus}</Td>
                        <Td className="pSecurity">{projects.securityLevel}</Td>
                        <Td
                          className="pEdit"
                          onClick={(event) => handleEditList(event, projects)}
                        >
                          <EditPBtn>
                            <EditIcon />
                          </EditPBtn>
                        </Td>
                        <Td
                          className="pDelete"
                          onClick={(event) =>
                            handleDeleteProject(event, projects.id)
                          }
                        >
                          <DeletePBtn onRemove={onRemove}>
                            <DeleteIcon />
                          </DeletePBtn>
                        </Td>
                      </Tr>
                    </Link>
                  )}
                </>
              ))}
            </Tbody>
          </TableContainer>
        </TableDiv>
      </MainContents>
    </Container>
  );
}

export default MyProjectMainContents;
