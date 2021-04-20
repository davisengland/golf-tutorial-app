import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from '../redux/reducers/userReducer'
import './Update.css'

function Update(props) {
  const [new_email, setNewEmail] = useState("");
  const [new_first_name, setNewFirstName] = useState("");
  const [new_last_name, setNewLastName] = useState("");

  const updateUser = () => {
      let body = { new_email, new_first_name, new_last_name }
      axios.put('/user', body)
        .then(res => {
            props.updateUser(res.data)
            props.setIsUpdating(false)
        })
        .catch(err => console.log(err))
      setNewEmail('')
      setNewFirstName('')
      setNewLastName('')
  }
    
  return (
    <div className='update-fields'>
        <input 
            value={new_first_name} 
            className='update-inputs' 
            placeholder='New First Name'
            onChange={(e) => setNewFirstName(e.target.value)}/>
        <input 
            value={new_last_name} 
            className='update-inputs' 
            placeholder='New Last Name'
            onChange={(e) => setNewLastName(e.target.value)}/>
        <input 
            value={new_email} 
            className='update-inputs' 
            placeholder='New Email'
            onChange={(e) => setNewEmail(e.target.value)}/>
        <button onClick={updateUser}>Update</button>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {updateUser})(Update);