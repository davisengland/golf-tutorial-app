import React, { useState, useEffect } from 'react'
import Header from './Header'
import { connect } from 'react-redux'

function Profile(props) {


    return(
        <div>
            <Header/>
            <h1>
                {props.userReducer.user.first_name?.charAt(0).toUpperCase()}
                {props.userReducer.user.last_name?.charAt(0).toUpperCase()}
            </h1>
            <div>
                <h2>First Name: {props.userReducer.user.first_name}</h2>
                <h2>Last Name: {props.userReducer.user.last_name}</h2>
                <h2>Email: {props.userReducer.user.email}</h2>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Profile)