import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import routes from "./routes";
import { connect } from "react-redux";
import { getUser } from "./redux/reducers/userReducer";
import { getTutorials } from "./redux/reducers/tutorialsReducer";
import { getHistory } from "./redux/reducers/historyReducer";
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
          if (location.pathname === "/" || location.pathname === "/profile") {
            history.push("/landing");
          }
        });

      axios
        .get("/tutorials")
        .then((res) => {
          props.getTutorials(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get("/history")
        .then((res) => {
          props.getHistory(res.data);
        })
        .catch((err) =>
          console.error("Cannot show history if user is not logged in")
        );
    };

    fetchData();
  }, [location.pathname, history]);

  return <div className="App">{routes}</div>;
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  getUser,
  getTutorials,
  getHistory,
})(App);
