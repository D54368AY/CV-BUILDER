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
import { NavLink, useHistory } from "react-router-dom";
import { AddUser } from "../../config/myservice";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
let pass;
const regForName = RegExp(/^[A-Za-z ]{5,}$/);
const regForEmail = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regForPass = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);
const regFoMob = RegExp(/^[0-9]{10}$/);

export default function Signup() {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const [error, setError] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const history = useHistory();

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "fname":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, fname: f_error });
        break;
      case "lname":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, lname: l_error });
        break;

      case "email":
        let e_error = regForEmail.test(value) ? "" : "Not a Valid Email Format";
        setError({ ...error, email: e_error });
        break;
      case "password":
        pass = value;
        let p_error = regForPass.test(value)
          ? ""
          : "Only Alphabets and Numbers are Allowed(minimum length 8)";
        setError({ ...error, password: p_error });
        break;
      case "cpassword":
        let cp_error = pass === value ? "" : "Does not matches with Password";
        setError({ ...error, cpassword: cp_error });
        break;
      case "phone":
        let ph_error = regFoMob.test(value)
          ? ""
          : "Must be of exact 10 digit number";
        setError({ ...error, phone: ph_error });
        break;
      default:
        break;
    }
  };

  const unerror = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "fname":
        setError({ ...error, fname: "" });
        break;
      case "lname":
        setError({ ...error, lname: "" });
        break;

      case "email":
        setError({ ...error, email: "" });
        break;
      case "password":
        setError({ ...error, password: "" });
        break;
      case "cpassword":
        setError({ ...error, cpassword: "" });
        break;
      case "phone":
        setError({ ...error, phone: "" });
        break;

      default:
        break;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    let formDetails = {
      fname: state.fname,
      lname: state.lname,
      email: state.email,
      password: state.password,
      phone: state.phone,
    };
    console.log(formDetails);
    if (
      error.fname == "" &&
      error.lname == "" &&
      error.email == "" &&
      error.password == "" &&
      error.phone == ""
    ) {
      AddUser(formDetails)
        .then((res) => {
          if (res.data.err == 0) {
            console.log(res.data.msg);
            history.push("/");
          } else if (res.data.err == 1) {
            console.log(res.data);
          }
        })
    } else {
      NotificationManager.error("Enter Valid Data", "Error", 1500);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={7}>
          <Image className="reg-img" src="/images/login.jpg" />
        </Col>
        <Col lg={5} className="bg-info">
          <Card className="signupcard p-3 ">
            <Card.Header className="fw-bold h3 text-center border-light">
              Signup Here
            </Card.Header>
            <FormGroup className="p-2">
              <FormControl
                type="text"
                className="mt-4 border-secondary"
                placeholder="First Name"
                name="fname"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.fname.length > 0 && (
                  <span style={{ color: "red" }}> {error.fname} </span>
                )}
              </div>
              <FormControl
                type="text"
                className="mt-4 border-secondary "
                placeholder="Last Name"
                name="lname"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.lname.length > 0 && (
                  <span style={{ color: "red" }}> {error.lname} </span>
                )}
              </div>
              <FormControl
                type="text"
                className="mt-4 border-secondary"
                placeholder="Email Id"
                name="email"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.email.length > 0 && (
                  <span style={{ color: "red" }}> {error.email} </span>
                )}
              </div>
              <FormControl
                type="password"
                className="mt-4 border-secondary "
                placeholder="Password"
                name="password"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.password.length > 0 && (
                  <span style={{ color: "red" }}> {error.password} </span>
                )}
              </div>
              <FormControl
                type="password"
                className="mt-4 border-secondary "
                placeholder="Confirm  Password"
                name="cpassword"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.cpassword.length > 0 && (
                  <span style={{ color: "red" }}> {error.cpassword} </span>
                )}
              </div>
              <FormControl
                type="number"
                className="mt-4 border-secondary"
                placeholder="Mobile No. "
                name="phone"
                onBlur={handler}
                onFocus={unerror}
              />
              <div>
                {error.phone.length > 0 && (
                  <span style={{ color: "red" }}> {error.phone} </span>
                )}
              </div>
              <div className="mt-2">
                <Button variant="primary" size="lg" onClick={submit}>
                  Sign-up
                </Button>{" "}
              </div>
              <div className="App center  bg-light mt-2 pt-3 pb-3">
                <NavLink to="/" class="text-reset ">
                  Existing User?{" "}
                </NavLink>
              </div>
            </FormGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
