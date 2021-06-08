import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  margin: 0 auto;
  min-height: 70px;
  background-color: #004070;
  width: 100%;
`;

const LeftTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: white;
  font-size: 17px;
  font-weight: 500;
`;

function LogOutHeader() {
  return (
    <Container>
      <Link to="/">
        <LeftTitle>Landwork Resource Management Inc</LeftTitle>
      </Link>
    </Container>
  );
}

export default LogOutHeader;
