import React, { useState } from "react";
import Authlogo from "./Utils/Login.png";
import {
  Card,
  InputGroup,
  Form,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { userRegistration } from "./apis/UserAPIs";
import { getError } from "../../Utils/error";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";

const Registration = () => {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    const phone = mobile.countryCode + mobile.mobile;
    e.preventDefault();
    try {
      setLoading(true);
      await userRegistration(
        first_name,
        last_name,
        dob,
        phone,
        "66163046f9e2ecdb878291d5",
        "6626502ba686675750282c1e",
        email,
        password
      );
      localStorage.setItem("email", email);
      navigate("/user-otp");
      setLoading(false);
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <div className="auth_container">
      <ToastContainer />
      <Container className="custom-container">
        <div className="d-flex justify-content-center mb-3">
          <img src={Authlogo} alt="..." />
        </div>
        <Card className="card_css">
          <Card.Body>
            <div className="text-center">
              <h3 className="wlcm_text">Registration</h3>
              <p>To continue please enter your details</p>
            </div>

            <Form onSubmit={submitHandler}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <PhoneInput
                      containerClass=""
                      inputClass=" w-100 m-0 border-0"
                      inputStyle={
                        {
                          // height: "2.7rem",
                        }
                      }
                      buttonClass=" "
                      // country={form?.countryIsoCode?.toLowerCase()}
                      enableSearch={true}
                      countryCodeEditable={false}
                      // value={form?.mobile}
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

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Label>Password</Form.Label>
              <Form.Group controlId="password" className="input-group mb-3">
                <Form.Control
                  placeholder="Enter your password"
                  value={password}
                  type={check ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text onClick={() => setCheck((p) => !p)}>
                  {!check ? (
                    <FaEye
                      style={{ cursor: "pointer", backgroundColor: "white" }}
                    />
                  ) : (
                    <FaEyeSlash
                      style={{ cursor: "pointer", backgroundColor: "white" }}
                    />
                  )}
                </InputGroup.Text>
              </Form.Group>
              <div className="d-flex justify-content-center mb-3">
                {!loading ? (
                  <button type="submit" className="auth_button">
                    Sign Up
                  </button>
                ) : (
                  <button type="submit" className="auth_button">
                    <Spinner size="sm" />
                  </button>
                )}
              </div>
            </Form>
            <div className="text-center">
              <Link className="links" to="/">
                Already have an account?
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Registration;
