import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import ReactToPdf from "react-to-pdf";
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
import LanguageIcon from "@material-ui/icons/Language";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import "../../css/Resume.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { ADDResume } from "../../config/myservice";
const options = {
  orientation: "potrait",
  unit: "in",
  format: "A4",
};

export default function NewResume() {
  const history = useHistory();
  const ref = React.createRef();

  const [UserDetail, setUserDetail] = useState();

  const basics = useSelector((state) => state.basicdetail);
  const education = useSelector((state) => state.education);
  const projects = useSelector((state) => state.projects);
  const experience = useSelector((state) => state.experience);
  const skills = useSelector((state) => state.skills);

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      var detail = decode.uid[0];
      console.log(detail);
      setUserDetail(detail);
    }
  }, []);

  const savepdfdetail = () => {
    const basicdetail_data1 = [
      {
        image: "abc.jpg",
        firstname: basics.firstname,
        lastname: basics.lastname,
        email: basics.email,
        phone: basics.phone,
        address: basics.address,
        city: basics.city,
        pincode: basics.pincode,
        about: basics.desc,
        linkedin: basics.linkedin,
        facebook: basics.facebook,
        instagram: basics.instagram,
        twitter: basics.twitter,
        website: basics.website,
        github: basics.github,
      },
    ];
    const Data = {
      userid: UserDetail._id,
      basicdetail_data: basicdetail_data1,
      education_data: education,
      projects_data: projects,
      experience_data: experience,
      skills_data: skills,
    };

    console.log(Data);
    ADDResume(Data).then((res) => {
      if (res.data.err === 0) {
        history.push("/dashboard");
      } else {
        alert("something error");
      }
    });
  };

  const redirectDashboard = () => {
    history.push("/dashboard");
  };

  return (
    <Container fluid>
    <Container className="mt-2 mb-2 border border-success" ref={ref}>
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
                {basics && basics.desc}
              </p>
            </Row>
          </div>
        </Col>
      </Row>
      <Alert variant="dark">
        <Row>
          <Col lg={4} md={4} sm={6}>
            <LanguageIcon />
            {basics && basics.website}{" "}
          </Col>
          <Col lg={4} md={4} sm={6}>
            <GitHubIcon />
            {basics && basics.github}{" "}
          </Col>
          <Col lg={4} md={4} sm={6}>
            <FacebookIcon />
            {basics && basics.facebook}{" "}
          </Col>
          <Col lg={4} md={4} sm={6}>
            <TwitterIcon />
            {basics && basics.twitter}{" "}
          </Col>
          <Col lg={4} md={4} sm={6}>
            <InstagramIcon />
            {basics && basics.instagram}{" "}
          </Col>
          <Col lg={4} md={4} sm={6}>
            <LinkedInIcon />
            {basics && basics.linkedin}{" "}
          </Col>
        </Row>
      </Alert>
      <Row className="mt-w">
        <Alert variant="success">Educational Details</Alert>
        {education &&
          education.map((ele, key) => (
            <>
              <b className="bg-info">Academics {key + 1}</b>
              <Col md={4} sm={12} xs={12} lg={4} className="mt-3">
                <SchoolOutlined />{" "}
                <b>
                  School/University <ArrowRightAltSharp />
                </b>{" "}
                {ele.college}
              </Col>
              <Col md={4} sm={6} xs={12} lg={4} className="mt-3">
                <CalendarTodayOutlined />{" "}
                <b>
                  Start Date <ArrowRightAltSharp />{" "}
                </b>{" "}
                {ele.startdate}
              </Col>

              <Col md={4} sm={6} xs={12} lg={4} className="mt-3">
                <CalendarTodayOutlined />{" "}
                <b>
                  Completion Date <ArrowRightAltSharp />{" "}
                </b>{" "}
                {ele.enddate}
              </Col>

              <Col md={4} sm={12} xs={12} lg={4} className="mt-3">
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
                {ele.period} Months
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
                {ele.duration} Months
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
            <Col md={8} sm={6} xs={6} lg={9} className="mt-2">
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

<Row>
<Col>
  <div className="m-3 p-3">
    <Button onClick={savepdfdetail} size="lg" className="me-2">
      {" "}
      <SaveAlt />
      Save
    </Button>
    <ReactToPdf
      targetRef={ref}
      filename="abc.pdf"
      options={options}
      x={0}
      y={0}
      scale={0.68}
    >
      {({ toPdf }) => (
        <Button size="lg" onClick={toPdf}>
          Generate pdf
        </Button>
      )}
    </ReactToPdf>
  </div>
</Col>
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
</Col>
</Row>
</Container>
  );
}
