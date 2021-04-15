import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { login } from "../redux/reducers/userReducer";
import { connect } from "react-redux";
import logo10 from '../logos/logo10.png'
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const loginUser = () => {
    let body = { email, password };
    axios
      .post("/login", body)
      .then((res) => {
        props.login(res.data);
        history.push("/");
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          alert(
            "Email not found. Please sign-up as a new user before logging in."
          );
        } else if (err.response?.status === 403) {
          alert("Incorrect password. Please try again.");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className='login-page'>
      <header>
        <img src={logo10} className='logo10' alt='logo10'/>
      </header>
      <section className='login-boxes'>
        <input
          className='login-inputs'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className='login-inputs'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </section>
      <button onClick={loginUser} className='button'>Login</button>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { login })(Login);
