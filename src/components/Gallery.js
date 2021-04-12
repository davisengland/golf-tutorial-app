import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "./Header";
import { getTutorials } from "../redux/reducers/tutorialsReducer";
import { connect } from "react-redux";
import { getUser } from "../redux/reducers/userReducer";
import { addToHistory } from "../redux/reducers/historyReducer";
import axios from "axios";

function Gallery(props) {
  let history = useHistory();
//   let user_id = props.userReducer.user.user_id;

  const playVideo = (embed_id) => {
    // let user_id = props.userReducer.user.user_id
    let body = { embed_id };
    axios.post("/history", body).then((res) => {
      props.addToHistory(res.data);
    });
  };

  // const tutorialsMap = props.tutorialsReducer.tutorials.map(elem => {
  //     return(
  //         <div key={elem.embed_id}>
  //             <iframe
  //                 width='560'
  //                 height='315'
  //                 src={`https://www.youtube.com/embed/${elem.embed_id}`}
  //                 title='YouTube video player'
  //                 // onload={alert('Here I am')}
  //                 frameborder='0'
  //                 allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  //                 allowfullscreen>
  //             </iframe>
  //         </div>
  //     )
  // })

  const tutorialsMap = props.tutorialsReducer.tutorials.map((elem) => {
    return (
      <div key={elem.embed_id}>
        <YouTube
          videoId={elem.embed_id}
          id={elem.embed_id}
        //   onPlay={playVideo(elem.tutorial_id, elem.embed_id)}
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
  getUser,
  getTutorials,
})(Gallery);
