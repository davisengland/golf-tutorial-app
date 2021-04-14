// import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
import { logoutHistory } from '../redux/reducers/historyReducer'
import axios from "axios";
import logo4 from '../logos/logo4.png'
import './Header.css'

function Header(props) {
  let history = useHistory();

  const logoutUser = () => {
    axios
      .post("/logout")
      .then((res) => {
        props.logout();
        props.logoutHistory();
        history.push("/landing");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <img src={logo4} className='little-logo'/>
      <Link to="/">Gallery</Link>
      <h2 onClick={logoutUser}>Logout</h2>
      <Link to="/profile">
        <h1>
          {props.user.first_name?.charAt(0).toUpperCase()}
          {props.user.last_name?.charAt(0).toUpperCase()}
        </h1>
      </Link>
    </div>
  );
}

function mapStateToProps(state) {
  return state.userReducer;
}

export default connect(mapStateToProps, { logout, logoutHistory })(Header);
