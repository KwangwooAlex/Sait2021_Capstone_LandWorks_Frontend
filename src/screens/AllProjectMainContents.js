import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
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

const MainContents = styled.div``;

const InputSearch = styled.input`
  margin-top: 25px;
  border: 1px solid gray;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 13px;
  height: 20px;
  width: 200px;
`;

const TableContainerTop = styled.table`
  margin-top: 25px;
  border: 1px solid lightgray;  
  border-bottom: none;
  height: 20px;
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  font-size: 13px;
`;
/* const = styled.div``; */
const TableDiv = styled.div`
  overflow-y: overlay;
  height: 60vh;
  width: 100%;
  border: 1px solid lightgray;
  border-top: none;
`;

const TableContainer = styled.table`
  height: 100%;
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
`;
const Th = styled.th`
  font-weight: 600;
  padding: 10px;
  margin: 0 10px;
  width: 100%;
  text-align: left;
  &.num {
    width: 5%;
  }
  &.pName {
    width: 25%;
  }
  &.pDesc {
    width: 28%;
  }
  &.pTeam {
    width: 17%;
  }
  &.pStatus {
    width: 13%;
  }
  &.pSecurity {
    width: 12%;
  }
`;
const Td = styled.td`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  width: 100%;
  text-align: left;
  &.num {
    width: 5%;
  }
  &.pName {
    width: 25%;
  }
  &.pDesc {
    width: 28%;
  }
  &.pTeam {
    width: 17%;
  }
  &.pStatus {
    width: 13%;
  }
  &.pSecurity {
    width: 12%;
  }
`;

const CheckInput = styled.input``;

function AllProjectMainContents() {
  const { teamName } = useParams();

  const { data } = useQuery(SEE_ALL_MY_TEAM_QUERY);
  const [projectList, setProjectList] = useState([]);
  const [cloneProjectList, setCloneProjectList] = useState([]);
  const [reverseName, setReverseName] = useState(false);
  const [reverseNumber, setReverseNumber] = useState(false);
  // console.log("팀네임", data?.seeAllMyTeam);

  useEffect(() => {
    if (data !== undefined) {
      allProjectCheckFunction();
    }
  }, [data]);

  const allProjectCheckFunction = () => {
    let newList = [];
    let eachProjectWithTeamName;
    data?.seeAllMyTeam?.forEach((eachTeam) => {
      // console.log("팀이름검사", eachTeam);
      eachTeam?.project?.forEach((eachProject, index) => {
        eachProjectWithTeamName = { ...eachProject };
        // eachProjectWithTeamName.push = eachTeam.teamName;
        // console.log("eachProjectWithTeamName", eachProjectWithTeamName);
        eachProjectWithTeamName.teamName = eachTeam.teamName;
        newList.push(eachProjectWithTeamName);
      });
    });
    console.log("newList", newList);
    setProjectList(newList);
    setCloneProjectList(newList);
  };
  console.log("projectList", projectList);

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
    // users.sort((a, b) =>    a.idex.localeCompare(b.firstname))
  };

  const searchingFunction = (e) => {
    // let searchingList = [...projectList];
    const filterProject = cloneProjectList.filter((project) =>
      project.projectName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProjectList(filterProject);
  };

  return (
    <Container>
      <MainTitle>ALL MY PROJECT LIST</MainTitle>
      <TeamHeader>
        <SearchProject>
          <InputSearch
            type="text"
            placeholder="Search Project By Name..."
            onChange={searchingFunction}
          ></InputSearch>
        </SearchProject>
      </TeamHeader>

      <MainContents>
          <TableContainerTop className="sortable">
            <Thead>
              <Tr>
                <Th className="num" onClick={numberSorting}>
                  No. &darr;
                </Th>
                <Th className="pName" onClick={nameSorting}>
                  Name &darr;
                </Th>
                <Th className="pDesc">Description</Th>
                <Th className="pTeam">Team</Th>
                <Th className="pStatus">Status</Th>
                <Th className="pSecurity">Security</Th>
              </Tr>
            </Thead>
            </TableContainerTop>

        <TableDiv>
            <TableContainer>
            <Tbody>
              {projectList?.map((project) => (
                <Link to={`/myProject/${project?.teamName}/${project?.id}`}>
                  <Tr key={project.id}>
                    <Td className="num">{project.id}</Td>
                    <Td className="pName">{project.projectName}</Td>
                    <Td className="pDesc">{project.description}</Td>
                    <Td className="pTeam">{project.teamName}</Td>
                    <Td className="pStatus">{project.projectStatus}</Td>
                    <Td className="pSecurity">{project.securityLevel}</Td>
                  </Tr>
                </Link>
              ))}
            </Tbody>
          </TableContainer>
        </TableDiv>
      </MainContents>
    </Container>
  );
}

export default AllProjectMainContents;
