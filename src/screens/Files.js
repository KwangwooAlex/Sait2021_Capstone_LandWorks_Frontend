import styled from "styled-components";
import DashBoardHeader from "../components/DashBoardHeader";
import DashBoardLeftMenu from "../components/DashBoardLeftMenu";
// import ProjectHeader from "../components/ProjectHeader";
import FilesMainContents from "./FilesMainContents";

const DashBoardContainer = styled.div`
  height: 100%;
  width: 100%;
  /* background-color: black; */
`;

const DashBoardMainBox = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  /* background-color: red; */
  display: flex;
`;

function Files() {
  return (
    <DashBoardContainer>
      <DashBoardHeader />
      <DashBoardMainBox>
        <DashBoardLeftMenu />
        {/* <ProjectHeader></ProjectHeader> */}
        <FilesMainContents></FilesMainContents>
      </DashBoardMainBox>
    </DashBoardContainer>
  );
}
export default Files;
