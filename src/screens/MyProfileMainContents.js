import styled from "styled-components";
import Input from "../components/auth/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";
import EditIcon from "@material-ui/icons/Edit";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import FormError from "../components/auth/FormError";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $username: String
    $email: String
    $companyName: String
    $phoneNumber: String
    $password: String
    $birth: String
    $country: String
    $state: String
    $city: String
    $Street: String
    $avatar: Upload
  ) {
    editProfile(
      username: $username
      email: $email
      companyName: $companyName
      phoneNumber: $phoneNumber
      password: $password
      birth: $birth
      country: $country
      state: $state
      city: $city
      Street: $Street
      avatar: $avatar
    ) {
      ok
      error
      id
    }
  }
`;

const UPLOAD_AVATAR_MUTATION = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      ok
      error
    }
  }
`;

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
  &:hover {
    background: #012f52;
  }
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4%;
  margin-left: 15%;
`;

const InputContainer = styled.div`
  flex: 0.7;
  display: flex;
`;

const AccountInfo = styled.div`
  margin-right: 30px;
  width: 100%;
`;

const PersonalInfo = styled.div`
  margin-right: 5px;
  width: 100%;
`;

const InfoTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: white;
  text-align: center;
  background-color: #11569a;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 5px 5px lightgray;
  width: 90%;
`;

const InputPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Filed = styled.fieldset`
  border: 1px solid #11569a;
  /* margin-bottom: -5px; */
  margin-top: 25px;
  /* padding-left: 15px; */
  width: 90%;
  border-radius: 10px;
  box-shadow: 0px 2px 6px lightgray;
`;

const InfoSubTitle = styled.legend`
  margin-bottom: -50px;
  padding: 5px;
  font-size: 12px;
  color: #11569a;
  margin-left: 15px;
  /* width: 90%; */
`;

const InputField = styled(Input)`
  margin-top: 10px;
  border-radius: 10px;
  padding-left: 20px;
  border: 1px solid ${(props) => (props.hasError ? "tomato" : "gray")};
  border: none;
  &:focus {
    background-color: rgba(165, 215, 240, 0.2);
  }
  /* border-bottom: 1px solid gray; */
  /* background-color: #f7f7f7; */
`;

const ErrorMsg = styled.div`
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: -10px;
`;

const ProfileImgEdit = styled.span`
  border: none;
  background: none;
  margin-left: -15px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
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
    height: "310px",
    boxShadow: "0px 3px 8px gray",
  },
};

const PhotoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 15px;
`;

const UploadSection = styled.div``;

const ImgTitle = styled.h1`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 50px;
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
  margin-top: 30px;
  margin-left: 30px;
  /* display: inline-block; */
  padding: 6px 12px;
  cursor: pointer;
  color: #004070;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  font-weight: 600;
`;

const UploadLabel = styled.label`
  /* margin-left: 10px; */
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UpImg = styled.div`
  display: flex;
  margin-right: 15px;
`;

const ProfileImg = styled.div`
  flex: 0.3;
  width: 100%;
  margin-left: 40px;
`;

const ImgSection = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const AvatarImg = styled.img`
  margin-top: -30px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid lightgray;
  box-shadow: 0px 3px 8px gray;
  &.modalAvatar {
    width: 150px;
    height: 150px;
    margin-top: -10px;
    box-shadow: 2px 3px 8px gray;
  }
`;

const AvatarName = styled.div`
  font-weight: bold;
  font-size: 20px;
  /* margin-left: 40px; */
`;

const ShowImg = styled.div`
  margin-top: 50px;
`;

const PhotoBtn = styled.div`
  margin-top: 40px;
  margin-right: 20px;
`;

const CancelEditImg = styled.button`
  background: white;
  border: 2x solid;
  border-color: #b8b8b8;
  color: #004070;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
`;

const SaveEditImg = styled.button`
  margin-left: 18px;
  background: #004070;
  border: none;
  color: white;
  float: right;
  width: 80px;
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  &:hover {
    background: #012f52;
  }
