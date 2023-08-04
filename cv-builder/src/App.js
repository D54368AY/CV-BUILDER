import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import React, { Suspense } from "react";

const Login = React.lazy(() => import("./components/Credentials/Login"));
const Signup = React.lazy(() => import("./components/Credentials/Signup"));
const Dashboard = React.lazy(() => import("./components/Layout/Dashboard"));
const Basicdetail = React.lazy(() => import("./components/AddNew/Basicdetail"));
const Education = React.lazy(() => import("./components/AddNew/Education"));
const Projects = React.lazy(() => import("./components/AddNew/Projects"));
const Skills = React.lazy(() => import("./components/AddNew/Skills"));
const Experience = React.lazy(() => import("./components/AddNew/Experience"));
const NewResume = React.lazy(() => import("./components/AddNew/NewResume"));
const ResumeDetail = React.lazy(() => import("./components/ResumeDetail"));
const EditResume = React.lazy(() => import("./components/EditResume"));
const Disconnect = React.lazy(() => import("./components/Layout/Dashboard"));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="m-5 p-5 text-center">
            <img src="/images/lazyloading.gif" />
          </div>
        }
      >
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/basicdetail" exact component={Basicdetail} />
            <Route path="/education" exact component={Education} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/skills" exact component={Skills} />
            <Route path="/experience" exact component={Experience} />
            <Route path="/newresume" exact component={NewResume} />
            <Route path="/resumedetail/:id" exact component={ResumeDetail} />
            <Route path="/editresume/:id" exact component={EditResume} />
            <Route path="/disconnect" exact component={Disconnect} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
