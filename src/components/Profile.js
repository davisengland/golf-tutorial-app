import React, { useState, useEffect } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import YouTube from "react-youtube";

function Profile(props) {
  navigator.webkitPersistentStorage.YTConfig = { host: 'https://www.youtube.com' } 

  const historyMap = props.historyReducer.history.map((elem) => {
    return (
      <div key={elem.embed_id}>
        <YouTube
          videoId={elem.embed_id}
          id={elem.embed_id}
        />
      </div>
    );
  });

  return (
    <div>
      <Header />
      <h1>
        {props.userReducer.user.first_name?.charAt(0).toUpperCase()}
        {props.userReducer.user.last_name?.charAt(0).toUpperCase()}
      </h1>
      <div>
        <h2>First Name: {props.userReducer.user.first_name}</h2>
        <h2>Last Name: {props.userReducer.user.last_name}</h2>
        <h2>Email: {props.userReducer.user.email}</h2>
      </div>
      <h1>History</h1>
      {historyMap}
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Profile);
