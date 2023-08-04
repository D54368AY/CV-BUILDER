import React, { useState } from "react";
import { TextField, Button, Container, Divider } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import SchoolIcon from "@material-ui/icons/School";
import DateRangeIcon from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import "../../css/Resume.css";
import { useDispatch } from "react-redux";
const regForName = RegExp(/^[A-Za-z ]{4,}$/);
const regForDesc = RegExp(/^[A-Za-z0-9 ]{10,}$/);
export default function Education() {
  const [state, setState] = useState({
    college: "",
    startdate: "",
    enddate: "",
    qual: "",
    desc: "",
  });

  const [error, setError] = useState({
    college: "",
    startdate: "",
    enddate: "",
    qual: "",
    desc: "",
  });

  const [education, setEducation] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const projectRedirect = () => {
    dispatch({ type: "EDUCATION_ADD", payload: education });
    history.push("/projects");
  };
  const redirectback = () => {
    history.push("/basicdetail");
  };

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    let date = new Date();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear().toString();
    let Joining = value.split("-");
    let Leaving = value.split("-");
    console.log(state.startdate);
    console.log(Joining);
    switch (name) {
      case "college":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, college: f_error });
        break;
      case "startdate":
        if (
          currentYear > Joining[0] ||
          (currentYear == Joining[0] &&
            currentMonth >= Joining[1] &&
            currentDay > Joining[2])
        ) {
          setError({ ...error, startdate: "" });
        } else {
          setError({
            ...error,
            startdate: "Start Date Cannot Be Greater Than Current",
          });
        }
        break;
      case "enddate":
        if (
          currentYear > Leaving[0] ||
          (currentYear == Leaving[0] &&
            currentMonth >= Leaving[1] &&
            currentDay > Leaving[2])
        ) {
          setError({ ...error, enddate: "" });
        } else {
          setError({
            ...error,
            enddate: "End Date Cannot Be Greater Than Current",
          });
        }
        break;

      case "qual":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, qual: l_error });
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
    console.log(education);
    console.log(state);
    setEducation([...education, state]);
    setState({ college: "", startdate: "", enddate: "", qual: "", desc: "" });
  };
  return (
    <Paper className="container border mt-5">
      <div className="border-dark">
        <Grid container spacing={2} alignItems="center" lg={12}>
          {education &&
            education.map((ele) => (
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <Card className="p-5 m-5">
                  <b>Collge / School : - </b> {ele.college}
                  <br />
                  <b>Start date : - </b> {ele.startdate}
                  <br />
                  <b>End date : - </b> {ele.enddate}
                  <br />
                  <b>Qualification : - </b> {ele.qual}
                  <br />
                  <b>Description : - </b> {ele.desc}
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
      <Card>
        <br className="mt-3" />
        <CardHeader title="Education Details" />
      </Card>
      <CardContent>
        <div className="text-center">
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={4} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="college"
                label="College/Unviersity"
                style={{ width: "80%" }}
                required
                value={state.college}
                onChange={handler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.college.length > 0 && (
                  <span style={{ color: "red" }}> {error.college} </span>
                )}
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="startdate"
                label="From Year"
                type="date"
                style={{ width: "80%" }}
                required
                value={state.startdate}
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
                {error.startdate.length > 0 && (
                  <span style={{ color: "red" }}> {error.startdate} </span>
                )}
              </div>
            </Grid>

            <Grid item md={4} sm={6} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="enddate"
                label="To Year"
                type="date"
                style={{ width: "80%" }}
                required
                value={state.enddate}
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
                {error.enddate.length > 0 && (
                  <span style={{ color: "red" }}> {error.enddate} </span>
                )}
              </div>
            </Grid>

            <Grid item md={4} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                label="Qualification"
                variant="outlined"
                style={{ width: "80%" }}
                name="qual"
                required
                value={state.qual}
                onChange={handler}
              />
              <div>
                {error.qual.length > 0 && (
                  <span style={{ color: "red" }}> {error.qual} </span>
                )}
              </div>
            </Grid>

            <Grid item md={8} sm={8} xs={8} lg={8}>
              <TextField
                margin="dense"
                label="Description"
                variant="outlined"
                style={{ width: "90%" }}
                name="desc"
                value={state.desc}
                onChange={handler}
              />
              <div>
                {error.desc.length > 0 && (
                  <span style={{ color: "red" }}> {error.desc} </span>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="text-center ">
          <Button
          variant="contained" 
            className="mt-3"
            color="info"
            onClick={addNewEducation}
            startIcon={<Add />}
          >
            Add
          </Button>
        </div>
      </CardContent>
      <Container className="mt-3">
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
              onClick={projectRedirect}
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          </Col>
          <Col lg={4} md={4} sm={2} xs={0} />
        </Row>
      </Container>
      <p className="text-center text-muted">Page 2</p>
    </Paper>
  );
}
