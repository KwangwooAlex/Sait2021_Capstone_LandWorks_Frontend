import React from 'react'
import styled from "styled-components";
import Input from "../components/auth/Input";


const InputContainer = styled.div` 
  flex: 7;
  display: flex;
`;

const AccountInfo = styled.div`
  margin-right: 20px;
`;

const PersonalInfo = styled.div`
  margin-right: 5px;
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

function MyProfileEditContents() {
    return (
      <>
      <InputContainer>
      <AccountInfo>
        <InfoTitle>Account Information</InfoTitle>
        <InfoSubTitle>User Name</InfoSubTitle>
        <Input
          type="text"
          name="username"
          // value={data.seeProfile.username}
          // disabled={disabled}
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
    </>
    )
}

export default MyProfileEditContents
