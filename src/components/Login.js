import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { login } from '../redux/reducers/userReducer'
import { connect } from 'react-redux'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()

    const loginUser = () => {
        let body = { email, password }
        axios.post('/login', body)
            .then(res => {
                props.dispatch(login(res.data))
                history.push('/gallery')
            })
            .catch(err => {
                if(err.response?.status === 401) {
                    alert('Email not found. Please sign-up as a new user before logging in.')
                } else if(err.response?.status === 403) {
                    alert('Incorrect password. Please try again.')
                } else {
                    console.log(err)
                }
            })
    }

    return(
        <div>
            <header>
                <h1 className='logo'>ScrathGolf</h1>
            </header>
            <section>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email'/>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password'/>
            </section>
            <button onClick={loginUser}>Login</button>
        </div>
    )
}

export default connect()(Login)