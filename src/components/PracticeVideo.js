import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { deleteVideo } from '../redux/reducers/videosReducer'
import './PracticeVideo.css'

function PracticeVideo(props) {
  const videosMap = props.videosReducer.practiceVideos.map((elem) => {
    let url = elem.url
    return (
        <div key={elem.url} className='x-video'>
        <button className='x' onClick={() => {
            axios.delete(`/videos?url=${url}`)
                .then(res => {
                    props.deleteVideo(res.data)
                })
                .catch(err => console.log(err))

            axios.delete('/sign-s3', {
                params: {
                    'file-name': elem.url.slice(42),
                    'folder-name': props.userReducer.user.user_id
                }
            }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }}>X</button>
        <video controls className='practice-videos'><source type='video/mp4' src={elem.url}/></video>
      </div>
    );
  });

  return (
    <div className='practice-video-container'>
        {videosMap}
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {deleteVideo})(PracticeVideo);
