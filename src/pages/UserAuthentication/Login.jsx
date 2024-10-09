import React, { useEffect, useState } from "react";
import Authlogo from "./Utils/Login.png";
import { Card, InputGroup, Form, Container, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "./apis/UserAPIs";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { setToken } from "../../features/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { getError } from "../../Utils/error";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [subdomain, setSubdomain] = useState(window.location.host);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/menu");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userLogin(email, password, subdomain);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(setToken(response));
      dispatch(setUser(response));
      setLoading(false);
      navigate("/menu");
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
            <div className="text-center">
              <h3 className="wlcm_text">Welcome Back</h3>
              <p>To continue please enter your details.</p>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="input-border"
                />
              </Form.Group>

              <Form.Label>Password</Form.Label>
              <Form.Group
                controlId="password"
                className="input-group input-border rounded-md mb-3"
              >
                <Form.Control
                  placeholder="Password"
                  value={password}
                  type={check ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className=""
                />
                <InputGroup.Text onClick={() => setCheck((p) => !p)}>
                  {!check ? (
                    <FaEye style={{ cursor: "pointer" }} />
                  ) : (
                    <FaEyeSlash style={{ cursor: "pointer" }} />
                  )}
                </InputGroup.Text>
              </Form.Group>

              <div className="text-end mb-4">
                <Link className="links" to="/user-forget-password">
                  Forget Password
                </Link>
              </div>
              <div className="d-flex justify-content-center mb-3">
                <button type="submit" className="auth_button">
                  {!loading ? "Sign In" : <Spinner size="sm" />}
                </button>
              </div>
            </Form>
            <div className="text-center">
              <Link className="links" to="/user-signup">
                Create an account?
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
