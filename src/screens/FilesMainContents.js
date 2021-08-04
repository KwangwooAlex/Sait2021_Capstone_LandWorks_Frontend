import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/auth/Input";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFileWord,
  faFilePowerpoint,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFile,
} from "@fortawesome/free-regular-svg-icons";
import { trimText } from "../components/Utils";

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

const DELETE_FILE = gql`
  mutation deleteFile($fileId: Int!) {
    deleteFile(fileId: $fileId) {
      ok
      error
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

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!, $fileName: String!, $projectId: Int!) {
    uploadFile(file: $file, fileName: $fileName, projectId: $projectId) {
      error
      ok
    }
  }
`;

const SEE_PROJECT_QUERY = gql`
  query seeProject($projectId: Int!) {
    seeProject(projectId: $projectId) {
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

const TeamPath = styled.div`
  display: flex;
  border-bottom: black 2px solid;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
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

const LETTERS = styled.h4`
  color: Black;
  font-weight: 600;
  font-size: 20px;
  margin-left: 15px;
  &.path {
    color: gray;
  }
`;

const ProjectPath = styled.div`
  color: Black;
  font-weight: 600;
  font-size: 20px;
  margin-left: 15px;
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
    height: "320px",
  },
};

const UploadModalContainer = styled.div``;

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
  font-weight: bold;
`;

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

const TableContainerTop = styled.table`
  margin-top: 10px;
  border: 1px solid lightgray;
  border-bottom: none;
  height: 20px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  font-size: 13px;
`;

const TableDiv = styled.div`
  overflow-y: overlay;
  height: 50vh;
  width: 100%;
  border: 1px solid lightgray;
  border-top: none;
`;

const TableContainer = styled.table`
  height: 100%;
  /* overflow-y: auto; */
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  font-size: 13px;
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
  width: 100%;
`;
const Th = styled.th`
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  font-weight: 600;
  &.check {
    width: 3%;
  }
  &.num {
    width: 5%;
  }
  &.fName {
    width: 35%;
  }
  &.fUpdateBy {
    width: 18%;
  }
  &.fLast {
    width: 20%;
  }
  &.fEdit {
    width: 7%;
  }
  &.fDelete {
    width: 10%;
  }
`;
const Td = styled.td`
  /* cursor: pointer; */
  padding: 10px;
  margin: 10px;
  width: 100%;
  text-align: left;
  &.check {
    width: 3%;
  }
  &.num {
    width: 5%;
  }
  &.fName {
    width: 35%;
  }
  &.fUpdateBy {
    width: 18%;
  }
  &.fLast {
    width: 20%;
  }
  &.fEdit {
    width: 7%;
    :hover {
      color: green;
    }
  }
  &.fDelete {
    width: 10%;
  }
`;

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

const EditFileName = styled.input`
  border: 1px solid gray;
  width: 80%;
`;

const SummaryLabel = styled.label`
  margin-top: 20px;
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  &.dateLabel {
    width: 200px;
  }
  &.fileName {
    display: flex;
    align-items: center;
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

const InputTitle = styled.input`
  width: 250px;
  height: 25px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  background-color: white;
