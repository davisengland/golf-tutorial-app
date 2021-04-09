import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import routes from "./routes";
import { connect } from "react-redux";
import { getUser } from "./redux/reducers/userReducer";
import { getTutorials } from "./redux/reducers/tutorialsReducer";
import { useLocation, useHistory } from "react-router-dom";

function App(props) {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/user")
        .then((res) => {
          props.getUser(res.data);
        })
        .catch((err) => {
          console.error("No user logged in.");
          if (location.pathname === "/" || location.pathname === '/profile') {
            history.push("/landing");
          }
        });

      axios
        .get("/tutorials")
        .then((res) => {
          props.getTutorials(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [location.pathname]);

  return <div className="App">{routes}</div>;
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  getUser: getUser,
  getTutorials: getTutorials,
})(App);
