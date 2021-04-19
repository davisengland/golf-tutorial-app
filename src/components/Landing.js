import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../redux/reducers/userReducer";
import { connect } from "react-redux";
import logo11 from '../logos/logo11.png'
import image1 from '../images/image1.png'
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import image4 from '../images/image4.png'
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
        <img src={logo11} className='logo11' alt='logo11'/>
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
              type='password'
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
        <h1 className='text3'>Videos for every part of your game!</h1>
        <img className='images' src={image1} alt='image1'/>
        <img className='images' src={image2} alt='image2'/>
        <img className='images' src={image3} alt='image3'/>
        <img className='images' src={image4} alt='image4'/>
      </section>
    </div>
  );
}

export default connect()(Landing);
