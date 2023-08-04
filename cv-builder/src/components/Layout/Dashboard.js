import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../css/Dashboard.css";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  Form,
  FormControl,
} from "react-bootstrap";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import PersonIcon from "@material-ui/icons/Person";
import jwt_decode from "jwt-decode";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Tooltip from "@mui/material/Tooltip";
import Nav1 from "./Nav1";
import AllResume from "./AllResume";
import { AddProfilePicture } from "../../config/myservice";
export default function Dashboard() {
  const [UserDetail, setUserDetail] = useState();
  const [show, setShow] = useState(false);
  const handlehide = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [picture, setPicture] = useState();

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      var detail = decode.uid[0];
      console.log(detail);
      setUserDetail(detail);
      if (detail.profile_pic) {
        console.log(detail.profile_pic);
        setPicture(detail.profile_pic);
      }
    } else {
      history.push("/");
    }
  }, [picture]);

  const addresumes = () => {
    history.push("/basicdetail");
  };

  const UploadPicture = () => {
    console.log(UserDetail);
    let data = new FormData();
    console.log(document.getElementById("profile").files[0]);
    data.append("file", document.getElementById("profile").files[0]);
    data.append("userid", UserDetail._id);
    AddProfilePicture(data).then((res) => {
      if (res.data.err !== 1) {
        localStorage.setItem("_token", res.data.token);
        let decode = jwt_decode(res.data.token);
        let detail = decode.uid[0];
        console.log(detail);
        setUserDetail(detail);
        if (detail.profile_pic) {
          console.log(detail.profile_pic);
          setPicture(detail.profile_pic);
          NotificationManager.success("Profile Pic Changed", "Success", 1500);
          setShow(false);
        }
      }
    });
  };

  return (
    <>
      <Nav1 />
      <Container fluid>
        <NotificationContainer />
        <Row>
          <Col lg={3}>
            <Card border="light" className="profile bg-light mt-2 p-2">
              <div className="App">
                {picture ? (
                  <img
                    src={`/images/profile_pic/${picture}`}
                    className="profile-img"
                  />
                ) : (
                  <img src="images/profile.png" className="profile-img" />
                )}
                <br />
                <Button variant="link" onClick={handleShow}>
                  Change Profile Picture
                </Button>
              </div>

              {UserDetail && (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-header">
                      Basic Details
                    </ListSubheader>
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {UserDetail.firstname} {UserDetail.lastname}
                    </ListItemText>
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText>{UserDetail.email}</ListItemText>
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText>{UserDetail.phone_no}</ListItemText>
                  </ListItemButton>
                </List>
              )}
            </Card>
          </Col>
          <Col>
            <AllResume />
          </Col>
        </Row>
        <Tooltip
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          title="Create New "
        >
          <Fab
            color="primary"
            sx={{
              position: "fixed",
              bottom: (theme) => theme.spacing(10),
              right: (theme) => theme.spacing(10),
            }}
            aria-label="add"
            onClick={addresumes}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Container>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handlehide}
        className="img"
      >
        <div className="bg-secondary">
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Pciture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormControl
                type="file"
                name="myfile"
                id="profile"
                className="mb-1"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlehide}>
              Close
            </Button>
            <Button variant="primary" onClick={UploadPicture}>
              Upload
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
