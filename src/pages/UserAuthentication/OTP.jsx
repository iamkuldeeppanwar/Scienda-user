import React, { useState, useRef } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import Authlogo from "./Utils/Small logo.png";
import messageIcon from "./Utils/Message icon.png";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import {
  userEmailVerifyOtp,
  userResendOtp,
  userResetPasswordOtp,
} from "./apis/UserAPIs";
import { setToken } from "../../features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../Utils/error";

const OTP = ({ length = 4, onChange, onVerify, loading }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputs = useRef([]);
  const email = localStorage.getItem("email");

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    onChange(newOtp.join(""));
  };

  const handleKeyUp = (e, index) => {
    if (e.keyCode === 8 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerifyClick = () => {
    onVerify(otp.join(""));
  };

  const resendOtpHandler = async () => {
    try {
      const response = await userResendOtp(email);
      if (response.success) {
        toast.success("OTP sent to the mail");
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="auth_container">
      <ToastContainer />
      <Container className="custom-container">
        <div className="d-flex justify-content-center mb-4">
          <img src={Authlogo} alt="Auth logo" />
        </div>
        <Card className="card_css">
          <Card.Body>
            <div className="text-center mb-3">
              <div>
                <img src={messageIcon} alt="Message icon" />
              </div>
              <h3 className="otp_text">Check your email</h3>
              <div>We sent a verification link to </div>
              <div className="otp_mail">{email}</div>
            </div>
            <div className="otp-input mb-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  ref={(el) => (inputs.current[index] = el)}
                />
              ))}
            </div>
            <div className="d-flex justify-content-center mb-3">
              {!loading ? (
                <button
                  type="button"
                  className="auth_button"
                  onClick={handleVerifyClick}
                >
                  Verify Email
                </button>
              ) : (
                <button
                  type="button"
                  className="auth_button"
                  onClick={handleVerifyClick}
                >
                  <Spinner />
                </button>
              )}
            </div>
            <div className="resend_txt text-center">
              Didn’t receive the email?{" "}
              <span className="resent_otp_btn" onClick={resendOtpHandler}>
                Click to resend
              </span>
            </div>
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

const OTPComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (otp) => {};

  const handleVerifyOtp = async (otp) => {
    const email = localStorage.getItem("email");
    const forget = localStorage.getItem("forget");

    if (forget) {
      try {
        setLoading(true);
        const otps = await userResetPasswordOtp(email, otp);
        if (otps.success) {
          localStorage.setItem("token", otps.token);
          dispatch(setToken(otps));
          setLoading(false);
          navigate("/user-reset-password");
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          getError(error, {
            closeButton: true,
          })
        );
      }
    } else {
      try {
        setLoading(true);
        const otps = await userEmailVerifyOtp(email, otp);
        if (otps.success) {
          localStorage.setItem("token", otps.token);
          dispatch(setUser(otps.user));
          dispatch(setToken(otps));
          setLoading(false);
          navigate("/menu");
        }
      } catch (error) {
        setLoading(false);
        toast.error(getError(error));
      }
    }
  };

  return (
    <div>
      <OTP
        length={4}
        onChange={handleOtpChange}
        onVerify={handleVerifyOtp}
        loading={loading}
      />
    </div>
  );
};

export default OTPComponent;
