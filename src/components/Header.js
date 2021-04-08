// import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Header(props) {

  return (
    <div>
      <h1 className="logo">ScrathGolf</h1>
      <Link to="/gallery">Gallery</Link>
      <Link to="/">Logout</Link>
      <h1>
        {props.user.first_name?.charAt(0).toUpperCase()}
        {props.user.last_name?.charAt(0).toUpperCase()}
      </h1>
    </div>
  );
}

function mapStateToProps(state) {
  return state.userReducer;
}

export default connect(mapStateToProps)(Header);
