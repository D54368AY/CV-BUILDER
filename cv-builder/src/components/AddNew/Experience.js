import React, { useState } from "react";
import { TextField, Button, Container, Divider } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import DescriptionIcon from "@material-ui/icons/Description";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Add from "@mui/icons-material/Add";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import BusinessIcon from "@material-ui/icons/Business";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const regForName = RegExp(/^[A-Za-z ]{4,}$/);
const regForDesc = RegExp(/^[A-Za-z0-9 ]{10,}$/);
const regFoMob = RegExp(/^[0-9]{1,}$/);
export default function Experience() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    institute: "",
    position: "",
    duration: "",
    desc: "",
  });
  const [error, setError] = useState({
    institute: "",
    position: "",
    duration: "",
    desc: "",
  });
  const [experience, setExperience] = useState([]);
  const redirectSkill = () => {
    dispatch({ type: "EXP_ADD", payload: experience });
    history.push("/skills");
  };
  const redirectback = () => {
    history.push("/projects");
  };
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "institute":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, institute: f_error });
        break;
      case "position":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, position: l_error });
        break;

      case "duration":
        let e_error = regFoMob.test(value) ? "" : "Only Number Allowed";
        setError({ ...error, duration: e_error });
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
  const addNewEducation = () => {
    console.log(experience);
    console.log(state);
    setExperience([...experience, state]);
    setState({
      institute: "",
      position: "",
      duration: "",
      desc: "",
    });
  };
  return (
    <Paper className="container border mt-5">
      <div className="border-dark">
        <Grid container spacing={2} alignItems="center" lg={12}>
          {experience &&
            experience.map((ele) => (
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <Card className="p-5 m-5">
                  <b>Institute Name : - </b> {ele.institute}
                  <br />
                  <b>Position : - </b> {ele.position}
                  <br />
                  <b>Time Duration : - </b> {ele.duration}
                  <br />
                  <b>Description : - </b> {ele.desc}
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
      <Card>
        <CardHeader title="Experience Details" />
      </Card>
      <CardContent>
        <div>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid
              item
              xs={12}
              lg={4}
              alignItems="flex-end"
              alignContent="flex-end"
            >
              <h5>
                <CheckCircleIcon />
                <span className="pl-3">Experience </span>
              </h5>
            </Grid>
            <Grid item xs={0} lg={8} />

            <Grid item md={4} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="institute"
                label="Institue/Organisation"
                style={{ width: "90%" }}
                required
                value={state.institute}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.institute.length > 0 && (
                  <span style={{ color: "red" }}> {error.institute} </span>
                )}
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="position"
                label="Position"
                style={{ width: "90%" }}
                required
                value={state.position}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <EventSeatIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.position.length > 0 && (
                  <span style={{ color: "red" }}> {error.position} </span>
                )}
              </div>
            </Grid>

            <Grid item md={4} sm={6} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="duration"
                label="Duration"
                style={{ width: "90%" }}
                required
                value={state.duration}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <TimelapseIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.duration.length > 0 && (
                  <span style={{ color: "red" }}> {error.duration} </span>
                )}
              </div>
            </Grid>

            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                label="Description"
                variant="outlined"
                style={{ width: "97%" }}
                name="desc"
                required
                value={state.desc}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.desc.length > 0 && (
                  <span style={{ color: "red" }}> {error.desc} </span>
                )}
              </div>
            </Grid>
          </Grid>
          <div className="text-center ">
            <Button
              className="mt-3"
              variant="contained" 
              color="info"
              onClick={addNewEducation}
              startIcon={<Add />}
            >
              Add
            </Button>
          </div>
          <br />
          <Divider />
        </div>
      </CardContent>
      <Container>
        <Row>
        <Col lg={4} md={4} sm={2} xs={0} />
        <Col lg={2} md={2} sm={4} xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={redirectback}
              startIcon={<NavigateBeforeIcon />}
            >
              Back
            </Button>
          </Col>
          <Col lg={2} md={2} sm={4} xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={redirectSkill}
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          </Col>
          <Col lg={4} md={4} sm={2} xs={0} />
        </Row>
      </Container>
      <p className="text-center text-muted">Page 4</p>
    </Paper>
  );
}
