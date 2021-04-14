import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../redux/reducers/userReducer";
import { connect } from "react-redux";
import logo11 from '../logos/logo11.png'
import "./Landing.css";

function Landing(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  let history = useHistory();

  const signupUser = () => {
    let body = { email, password, first_name, last_name };
    axios
      .post("/signup", body)
      .then((res) => {
        props.dispatch(signup(res.data));
        history.push("/");
      })
      .catch((err) => alert(`An account already exists for ${email}`));
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="landing">
      <header className='landing-header'>
        <img src={logo11} className='logo11'/>
        <Link to="/login">
          <button className='login-button'>login</button>
        </Link>
      </header>
      <section className='top-section'>
        <div className='white-box'>
          <h1 className='text1'>Sign up for your free "my golf" account</h1>
          <h2 className='text2'>Access to detailed tutorials and more!</h2>
          <div className="name">
            <input
              className='inputs'
              value={first_name}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='inputs'
              value={last_name}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="email-password">
            <input
              className='inputs'
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='inputs'
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='create-button' onClick={signupUser}>Create Account</button>
        </div>
      </section>
      <section className='bottom-section'>
        <img className='images' src='https://www.golfwrx.com/wp-content/uploads/2019/09/YT-LAST-ATTEMPT-400x240.jpg'/>
        <img className='images' src='https://i.ytimg.com/vi/OkB9tniWbeE/maxresdefault.jpg'/>
        <img className='images' src='https://i.ytimg.com/vi/4UxpYlO3Dss/maxresdefault.jpg'/>
      </section>
    </div>
  );
}

export default connect()(Landing);
