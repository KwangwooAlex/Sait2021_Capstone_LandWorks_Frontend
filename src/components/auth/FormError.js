import styled from "styled-components";
import warningImg from "../../asset/warningImg.PNG";
const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 16px;
  margin: 0px 0px 10px 0px;
  display: flex;
  align-items: center;
  margin-left: -10px;
`;

const Warning = styled.img`
  margin-right: 10px;
  width: 26px;
  height: auto;
  max-width: 100%;
`;

function FormError({ message }) {
  return message === "" || !message ? null : (
    <SFormError>
      <Warning src={warningImg} />
      {message}
    </SFormError>
  );
}

export default FormError;
