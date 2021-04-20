require('dotenv').config()
const aws = require('aws-sdk')
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const usersCtrl = require('./controllers/usersController')
const tutorialsCtrl = require('./controllers/tutorialsController')
const historyCtrl = require('./controllers/historyController')
const videosCtrl = require('./controllers/practiceVideosController')
const { default: axios } = require('axios')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

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
app.get('/videos', videosCtrl.getVideos)
app.post('/videos', videosCtrl.addVideo)
app.delete('/videos', videosCtrl.deleteVideo)
app.get('/sign-s3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }

    const s3 = new aws.S3()
    const fileName = req.query['file-name']
    const fileType = req.query['file-type']
    const folderName = req.query['folder-name']
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `${folderName}/${fileName}`,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err) {
            console.log(err)
            return res.end()
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${folderName}/${fileName}`
        }
        return res.send(returnData)
    })
})
app.delete('/sign-s3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }

    const s3 = new aws.S3()
    const fileName = req.query['file-name']
    const folderName = req.query['folder-name']
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `${folderName}/${fileName}`
    }

    s3.deleteObject(s3Params, (err, data) => {
        if(err) {
            console.log(err, err.stack)
        } else {
            console.log(data)
        }
    })
})

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