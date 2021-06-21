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
import { fauser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import MyProfileEdit from "./MyProfileEdit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Modal from "react-modal";
import useUser from "../components/hooks/useUser";

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
const SaveBtn = styled.button`
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
  margin-top: 40px;
  padding: 0;
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
  align-items: center;
`;

const ProfileImgEdit = styled.button``;

const ConfirmEditImg = styled.button``;

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

function MyProfileMainContents() {
  const { data: userData } = useUser();
  // const { username } = useParams();
  // const { data } = useQuery(SEE_PROFILE_QUERY, {
  //   variables: { username: "Kwangwoo2" },
  // });
  // console.log(data.seeProfile.username);
  const { editProfile } = useMutation(EDIT_PROFILE_MUTATION);

  console.log("userData", userData);
  const [disabled, setDisabled] = useState(true);
  const [activeEditBtn, setActiveEditBtn] = useState("Edit");
  const [activeConfirmPassword, setActiveConfirmPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setDisabled(!disabled);

    if (activeConfirmPassword) {
      setActiveConfirmPassword(false);
      setActiveEditBtn("Edit");
      alert("Your profile has been saved.");
      setEditMode(false);
    } else {
      setActiveConfirmPassword(true);
      setActiveEditBtn("Save");
      setEditMode(true);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    alert("Your changed has been saved.");
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

      {editMode ? (
        <MyProfileEdit></MyProfileEdit>
      ) : (
        // }
        <InfoSection>
          <InputContainer>
            <AccountInfo>
              <InfoTitle>Account Information</InfoTitle>
              <InfoSubTitle>User Name</InfoSubTitle>
              <Input
                type="text"
                name="username"
                value={userData?.me?.username}
                disabled={disabled}
              />
              <InfoSubTitle>Company Name</InfoSubTitle>
              <Input
                type="text"
                name="companyName"
                value={userData?.me?.companyName}
                disabled={disabled}
              />
              <InfoSubTitle>Email</InfoSubTitle>
              <Input
                type="email"
                name="email"
                value={userData?.me?.email}
                disabled={disabled}
              />
              <InfoSubTitle>Phone Number</InfoSubTitle>
              <Input
                type="number"
                name="phoneNumber"
                value={userData?.me?.phoneNumber}
                disabled={disabled}
              />
              <InfoSubTitle>Password</InfoSubTitle>
              <Input
                type="password"
                name="password"
                value={userData?.me?.password}
                disabled={disabled}
              />
              {activeConfirmPassword && (
                <>
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
                value={userData?.me?.birth}
                disabled={disabled}
              />
              <InfoSubTitle>Country/Region</InfoSubTitle>
              <Input
                type="text"
                name="country"
                value={userData?.me?.country}
                disabled={disabled}
              />
              <InfoSubTitle>State</InfoSubTitle>
              <Input
                type="text"
                name="state"
                value={userData?.me?.state}
                disabled={disabled}
              />
              <InfoSubTitle>City</InfoSubTitle>
              <Input
                type="text"
                name="city"
                value={userData?.me?.city}
                disabled={disabled}
              />
              <InfoSubTitle>Street</InfoSubTitle>
              <Input
                type="text"
                name="Street"
                value={userData?.me?.Street}
                disabled={disabled}
              />
            </PersonalInfo>
          </InputContainer>

          <ProfileImg>
            <Avatar>{/* <AccountCircleIcon></AccountCircleIcon> */}</Avatar>
            <ProfileImgEdit onClick={handleOpenModal}>Edit</ProfileImgEdit>
            <Modal isOpen={isModalOpen} style={customStyles}>
              Edit Profile img
              <ConfirmEditImg onClick={handleCloseModal}>Save</ConfirmEditImg>
            </Modal>
          </ProfileImg>
        </InfoSection>
      )}
    </Container>
  );
}

export default MyProfileMainContents;
