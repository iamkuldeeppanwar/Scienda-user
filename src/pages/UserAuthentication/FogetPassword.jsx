import React, { useState } from "react";
import Authlogo from "./Utils/Login.png";
import { Card, Form, Container, Spinner } from "react-bootstrap";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import messageIcon from "./Utils/Message icon.png";
import { FiArrowLeft } from "react-icons/fi";
import { userForgetPassword } from "./apis/UserAPIs";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../Utils/error";

const FogetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userForgetPassword(email);
      if (response.success) {
        localStorage.setItem("email", email);
        localStorage.setItem("forget", true);
        setLoading(false);
        navigate("/user-otp");
      }
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
  };

  return (
    <div className="auth_container">
      <ToastContainer />
      <Container className="custom-container">
        <div className="d-flex justify-content-center mb-4">
          <img src={Authlogo} alt="..." />
        </div>
        <Card className="card_css">
          <Card.Body>
            <div className="text-center mb-3">
              <div>
                <img src={messageIcon} alt="Message icon" />
              </div>
              <h3 className="otp_text">Check Your Email</h3>
              {/* <div>We will sent a verification link to </div> */}
              <div className="otp_mail">{email}</div>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  className="input-border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-center mb-3">
                <button type="submit" className="auth_button">
                  {!loading ? "Submit" : <Spinner size="sm" />}
                </button>
              </div>
            </Form>
            <div className="resent_otp_btn text-center mt-2">
              <Link className="links" to="/">
                <FiArrowLeft /> Back to log In
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default FogetPassword;
