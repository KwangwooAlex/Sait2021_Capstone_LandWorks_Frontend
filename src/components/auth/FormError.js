import styled from "styled-components";
import warningImg from "../../asset/warningImg.PNG";
const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 17px;
  margin: 0px 0px 10px 0px;
  display: flex;
  align-items: center;
  margin-left: -10px;
`;

const Warning = styled.img`
  margin-right: 10px;
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