`;

function FilesMainContents() {
  const { teamName, projectId } = useParams();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitTitle, setSubmitTitle] = useState();
  const [fileName, setFileName] = useState("");
  const [fileInfo, setFileInfo] = useState();
  const [uploadingTime, setUploadingTime] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [reverseName, setReverseName] = useState(false);
  const [reverseNumber, setReverseNumber] = useState(false);
  const { handleSubmit, setValue, watch, register, errors } = useForm({
    mode: "onChange",
  });
  const { data: seeFilesData, refetch } = useQuery(SEE_FILES, {
    variables: { projectId: +projectId },
  });

  const { data: projectData } = useQuery(SEE_PROJECT_QUERY, {
    variables: { projectId: +projectId },
  });

  const onCompleted = (data) => {
    console.log("fileData 업로드후", data);
    const {
      uploadFile: { ok, error },
    } = data;
    alert("File is uploaded!!");
    handleCancelBtnModal();
    setUploadingTime(true);
    refetch();
  };

  const deleteFileCompleted = (data) => {
    console.log("fileData 지운후", data);

    alert("File is deleted!!");
    // handleCancelBtnModal();
    refetch();
  };

  useEffect(() => {
    if (seeFilesData !== undefined) {
      setFileList(seeFilesData?.seeFiles);
    }
  }, [seeFilesData]);

  const [uploadFile, { loading: uploadFileLoading }] = useMutation(
    UPLOAD_FILE,
    {
      onCompleted,
    }
  );

  const [deleteFile, { loading: deleteFileLoading }] = useMutation(
    DELETE_FILE,
    {
      onCompleted: deleteFileCompleted,
    }
  );

  const handleEditFile = (fileName) => {
    setIsEditMode(true);
    setFileName(fileName);
    if (isEditMode) {
      setIsEditMode(false);
    }
  };

  const { data: teamData } = useQuery(SEE_TEAM_QUERY, {
    variables: { teamName },
  });

  console.log("seeFilesData", seeFilesData);

  console.log("projectId", typeof projectId);
  console.log("teamData", teamData?.seeTeam?.project);
  console.log("projectData", projectData);

  const handleUploadOpen = () => {
    setIsUploadOpen(true);
  };

  const handleCancelBtnModal = () => {
    setIsUploadOpen(false);
  };

  const handleFileTitle = (event) => {
    event.preventDefault();
    // console.log("targetValue", event.target.value);
    setFileName(event.target.value);
  };

  const handleFileUpload = (data) => {
    // console.log("uploadfileCheck", data.target.value);
    // setFileInfo(event.target.value);
  };

  // const submitFile = () => {
  //   uploadFile({
  //     variables: {
  //       file: fileInfo,
  //       fileName: fileName,
  //       projectId: projectId,
  //     },
  //   });
  // };

  const onSaveValid = (data) => {
    console.log("서브밋데타", data);
    console.log("data?.uploadFile[0].size", data?.uploadFile[0].size);
    console.log("type", typeof data?.uploadFile[0].size);
    if (data?.uploadFile[0].size > 1030142) {
      console.log("here");
      alert("File Size is too big!!!");
      return;
    }
    if (uploadFileLoading) {
      return;
    }
    if (data?.uploadFile[0].size < 1030142 && uploadingTime === true) {
      // console.log("오나오나");
      uploadFile({
        variables: {
          file: data?.uploadFile[0],
          fileName: data.fileName,
          projectId: +projectId,
        },
      });
      setUploadingTime(false);
    }
  };

  const deleteFileFunction = (fileId) => {
    console.log("fileId", fileId);
    deleteFile({
      variables: {
        fileId,
      },
    });
  };

  const searchingFunction = (e) => {
    // console.log(e.target.value);
    // setProjectList(teamData?.seeTeam?.project);
    // console.log("projectList", projectList);
    // setSearchWord(e.target.value);
    const filterFiles = seeFilesData?.seeFiles?.filter((file) =>
      file.fileName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // console.log("filterProject", filterProject);
    setFileList(filterFiles);
  };

  const nameSorting = () => {
    const sortingList = [...fileList];
    if (reverseName === false) {
      sortingList.sort((a, b) => a.fileName.localeCompare(b.fileName));
      setReverseName(true);
    } else {
      sortingList
        .sort((a, b) => a.fileName.localeCompare(b.fileName))
        .reverse();
      setReverseName(false);
    }
    console.log("솔팅결과", sortingList);
    setFileList(sortingList);
    // users.sort((a, b) => a.firstname.localeCompare(b.firstname))
  };

  const numberSorting = () => {
    const sortingList = [...fileList];
    if (reverseNumber === false) {
      sortingList.sort((a, b) => a.id - b.id);
      setReverseNumber(true);
    } else {
      sortingList.sort((a, b) => a.id - b.id).reverse();
      setReverseNumber(false);
    }

    console.log("솔팅결과", sortingList);
    setFileList(sortingList);
    // users.sort((a, b) => a.idex.localeCompare(b.firstname))
  };

  return (
    <Container>
      <TeamPath>
        <TeamName>
          <Link to={`/myProject/${teamName}`}>{teamName}</Link>
        </TeamName>
        <LETTERS className="path">
          <ArrowRightIcon />
        </LETTERS>
        <ProjectPath>
          <Link to={`/myProject/${teamName}/${projectId}`}>
            {projectData?.seeProject?.projectName}
          </Link>
        </ProjectPath>
      </TeamPath>
      <MainHeader>
        <MainTitle>FILES</MainTitle>
        <RightSection>
          <NavBar>
            <Link to={`/myProject/${teamName}/${projectId}/overview`}>
              <Letter>Overview</Letter>
            </Link>
            <Link to={`/myProject/${teamName}/${projectId}/files`}>
              <Letter className="selected">Files</Letter>
            </Link>
          </NavBar>
          <InputSearch
            type="text"
            placeholder="Search File..."
            onChange={searchingFunction}
          ></InputSearch>
        </RightSection>
      </MainHeader>

      <SixBtn>
        <FourBtn>
          <UploadBtn onClick={handleUploadOpen}>Upload</UploadBtn>
          <Modal isOpen={isUploadOpen} style={customStyles}>
            <form onSubmit={handleSubmit(onSaveValid)}>
              <UploadModalContainer>
                <ModalHeader>Upload Files</ModalHeader>
                <ModalBody>
                  <ModalInfo>
                    <UploadHeader>Upload files</UploadHeader>

                    <SummaryLabel className="fileName">
                      File name:
                      <InputResult>
                        <InputTitle
                          ref={register({
                            required: "Project Name is required",
                          })}
                          type="text"
                          name="fileName"
                          value={watch("fileName")}
                          placeholder="Enter the file name..."
                          // placeholder={isEditMode?.projectName}
                          onChange={handleFileTitle}
                          hasError={Boolean(errors?.projectName?.message)}
                        ></InputTitle>
                      </InputResult>
                    </SummaryLabel>
                    <UploadDes>
                      You can upload files up to a maximum of 100 MB.
                    </UploadDes>
                    <UploadInput
                      ref={register}
                      type="file"
                      name="uploadFile"
                      onChange={handleFileUpload}
                    ></UploadInput>
                    {/* <UploadBox>File 1</UploadBox> */}
                  </ModalInfo>
                  <ModalBtn>
                    <ModalUploadBtn type="submit">Upload</ModalUploadBtn>
                    <ModalCancelBtn onClick={handleCancelBtnModal}>
                      Cancel
                    </ModalCancelBtn>
                  </ModalBtn>
                </ModalBody>
              </UploadModalContainer>
            </form>
          </Modal>

          {/* <DownloadBtn>Download</DownloadBtn> */}
          {/* <CopyBtn>Copy</CopyBtn> */}
        </FourBtn>
      </SixBtn>
      <TableContainerTop className="sortable">
        <Thead>
          <Tr>
            <Th className="num" onClick={numberSorting}>
              No. &darr;
            </Th>
            <Th className="num">Type</Th>
            <Th className="fName" onClick={nameSorting}>
              Name &darr;
            </Th>
            <Th className="fUpdateBy">Update by</Th>
            <Th className="fLast">Last Update</Th>
            <Th className="fEdit">DownLoad</Th>
            {/* <Th className="fEdit">Edit</Th> */}
            <Th className="fDelete">Delete</Th>
          </Tr>
        </Thead>
      </TableContainerTop>
      <TableDiv>
        <TableContainer>
          <Tbody>
            {/* 파일업로드 파트 전체 수정해야함. 지금이건 프로젝트 리스트로 대신 하드코딩 해둔거임 */}
            {fileList?.map((file, index) => (
              // <Link to={`/myProject/${teamName}/${files?.id}`}>
              <Tr key={(file.id, index)}>
                <Td className="num">{file.id}</Td>
                <Td className="num">
                  {/* {file.fileUrl.slice(file.fileUrl.length - 3)} */}
                  {/* {file.fileUrl.split(".")[file.fileUrl.split(".").length - 1]} */}
                  {file.fileUrl.split(".")[
                    file.fileUrl.split(".").length - 1
                  ] === "pdf" ||
                    file.fileUrl.split(".")[
                      file.fileUrl.split(".").length - 1
                    ] === "docx" ||
                    file.fileUrl.split(".")[
                      file.fileUrl.split(".").length - 1
                    ] === "xlsx" ||
                    file.fileUrl.split(".")[
                      file.fileUrl.split(".").length - 1
                    ] === "pptx" ? (<> {file.fileUrl.split(".")[
                      file.fileUrl.split(".").length - 1
                    ] === "pdf" && (
                      <FontAwesomeIcon
                        className="pdf"
                        icon={faFilePdf}
                        size="2x"
                      />
                    )}
                    {file.fileUrl.split(".")[
                      file.fileUrl.split(".").length - 1
                    ] === "docx" && (
                      <FontAwesomeIcon
                        className="pdf"
                        icon={faFileWord}
                        size="2x"
                      />
                    )}
                    {file.fileUrl.split(".")[
                      file.fileUrl.split(".").length - 1
                    ] === "xlsx" && (
                      <FontAwesomeIcon
                        className="pdf"
                        icon={faFileExcel}
                        size="2x"
                      />
                    )}
                    {file.fileUrl.split(".")[
                      file.fileUrl.split(".").length - 1
                    ] === "pptx" && (
                      <FontAwesomeIcon
                        className="pdf"
                        icon={faFilePowerpoint}
                        size="2x"
                      />
                    )}</>):( 
                      <FontAwesomeIcon
                        className="pdf"
                        icon={faFile}
                        size="2x"
                      />
                    ) }
                
                </Td>
                <Td className="fName">
                  {trimText(file.fileName, 35)}
                  {/* {isEditMode ? (
                      <EditFileName
                        // ref={register}
                        type="text"
                        name="fileName"
                        // placeholder={projects.projectStatus}
                        // value={watch("projectStatus")}
                        onClick={(event) => event.preventDefault()}
                        // onChange={handleEditChange}
                      />
                    ) : (
                      <>{files.projectName}</>
                    )} */}
                </Td>
                <Td className="fUpdateBy">{file.createdAt}</Td>
                <Td className="fLast">{file.updatedAt}</Td>
                <Td
                  className="fEdit"
                  // onClick={(event) => event.preventDefault()}
                >
                  <Link to={{ pathname: file.fileUrl }} target="_blank">
                    <MeditBtn>
                      <GetAppIcon />
                    </MeditBtn>
                  </Link>
                </Td>
                {/* <Td
                  className="fEdit"
                  onClick={(event) => event.preventDefault()}
                >
                  <MeditBtn onClick={handleEditFile}>
                    <EditIcon />
                  </MeditBtn>
                </Td> */}
                <Td
                  className="fDelete"
                  onClick={() => deleteFileFunction(file.id)}
                >
                  <DeleteMBtn>
                    <DeleteIcon />
                  </DeleteMBtn>
                </Td>
              </Tr>
              // </Link>
            ))}
          </Tbody>
        </TableContainer>
      </TableDiv>
    </Container>
  );
}

export default FilesMainContents;
