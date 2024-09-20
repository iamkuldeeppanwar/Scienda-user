import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import "./MyAccount.css";
import ModuleLayout from "../../../layout/ModuleLayout";
import { PasswordLockIcon, UploadIcon } from "./components/my-account-icons";
import {
  userChangePassword,
  userGetProfile,
  userUpdateProfile,
} from "./apis/UserProfileAPIs";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { Col, Row, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";
import PhoneInput from "react-phone-input-2";
import HeaderContent from "../../../components/HeaderContent";

const MyAccount = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsFileSelected(true); // Mark as selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileRef.current) {
      fileRef.current.click(); // Trigger the file input click
    }
  };

  useEffect(() => {
    getProfile();
  }, [loading]);

  useEffect(() => {
    if (user && user.first_name) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setMobile(user.mobile || "");
      setDob(user.dob || "");
      setEmail(user.email || "");
      setProfile(
        user.profile_url ==
          "https://tse4.mm.bing.net/th?id=OIP.eXWcaYbEtO2uuexHM8sAwwHaHa&pid=Api&P=0&h=180"
          ? "https://tse4.mm.bing.net/th?id=OIP.eXWcaYbEtO2uuexHM8sAwwHaHa&pid=Api&P=0&h=180"
          : `https://creative-story.s3.amazonaws.com${user.profile_url}`
      );
    }
  }, [user]);

  const getProfile = async () => {
    try {
      const response = await userGetProfile(token);
      dispatch(setUser(response));
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const profileUpdateHandler = async (e) => {
    e.preventDefault();
    const phone = mobile.countryCode + mobile.mobile;

    const form = new FormData();
    form.append("first_name", firstName);
    form.append("last_name", lastName);
    form.append("mobile", phone);
    form.append("dob", dob);
    form.append("image", images);

    try {
      setLoading(true);
      const response = await userUpdateProfile(form, token);
      dispatch(setUser(response));
      toast.success(response.status);
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    const passwords = {
      old_password: currentPassword,
      password: newPassword,
      confirm_password: confrimPassword,
    };

    try {
      setPasswordLoading(true);
      const response = await userChangePassword(passwords, token);
      // toast.success(response.status);
      setPasswordLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setPasswordLoading(false);
    }
  };

  return (
    <>
      <HeaderContent content={"My Account"} />
      <ModuleLayout className="px-4" style={{ padding: 0 }}>
        <div className="px-3  account-details-container">
          <div className="form-container">
            <p className="ms-2 text-18 font-semibold">Upload Profile Picture</p>
            <div className="d-flex align-items-center gap-3">
              <img
                style={{
                  border: "2px solid #DCD6CB",
                }}
                className="profile_pic"
                src={profile}
                alt="myaccount-profile"
              />

              <div style={{ borderLeft: "1px solid #C7D7FE" }} className="py-2">
                <input
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                />
                <button
                  onClick={handleButtonClick}
                  className="px-3 py-1 m-2"
                  style={{
                    border: "none",
                    backgroundColor: "#00008B",
                    color: "white",
                    fontWeight: 500,
                    borderRadius: "5px",
                  }}
                >
                  Upload New <UploadIcon />
                </button>
              </div>
            </div>
            <hr />
            <Form onSubmit={profileUpdateHandler}>
              <div className="container">
                <p className="text-18 font-semibold">Basic Details</p>
                <Row className="mt-2">
                  <Col md={4}>
                    <Form.Group className="flex-grow-1">
                      <Form.Label className="text-14 font-medium">
                        First Name
                      </Form.Label>
                      <Form.Control
                        className="py-2 px-3 input-border"
                        type="text"
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="flex-grow-1">
                      <Form.Label className="text-14 font-medium">
                        Last Name
                      </Form.Label>
                      <Form.Control
                        className="py-2 px-3 input-border"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="flex-grow-1">
                      <Form.Label className="text-14 font-medium">
                        Phone No.
                      </Form.Label>
                      <PhoneInput
                        containerClass="input-border rounded-md"
                        inputClass=" w-100 m-0"
                        inputStyle={{
                          height: "2.7rem",
                          border: "0px",
                        }}
                        country="uk"
                        enableSearch={true}
                        countryCodeEditable={false}
                        onChange={(phone, code) => {
                          setMobile({
                            mobile: phone,
                            countryCode: code.countryCode,
                            dialCode: code.dialCode,
                          });
                        }}
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: true,
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group className="flex-grow-1">
                      <Form.Label className="text-14 font-medium">
                        Email Address
                      </Form.Label>
                      <Form.Control
                        className="py-2 px-3 input-border"
                        type="email"
                        disabled
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="flex-grow-1">
                      <Form.Label className="text-14 font-medium">
                        DOB
                      </Form.Label>
                      <Form.Control
                        className="py-2 px-3 input-border"
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="d-flex align-items-center column-gap-3 mx-1 mt-2">
                <button
                  className="px-4 py-2 m-2"
                  style={{
                    border: "none",
                    backgroundColor: "#00008B",
                    color: "white",
                    fontWeight: 500,
                    borderRadius: "5px",
                  }}
                >
                  {!loading ? "Save Changes" : <Spinner size="sm" />}
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="px-5">
          <hr />
        </div>

        <div className="px-3 py-4 account-details-container">
          <div className="form-container">
            <Form onSubmit={updatePasswordHandler}>
              <div className="ms-2">
                <p className="m-0 text-18 font-semibold">Password & Security</p>
              </div>

              <div className="p-2">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mt-2 flex-grow-1">
                      <Form.Label className="text-14 font-medium">
                        Current Password
                      </Form.Label>
                      <Form.Control
                        className="py-2 px-3 input-border"
                        type="password"
                        placeholder="**************"
                        value={currentPassword}
                        required
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-14 font-medium">
                        New Password
                      </Form.Label>
                      <Form.Control
                        className="py-2 px-3 input-border"
                        type="password"
                        value={newPassword}
                        placeholder="**************"
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-14 font-medium">
                        Confirm New Password
                      </Form.Label>
                      <Form.Control
                        className="py-2 px-3 input-border"
                        type="password"
                        required
                        placeholder="**************"
                        value={confrimPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="d-flex align-items-center column-gap-3 mx-1 mt-2">
                <button
                  className="px-4 py-2 m-2"
                  style={{
                    border: "none",
                    backgroundColor: "#00008B",
                    color: "white",
                    fontWeight: 500,
                    borderRadius: "5px",
                  }}
                >
                  {!passwordLoading ? "Save Changes" : <Spinner size="sm" />}
                </button>
              </div>
            </Form>
          </div>
        </div>
        <ToastContainer />
      </ModuleLayout>
    </>
  );
};

export default MyAccount;
