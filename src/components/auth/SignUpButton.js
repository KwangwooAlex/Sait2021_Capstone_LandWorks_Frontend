import styled from "styled-components";

const SignUpButton = styled.input`
  border: none;
  border-radius: 20px;
  margin-top: 30px;
  background-color: #2947bf;
  color: white;
  text-align: center;
  padding: 18px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
`;

export default SignUpButton;
