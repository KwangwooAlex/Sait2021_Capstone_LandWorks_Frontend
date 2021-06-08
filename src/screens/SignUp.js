import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../routes";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { Link, useHistory, useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import LogOutHeader from "../components/LogOutHeader";
import FormSignUpBox from "../components/auth/FormSignUpBox";
import SignUpButton from "../components/auth/SignUpButton";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String
    $companyName: String!
    $phoneNumber: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      companyName: $companyName
      phoneNumber: $phoneNumber
      password: $password
    ) {
      ok
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

const RedLetter = styled.div`
  display: inline;
  color: red;
  cursor: pointer;
  font-weight: 600;
`;

const FormTitle = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: #004070;
  margin-bottom: 15px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
`;

const AlreadyAccount = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const RememberMe = styled.div`
  color: #004070;
  font-weight: 500;
`;

const FormSubtitle = styled.div`
  font-size: 19px;
  font-weight: 600;
`;

const UnderHeader = styled.div`
  margin-left: auto;
  margin-right: 30px;
  width: 600px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

function SignUp() {
  const history = useHistory();

  const onCompleted = (data) => {
    const { email, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    //error is needed
    history.push(routes.home, {
      message: "Account created. Please log in.",
      email,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

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
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
      },
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
      <UnderHeader></UnderHeader>
      <FormWrapper>
        <FormSignUpBox>
          <FormTitle>WELCOME TO LWRM PROJECT</FormTitle>
          <FormSubtitle>Create an account</FormSubtitle>
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

            <Input
              ref={register({
                required: "Phone number is required.",
              })}
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
            />
            <Input
              ref={register}
              name="companyName"
              type="text"
              placeholder="Company Name"
            />

            <Input
              ref={register({
                required: "Username is required.",
              })}
              name="username"
              type="text"
              placeholder="User Name"
            />

            <SignUpButton
              type="submit"
              value={loading ? "Loading..." : "Sign Up"}
              disabled={!formState.isValid || loading}
            />

            <AlreadyAccount>
              <RememberMe>
                Already have been an account?
                <Link to="/">
                  <RedLetter> Login</RedLetter>
                </Link>
              </RememberMe>
            </AlreadyAccount>
            {/*isValid 다입력되면 true이고 아니면 false  */}
          </form>
        </FormSignUpBox>
      </FormWrapper>
    </AuthLayout>
  );
}
export default SignUp;
