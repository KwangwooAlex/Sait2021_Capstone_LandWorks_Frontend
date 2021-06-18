import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";
import Input from "../components/auth/Input";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import routes from "../routes";
import {
    fauser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String!
    $email: String
    $companyName: String!
    $phoneNumber: String!
    $password: String!
    $avatar: String!
  ) {
    editProfile(
      username: $username
      email: $email
      companyName: $companyName
      phoneNumber: $phoneNumber
      password: $password
      avatar: $avatar
    ){
      ok
      error
      id
    }
  }
`;


const Container = styled.main`
  padding: 40px 40px 0 40px;
  height: 100%;
  /* background-color: black; */
  width: 90%;
  
`;

const MainTitle = styled.div`
  color: #004070;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 30px;
  width: 100%;
  height: 40px;
  border-bottom: black 2px solid;
  box-sizing: border-box;
`;

const EditBtn = styled.button` 
  border-radius: 10px;
  background: white;
  border: 1px solid;
  color: #707070;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
`;

const InforSection = styled.div`
  display: flex;
  margin-top: 40px;
`;

const InputContainer = styled.div` 
  column-count: 2;
  flex: 7;
`;

const InfoTitle = styled.h2`
  font-size: 20px;
`;

const InfoSubTitle = styled.h5`
  margin-bottom: -20px;
  margin-top: 25px;
`;

const ICON = styled.div`
  object-fit: contain;  
  cursor: pointer;
  flex: 3;
  color: black;
`;

function MyProfileMainContents() {
    const history = useHistory();

    const onCompleted = (data) => {
      const { username, email, companyName, phoneNumber, password } = getValues();
      const {
        editProfile: { ok, error, id },
      } = data;
      if (!ok) {
        return;
      }
      //error is needed
      history.push(routes.myProfile, {
        username,
        email,
        companyName,
        phoneNumber,
        password
      });
    };

    const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
        onCompleted,
      });
      
    const {
      register,
      // handleSubmit,
      errors,
      // formState,
      getValues,
      // setError,
      // clearErrors,
    } = useForm({
      mode: "onChange",
    });

  return (
    <Container>
      <MainTitle>
        MY PROFILE
        <EditBtn>Edit</EditBtn>
      </MainTitle>

      <InforSection> 
        <InputContainer>
          <InfoTitle>Account Information</InfoTitle>
          <InfoSubTitle>User Name</InfoSubTitle>
          <Input
            type="text"
            name="username"
          />
          <InfoSubTitle>Company Name</InfoSubTitle>
          <Input
            type="text"
            name="companyName"        
          />
          <InfoSubTitle>Email</InfoSubTitle>
          <Input
            type="text"
            name="email"        
          />
          <InfoSubTitle>Phone Number</InfoSubTitle>      
          <Input
            type="text"
            name="phoneNumber"        
          />
          <InfoSubTitle>Password</InfoSubTitle>      
          <Input
            type="text"
            name="password"        
          />      

          <InfoTitle>Personal Information</InfoTitle>
          <InfoSubTitle>Date of Birth</InfoSubTitle>
          <Input
            type="text"
            name="email"        
          />
          <InfoSubTitle>Country/Region</InfoSubTitle>
          <Input
            type="text"
            name="email"        
          />
          <InfoSubTitle>State</InfoSubTitle>
          <Input
            type="text"
            name="email"        
          />
          <InfoSubTitle>City</InfoSubTitle>
          <Input
            type="text"
            name="email"        
          />
          <InfoSubTitle>Street</InfoSubTitle>      
          <Input
            type="text"
            name="email"        
          />
        </InputContainer>     
        <ICON>
            {/* <FontAwesomeIcon icon={fauser} size="lg" /> */}
            <i class="fas fa-user"></i>
        </ICON>
        
      </InforSection>


      
    </Container>
  );
}

export default MyProfileMainContents;
