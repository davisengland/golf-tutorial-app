// import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "./Header";
import { getTutorials } from "../redux/reducers/tutorialsReducer";
import { connect } from "react-redux";
import { getUser } from "../redux/reducers/userReducer";
import { addToHistory, getHistory } from "../redux/reducers/historyReducer";
import axios from "axios";
import './Gallery.css'

function Gallery(props) {

  const playVideo = (embedId) => {
      if(props.historyReducer.history.some(elem => elem.embed_id === embedId)) {

      } else {
        let body = { embed_id: embedId };
        axios.post("/history", body).then((res) => {
          props.addToHistory(res.data);
        });
      }
  };

  navigator.webkitPersistentStorage.YTConfig = { host: 'https://www.youtube.com' } 

  const tutorialsMap = props.tutorialsReducer.tutorials.map((elem) => {
    return (
      <div key={elem.embed_id}>
        <YouTube
          className ='gallery-videos'
          videoId={elem.embed_id}
          id={elem.embed_id}
          onPlay={() => {
              playVideo(elem.embed_id)
          }}
        />
      </div>
    );
  });

  return (
    <div>
      <Header />
      <section className='gallery-body'>
        {tutorialsMap}
      </section>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  addToHistory,
  getHistory,
  getUser,
  getTutorials,
})(Gallery);
