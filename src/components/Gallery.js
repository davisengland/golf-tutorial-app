import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Header from './Header'
import { getTutorials } from '../redux/reducers/tutorialsReducer'
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/userReducer'

function Gallery(props) {
    let history = useHistory()

    const tutorialsMap = props.tutorialsReducer.tutorials.map(elem => {
        return(
            <div key={elem.embed_id}>
                <iframe
                    width='560' 
                    height='315' 
                    src={`https://www.youtube.com/embed/${elem.embed_id}`}
                    title='YouTube video player' 
                    frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
                    allowfullscreen>
                </iframe>
            </div>
        )
    })

    return(
        <div>
            <Header/>
            {tutorialsMap}
        </div>
    )
}

function mapStateToProps(state) {
    return state
  }

export default connect(mapStateToProps, {getUser, getTutorials})(Gallery)