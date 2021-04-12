require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const usersCtrl = require('./controllers/usersController')
const tutorialsCtrl = require('./controllers/tutorialsController')
const historyCtrl = require('./controllers/historyController')

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

app.post('/signup', usersCtrl.signup)
app.post('/login', usersCtrl.login)
app.get('/user', usersCtrl.getUser)
app.post('/logout', usersCtrl.logout)
app.put('/user', usersCtrl.updateUser)
app.get('/tutorials', tutorialsCtrl.getTutorials)
app.get('/tutorials/:id', tutorialsCtrl.getTutorial)
app.post('/tutorials', tutorialsCtrl.addTutorial)
app.get('/history', historyCtrl.getHistory)
app.post('/history', historyCtrl.addToHistory)

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