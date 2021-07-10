import styled from "styled-components";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { Link, useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import LogOutHeader from "../components/LogOutHeader";
import googleImg from "../asset/googleImg.PNG";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UnderHeader = styled.div`
  margin-left: auto;
  margin-right: 30px;
  width: 600px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ForgotUserName = styled.div`
  width: 200px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  color: white;
  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }

  margin-bottom: 8px;
`;

const ForgetPassWord = styled.div`
  width: 200px;
  font-size: 15px;
  font-weight: 400;
  color: white;
  cursor: pointer;

  margin-bottom: 8px;
  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const SignUp = styled.div`
 
  width: 100px;
  height: 35px;
  background-color: white;
  text-align: center;
  padding-top: 9px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
  &:hover {
    background-color: #025ca0;
    color: white;
  }
`;

const FormTitle = styled.div`
  margin-top: 70px;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: #004070;
  margin-bottom: 60px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
`;

const GoogleButton = styled.div`
  border: none;
  border-radius: 20px;
  border: 1px black solid;
  margin-top: 12px;
  background-color: white;
  color: black;
  text-align: center;
  height: 50px;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleImg = styled.img`
  margin-right: 10px;
  height: 20px;
  width: 20px;
`;

const RememberMeBox = styled.div`
  margin-top: 20px;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const RememberMeCheckBox = styled.div`
  height: 10px;
  width: 10px;
  border: 1px solid black;
  margin-right: 5px;
`;

const RememberMe = styled.div`
  color: #004070;
`;

function Login() {
  const location = useLocation();

  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: location?.state?.email || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    console.log("data", data);
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { email, password } = getValues();
    console.log("email", email);
    login({
      variables: { email, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const onSubmitInvalid = (data) => {};

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <LogOutHeader />
      <UnderHeader>
        <ForgotUserName>Forgot the username?</ForgotUserName>
        <ForgetPassWord>Forgot the password?</ForgetPassWord>
        <Link to="/sign-up">
          <SignUp>Sign Up</SignUp>
        </Link>
      </UnderHeader>
      <FormWrapper>
        <FormBox>
          <FormTitle>WELCOME TO LRMI PROJECT</FormTitle>
          <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
            <FormError message={errors?.email?.message} />
            <FormError message={errors?.password?.message} />
            <FormError message={errors?.result?.message} />
            <Input
              ref={register({
                required: "Email is required",
                // required가 true가 되면 메시지가 안나가고 검사만함
                minLength: {
                  value: 5,
                  message: "Email should be longer than 5 chars.",
                },
                //pattern : "", <-을통해 정규식 이용가능
                // validate:(currentValue)=> currentValue.includes("@")
              })}
              onChange={clearLoginError}
              name="email"
              type="text"
              placeholder="email@address.com"
              hasError={Boolean(errors?.email?.message)}
              // hasError는 임의로 만들어준것임! 빨간 테두리 위해!
            />

            <Input
              ref={register({
                required: "Password is required.",
              })}
              onChange={clearLoginError}
              name="password"
              type="password"
              placeholder="Password"
              hasError={Boolean(errors?.password?.message)}
            />

            <RememberMeBox>
              <RememberMeCheckBox></RememberMeCheckBox>
              <RememberMe>Remember me</RememberMe>
            </RememberMeBox>
            <Button
              type="submit"
              value={loading ? "Loading..." : "Log in"}
              disabled={!formState.isValid || loading}
            />

            <GoogleButton>
              <GoogleImg src={googleImg} />
              Log in with Google
            </GoogleButton>
            {/*isValid 다입력되면 true이고 아니면 false  */}
          </form>
        </FormBox>
      </FormWrapper>
    </AuthLayout>
  );
}
export default Login;
