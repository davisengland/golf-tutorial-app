require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controllers/controller')
// const usersCtrl = require('./controllers/usersCtrl')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.post('/signup', ctrl.signup)
app.post('/login', ctrl.login)
app.get('/user', ctrl.getUser)
app.post('/logout', ctrl.logout)
app.put('/user', ctrl.updateUser)
app.get('/tutorials', ctrl.getTutorials)
app.get('/tutorials/:id', ctrl.getTutorial)
app.post('/tutorials', ctrl.addTutorial)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
})
    .then(db => {
        app.set('db', db)
        app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))
    })
    .catch(err => console.log(err))