`;

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; // January is 0
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

function MyProfileMainContents() {
  const { data: userData, refetch } = useQuery(ME_QUERY);

  const [disabled, setDisabled] = useState(true);
  const [activeEditBtn, setActiveEditBtn] = useState("Edit");
  const [activeConfirmPassword, setActiveConfirmPassword] = useState(false);
  const [inputChange, setInputChange] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  const { handleSubmit, setValue, watch, register, errors } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    console.log("AvatarData", data);
    const {
      uploadAvatar: { ok, error },
    } = data;

    refetch();
  };

  const [uploadAvatar, { loading: uploadAvatarLoading }] = useMutation(
    UPLOAD_AVATAR_MUTATION,
    {
      onCompleted,
    }
  );

  useEffect(() => {
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
  }, [userData, setValue]);

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setValue("username", e.target.value);
    }
    if (e.target.name === "companyName") {
      setValue("companyName", e.target.value);
    }
    if (e.target.name === "email") {
      setValue("email", e.target.value);
    }
    if (e.target.name === "phoneNumber") {
      setValue("phoneNumber", e.target.value);
    }
    if (e.target.name === "password") {
      setValue("password", e.target.value);
    }
    if (e.target.name === "birth") {
      setValue("birth", e.target.value);
    }
    if (e.target.name === "country") {
      setValue("country", e.target.value);
    }
    if (e.target.name === "state") {
      setValue("state", e.target.value);
    }
    if (e.target.name === "city") {
      setValue("city", e.target.value);
    }
    if (e.target.name === "Street") {
      setValue("Street", e.target.value);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // const handleSaveModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancelModal = () => {
    setAvatarUrl(userData?.me?.avatar);
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setDisabled(!disabled);
    setInputChange(inputChange);

    if (activeConfirmPassword) {
      setActiveConfirmPassword(false);
      setActiveEditBtn("Edit");
      alert("Your profile has been saved.");
    } else {
      setActiveConfirmPassword(true);
      setActiveEditBtn("Save");
    }
  };
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION);

  const onSubmitAvatarValidTest = (data) => {
    // console.log("잘오나 아바타?", data);
    setAvatar(data?.avatar[0]);

    let reader = new FileReader();
    reader.readAsDataURL(data?.avatar[0]);
    reader.onload = () => {
      setAvatarUrl(reader.result);
    };
  };

  const onSubmitAvatarValid = (data) => {
    handleCancelModal();
    alert("Saved Your Avatar");
    // console.log("Avatardata", data);
    // console.log("state/avatar,", avatar);
    if (uploadAvatarLoading) {
      return;
    }
    uploadAvatar({
      variables: {
        file: avatar,
      },
    });
    setAvatar(undefined);
  };

  const onSaveValid = (data) => {
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
  console.log("avataravataravatar", avatar);
  console.log("userData?.me?.avatar", userData?.me?.avatar);
  return (
    <Container>
      <form onSubmit={handleSubmit(onSaveValid, onSaveInvalid)}>
        <MainTitle>MY PROFILE</MainTitle>
        <EditBtn type="submit">{activeEditBtn}</EditBtn>

        <InfoSection>
          <InputContainer>
            <AccountInfo>
              <InputPart>
                <InfoTitle>Account Information</InfoTitle>
              </InputPart>

              <InputPart>
                <Filed>
                  <InfoSubTitle>User Name</InfoSubTitle>
                  <>
                    <InputField
                      // <Input
                      ref={register({
                        required: "Username is required",
                        minLength: {
                          value: 2,
                          message: "Username should be atleast 2 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "Username should be less than 30 characters",
                        },
                      })}
                      type="text"
                      name="username"
                      value={watch("username")}
                      placeholder={userData?.me?.username}
                      disabled={disabled}
                      onChange={handleChange}
                      hasError={Boolean(errors?.username?.message)}
                    />
                    {/* <FormError message={errors?.username?.message} /> */}
                  </>
                </Filed>
                <ErrorMsg>
                  <FormError message={errors?.username?.message} />
                </ErrorMsg>

                <Filed>
                  <InfoSubTitle>Company Name</InfoSubTitle>
                  <>
                    <InputField
                      // <Input
                      ref={register({
                        required: "Company name is required",
                        minLength: {
                          value: 2,
                          message:
                            "Company name should be atleast 2 characters",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "Company name should be less than 50 characters",
                        },
                      })}
                      type="text"
                      name="companyName"
                      value={watch("companyName")}
                      placeholder={userData?.me?.companyName}
                      disabled={disabled}
                      onChange={handleChange}
                      hasError={Boolean(errors?.companyName?.message)}
                    />
                  </>
                </Filed>
                <ErrorMsg>
                  <FormError message={errors?.companyName?.message} />
                </ErrorMsg>
                <Filed>
                  <InfoSubTitle>Email</InfoSubTitle>
                  <>
                    <InputField
                      // <Input
                      ref={register({
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Enter a valid Email",
                        },
                      })}
                      type="email"
                      name="email"
                      value={watch("email")}
                      placeholder={userData?.me?.email}
                      disabled={disabled}
                      onChange={handleChange}
                      hasE
                      hasError={Boolean(errors?.email?.message)}
                    />
                  </>
                </Filed>
                <ErrorMsg>
                  <FormError message={errors?.email?.message} />
                </ErrorMsg>
                <Filed>
                  <InfoSubTitle>Phone Number</InfoSubTitle>
                  <>
                    <InputField
                      // <Input
                      ref={register({
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{3}[0-9]{3}[0-9]{4}$/i,
                          message: "Enter a valid Phone Number",
                        },
                      })}
                      type="number"
                      name="phoneNumber"
                      value={watch("phoneNumber")}
                      placeholder={userData?.me?.phoneNumber}
                      disabled={disabled}
                      onChange={handleChange}
                      hasError={Boolean(errors?.phoneNumber?.message)}
                    />
                  </>
                </Filed>
                <ErrorMsg>
                  <FormError message={errors?.phoneNumber?.message} />
                </ErrorMsg>

                {activeConfirmPassword && (
                  <Filed>
                    <>
                      {/* <InfoSubTitle>Password</InfoSubTitle>
                  <Input
                    ref={register}
                    type="password"
                    name="password"
                    value={watch("password")}
                    placeholder={userData?.me?.password}
                    disabled={disabled}
                    onChange={handleChange} 
                  />*/}

                      <InfoSubTitle>Password</InfoSubTitle>
                      <InputField
                        // <Input
                        ref={register}
                        type="password"
                        name="password"
                        value={watch("password")}
                        placeholder={userData?.me?.password}
                        disabled={disabled}
                        onChange={handleChange}
                      />
                    </>
                  </Filed>
                )}
              </InputPart>
            </AccountInfo>

            <PersonalInfo>
              <InputPart>
                <InfoTitle>Personal Information</InfoTitle>
              </InputPart>
              <InputPart>
                <Filed>
                  <InfoSubTitle>Date of Birth</InfoSubTitle>
                  <InputField
                    // <Input
                    ref={register}
                    value={watch("birth")}
                    type="text"
                    name="birth"
                    placeholder={userData?.me?.birth}
                    // max={getCurrentDate()}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                </Filed>
                <Filed>
                  <InfoSubTitle>Country/Region</InfoSubTitle>
                  <InputField
                    // <Input
                    ref={register}
                    value={watch("country")}
                    type="text"
                    name="country"
                    placeholder={userData?.me?.country}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                </Filed>
                <Filed>
                  <InfoSubTitle>State</InfoSubTitle>
                  <InputField
                    // <Input
                    ref={register}
                    value={watch("state")}
                    type="text"
                    name="state"
                    placeholder={userData?.me?.state}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                </Filed>
                <Filed>
                  <InfoSubTitle>City</InfoSubTitle>
                  <InputField
                    // <Input
                    ref={register}
                    value={watch("city")}
                    type="text"
                    name="city"
                    placeholder={userData?.me?.city}
                    disabled={disabled}
                    onChange={handleChange}
                  />
                </Filed>
                <Filed>
                  <InfoSubTitle>Street</InfoSubTitle>
                  <InputField
                    // <Input
                    ref={register({
                      minLength: {
                        value: 6,
                        message: "Street should be atleast 6 characters",
                      },
                      maxLength: {
                        value: 30,
                        message:
                          "Company name should be less than 30 characters",
                      },
                    })}
                    value={watch("Street")}
                    type="text"
                    name="Street"
                    placeholder={userData?.me?.Street}
                    disabled={disabled}
                    onChange={handleChange}
                    hasError={Boolean(errors?.Street?.message)}
                  />
                </Filed>
              </InputPart>
            </PersonalInfo>
          </InputContainer>

          <ProfileImg>
            <ImgSection>
              <AvatarImg src={userData?.me?.avatar} />
              {activeConfirmPassword && (
                <ProfileImgEdit onClick={handleOpenModal}>
                  <EditIcon />{" "}
                </ProfileImgEdit>
              )}
              {/* <AvatarName>{userData?.me?.username}</AvatarName> */}
            </ImgSection>

            <Modal isOpen={isModalOpen} style={customStyles}>
              <PhotoInfo>
                <UploadSection>
                  <ImgTitle>Change your profile picture</ImgTitle>
                  {/* 사진 업로드 */}
                  <UploadInput>
                    <UploadLabel>
                      <ImgInput
                        type="file"
                        name="avatar"
                        accept="image/*"
                        ref={register({ required: false })}
                        onChange={handleSubmit(onSubmitAvatarValidTest)}
                      />
                      <UpImg>
                        <FontAwesomeIcon
                          className="uploadIcon"
                          icon={faUpload}
                          size="2x"
                        />
                      </UpImg>
                      Upload Picture
                    </UploadLabel>
                  </UploadInput>
                </UploadSection>
                <ShowImg>
                  {avatar === undefined ? (
                    <AvatarImg
                      src={userData?.me?.avatar}
                      className="modalAvatar"
                    />
                  ) : (
                    <AvatarImg src={avatarUrl} className="modalAvatar" />
                  )}
                </ShowImg>
              </PhotoInfo>

              <PhotoBtn>
                <SaveEditImg onClick={handleSubmit(onSubmitAvatarValid)}>
                  Save
                </SaveEditImg>
                <CancelEditImg onClick={handleCancelModal}>
                  Cancel
                </CancelEditImg>
              </PhotoBtn>
            </Modal>
          </ProfileImg>
        </InfoSection>
      </form>
    </Container>
  );
}

export default MyProfileMainContents;
