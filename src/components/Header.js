import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
import { logoutHistory } from '../redux/reducers/historyReducer'
import { logoutVideos } from '../redux/reducers/videosReducer'
import axios from "axios";
import logo11 from '../logos/logo11.png'
import './Header.css'

function Header(props) {
  const [menu, setMenu] = useState('none')

  let history = useHistory();

  const logoutUser = () => {
    axios
      .post("/logout")
      .then((res) => {
        props.logout();
        props.logoutHistory();
        props.logoutVideos();
        history.push("/landing");
      })
      .catch((err) => console.log(err));
  };

  const showMenu = () => {
    if(menu === 'closed' || menu === 'none') {
        setMenu('open')
    } else {
        setMenu('closed')
    }
  }

  return (
    <div className='header'>
      <section className='mobile-header'>
        <img src={logo11} className='header-logo11' alt='logo11'/>
        <div className='menu-button' onClick={() => showMenu()}>
          <div className='menu-icon'>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
          </div>
        </div>
      </section>
      <section className='desktop-header'>
        <img src={logo11} className='header-logo' alt='logo11'/>
        <div className='horizontal-menu'>
          <Link to="/" className='desktop-links'><h2>Gallery</h2></Link>
          <h2 onClick={logoutUser} className='desktop-links logout'>Logout</h2>
          <Link to="/profile" className='desktop-links'>
            <h2 className='initials-link'>
              {props.userReducer.user.first_name?.charAt(0).toUpperCase()}
              {props.userReducer.user.last_name?.charAt(0).toUpperCase()}
            </h2>
          </Link>
        </div>
      </section>
      <div className={menu === 'none' ? 'none' : menu === 'open' ? 'open' : 'closed'}>
        <Link to="/" className='gallery-link links'><h2>Gallery</h2></Link>
        <Link to="/profile" className='profile-link links'>
          <h2>
            Profile
          </h2>
        </Link>
        <h2 onClick={logoutUser} className='logout-link links'>Logout</h2>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { logout, logoutHistory, logoutVideos })(Header);
