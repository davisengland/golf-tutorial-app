// import React, { useState, useEffect } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import './Profile.css'

function Profile(props) {
  navigator.webkitPersistentStorage.YTConfig = { host: 'https://www.youtube.com' } 

  const historyMap = props.historyReducer.history.map((elem) => {
    return (
      <div key={elem.embed_id}>
        <YouTube
          className='history-videos'
          videoId={elem.embed_id}
          id={elem.embed_id}
        />
      </div>
    );
  });

  return (
    <div className='profile-page'>
      <Header />
      <section className='profile-body'>
        <h1>
          {props.userReducer.user.first_name?.charAt(0).toUpperCase()}
          {props.userReducer.user.last_name?.charAt(0).toUpperCase()}
        </h1>
        <div className='user-info'>
          <p className='info-descriptions'>
            <h2>First Name:</h2>
            <h2>Last Name:</h2>
            <h2>Email:</h2>
          </p>
          <p className='info'>
            <h2>{props.userReducer.user.first_name}</h2>
            <h2>{props.userReducer.user.last_name}</h2>
            <h2>{props.userReducer.user.email}</h2>
          </p>
        </div>
        <h1>History</h1>
        {historyMap}
      </section>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Profile);
