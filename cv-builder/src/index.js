import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import {Provider} from 'react-redux';

const initialState = 
        {
           basicdetail : '',
           education : '',
           experience : '',
           projects: '',
           skills: '',
           };

function reducer(state = initialState, actions) {
  console.log(state);
  switch (actions.type) {
    case "BASIC_ADD":
           console.log(actions.payload);
      return { ...state,basicdetail:  actions.payload };

      case "EDUCATION_ADD" :
           console.log(actions.payload);
            return { ...state,education: actions.payload };
      case "PROJECT_ADD" :
            console.log(actions.payload);
              return { ...state,projects: actions.payload };
      case "EXP_ADD" :
             console.log(actions.payload);
            return { ...state,experience: actions.payload };
      case "SKILL_ADD" :
            console.log(actions.payload);
            return { ...state,skills: actions.payload };      
    default:
      return state;
  }
  console.log(state);
}

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
