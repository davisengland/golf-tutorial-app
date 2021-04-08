import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'
import { getTutorials } from '../redux/reducers/tutorialsReducer'
import { connect } from 'react-redux'

function Gallery(props) {
    
    // const { user } = useSelector(state => state.userReducer)
    // const { tutorials } = useSelector(state => state.tutorialsReducer)
    // const { user_id } = user
    // const dispatch = useDispatch()

    // const [tutorials, setTutorials] = useState([])

    // useEffect(() => {
        
    // }, [])

    const tutorialsMap = props.tutorialsReducer.tutorials.map(elem => {
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
    })

    return(
        <div>
            {console.log(props)}
            <Header/>
            {tutorialsMap}
            {/* <iframe 
                width='560' 
                height='315' 
                src={`https://www.youtube.com/embed/${tutorials[0].embed_id}`}
                title='YouTube video player' 
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
                allowfullscreen>
            </iframe> */}
        </div>
    )
}

function mapStateToProps(state) {
    return state
  }

export default connect(mapStateToProps, {getTutorials})(Gallery)