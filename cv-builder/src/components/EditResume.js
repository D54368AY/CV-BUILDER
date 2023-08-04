import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import ReactToPdf from "react-to-pdf";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  PersonAddAlt1Outlined,
  PhoneAndroid,
  EmailSharp,
  SaveAlt,
  CancelPresentation,
  TitleOutlined,
  SchoolOutlined,
  CalendarTodayOutlined,
  TimeToLeaveOutlined,
  DescriptionRounded,
  ArrowRight,
  ArrowRightAltSharp,
  MapOutlined,
} from "@mui/icons-material";
import { TextField } from "@material-ui/core";
import { Paper, withStyles, Grid } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import InputAdornment from "@material-ui/core/InputAdornment";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import SchoolIcon from "@material-ui/icons/School";
import DateRangeIcon from "@material-ui/icons/DateRange";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import BusinessIcon from "@material-ui/icons/Business";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LinkIcon from "@material-ui/icons/Link";
import TitleIcon from "@material-ui/icons/Title";
import Add from "@mui/icons-material/Add";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import "../css/Resume.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { GETResume, UPDATEResume } from "../config/myservice";
const options = {
  orientation: "landscape",
  unit: "in",
  format: "A4",
};
const regForName = RegExp(/^[A-Za-z ]{4,}$/);
const regForEmail = RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regForDesc = RegExp(/^[A-Za-z0-9 ]{10,}$/);
const regForPin = RegExp(/^[0-9]{6}$/);
const regFoMob = RegExp(/^[0-9]{10}$/);
export default function EditResume(props) {
  const history = useHistory();
  const ref = React.createRef();
  const resume_id = props.match.params.id;
  const [UserDetail, setUserDetail] = useState();
  const [basics, setBasics] = useState();
  const [education, setEducation] = useState();
  const [projects, setProjects] = useState();
  const [experience, setExperience] = useState();
  const [skills, setSkills] = useState();

  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    about: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    college: "",
    startdate: "",
    enddate: "",
    qual: "",
    eddesc: "",
    institute: "",
    position: "",
    duration: "",
    exdesc: "",
    title: "",
    link: "",
    period: "",
    role: "",
    projectDescription: "",
  });

  const [editeducation, setediteducation] = useState({
    college: "",
    startdate: "",
    enddate: "",
    qual: "",
    desc: "",
  });
  const [editproject, seteditproject] = useState({
    title: "",
    link: "",
    role: "",
    period: "",
    projectDescription: "",
  });
  const [editexperience, seteditexperience] = useState({
    institute: "",
    position: "",
    duration: "",
    desc: "",
  });
  const [eduflag, seteduflag] = useState(false);
  const [expflag, setexpflag] = useState(false);
  const [proflag, setproflag] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      var detail = decode.uid[0];
      console.log(detail);
      setUserDetail(detail);
      const data = {
        resumeid: resume_id,
      };
      console.log(data);
      GETResume(data).then((res) => {
        if (res.data.err === 0) {
          console.log(res.data.resume);
          setBasics(res.data.resume[0].basic_detail[0]);
          setEducation(res.data.resume[0].education);
          setProjects(res.data.resume[0].projects);
          setExperience(res.data.resume[0].experience);
          setSkills(res.data.resume[0].skills[0]);
        } else {
          alert(res.data.msg);
        }
      });
    }
  }, []);

  const redirectDashboard = () => {
    history.push("/dashboard");
  };

  const basichandler = (event) => {
    const { name, value } = event.target;
    setBasics({ ...basics, [name]: value });

    switch (name) {
      case "firstname":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, firstname: f_error });
        break;
      case "lastname":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
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
      case "address":
        let cp_error = regForDesc.test(value)
          ? ""
          : "Must be of min 10 letters long";
        setError({ ...error, address: cp_error });
        break;
      case "city":
        let ci_error = regForName.test(value)
          ? ""
          : "Must be of min 4 Char Long";
        setError({ ...error, city: ci_error });
        break;
      case "pincode":
        let pi_error = regForPin.test(value) ? "" : "Must be of exact 6 digit ";
        setError({ ...error, pincode: pi_error });
        break;
      case "about":
        let ds_error = regForDesc.test(value)
          ? ""
          : "Must be of Min 10 Char Long";
        setError({ ...error, about: ds_error });
        break;
      default:
        break;
    }
  };

  const skillhandler = (event) => {
    const { name, value } = event.target;
    setSkills({ ...skills, [name]: value });
  };

  const educationhandler = (event) => {
    const { name, value } = event.target;
    setediteducation({ ...editeducation, [name]: value });

    switch (name) {
      case "college":
        let f_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, college: f_error });
        break;
      case "qual":
        let l_error = regForName.test(value)
          ? ""
          : "Only Aplhabates are allowed (minimum length of 5)";
        setError({ ...error, qual: l_error });
        break;

      case "eddesc":
        let ds_error = regForDesc.test(value)
          ? ""
          : "Must be of Min 10 Char Long";
        setError({ ...error, desc: ds_error });
        break;
      default:
        break;
    }
  };

  const experiencehandler = (event) => {
    const { name, value } = event.target;
    seteditexperience({ ...editexperience, [name]: value });

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

      case "exdesc":
        let ds_error = regForDesc.test(value)
          ? ""
          : "Must be of Min 10 Char Long";
        setError({ ...error, desc: ds_error });
        break;
      default:
        break;
    }
  };

  const projecthandler = (event) => {
    const { name, value } = event.target;
    seteditproject({ ...editproject, [name]: value });

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
          : "Only Aplhabates are allowed (minimum length of 5)";
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

  const educationSelected = (key) => {
    setediteducation(education[key]);
    seteduflag(true);
  };

  const changeeditededucation = (key) => {
    const filtereducation = education.filter((ele) => ele.college !== key);
    console.log(filtereducation);
    filtereducation.push(editeducation);
    console.log(filtereducation);
    setEducation(filtereducation);
    seteduflag(false);
    setediteducation({
      college: "",
      startdate: "",
      enddate: "",
      qual: "",
      desc: "",
    });
  };

  const expSelected = (key) => {
    seteditexperience(experience[key]);
    setexpflag(true);
  };

  const changeeditedexp = (key) => {
    const filtereducation = experience.filter((ele) => ele.institue !== key);
    console.log(filtereducation);
    filtereducation.push(editexperience);
    console.log(filtereducation);
    setExperience(filtereducation);
    setexpflag(false);
    seteditexperience({ institute: "", position: "", duration: "", desc: "" });
  };

  const projectSelected = (key) => {
    seteditproject(projects[key]);
    setproflag(true);
  };

  const changeeditedpro = (key) => {
    const filtereducation = projects.filter((ele) => ele.title !== key);
    console.log(filtereducation);
    filtereducation.push(editproject);
    console.log(filtereducation);
    setProjects(filtereducation);
    setproflag(false);
    seteditproject({
      title: "",
      link: "",
      role: "",
      period: "",
      projectDescription: "",
    });
  };

  const addnewedu = () => {
    setEducation([...education, editeducation]);
    setediteducation({
      college: "",
      startdate: "",
      enddate: "",
      qual: "",
      desc: "",
    });
  };

  const addnewexp = () => {
    setExperience([...experience, editexperience]);
    seteditexperience({ institute: "", position: "", duration: "", desc: "" });
  };

  const addnewpro = () => {
    setProjects([...projects, editproject]);
    seteditproject({
      title: "",
      link: "",
      role: "",
      period: "",
      projectDescription: "",
    });
  };

  const deleteedu = (key1) => {
    const filtereducation = education.filter((ele,key) => key !== key1);
    console.log(filtereducation);
    setEducation(filtereducation);
  };

  const deletepro = (key1) => {
    const filterpro = projects.filter((ele,key) => key !== key1);
    console.log(filterpro);
    setProjects(filterpro);
  };

  const deleteexp = (key1) => {
    const filterexp = experience.filter((ele,key) => key !== key1);
    console.log(filterexp);
    setExperience(filterexp);
  };

  const saveditedResume = () => {
    const Data = {
      resumeid: resume_id,
      userid: UserDetail._id,
      basicdetail_data: basics,
      education_data: education,
      projects_data: projects,
      experience_data: experience,
      skills_data: skills,
    };
    console.log(Data);
    UPDATEResume(Data).then((res) => {
      if (res.data.err === 0) {
        NotificationManager.success("Successfully Edited", "Success", 1500);
        setTimeout(() => {
          history.push(`/resumedetail/${resume_id}`);
        }, 2000);
      } else {
        NotificationManager.error("Something Went Wrong", "Error", 1500);
      }
    });
  };

  return (
    <Container fluid className="mt-2 mb-2 ">
      <NotificationContainer />
      <Row>
        <Col lg={7}>
          <Container fluid className="border border-success" ref={ref}>
            <Row className="bg-secondary">
              <Col lg={3}>
                <div className="bg-none mt-2 mb-2">
                  {UserDetail ? (
                    <Image
                      thumbnail
                      src={`/images/profile_pic/${UserDetail.profile_pic}`}
                      style={{ height: 300, width: 250 }}
                    />
                  ) : (
                    <Image
                      thumbnail
                      src="images/profile.png"
                      style={{ height: 300, width: 250 }}
                    />
                  )}
                </div>
              </Col>
              <Col lg={9}>
                <div className="text-light mt-3 h4">
                  <Row>
                    <Col lg={9} className="mt-2">
                      <PersonAddAlt1Outlined /> {basics && basics.firstname}{" "}
                      {basics && basics.lastname}
                    </Col>
                    <Col lg={9} className="mt-2">
                      {" "}
                      <EmailSharp />
                      {basics && basics.email}
                    </Col>
                    <Col lg={9} className="mt-2">
                      {" "}
                      <PhoneAndroid />
                      {basics && basics.phone}
                    </Col>
                    <p className="lead small mt-2">
                      <MapOutlined />
                      {basics && basics.address} , {basics && basics.city} -{" "}
                      {basics && basics.pincode}
                    </p>
                    <p className="lead small mt-2">
                      <DescriptionRounded />
                      {basics && basics.about}
                    </p>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Alert variant="success">Educational Details</Alert>
              {education &&
                education.map((ele, key) => (
                  <>
                    <b className="bg-info">Academics {key + 1}</b>
                    <Col md={6} sm={12} xs={12} lg={6} className="mt-3">
                      <SchoolOutlined />{" "}
                      <b>
                        School/University <ArrowRightAltSharp />
                      </b>{" "}
                      {ele.college}
                    </Col>
                    <Col md={6} sm={6} xs={12} lg={6} className="mt-3">
                      <CalendarTodayOutlined />{" "}
                      <b>
                        Start Date <ArrowRightAltSharp />{" "}
                      </b>{" "}
                      {ele.startdate}
                    </Col>

                    <Col md={6} sm={6} xs={12} lg={6} className="mt-3">
                      <CalendarTodayOutlined />{" "}
                      <b>
                        Completion Date <ArrowRightAltSharp />{" "}
                      </b>{" "}
                      {ele.enddate}
                    </Col>

                    <Col md={6} sm={12} xs={12} lg={6} className="mt-3">
                      <b>
                        Qualification <ArrowRightAltSharp />
                      </b>{" "}
                      {ele.qual}
                    </Col>

                    <Col md={8} sm={8} xs={8} lg={8} className="mt-3 bg-light">
                      <DescriptionRounded />{" "}
                      <b>
                        Description <ArrowRightAltSharp />
                      </b>
                      <p>{ele.desc}</p>
                    </Col>
                  </>
                ))}
            </Row>

            <Row className="mt-3">
              <Alert variant="success">Projects</Alert>
              {projects &&
                projects.map((ele, key) => (
                  <>
                    <b className="bg-info">Projects {key + 1}</b>
                    <Col md={6} sm={12} xs={12} lg={6} className="mt-3">
                      <TitleOutlined />{" "}
                      <b>
                        Project Title <ArrowRightAltSharp />
                      </b>{" "}
                      {ele.title}
                    </Col>
                    <Col md={6} sm={6} xs={12} lg={6} className="mt-3">
                      <b>
                        Link <ArrowRightAltSharp />{" "}
                      </b>{" "}
                      <a href="#">{ele.link} </a>
                    </Col>

                    <Col md={6} sm={6} xs={12} lg={6} className="mt-3">
                      <SchoolOutlined />{" "}
                      <b>
                        Role <ArrowRightAltSharp />{" "}
                      </b>{" "}
                      {ele.role}
                    </Col>

                    <Col md={6} sm={12} xs={12} lg={6} className="mt-3">
                      <TimeToLeaveOutlined />{" "}
                      <b>
                        Period <ArrowRightAltSharp />
                      </b>{" "}
                      {ele.period}
                    </Col>

                    <Col md={8} sm={8} xs={8} lg={12} className="mt-3 bg-light">
                      <DescriptionRounded />{" "}
                      <b>
                        Description <ArrowRightAltSharp />
                      </b>
                      <p>{ele.projectDescription}</p>
                    </Col>
                  </>
                ))}
            </Row>

            <Row className="mt-3">
              <Alert variant="success">Experiences</Alert>
              {experience &&
                experience.map((ele, key) => (
                  <>
                    <b className="bg-info">Experience {key + 1}</b>
                    <Col md={4} sm={12} xs={12} lg={12} className="mt-3">
                      <TitleOutlined />{" "}
                      <b>
                        Institute Name <ArrowRightAltSharp />
                      </b>{" "}
                      {ele.institute}
                    </Col>
                    <Col md={4} sm={6} xs={12} lg={6} className="mt-3">
                      <SchoolOutlined />{" "}
                      <b>
                        Postion <ArrowRightAltSharp />
                      </b>{" "}
                      {ele.position}
                    </Col>

                    <Col md={4} sm={6} xs={12} lg={6} className="mt-3">
                      <b>
                        Time Duration <ArrowRightAltSharp />{" "}
                      </b>{" "}
                      {ele.duration}
                    </Col>

                    <Col md={8} sm={8} xs={8} lg={12} className="mt-3 bg-light">
                      <DescriptionRounded />{" "}
                      <b>
                        Description <ArrowRightAltSharp />
                      </b>
                      <p>{ele.desc}</p>
                    </Col>
                  </>
                ))}
            </Row>

            <Row className="mt-3">
              <Alert variant="success">Skills & Interests</Alert>
              <Col md={6} sm={12} xs={12} lg={6} className="mt-3 ">
                <Row>
                  <Col md={4} sm={6} xs={6} lg={3}>
                    <b>
                      {" "}
                      Skills <ArrowRightAltSharp />
                    </b>
                  </Col>
                  <Col md={8} sm={6} xs={6} lg={9} className="mt-3">
                    <ul className="no-bullet">
                      <li>
                        {" "}
                        <ArrowRight /> {skills && skills.skill1}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.skill2}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.skill3}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.skill4}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.skill5}
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>

              <Col md={6} sm={12} xs={12} lg={6} className="mt-3 ">
                <Row>
                  <Col md={4} sm={6} xs={6} lg={3}>
                    <b>
                      Interests <ArrowRightAltSharp />
                    </b>
                  </Col>
                  <Col md={8} sm={6} xs={6} lg={9} className="mt-3">
                    <ul className="no-bullet">
                      <li>
                        {" "}
                        <ArrowRight />
                        {skills && skills.interest1}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.interest2}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.interest3}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.interest4}
                      </li>
                      <li>
                        <ArrowRight /> {skills && skills.interest5}
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col lg={5}>
          <Card>
            <CardHeader title="Personal Details" />
          </Card>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                name="firstname"
                id="outlined-required"
                label="firstname"
                style={{ width: "80%" }}
                onChange={basichandler}
                value={basics && basics.firstname}
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
                variant="outlined"
                id="outlined-required"
                label="lastname"
                style={{ width: "80%" }}
                name="lastname"
                onChange={basichandler}
                value={basics && basics.lastname}
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
                variant="outlined"
                id="outlined-required"
                label="email"
                name="email"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.email}
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
                variant="outlined"
                name="phone"
                id="outlined-required"
                label="phone number"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.phone}
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
                id="outlined-required"
                label="Address"
                style={{ width: "80%" }}
                onChange={basichandler}
                value={basics && basics.address}
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
                id="outlined-required"
                label="City"
                name="city"
                style={{ width: "80%" }}
                onChange={basichandler}
                value={basics && basics.city}
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
                id="outlined-required"
                label="Pincode"
                name="pincode"
                style={{ width: "80%" }}
                onChange={basichandler}
                value={basics && basics.pincode}
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
                id="outlined-required"
                label="Description"
                name="about"
                style={{ width: "80%" }}
                onChange={basichandler}
                value={basics && basics.about}
              />
              <div>
                {error.about.length > 0 && (
                  <span style={{ color: "red" }}> {error.about} </span>
                )}
              </div>
            </Grid>

            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Website"
                name="website"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.website}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.website.length > 0 && (
                  <span style={{ color: "red" }}> {error.website} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Github"
                name="github"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.github}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <GitHubIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.github.length > 0 && (
                  <span style={{ color: "red" }}> {error.github} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="LinkedIn"
                name="linkedin"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.linkedin}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LinkedInIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.linkedin.length > 0 && (
                  <span style={{ color: "red" }}> {error.linkedin} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Twitter"
                name="twitter"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.twitter}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.twitter.length > 0 && (
                  <span style={{ color: "red" }}> {error.twitter} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Facebook"
                name="facebook"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.facebook}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.facebook.length > 0 && (
                  <span style={{ color: "red" }}> {error.facebook} </span>
                )}
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Instagram"
                name="instagram"
                style={{ alignItems: "left", width: "80%" }}
                onChange={basichandler}
                value={basics && basics.instagram}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.instagram.length > 0 && (
                  <span style={{ color: "red" }}> {error.instagram} </span>
                )}
              </div>
            </Grid>
          </Grid>

          <hr />

          <Card>
            <br className="mt-3" />
            <CardHeader title="Education Details" />
          </Card>
          <div className="">
            <table className="border m-5 p-5">
              <tr>
                <th width="300px" scope="col">
                  {" "}
                  Adcademics{" "}
                </th>
                <th scope="col"></th>
              </tr>
              <hr />
              {education &&
                education.map((ele, key) => (
                  <tr>
                    <th width="300px"> {ele.college} </th>
                    <td className="p-2">
                      <Button
                        variant="success"
                        onClick={() => {
                          deleteedu(key);
                        }}
                      >
                        <DeleteIcon />
                      </Button>{" "}
                      <Button onClick={() => educationSelected(key)}>
                        <EditIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </table>

            <hr />
          </div>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="College"
                name="college"
                style={{ width: "100%" }}
                required
                onChange={educationhandler}
                value={editeducation.college}
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

            <Grid item md={6} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Start Date"
                name="startdate"
                type="date"
                style={{ width: "80%" }}
                required
                onChange={educationhandler}
                value={editeducation.startdate}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="End Date"
                name="enddate"
                type="date"
                style={{ width: "80%" }}
                required
                onChange={educationhandler}
                value={editeducation.enddate}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Qualification"
                style={{ width: "80%" }}
                name="qual"
                required
                value={editeducation.qual}
                onChange={educationhandler}
              />
              <div>
                {error.qual.length > 0 && (
                  <span style={{ color: "red" }}> {error.qual} </span>
                )}
              </div>
            </Grid>

            <Grid item md={12} sm={8} xs={8} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Description"
                style={{ width: "90%" }}
                name="desc"
                value={editeducation.desc}
                onChange={educationhandler}
              />
              <div>
                {error.eddesc.length > 0 && (
                  <span style={{ color: "red" }}> {error.eddesc} </span>
                )}
              </div>
            </Grid>

            {eduflag ? (
              <Button
                onClick={() => changeeditededucation(editeducation.college)}
              >
                Edit
              </Button>
            ) : (
              <Button onClick={addnewedu}>Add New</Button>
            )}
          </Grid>

          <Card>
            <CardHeader title="Projects Developed" />
          </Card>
          <div className="">
            <table className="border m-5 p-5">
              <tr>
                <th width="300px" scope="col">
                  {" "}
                  Projects{" "}
                </th>
                <th scope="col"></th>
              </tr>
              <hr />
              {projects &&
                projects.map((ele, key) => (
                  <tr>
                    <th width="300px"> {ele.title} </th>
                    <td className="p-2">
                      <Button
                        variant="success"
                        onClick={() => {
                          deletepro(key);
                        }}
                      >
                        <DeleteIcon />
                      </Button>{" "}
                      <Button
                        onClick={() => {
                          projectSelected(key);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </table>

            <hr />
          </div>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item xs={12} lg={12}>
              <h5>Project </h5>
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Title"
                name="title"
                style={{ width: "100%" }}
                required
                onChange={projecthandler}
                value={editproject.title}
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
            <Grid item md={6} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Link"
                name="link"
                style={{ width: "80%" }}
                required
                onChange={projecthandler}
                value={editproject.link}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.link.length > 0 && (
                  <span style={{ color: "red" }}> {error.link} </span>
                )}
              </div>
            </Grid>

            <Grid item md={6} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Period (in months)"
                name="period"
                style={{ width: "80%" }}
                required
                onChange={projecthandler}
                value={editproject.period}
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

            <Grid item md={6} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Your Role"
                name="role"
                style={{ width: "80%" }}
                required
                onChange={projecthandler}
                value={editproject.role}
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
                id="outlined-required"
                label="Project Description"
                name="projectDescription"
                style={{ width: "80%" }}
                required
                onChange={projecthandler}
                value={editproject.projectDescription}
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

            {proflag ? (
              <Button onClick={() => changeeditedpro(editproject.title)}>
                Edit
              </Button>
            ) : (
              <Button onClick={addnewpro}>Add New</Button>
            )}
          </Grid>

          <Card>
            <CardHeader title="Experience Details" />
          </Card>
          <div className="">
            <table className="border m-5 p-5">
              <tr>
                <th width="300px" scope="col">
                  {" "}
                  Experiences{" "}
                </th>
                <th scope="col"></th>
              </tr>
              <hr />
              {experience &&
                experience.map((ele, key) => (
                  <tr>
                    <th width="300px"> {ele.institute} </th>
                    <td className="p-2">
                      <Button
                        variant="success"
                        onClick={() => {
                          deleteexp(key);
                        }}
                      >
                        <DeleteIcon />
                      </Button>{" "}
                      <Button
                        onClick={() => {
                          expSelected(key);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </table>

            <hr />
          </div>
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

            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Company/Institute Name"
                name="institute"
                style={{ width: "100%" }}
                required
                onChange={experiencehandler}
                value={editexperience.institute}
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
            <Grid item md={6} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Postion"
                name="position"
                style={{ width: "90%" }}
                required
                value={editexperience.position}
                onChange={experiencehandler}
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

            <Grid item md={6} sm={6} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                id="outlined-required"
                label="Duration(months)"
                name="duration"
                style={{ width: "90%" }}
                required
                onChange={experiencehandler}
                value={editexperience.duration}
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
                variant="outlined"
                id="outlined-required"
                label="Description"
                style={{ width: "97%" }}
                name="desc"
                required
                onChange={experiencehandler}
                value={editexperience.desc}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                {error.exdesc.length > 0 && (
                  <span style={{ color: "red" }}> {error.exdesc} </span>
                )}
              </div>
            </Grid>

            {expflag ? (
              <Button
                onClick={() => {
                  changeeditedexp(editexperience.institute);
                }}
              >
                Edit
              </Button>
            ) : (
              <Button onClick={addnewexp}>Add New</Button>
            )}
          </Grid>

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
                  id="outlined-required"
                  label="Skills 1"
                  name="skill1"
                  style={{ width: "90%" }}
                  onChange={skillhandler}
                  value={skills && skills.skill1}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Skills 2"
                  name="skill2"
                  style={{ width: "90%" }}
                  onChange={skillhandler}
                  value={skills && skills.skill2}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Skills 3"
                  name="skill3"
                  style={{ width: "90%" }}
                  onChange={skillhandler}
                  value={skills && skills.skill3}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Skills 4"
                  name="skill4"
                  style={{ width: "90%" }}
                  onChange={skillhandler}
                  value={skills && skills.skill4}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>

              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Skills 5"
                  name="skill5"
                  style={{ width: "90%" }}
                  onChange={skillhandler}
                  value={skills && skills.skill5}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <hr />
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
                  variant="outlined"
                  id="outlined-required"
                  label="Interest 1"
                  style={{ width: "90%" }}
                  name="interest1"
                  onChange={skillhandler}
                  value={skills && skills.interest1}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Interest 2"
                  style={{ width: "90%" }}
                  name="interest2"
                  value={skills && skills.interest2}
                  onChange={skillhandler}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Interest 3"
                  style={{ width: "90%" }}
                  name="interest3"
                  value={skills && skills.interest3}
                  onChange={skillhandler}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Interest 4"
                  style={{ width: "90%" }}
                  name="interest4"
                  onChange={skillhandler}
                  value={skills && skills.interest4}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  id="outlined-required"
                  label="Interest 5"
                  style={{ width: "90%" }}
                  name="interest5"
                  onChange={skillhandler}
                  value={skills && skills.interest5}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="text-end m-3 p-3">
          <Button
            onClick={redirectDashboard}
            variant="secondary"
            size="lg"
            className=" me-2"
          >
            {" "}
            <CancelPresentation />
            Cancel
          </Button>

          <Button
            onClick={saveditedResume}
            variant="secondary"
            size="lg"
            className=" me-2"
          >
            {" "}
            <SaveAlt />
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
