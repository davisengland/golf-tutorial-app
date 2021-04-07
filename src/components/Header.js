import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'

function Header(props) {
    // const { user } = useSelector(state => state.userReducer)
    const [user, setUser] = useState({})

    useEffect(async () => {
        await axios.get('/user')
            .then(res => {
                setUser(res.data)
                console.log(res.data)
            })
        },[])

    return(
        <div>
            <h1 className='logo'>ScrathGolf</h1>
            <Link to='/gallery'>Gallery</Link>
            <Link to='/'>Logout</Link>
            <h1>{user.first_name.charAt(0).toUpperCase()}{user.last_name.charAt(0).toUpperCase()}</h1>
        </div>
    )
}

export default connect()(Header)