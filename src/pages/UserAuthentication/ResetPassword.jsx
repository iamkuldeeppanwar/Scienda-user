import React, { useState } from "react";
import resetlogo from "./Utils/reset-password.png";
import { Card, InputGroup, Form, Container, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import messageIcon from "./Utils/Message icon.png";
import { userResetPassword } from "./apis/UserAPIs";
import { ToastContainer, toast } from "react-toastify";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [checkConfirm, setCheckConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userResetPassword(password, confirmPassword);
      if (response.success) {
        setLoading(false);
        navigate("/");
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
        <Card className="card_css">
          <Card.Body>
            <div className="text-center mb-3">
              <div>
                <img src={resetlogo} alt="Message icon" />
              </div>
              <div>
                <img src={messageIcon} alt="Message icon" />
              </div>
              <h3 className="otp_text">Choose password</h3>
              <p className="pass_sugesstion">Must be at least 8 characters.</p>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="password" className="input-group mb-3">
                <Form.Control
                  placeholder="Choose a password"
                  value={password}
                  type={check ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text onClick={() => setCheck((p) => !p)}>
                  {!check ? (
                    <FaEye style={{ cursor: "pointer" }} />
                  ) : (
                    <FaEyeSlash style={{ cursor: "pointer" }} />
                  )}
                </InputGroup.Text>
              </Form.Group>

              <Form.Group controlId="password" className="input-group mb-3">
                <Form.Control
                  placeholder="Confirm password"
                  value={confirmPassword}
                  type={checkConfirm ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <InputGroup.Text onClick={() => setCheckConfirm((p) => !p)}>
                  {!confirmPassword ? (
                    <FaEye style={{ cursor: "pointer" }} />
                  ) : (
                    <FaEyeSlash style={{ cursor: "pointer" }} />
                  )}
                </InputGroup.Text>
              </Form.Group>

              <div className="d-flex justify-content-center mb-3">
                {!loading ? (
                  <button type="submit" className="auth_button">
                    Submit
                  </button>
                ) : (
                  <button type="submit" className="auth_button">
                    <Spinner />
                  </button>
                )}
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
