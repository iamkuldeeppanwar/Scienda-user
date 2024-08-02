import React, { useEffect, useState } from "react";
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

const MyAccount = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImages(file);
      } else {
        toast.error("Please select a valid image file.");
        e.target.value = null;
        return;
      }
    }

    if (e.target.files.length > 1) {
      toast.error("Please select only one file.");
      e.target.value = null;
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
      if (response.success) {
        dispatch(setUser(response));
      }
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
    <ModuleLayout>
      <ToastContainer />
      <h3 className="text-36 font-semibold text-color-secondary">My Account</h3>

      <div className="px-3 py-4 account-details-container">
        <div className="form-container ">
          <Form onSubmit={profileUpdateHandler}>
            <div className="d-flex align-items-center column-gap-3">
              <span>
                <img
                  className="profile_pic"
                  src={profile}
                  alt="myaccount-profile"
                />
              </span>
              <p className="m-0 text-18 font-semibold">Account Details</p>
            </div>

            <div className=" container">
              <Row>
                <Col md={6}>
                  <Form.Group className="my-3 flex-grow-1">
                    <Form.Label className="text-14 font-normal">
                      First Name
                    </Form.Label>
                    <Form.Control
                      className="py-2 px-3"
                      type="text"
                      value={firstName}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="my-3 flex-grow-1">
                    <Form.Label className="text-14 font-normal">
                      Last Name
                    </Form.Label>
                    <Form.Control
                      className="py-2 px-3"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="my-3 flex-grow-1">
                    <Form.Label className="text-14 font-normal">
                      Phone No.
                    </Form.Label>
                    <PhoneInput
                      containerClass=""
                      inputClass=" w-100 m-0 border-0"
                      inputStyle={{
                        height: "2.7rem",
                      }}
                      buttonClass=" "
                      enableSearch={true}
                      countryCodeEditable={false}
                      // value={mobile}
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
                <Col md={6}>
                  <Form.Group className="my-3 flex-grow-1">
                    <Form.Label className="text-14 font-normal">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      className="py-2 px-3"
                      type="email"
                      disabled
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="my-3 flex-grow-1">
                    <Form.Label className="text-14 font-normal">DOB</Form.Label>
                    <Form.Control
                      className="py-2 px-3"
                      type="text"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-end align-items-center column-gap-3 mx-3 my-3">
              {!loading ? (
                <button
                  className="rounded-lg bg-color-primary text-white text-16 font-bold"
                  style={{
                    width: "9.2rem",
                    height: "3rem",
                    border: "1px solid var(--primary-color)",
                    boxShadow: "0px 1px 2px 0px #1018280D",
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="rounded-lg bg-color-primary text-white text-16 font-bold"
                  style={{
                    width: "9.2rem",
                    height: "3rem",
                    border: "1px solid var(--primary-color)",
                    boxShadow: "0px 1px 2px 0px #1018280D",
                  }}
                >
                  <Spinner size="sm" />
                </button>
              )}
            </div>
          </Form>
        </div>

        <div
          className="d-flex flex-grow-1 justify-content-center align-items-center mt-5"
          style={{ marginBottom: "6rem" }}
        >
          <div
            className="rounded-xl"
            style={{
              // width: "150px",
              height: "220px",
              border: "0.4px solid #00000038",
            }}
          >
            <div className="bg-white rounded-xl w-100 ">
              <h5 className="mx-auto pt-1 text-14 font-bold text-color-secondary text-center ">
                Upload Profile Picture
              </h5>
              <div className="text-center">
                <img
                  className="profile_pic"
                  src={profile}
                  alt="myaccount-profile"
                />
              </div>
            </div>
            <div style={{ backgroundColor: "#F1F1F1" }}>
              <div className="text-center text-12 font-bold text-color-secondary mt-4">
                Click to upload
                <div className="file_conatiner px-3">
                  <input type="file" onChange={handleFileChange} />
                  <span>
                    <UploadIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-4 account-details-container">
        <div className="form-container">
          <Form onSubmit={updatePasswordHandler}>
            <div className="d-flex align-items-center column-gap-3">
              <span>
                <PasswordLockIcon />
              </span>
              <p className="m-0 text-18 font-semibold">Password & Security</p>
            </div>

            <div className="p-2">
              <Stack className="input-layout" direction="horizontal" gap={4}>
                <Form.Group className="my-3 flex-grow-1">
                  <Form.Label className="text-14 font-normal">
                    Current Password
                  </Form.Label>
                  <Form.Control
                    className="py-2 px-3"
                    type="password"
                    placeholder="**************"
                    value={currentPassword}
                    required
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Group>
              </Stack>

              <Row>
                <Col md={6}>
                  <Form.Group className="my-3 flex-grow-1">
                    <Form.Label className="text-14 font-normal">
                      New Password
                    </Form.Label>
                    <Form.Control
                      className="py-2 px-3 text-black"
                      type="password"
                      value={newPassword}
                      placeholder="**************"
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="my-3 flex-grow-1">
                    <Form.Label className="text-14 font-normal">
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      className="py-2 px-3"
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

            <div className="d-flex justify-content-end align-items-center column-gap-3 mx-2 my-3">
              {!passwordLoading ? (
                <button
                  className="rounded-lg bg-color-primary text-white text-16 font-bold"
                  style={{
                    width: "9.2rem",
                    height: "3rem",
                    border: "1px solid var(--primary-color)",
                    boxShadow: "0px 1px 2px 0px #1018280D",
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="rounded-lg bg-color-primary text-white text-16 font-bold"
                  style={{
                    width: "9.2rem",
                    height: "3rem",
                    border: "1px solid var(--primary-color)",
                    boxShadow: "0px 1px 2px 0px #1018280D",
                  }}
                >
                  <Spinner size="sm" />
                </button>
              )}
            </div>
          </Form>
        </div>

        {/* <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <div
            className="rounded-xl px-3 py-4 bg-white"
            style={{
              width: "370px",
              border: "0.4px solid #00000038",
            }}
          >
            <h5 className="text-16 font-bold">About Me..!</h5>
            <hr />
            <ul>
              <li className="text-14 my-2 font-light">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed.
              </li>
              <li className="text-14 my-2 font-light">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed.
              </li>
              <li className="text-14 my-2 font-light">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed.
              </li>
              <li className="text-14 my-2 font-light">
                It is a long established fact that a reader will be distracted
                by the readable content of a layout. The point of using Lorem
                Ipsum is that it has a{" "}
                <span className="font-medium">... Read More</span>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </ModuleLayout>
  );
};

export default MyAccount;
