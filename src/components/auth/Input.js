import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 3px;
  padding: 7px;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};

  margin-top: 25px;
  box-sizing: border-box;
  &::placeholder {
    padding-left: 2px;
    font-size: 15px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
