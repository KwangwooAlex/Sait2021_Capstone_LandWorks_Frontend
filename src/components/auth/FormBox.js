import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 700px;
  padding: 30px;
  form {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
`;

function FormBox({ children }) {
  return <Container>{children}</Container>;
}
export default FormBox;
