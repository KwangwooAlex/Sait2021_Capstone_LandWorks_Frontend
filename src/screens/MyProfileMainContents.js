import styled from "styled-components";
import Input from "../components/auth/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";
import EditIcon from '@material-ui/icons/Edit';
import {
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";


const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $email: String
    $companyName: String
    $phoneNumber: String
    $password: String
    $avatar: String
    $birth: String
    $country: String
    $state: String
    $city: String
    $Street: String
  ) {
    editProfile(
      username: $username
      email: $email
      companyName: $companyName
      phoneNumber: $phoneNumber
      password: $password
      avatar: $avatar
      birth: $birth
      country: $country
      state: $state
      city: $city
      Street: $Street

    ) {
      ok
      error
      id
    }
  }
`;
// $birth: String

// birth: $birth


const ME_QUERY = gql`
  query me {
    me {
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

const Container = styled.main`
  padding: 40px 40px 0 40px;
  height: 100%;
  /* background-color: black; */
  width: 90%;
`;

const MainTitle = styled.div`
  color: #004070;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20px;
  width: 100%;
  height: 40px;
  border-bottom: black 2px solid;
  box-sizing: border-box;
`;

const EditBtn = styled.button`
  border-radius: 10px;
  background: #004070;
  border: 1px solid;
  color: white;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  box-shadow: 0px 2px 4px gray;
  cursor: pointer;
  margin-top: 25px;
`;

const InfoSection = styled.div`
  display: flex;
  /* margin: 10% 25%; */
  justify-content: center;
  align-items: center;
  margin-top: 7%;
  margin-left: 20%;
`;

const InputContainer = styled.div`
  flex: 0.7;
  display: flex;
`;

const AccountInfo = styled.div`
  margin-right: 50px;
  width: 100%;
`;

const PersonalInfo = styled.div`
  margin-right: 5px;
  width: 100%;
`;

const InfoTitle = styled.h2`
  font-size: 20px;
`;

const InfoSubTitle = styled.h5`
  margin-bottom: -20px;
  margin-top: 25px;
`;

const ProfileImgEdit = styled.span`
  border: none;
  background: none;
  margin-left: -15px;
  cursor: pointer;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "300px",
  },
};

const PhotoInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UploadSection = styled.div`

`;

const ImgTitle = styled.h1`
  font-family:Source Han Sans KR;
  margin-top: 70px;
  text-align: left;
  font-weight: bold;
  margin-left: 20px;
  font-size: 20px;
`;

const ImgInput = styled.input`
  align-items: center;
  display: none; 
`;

const UploadInput = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: #004070;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
`;

const UploadLabel = styled.label`
  margin-left: 10px;
`;

const ProfileImg = styled.div`
  flex: 0.3;
  width: 100%;
  margin-left: 40px;
`;

const ShowImg = styled.div`
  margin-top: 50px;
`;

const PhotoBtn = styled.div`
  margin-top: 40px;
`; 

const CancelEditImg = styled.button`
  background: white;
  border: 2x solid;
  border-color:#B8B8B8;
  color: #004070;
  float: right;
  width: 80px;
  height: 30px; 
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  `;

const SaveEditImg = styled.button`
  margin-left:18px;
  background: #004070;
  border: none;
  color: white;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  `;

const AvatarImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid lightgray;
`;

function MyProfileMainContents() {

  // const { data: userData, refetch:userDataRefetch } = useUser();
  const { data: userData, refetch } = useQuery(ME_QUERY);
  
  const [disabled, setDisabled] = useState(true);
  const [activeEditBtn, setActiveEditBtn] = useState("Edit");
  const [activeConfirmPassword, setActiveConfirmPassword] = useState(false);
  const [inputChange, setInputChange] = useState("");

  const {handleSubmit, setValue, watch, register} = useForm({
    mode: "onChange",
  });

  useEffect(( ) => {
    setValue("username", userData?.me?.username);
    setValue("companyName", userData?.me?.companyName);
    setValue("email", userData?.me?.email);
    setValue("phoneNumber", userData?.me?.phoneNumber);
    setValue("password", userData?.me?.password);
    setValue("birth", userData?.me?.birth);
    setValue("country", userData?.me?.country);
    setValue("state", userData?.me?.state);
    setValue("city", userData?.me?.city);
    setValue("Street", userData?.me?.Street);
  },[userData, setValue]);

  const handleChange = (e) => {
    if(e.target.name === "username"){
      setValue("username", e.target.value);
    }
    if(e.target.name === "companyName"){
      setValue("companyName", e.target.value);
    }
    if(e.target.name === "email"){
      setValue("email", e.target.value);
    }
    if(e.target.name === "phoneNumber"){
      setValue("phoneNumber", e.target.value);
    }
    if(e.target.name === "password"){
      setValue("password", e.target.value);
    }
    if(e.target.name === "birth"){
      setValue("birth", e.target.value);
    }
    if(e.target.name === "country"){
      setValue("country", e.target.value);
    }
    if(e.target.name === "state"){
      setValue("state", e.target.value);
    }
    if(e.target.name === "city"){
      setValue("city", e.target.value);
    }
    if(e.target.name === "Street"){
      setValue("Street", e.target.value);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = () => {
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setDisabled(!disabled);
    setInputChange(inputChange);

    if (activeConfirmPassword) {
      setActiveConfirmPassword(false);
      setActiveEditBtn("Edit");
      alert("Your profile has been saved.");
      // setInputChange(setValue);
    } else {
      setActiveConfirmPassword(true);
      setActiveEditBtn("Save");
      // setInputChange(setValue);  
    }
  };
  // console.log("userData", userData);

  const [editProfile,{loading}] = useMutation(EDIT_PROFILE_MUTATION); 

  const onSaveValid = (data) =>  {
    handleEditClick();    
    console.log("saveData", data);
    if (loading) {
      return;
    }
    editProfile({
      variables: { 
        ...data,
      },
    });
    refetch();
  };

  const onSaveInvalid = (data) => {};

  
  return (
    <Container>
      <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}> 
      <MainTitle>
        MY PROFILE
        {/* <EditBtn type="submit" onClick={handleEditClick}> */}
      </MainTitle>
        <EditBtn type="submit">
          {activeEditBtn}
        </EditBtn>

        <InfoSection>
          <InputContainer>
          
            <AccountInfo>
              <InfoTitle>Account Information</InfoTitle>
              <InfoSubTitle>User Name</InfoSubTitle>
              <Input
                ref={register}
                type="text"
                name="username"
                value={watch("username")}
                placeholder={userData?.me?.username}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>Company Name</InfoSubTitle>
              <Input
                ref={register}
                type="text"
                name="companyName"
                value={watch("companyName")}
                placeholder={userData?.me?.companyName}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>Email</InfoSubTitle>
              <Input
                ref={register}
                type="email"
                name="email"
                value={watch("email")}
                placeholder={userData?.me?.email}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>Phone Number</InfoSubTitle>
              <Input
                ref={register}
                type="number"
                name="phoneNumber"
                value={watch("phoneNumber")}
                placeholder={userData?.me?.phoneNumber}
                disabled={disabled}
                onChange={handleChange}
              />


              {activeConfirmPassword && (
                <>
                  <InfoSubTitle>Password</InfoSubTitle>
                  <Input
                    ref={register}
                    type="password"
                    name="password"
                    value={watch("password")}
                    placeholder={userData?.me?.password}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                  <InfoSubTitle>Confirm Password</InfoSubTitle>
                  <Input 
                    ref={register}
                    type="password"
                    name="password"
                    value={watch("password")}
                    placeholder={userData?.me?.password}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                    
                </>
              )}
            </AccountInfo>       

            <PersonalInfo>
              <InfoTitle>Personal Information</InfoTitle>
              <InfoSubTitle>Date of Birth</InfoSubTitle>
              <Input
                ref={register}
                value={watch("birth")}                               
                type="text"
                name="birth"
                placeholder={userData?.me?.birth}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>Country/Region</InfoSubTitle>
              <Input
                ref={register}
                value={watch("country")}  
                type="text"
                name="country"
                placeholder={userData?.me?.country}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>State</InfoSubTitle>
              <Input
                ref={register}
                value={watch("state")} 
                type="text"
                name="state"
                placeholder={userData?.me?.state}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>City</InfoSubTitle>
              <Input
                ref={register}
                value={watch("city")} 
                type="text"
                name="city"
                placeholder={userData?.me?.city}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>Street</InfoSubTitle>
              <Input
                ref={register}
                value={watch("Street")}
                type="text"
                name="Street"
                placeholder={userData?.me?.Street}
                disabled={disabled}
                onChange={handleChange}
              />
            </PersonalInfo>
          </InputContainer>

          <ProfileImg>           
            <AvatarImg src={userData?.me?.avatar} /> 
            {activeConfirmPassword && (           
            
            <ProfileImgEdit onClick={handleOpenModal}><EditIcon />  </ProfileImgEdit>
            )}
            
            <Modal isOpen={isModalOpen} style={customStyles}>
            
              <PhotoInfo>
              <UploadSection>
                <ImgTitle>Change your profile picture</ImgTitle>

                
                  <UploadInput>
                    <ImgInput type="file" /> 
                    <FontAwesomeIcon className="uploadIcon" icon={faUpload} size="2x" />
                    <UploadLabel>Upload Picture</UploadLabel>
                  </UploadInput>
                </UploadSection>
                  <ShowImg>
                    <AvatarImg src={userData?.me?.avatar} /> 
                  </ShowImg>                 
              </PhotoInfo>

              <PhotoBtn>                      
                <SaveEditImg onClick={handleSaveModal}>Save</SaveEditImg>
                <CancelEditImg onClick={handleCancelModal}>Cancel</CancelEditImg>
              </PhotoBtn> 
              
            </Modal>
          </ProfileImg>
        </InfoSection>
        </form>
    </Container>
  );
}

export default MyProfileMainContents;