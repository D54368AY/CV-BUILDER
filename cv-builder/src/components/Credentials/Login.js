import React, { useState } from "react";
import "../../css/Credential.css";
import {
  Container,
  Row,
  Card,
  Col,
  Form,
  InputGroup,
  FormGroup,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { NavLink, useHistory } from "react-router-dom";
import { UserLogin } from "../../config/myservice";
const regForEmail = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regForPass = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);
export default function Login() {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const history = useHistory();

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "email":
        let e_error = regForEmail.test(value) ? "" : "Not a Valid Email Format";
        setError({ ...error, email: e_error });
        break;
      case "password":
        let p_error = regForPass.test(value)
          ? ""
          : "Alphabets and Numbers are Allowed(minimum length 8)";
        setError({ ...error, password: p_error });
        break;
      default:
        break;
    }
  };

  const unerror = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "email":
        setError({ ...error, email: "" });
        break;
      case "password":
        setError({ ...error, password: "" });
        break;
      default:
        break;
    }
  };

  const postLogin = (event) => {
    event.preventDefault();
    UserLogin(state)
      .then((res) => {
        if (res.data.err == 0) {
          localStorage.setItem("_token", res.data.token);
          NotificationManager.success("Successfully Login", "Success", 1500);
          setTimeout(() => {
            history.push("/dashboard");
          }, 2000);
        } else {
          NotificationManager.error(res.data.msg, "Error", 1500);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          history.push("/disconnect");
        }
      });
  };
  return (
    <Container fluid>
      <NotificationContainer />
      <Row className="bg-info">
        <Col lg={5}>
          <Card className="logincard p-3">
            <Card.Header className="fw-bold h3 text-center">
              Login Here
            </Card.Header>
            <FormGroup>
              <InputGroup className="m-2 p-2">
                <FormControl
                  type="email"
                  /* className="bg-dark" */
                  placeholder="Email Id"
                  name="email"
                  onFocus={unerror}
                  onBlur={handler}
                />
              </InputGroup>
              <div>
                {error.email.length > 0 && (
                  <span style={{ color: "red" }}> {error.email} </span>
                )}
              </div>
              <InputGroup className="m-2 p-2">
                <FormControl
                  type="password"
                  /*  className="bg-dark" */
                  placeholder="Password"
                  name="password"
                  onFocus={unerror}
                  onBlur={handler}
                />
              </InputGroup>
              <div>
                {error.password.length > 0 && (
                  <span style={{ color: "red" }}> {error.password} </span>
                )}
              </div>
              <div className="ms-3">
                <Button variant="primary" size="lg" onClick={postLogin}>
                  Login
                </Button>{" "}
              </div>
            </FormGroup>
            <Row>
              <Col lg={6} sm={6} md={6} xs={6} className="text-end mt-3">
                <NavLink to="/signup">New User? </NavLink>
              </Col>
              <Col lg={6} sm={6} md={6} xs={6} className="vl mt-3">
                <NavLink to="/forgot">Forgotten? </NavLink>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Image className="login-img" src="/images/login.jpg" />
        </Col>
      </Row>
    </Container>
  );
}
