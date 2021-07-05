import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function AuthLayout({ children }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

export default AuthLayout;
