import React from "react";
import axios from "axios";
import { connect } from "react-redux";

function Update(props) {
  return (
    <div className='practice-video-container'>
        {videosMap}
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {deleteVideo})(Update);
