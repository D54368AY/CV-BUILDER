import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Image } from "react-bootstrap";
import { Newspaper } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FileCopy from "@material-ui/icons/FileCopy";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import "../../css/Resume.css";
import { GETALLResume, DELETEResume } from "../../config/myservice";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
export default function AllResume() {
  const history = useHistory();
  const [UserDetail, setUserDetail] = useState();
  const [Resumes, setResumes] = useState();

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      console.log(token);
      let decode = jwt_decode(token);
      var detail = decode.uid[0];
      console.log(detail);
      setUserDetail(detail);

      const data = {
        userid: detail._id,
      };
      console.log(data);
      GETALLResume(data).then((res) => {
        if (res.data.err === 0) {
          setResumes(res.data.allresumes);
          console.log(res.data.allresumes);
        } else {
          alert("something error");
        }
      });
    }
  }, []);

  const addresumes = () => {
    history.push("/basicdetail");
  };

  const deleteResume = (key) => {
    const data = { resumeid: key };
    DELETEResume(data).then((res) => {
      if (res.data.err === 0) {
        const data = {
          userid: UserDetail._id,
        };
        console.log(data);
        GETALLResume(data).then((res) => {
          if (res.data.err === 0) {
            setResumes(res.data.allresumes);
            console.log(res.data.allresumes);
            NotificationManager.error(res.data.msg, "Success", 1500);
          } else {
            NotificationManager.error(res.data.msg, "Error", 1500);
          }
        });
      } else {
        alert("cannot delete");
      }
    });
  };
  return (
    <Container fluid className="mt-2">
      {Resumes && Resumes.length != 0 ? (
        Resumes.map((ele, key) => (
          <Card sx={{ minWidth: 275 }} className="m-2 p-2">
            <CardContent>
              <Typography variant="h5" component="div">
                <FileCopy /> Resume #{key + 101}
              </Typography>

              <Typography variant="body2" className="mt-2">
                {ele.basic_detail[0].about}
              </Typography>
            </CardContent>
            <CardActions className="mt-2">
              <Link to={`/resumedetail/${ele._id}`}>
                <Button variant="success no-decoration">
                  Download <DownloadIcon />
                </Button>
              </Link>
            </CardActions>
            <CardActions className="float-right">
              <Link to={`/editresume/${ele._id}`}>
                <Button variant="secondary">
                  Edit <EditIcon />
                </Button>
              </Link>{" "}
              <b>-</b>
              <Button variant="info" onClick={() => deleteResume(ele._id)}>
                Delete <DeleteIcon />
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <>
          <h3>There's No Resume Available.</h3>
          <div>
            <Image className="no-resume" src="/images/noresume.jpg" />
          </div>
          <h3>Why Don't You Add One?</h3>
          <Button size="lg">
            {" "}
            Create CV <Newspaper />
          </Button>
        </>
      )}
    </Container>
  );
}
