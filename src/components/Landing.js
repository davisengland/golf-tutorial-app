import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { signup } from '../redux/reducers/userReducer'
import { connect } from 'react-redux'

function Landing(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    let history = useHistory()

    const signupUser = () => {
        let body = { email, password, first_name, last_name }
        axios.post('/signup', body)
            .then(res => {
                props.dispatch(signup(res.data))
                history.push('/gallery')
            })
            .catch(err => alert(`An account already exists for ${email}`))
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
    }

    return(
        <div className='landing'>
            <header>
                <h1 className='logo'>ScrathGolf</h1>
                <Link to='/login'><button>Login</button></Link>
            </header>
            <section>
                <h1>Sign up for your free Scratch Golf account</h1>
                <h2>Access to detailed tutorials and more!</h2>
                <div className='name'>
                    <input value={first_name} placeholder='First Name' onChange={e => setFirstName(e.target.value)}/>
                    <input value={last_name} placeholder='Last Name' onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className='email-password'>
                    <input value={email} placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                    <input value={password} placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                </div>
                <button onClick={signupUser}>Create Account</button>
            </section>
        </div>
    )
}

export default connect()(Landing)