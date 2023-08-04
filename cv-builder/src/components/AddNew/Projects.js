import React, { useState } from "react";
import { TextField, Button, Container, Divider } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import LinkIcon from "@material-ui/icons/Link";
import TitleIcon from "@material-ui/icons/Title";
import Add from "@mui/icons-material/Add";
import DateRangeIcon from "@material-ui/icons/DateRange";
import DescriptionIcon from "@material-ui/icons/Description";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const regForName = RegExp(/^[A-Za-z ]{4,}$/);
const regForDesc = RegExp(/^[A-Za-z0-9 ]{10,}$/);
const regFoMob = RegExp(/^[0-9]{1,}$/);
export default function Projects() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: "",
    link: "",
    period: "",
    role: "",
    projectDescription: "",
  });
  const [error, setError] = useState({
    title: "",
    link: "",
    period: "",
    role: "",
    projectDescription: "",
  });
  const [project, setProject] = useState([]);

  const redirectExp = () => {
    console.log(project);
    dispatch({ type: "PROJECT_ADD", payload: project });
    history.push("/experience");
  };

  const redirectback = () => {
    history.push("/education");
  };

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    switch (name) {
      case "title":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, title: f_error });
        break;
      case "link":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed";
        setError({ ...error, link: l_error });
        break;

      case "period":
        let e_error = regFoMob.test(value) ? "" : "Only Number Allowed";
        setError({ ...error, period: e_error });
        break;
      case "role":
        let ph_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, role: ph_error });
        break;

      case "projectDescription":
        let ds_error = regForDesc.test(value)
          ? ""
          : "Must be of Min 10 Char Long";
        setError({ ...error, projectDescription: ds_error });
        break;
      default:
        break;
    }
  };
  const addNewEducation = () => {
    console.log(project);
    console.log(state);
    setProject([...project, state]);
    setState({
      title: "",
      link: "",
      period: "",
      role: "",
      projectDescription: "",
    });
  };
  return (
    <Paper className="container border mt-5">
      <div className="border-dark">
        <Grid container spacing={2} alignItems="center" lg={12}>
          {project &&
            project.map((ele) => (
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <Card className="p-5 m-5">
                  <b>Project Title : - </b> {ele.title}
                  <br />
                  <b>Link : - </b> {ele.link}
                  <br />
                  <b>Your Role : - </b> {ele.role}
                  <br />
                  <b>Period : - </b> {ele.period}
                  <br />
                  <b>Description : - </b> {ele.projectDescription}
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
      <Card>
        <CardHeader title="Projects Developed" />
      </Card>
      <CardContent>
        <div>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item xs={12} lg={12}>
              <h5>Project 1</h5>
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                name="title"
                label="Title"
                style={{ width: "80%" }}
                required
                value={state.title}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.title.length > 0 && (
                  <span style={{ color: "red" }}> {error.title} </span>
                )}
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                name="link"
                label="Link"
                style={{ width: "80%" }}
                required
                value={state.link}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
             {/*  <div>
                {error.link.length > 0 && (
                  <span style={{ color: "red" }}> {error.link} </span>
                )}
              </div> */}
            </Grid>

            <Grid item md={4} sm={6} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="period"
                label="Period (in months)"
                style={{ width: "80%" }}
                required
                value={state.period}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.period.length > 0 && (
                  <span style={{ color: "red" }}> {error.period} </span>
                )}
              </div>
            </Grid>

            <Grid item md={4} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                name="role"
                label="Your Role"
                style={{ width: "80%" }}
                required
                value={state.role}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.role.length > 0 && (
                  <span style={{ color: "red" }}> {error.role} </span>
                )}
              </div>
            </Grid>

            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                name="projectDescription"
                label="Description"
                style={{ width: "80%" }}
                required
                value={state.projectDescription}
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
                {error.projectDescription.length > 0 && (
                  <span style={{ color: "red" }}>
                    {" "}
                    {error.projectDescription}{" "}
                  </span>
                )}
              </div>
            </Grid>
          </Grid>
          <br />
          <Divider />
        </div>
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
              onClick={redirectExp}
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          </Col>
          <Col lg={4} md={4} sm={2} xs={0} />
        </Row>
      </Container>
      <p className="text-center text-muted">Page 3</p>
    </Paper>
  );
}
