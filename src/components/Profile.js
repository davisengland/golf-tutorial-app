import React, { useState } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import Dropzone from 'react-dropzone'
import { ClockLoader } from 'react-spinners'
import { v4 as randomString } from 'uuid'
import { addVideo } from '../redux/reducers/videosReducer'
import PracticeVideo from './PracticeVideo'
import Update from './Update'
import './Profile.css'
import axios from "axios";

function Profile(props) {
  const [isUploading, setIsUploading] = useState(false)
  const [url, setUrl] = useState('http://via.placeholder.com/450x450')
  const [isUpdating, setIsUpdating] = useState(false)

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

  const getSignedRequest = ([file]) => {
    setIsUploading(true)
 
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
    const folderName = props.userReducer.user.user_id
 
    axios.get('/sign-s3', {
      params: {
        'file-name': fileName,
        'file-type': file.type,
        'folder-name': folderName
      }
    }).then(res => {
      const { signedRequest, url } = res.data
      console.log(signedRequest, 'signed request')
      uploadFile(file, signedRequest, url)
    }).catch( err => {
      console.log(err)
    })
  }

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type
      }
    }

    axios.put(signedRequest, file, options)
      .then(res => {
        setIsUploading(false)
        setUrl(url)
      })
      .catch(err => {
        setIsUploading(false)
        if(err.response.status === 403) {
          alert(`ERROR:\n${err.stack}`)
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`)
        }
      })

    console.log(props.videosReducer.practiceVideos, 'props')

    axios.post('/videos', {url})
      .then(res => {
        props.addVideo(res.data)
      })
  }

  return (
    <div className='profile-page'>
      <Header />
      <section className='profile-body'>
        <div className='info-container'>
          <h1 className='initials'>
            {props.userReducer.user.first_name?.charAt(0).toUpperCase()}
            {props.userReducer.user.last_name?.charAt(0).toUpperCase()}
          </h1>
          <div className='user-info'>
            <div className='info-descriptions'>
              <h2>First Name:</h2>
              <h2>Last Name:</h2>
              <h2>Email:</h2>
            </div>
            <div className='info'>
              <h2>{props.userReducer.user.first_name}</h2>
              <h2>{props.userReducer.user.last_name}</h2>
              <h2 className='email'>{props.userReducer.user.email}</h2>
            </div>
          </div>
        </div>
        {isUpdating ? <Update isUpdating={isUpdating} setIsUpdating={setIsUpdating}/> : <button className='edit-info' onClick={() => setIsUpdating(true)}>Edit Info</button>}
        <section className='practice-video-section'>
          <h1 className='section-title upload-title'>Upload Practice Video</h1>
          <div className='dropzone'>
            <Dropzone
              onDropAccepted={getSignedRequest}
              accept="video/*"
              multiple={false}>
              {({getRootProps, getInputProps}) => (
              <div 
                  style = {{
                  width: 160,
                  height: 80,
                  borderWidth: 5,
                  marginTop: 25,
                  borderColor: 'gray',
                  borderStyle: 'dashed',
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,}}
                  {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isUploading ? <ClockLoader /> : <p>Drop files here, or click to select files</p>}
              </div>
              )}
            </Dropzone>
          </div>
          <PracticeVideo/>
        </section>
        <h1 className='section-title'>History</h1>
        <div className='history-container'>
          {historyMap}
        </div>
      </section>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {addVideo})(Profile);
