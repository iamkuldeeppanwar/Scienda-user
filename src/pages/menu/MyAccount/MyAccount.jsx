import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import "./MyAccount.css";
import ModuleLayout from "../../../layout/ModuleLayout";
import {
  PasswordLockIcon,
  ProfileIcon,
  UploadIcon,
} from "./components/my-account-icons";
import {
  userGetProfile,
  userUpdatePassword,
  userUpdateProfile,
} from "./apis/UserProfileAPIs";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/userSlice";
import { Col, Row, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../../Utils/error";

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
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setProfile(file);
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
    setFirstName((user && user.first_name) || "");
    setLastName((user && user.last_name) || "");
    setMobile((user && user.mobile) || "");
    setDob((user && user.dob) || "");
    setEmail((user && user.email) || "");
    setProfile(user && user.profile_url);
  }, [loading]);

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
    const form = new FormData();
    form.append("first_name", firstName);
    form.append("last_name", lastName);
    form.append("mobile", mobile);
    form.append("dob", dob);
    form.append("image", profile);

    try {
      setLoading(true);
      const response = await userUpdateProfile(form, token);
      if (response.status) {
        toast.success(response.status);
        dispatch(setUser(response));
        setLoading(false);
      }
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    const passwords = {
      password: newPassword,
      confirm_password: confrimPassword,
    };

    try {
      setLoading(true);
      const response = await userUpdatePassword(passwords, token);
      if (response.status) {
        toast.success(response.status);
        dispatch(setUser(response));
        setLoading(false);
      }
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
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
                {/* <ProfileIcon /> */}
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
                    <Form.Control
                      className="py-2 px-3"
                      type="text"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
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
              {/* <button
                className="rounded-lg bg-white text-color-primary text-16 font-normal"
                style={{
                  width: "9.2rem",
                  height: "3rem",
                  border: "1px solid var(--primary-color)",
                  boxShadow: "0px 1px 2px 0px #1018280D",
                }}
              >
                Cancel
              </button> */}
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
                  <Spinner />
                </button>
              )}
            </div>
          </Form>
        </div>

        <div
          className="d-flex flex-grow-1 justify-content-center align-items-center"
          style={{ marginBottom: "6rem" }}
        >
          <div
            className="rounded-xl"
            style={{
              width: "150px",
              height: "220px",
              border: "0.4px solid #00000038",
            }}
          >
            <div className="bg-white rounded-xl w-100">
              <h5 className="mx-auto pt-1 text-14 font-bold text-color-secondary text-center w-70">
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
            <div
              style={{ backgroundColor: "#F1F1F1", marginTop: "-1rem" }}
              className="pt-4 w-100"
            >
              <p className=" text-12 font-bold text-center">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
              <Stack
                className="d-flex justify-content-center"
                direction="horizontal"
                gap={2}
              >
                <div className="text-center text-12 font-bold text-color-secondary">
                  Click to upload
                  <div className="file_conatiner">
                    <input
                      type="file"
                      className="file_upload"
                      // style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <span>
                      <UploadIcon />
                    </span>
                  </div>
                </div>
              </Stack>
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
                    value={currentPassword}
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
                      value={confrimPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-end align-items-center column-gap-3 mx-2 my-3">
              {/* <button
                className="rounded-lg bg-white text-color-primary text-16 font-normal"
                style={{
                  width: "9.2rem",
                  height: "3rem",
                  border: "1px solid var(--primary-color)",
                  boxShadow: "0px 1px 2px 0px #1018280D",
                }}
              >
                Cancel
              </button> */}

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

              {/* <button
                  className="rounded-lg bg-color-primary text-white text-16 font-bold"
                  style={{
                    width: "9.2rem",
                    height: "3rem",
                    border: "1px solid var(--primary-color)",
                    boxShadow: "0px 1px 2px 0px #1018280D",
                  }}
                >
                  <Spinner />
                </button> */}
            </div>
          </Form>
        </div>

        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
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
        </div>
      </div>
    </ModuleLayout>
  );
};

export default MyAccount;
