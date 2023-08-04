import React, { useState } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const regForName = RegExp(/^[A-Za-z ]{4,}$/);
const regForEmail = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regForDesc = RegExp(/^[A-Za-z0-9 ]{10,}$/);
const regForPin = RegExp(/^[0-9]{6}$/);
const regFoMob = RegExp(/^[0-9]{10}$/);

export default function Basicdetail() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    desc: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    desc: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });
  const [profile, setProfile] = useState();

  const history = useHistory();

  const redirectback = () => {
    history.push("/dashboard");
  };

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "firstname":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 3)";
        setError({ ...error, firstname: f_error });
        break;
      case "lastname":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 3)";
        setError({ ...error, lastname: l_error });
        break;

      case "email":
        let e_error = regForEmail.test(value) ? "" : "Not a Valid Email Format";
        setError({ ...error, email: e_error });
        break;
      case "phone":
        let ph_error = regFoMob.test(value)
          ? ""
          : "Must be of exact 10 digit number";
        setError({ ...error, phone: ph_error });
        break;
      /*  case "address":
            let cp_error = regForDesc.test(value)
            ? ""
            : "Must be of min 10 letters long";
            setError({ ...error, address: cp_error });
            break; */
      case "city":
        let ci_error = regForName.test(value)
          ? ""
          : "Must be of min 3 Char Long";
        setError({ ...error, city: ci_error });
        break;
      case "pincode":
        let pi_error = regForPin.test(value) ? "" : "Must be of exact 6 digit ";
        setError({ ...error, pincode: pi_error });
        break;
      case "desc":
        let ds_error = regForDesc.test(value)
          ? ""
          : "Must be of Min 10 Char Long";
        setError({ ...error, desc: ds_error });
        break;
      default:
        break;
    }
  };

  const addNewDetail = () => {
    console.log(state);
    setProfile(state);
    dispatch({ type: "BASIC_ADD", payload: state });
    setState({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      website: "",
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    });

    history.push("/education");
  };

  return (
    <Paper className="container border">
      <Card>
        <CardHeader title="Personal Details" />
      </Card>
      <CardContent>
        <div>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                name="firstname"
                label="First Name"
                style={{ width: "80%" }}
                value={state.firstname}
                onChange={handler}
              />
              <div>
                {error.firstname.length > 0 && (
                  <span style={{ color: "red" }}> {error.firstname} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Last Name"
                variant="outlined"
                style={{ width: "80%" }}
                name="lastname"
                value={state.lastname}
                onChange={handler}
              />
              <div>
                {error.lastname.length > 0 && (
                  <span style={{ color: "red" }}> {error.lastname} </span>
                )}
              </div>
            </Grid>

            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Email"
                variant="outlined"
                name="email"
                style={{ alignItems: "left", width: "80%" }}
                value={state.email}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.email.length > 0 && (
                  <span style={{ color: "red" }}> {error.email} </span>
                )}
              </div>
            </Grid>

            <Grid item lg={6} xs={12} sm={12} md={6}>
              <TextField
                margin="dense"
                label="Phone Number"
                variant="outlined"
                name="phone"
                style={{ alignItems: "left", width: "80%" }}
                value={state.phone}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.phone.length > 0 && (
                  <span style={{ color: "red" }}> {error.phone} </span>
                )}
              </div>
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                name="address"
                label="Address"
                style={{ width: "80%" }}
                value={state.address}
                onChange={handler}
              />
              <div>
                {error.address.length > 0 && (
                  <span style={{ color: "red" }}> {error.address} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                name="city"
                label="City"
                style={{ width: "80%" }}
                value={state.city}
                onChange={handler}
              />
              <div>
                {error.city.length > 0 && (
                  <span style={{ color: "red" }}> {error.city} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                name="pincode"
                label="Pincode"
                style={{ width: "80%" }}
                value={state.pincode}
                onChange={handler}
              />
              <div>
                {error.pincode.length > 0 && (
                  <span style={{ color: "red" }}> {error.pincode} </span>
                )}
              </div>
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                name="desc"
                label="About Your Self"
                style={{ width: "80%" }}
                value={state.desc}
                onChange={handler}
              />
              <div>
                {error.desc.length > 0 && (
                  <span style={{ color: "red" }}> {error.desc} </span>
                )}
              </div>
            </Grid>

            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Your Website"
                variant="outlined"
                name="website"
                style={{ alignItems: "left", width: "80%" }}
                value={state.website}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="GitHub"
                variant="outlined"
                name="github"
                style={{ alignItems: "left", width: "80%" }}
                value={state.github}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <GitHubIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Linked In"
                variant="outlined"
                name="linkedin"
                style={{ alignItems: "left", width: "80%" }}
                value={state.linkedin}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LinkedInIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Twitter"
                variant="outlined"
                name="twitter"
                style={{ alignItems: "left", width: "80%" }}
                value={state.twitter}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Facebook"
                variant="outlined"
                name="facebook"
                style={{ alignItems: "left", width: "80%" }}
                value={state.facebook}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                label="Instagram"
                variant="outlined"
                name="instagram"
                style={{ alignItems: "left", width: "80%" }}
                value={state.instagram}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Container>
            <Row>
              <Col lg={3} xs={0} />
              <Col lg={3} xs={5}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={redirectback}
                  /* disabled */
                  startIcon={<NavigateBeforeIcon />}
                >
                  Back
                </Button>
              </Col>
              <Col lg={3} xs={5}>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<NavigateNextIcon />}
                  onClick={addNewDetail}
                >
                  Next
                </Button>
              </Col>
              <Col lg={3} xs={1} />
            </Row>
          </Container>
        </div>
      </CardContent>
      <p className="text-center text-muted">Page 1 </p>
    </Paper>
  );
}
