import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";
import Input from "../components/auth/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import routes from "../routes";
import {
    fauser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import Modal from "react-modal";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!){
    seeProfile(username: $username) {
      id
      username
      email
      companyName
      phoneNumber
      avatar
      birth
      country
      state
      city
      Street
    }
  }
`;

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


const InfoSection = styled.div`
  display: flex;
  margin-top: 40px;
  padding: 0;
`;

const InputContainer = styled.div` 
  flex: 0.7;
  display: flex;  

`;

const AccountInfo = styled.div`
  margin-right: 20px;
  width:100%;
  
`;

const PersonalInfo = styled.div`
  margin-right: 5px;
  width:100%;
`;

const InfoTitle = styled.h2`
  font-size: 20px;
`;

const InfoSubTitle = styled.h5`
  margin-bottom: -20px;
  margin-top: 25px;
`;

const ProfileImg = styled.div`
  flex: 0.3;
  width: 100%;
`;

const Avatar = styled(AccountCircleIcon)`
  object-fit: contain;  
  cursor: pointer;
  flex: 0.3;
  color: black;
  width: 100px;
  align-items:center;
`;



function MyPofileEdit() { 

  // const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username: "ckdgksdl" }, //<--- 광우한테 물어보자
    }
  );
  // console.log(data.seeProfile.username);
  const { editProfile } = useMutation(EDIT_PROFILE_MUTATION);

  return ( 
      <InfoSection>
        <InputContainer>
          <AccountInfo>
            <InfoTitle>Account Information</InfoTitle>
            <InfoSubTitle>User Name</InfoSubTitle>
            <Input
              type="text" 
              name="username"
              // value={data.seeProfile.username}
            //   disabled={disabled}
            />
            <InfoSubTitle>Company Name</InfoSubTitle>
            <Input
              type="text"
              name="companyName"
              // value={data.seeProfile.companyName}
              // disabled={disabled}        
            />
            <InfoSubTitle>Email</InfoSubTitle>
            <Input
              type="email"
              name="email" 
              // value={data.seeProfile.email}
              // disabled={disabled}       
            />
            <InfoSubTitle>Phone Number</InfoSubTitle>      
            <Input
              type="number"
              name="phoneNumber"
              // value={data.seeProfile.phoneNumber}
              // disabled={disabled}        
            />
            <InfoSubTitle>Password</InfoSubTitle>      
            <Input
              type="password"
              name="password" 
              // value={data.seeProfile.password}
              // disabled={disabled}       
            />

              <InfoSubTitle>Confirm Password</InfoSubTitle>      
              <Input
                type="text"
                name="password"           
              />

          </AccountInfo>
          
          <PersonalInfo>
            <InfoTitle>Personal Information</InfoTitle>
            <InfoSubTitle>Date of Birth</InfoSubTitle>
            <Input 
              type="text"
              name="birth" 
              // value={data.seeProfile.birth} 
              // disabled={disabled}      
            />
            <InfoSubTitle>Country/Region</InfoSubTitle>
            <Input
              type="text"
              name="country"
              // value={data.seeProfile.country}
              // disabled={disabled}        
            />
            <InfoSubTitle>State</InfoSubTitle>
            <Input
              type="text"
              name="state" 
              // value={data.seeProfile.state}
              // disabled={disabled}       
            />
            <InfoSubTitle>City</InfoSubTitle>
            <Input
              type="text"
              name="city" 
              // value={data.seeProfile.city}
              // disabled={disabled}       
            />
            <InfoSubTitle>Street</InfoSubTitle>      
            <Input
              type="text"
              name="Street"  
              // value={data.seeProfile.Street}
              // disabled={disabled}      
            />
          </PersonalInfo>
        </InputContainer>

        <Avatar>
          {/* <AccountCircleIcon></AccountCircleIcon> */}
        </Avatar>

        </InfoSection> 

  );
}

export default MyPofileEdit;
