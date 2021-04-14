import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "./Header";
import { getTutorials } from "../redux/reducers/tutorialsReducer";
import { connect } from "react-redux";
import { getUser } from "../redux/reducers/userReducer";
import { addToHistory, getHistory } from "../redux/reducers/historyReducer";
import axios from "axios";

function Gallery(props) {

  const playVideo = (embedId) => {
      if(props.historyReducer.history.some(elem => elem.embed_id === embedId)) {

      } else {
        let body = { embed_id: embedId };
        axios.post("/history", body).then((res) => {
          props.addToHistory(res.data);
        });
        //   alert('add video to history')
      }
  };

//   const tutorialsMap = props.tutorialsReducer.tutorials.map(elem => {
//       return(
//           <div key={elem.embed_id}>
//               <iframe
//                   width='560'
//                   height='315'
//                   src={`https://www.youtube.com/embed/${elem.embed_id}`}
//                   title='YouTube video player'
//                   frameBorder='0'
//                   allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                   allowFullScreen>
//               </iframe>
//           </div>
//       )
//   })

    navigator.webkitPersistentStorage.YTConfig = { host: 'https://www.youtube.com' } 

  const tutorialsMap = props.tutorialsReducer.tutorials.map((elem) => {
    return (
      <div key={elem.embed_id}>
        <YouTube
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
      {tutorialsMap}
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
