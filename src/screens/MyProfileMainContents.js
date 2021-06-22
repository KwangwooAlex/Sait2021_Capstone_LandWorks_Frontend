import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import hamburgerMenu from "../asset/HamburgerMenu.PNG";
import avatar from "../asset/avatarTT.PNG";
import questionMark from "../asset/questionMark.PNG";
import logout from "../asset/logout.PNG";
import Input from "../components/auth/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import routes from "../routes";
import { fauser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
// import MyProfileEdit from "./MyProfileEdit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Modal from "react-modal";
import useUser from "../components/hooks/useUser";
import {
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUpload,
} from "@fortawesome/free-solid-svg-icons";


// const SEE_PROFILE_QUERY = gql`
//   query seeProfile($username: String!) {
//     seeProfile(username: $username) {
//       id
//       username
//       email
//       companyName
//       phoneNumber
//       avatar
//       birth
//       country
//       state
//       city
//       Street
//     }
//   }
// `;

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
    ) {
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

const InfoSection = styled.div`
  display: flex;
  margin: 10% 25%;
  justify-content: center;
  align-items: center;

`;

const InputContainer = styled.div`
  flex: 0.7;
  display: flex;
`;

const AccountInfo = styled.div`
  margin-right: 20px;
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

const PhotoInfo = styled.div``;
              
const PhotoBtn = styled.div``; 

const ProfileImg = styled.div`
  flex: 0.3;
  width: 100%;
`;

const ShowImg = styled.div``;

const ProfileImgEdit = styled.button``;

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

const ImgTitle = styled.h1`
  font-family:Source Han Sans KR;
  margin-top: 50px;
  text-align: left;
  font-weight: bold;
  margin-left: 20px;
  font-size: 20px
`;

const ImgInput = styled.input`
  align-items: center;
  display: none; 
`;

const UploadLabel = styled.label`
  margin-top: 20px;
  margin-left: 30px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  color: #004070;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px
`;


function MyProfileMainContents() {
  const { data: userData } = useUser();
  // console.log("userData", userData);

  const [disabled, setDisabled] = useState(true);
  const [activeEditBtn, setActiveEditBtn] = useState("Edit");
  const [activeConfirmPassword, setActiveConfirmPassword] = useState(false);
  // const [editMode, setEditMode] = useState(false);
  const [inputChange, setInputChange] = useState("");
  const handleChange = (e) => {
    setInputChange({
      [e.target.name] : e.target.value
    });
  };

  const handleEditClick = () => {
    setDisabled(!disabled);

    if (activeConfirmPassword) {
      setActiveConfirmPassword(false);
      setActiveEditBtn("Edit");
      alert("Your profile has been saved.");
      // setEditMode(false);
    } else {
      setActiveConfirmPassword(true);
      setActiveEditBtn("Save");
      // setEditMode(true); 
      setInputChange(inputChange);  
    }
  };
  console.log("userData", userData);



  // const location = useLocation();
  // const { getValues } = useForm({
  //   mode: "onChange",
  //   defaultValues: {
  //     username: location?.state?.username || "",
  //     companyName: location?.state?.companyName|| "",
  //     email: location?.state?.email || "",
  //     phoneNumber: location?.state?.phoneNumber || ""
  //   },
  // });
  // const { editProfile,  loading  } = useMutation(EDIT_PROFILE_MUTATION);
  
  // const onSubmitValid = (data) => {
  //   if (loading) {
  //     return;
  //   }
  //   const { username, companyName, email, phoneNumber } = getValues();
  //   console.log("email", email);
  //   editProfile({
  //     variables: { username, companyName, email, phoneNumber },
  //   });
  // };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveModal = () => {
    alert("Your changed has been saved.");
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <MainTitle>
        MY PROFILE
        <EditBtn type="submit" onClick={handleEditClick}>
          {activeEditBtn}
        </EditBtn>
      </MainTitle>

      {/* {editMode ? (
        <MyProfileEdit></MyProfileEdit>
      ) : ( */}
        {/* // } */}
        <InfoSection>
          <InputContainer>
            <AccountInfo>
              <InfoTitle>Account Information</InfoTitle>
              <InfoSubTitle>User Name</InfoSubTitle>
              <Input
                type="text"
                name="username"
                placeholder={userData?.me?.username}
                disabled={disabled}
                onChange={handleChange}
              />
              <InfoSubTitle>Company Name</InfoSubTitle>
              <Input
                type="text"
                name="companyName"
                placeholder={userData?.me?.companyName}
                disabled={disabled}
              />
              <InfoSubTitle>Email</InfoSubTitle>
              <Input
                type="email"
                name="email"
                placeholder={userData?.me?.email}
                disabled={disabled}
              />
              <InfoSubTitle>Phone Number</InfoSubTitle>
              <Input
                type="number"
                name="phoneNumber"
                placeholder={userData?.me?.phoneNumber}
                disabled={disabled}
              />


              {activeConfirmPassword && (
                <>
                  <InfoSubTitle>Password</InfoSubTitle>
                  <Input
                    type="password"
                    name="password"
                    placeholder={userData?.me?.password}
                    disabled={disabled}
                  />
                  <InfoSubTitle>Confirm Password</InfoSubTitle>
                  <Input type="text" name="password" />
                </>
              )}
            </AccountInfo>

            <PersonalInfo>
              <InfoTitle>Personal Information</InfoTitle>
              <InfoSubTitle>Date of Birth</InfoSubTitle>
              <Input
                type="text"
                name="birth"
                placeholder={userData?.me?.birth}
                disabled={disabled}
              />
              <InfoSubTitle>Country/Region</InfoSubTitle>
              <Input
                type="text"
                name="country"
                placeholder={userData?.me?.country}
                disabled={disabled}
              />
              <InfoSubTitle>State</InfoSubTitle>
              <Input
                type="text"
                name="state"
                placeholder={userData?.me?.state}
                disabled={disabled}
              />
              <InfoSubTitle>City</InfoSubTitle>
              <Input
                type="text"
                name="city"
                placeholder={userData?.me?.city}
                disabled={disabled}
              />
              <InfoSubTitle>Street</InfoSubTitle>
              <Input
                type="text"
                name="Street"
                placeholder={userData?.me?.Street}
                disabled={disabled}
              />
            </PersonalInfo>
          </InputContainer>

          <ProfileImg>           
            <FontAwesomeIcon icon={faUserCircle} size="9x" />            
            
            <ProfileImgEdit onClick={handleOpenModal}>Edit</ProfileImgEdit>
            
            <Modal isOpen={isModalOpen} style={customStyles}>
            
              <PhotoInfo>
                <ImgTitle>Change your profile picture</ImgTitle>

                <UploadLabel>
                  <ImgInput type="file" /> 
                  <FontAwesomeIcon icon={faUpload} size="2x" />  
                  Upload Picture
                </UploadLabel>
              
                <ShowImg>
                  <FontAwesomeIcon icon={faUserCircle} size="5x" />
                </ShowImg> 
                
              </PhotoInfo>

              <PhotoBtn>                      
                <SaveEditImg onClick={handleSaveModal}>Save</SaveEditImg>
                <CancelEditImg onClick={handleCancelModal}>Cancel</CancelEditImg>
              </PhotoBtn> 
              
            </Modal>
          </ProfileImg>
        </InfoSection>      
    </Container>
  );
}

export default MyProfileMainContents;
