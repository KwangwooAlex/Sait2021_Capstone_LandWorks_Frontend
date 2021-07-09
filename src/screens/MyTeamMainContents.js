import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import Input from "../components/auth/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

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
        projectName
      }
    }
  }
`;

const CREATE_TEAM_MUTATION = gql`
  mutation createTeam($teamName: String!) {
    createTeam(teamName: $teamName) {
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

const MainTitle = styled.div`
  color: #004070;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20px;
  width: 100%;
  height: 40px;
  border-bottom: black 2px solid;
  box-sizing: border-box;
`;

const CreateBtn = styled.button`
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

const TeamLabel = styled.label`
  display: flex;
  flex-direction: column;
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

const InputSearch = styled.input`
  margin-top: 25px;
  border: 1px solid gray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
  width: 200px;
`;

const CancelTeam = styled.button`
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

const SaveTeam = styled.button`
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

// Modal Size
const customStyles = {
  content: {
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    height: "380px",
  },
};

const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchTeam = styled.div`
  padding: 0px;
`;

const TeamBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-gap: 50px;
  justify-items: stretch;
  margin-top: 30px;
`;

const TeamList = styled.div`
  height: 100%;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600px;
`;

const ListEachTeam = styled.li`
  font-family: Impact 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid lightgray;
  padding: 15px;
  box-shadow: 0px 3px 6px gray;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  width: 100%;
  height: 100%; 
  list-style: none;
  height: 150px;
`;

function MyTeamMainContents() {
  // const [TeamName, setTeamName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateBtnModal = () => {
    alert("Your team has been created.");
    setIsModalOpen(false);
  };

  const handleCancelBtnModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTeam = () => {
    handleOpenModal();
  };

  const { data, refetch } = useQuery(SEE_ALL_MY_TEAM_QUERY);

  console.log("전체팀보자", data);

  const { handleSubmit, setValue, watch, register } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setValue("teamName", data?.seeAllMyTeam?.teamName);
  }, [data, setValue]);

  const handleChange = (e) => {
    if (e.target.name === "teamName") {
      setValue("teamName", e.target.value);
    }
  };

  const [createTeam, { loading }] = useMutation(CREATE_TEAM_MUTATION);

  const onSaveValid = (data) => {
    handleCreateBtnModal();
    console.log("saveTeam", data);
    if (loading) {
      return;
    }
    createTeam({
      variables: {
        ...data,
      },
    });
    refetch();
  };

  const onSaveInvalid = (data) => {};
  console.log("팀네임", data?.seeAllMyTeam?.teamName);
  
  return (
    <Container>
      <MainTitle>MY TEAM</MainTitle>
      <TeamHeader>
        <CreateBtn onClick={handleCreateTeam}>+ Create Team</CreateBtn>
        <SearchTeam>
        <InputSearch type="text" placeholder="Search Project..." ></InputSearch>
        </SearchTeam>
      </TeamHeader>

      <Modal isOpen={isModalOpen} style={customStyles}>
        <ModalHeader>NEW TEAM</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
            <ModalInfo>
              <TeamLabel>Team name</TeamLabel>
              <Input
                ref={register}
                type="text"
                name="teamName"
                value={watch("teamName")}
                placeholder="Enter the team name..."
                onChange={handleChange}
              />
              <DesLabel>Description</DesLabel>
              <Description
                type="text"
                // cols="57"
                // rows="5"
                name="teamDescription"
                placeholder="Let people know what this team is all about..."
              />
            </ModalInfo>

            <ModalBtn>
              <SaveTeam type="submit">Create</SaveTeam>
              {/* <SaveTeam type="submit">Create</SaveTeam> */}
              <CancelTeam onClick={handleCancelBtnModal}>Cancel</CancelTeam>
            </ModalBtn>
          </form>
        </ModalBody>
      </Modal>

      <TeamBody>
           {data?.seeAllMyTeam?.map((team) => (
              <ListEachTeam key={team.id}>
                <Link to={`/myProject/${team.teamName}`}>
                  <TeamList>
                      {team.teamName}
                  </TeamList>  
                </Link>
              </ListEachTeam>
            ))}
      </TeamBody>
    </Container>
  );
}

export default MyTeamMainContents;
