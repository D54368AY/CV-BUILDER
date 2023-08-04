import React, { useState } from "react";
import { TextField, Button, Container, Divider } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Skills() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
    skill4: "",
    skill5: "",
    interest1: "",
    interest2: "",
    interest3: "",
    interest4: "",
    interest5: "",
  });
  const redirectback = () => {
    history.push("/experience");
  };
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const addNewDetail = () => {
    console.log(state);
    dispatch({ type: "SKILL_ADD", payload: state });
    /* setState({skill1: "",skill2: "",skill3: "",skill4: "",skill5: "",
                interest1: "",interest2: "",interest3: "",interest4: "",interest5: "",
      }) */
    history.push("/newresume");
  };
  return (
    <Paper>
      <Card>
        <CardHeader title="Extra Details" />
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
                <span className="pl-3">Skills/Languages</span>
              </h5>
            </Grid>
            <Grid item xs={0} lg={8} />
            <br />
            <Grid item md={4} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="skill1"
                label="Skill 1"
                style={{ width: "90%" }}
                value={state.skill1}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="skill2"
                label="Skill 2"
                style={{ width: "90%" }}
                value={state.skill2}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="skill3"
                label="Skill 3"
                style={{ width: "90%" }}
                value={state.skill3}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="skill4"
                label="Skill 4"
                style={{ width: "90%" }}
                value={state.skill4}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>

            <Grid item md={4} sm={6} xs={12} lg={4}>
              <TextField
                margin="dense"
                variant="outlined"
                name="skill5"
                label="Skill 5"
                style={{ width: "90%" }}
                value={state.skill5}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={2} alignItems="flex-start" lg={12}>
            <Grid
              item
              xs={12}
              lg={4}
              alignItems="flex-end"
              alignContent="flex-end"
            >
              <h5>
                <CheckCircleIcon />
                <span className="pl-3">Interest</span>
              </h5>
            </Grid>
            <Grid item xs={0} lg={8} />
            <br />
            <Grid item md={12} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                label="Interest 1"
                variant="outlined"
                style={{ width: "90%" }}
                name="interest1"
                value={state.interest1}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                label="Interest 2"
                variant="outlined"
                style={{ width: "90%" }}
                name="interest2"
                value={state.interest2}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                label="Interest 3"
                variant="outlined"
                style={{ width: "90%" }}
                name="interest3"
                value={state.interest3}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                label="Interest 4"
                variant="outlined"
                style={{ width: "90%" }}
                name="interest4"
                value={state.interest4}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={4}>
              <TextField
                margin="dense"
                label="Interest 5"
                variant="outlined"
                style={{ width: "90%" }}
                name="interest5"
                value={state.interest5}
                onChange={handler}
                InputProps={{
                  endAdornment: <InputAdornment position="start" />,
                }}
              />
            </Grid>
          </Grid>
        </div>
      </CardContent>
      <Container>
        <Row>
          <Col xs={4} />
          <Col xs={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={redirectback}
              startIcon={<NavigateBeforeIcon />}
            >
              Back
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={addNewDetail}
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          </Col>
          <Col xs={4} />
        </Row>
        <br />
        <Button
          variant="contained"
          color="primary"
          /* onClick={this.createAndDownloadPDF} */
          endIcon={<GetAppIcon />}
        >
          Download Resume
        </Button>
      </Container>
      <p className="text-center text-muted">Page 5</p>
    </Paper>
  );
}
