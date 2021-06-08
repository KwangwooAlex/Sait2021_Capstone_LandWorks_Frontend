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
    margin-top: 20px;
    width: 400px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
`;

function FormSignUpBox({ children }) {
  return <Container>{children}</Container>;
}
export default FormSignUpBox;
