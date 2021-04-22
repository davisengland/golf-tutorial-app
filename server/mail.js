const mailer = require('nodemailer')
const { Hello } = require('./hello')

const sendEmail = (email, first_name, last_name) => {
    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "mygolftutorials@gmail.com",
            pass: "Devmountain!"
        }
    })

    const data = {
        from: "mygolftutorials@gmail.com", 
        to: email, 
        subject: `Hello ${first_name}`,
        html: Hello(first_name, last_name)
    }

    smtpTransport.sendMail(data, function(error, res) {
        if(error) {
            console.log(error)
        } else {
            console.log("email sent successfully")
        }
        smtpTransport.close()
    })
}

module.exports = { sendEmail }