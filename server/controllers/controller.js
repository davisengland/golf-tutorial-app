const bcrypt = require('bcryptjs')

module.exports = {
    signup: async (req, res) => {
        const { email, password, first_name, last_name } = req.body
        const db = req.app.get('db')
        const result = await db.get_user_by_email(email)
        const existingUser = result[0]

        if(existingUser) {
            return res.status(409).send(`An account already exists for ${email}`)
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const userSignup = await db.signup_user(email, hash, first_name, last_name)
        const newUser = userSignup[0]

        req.session.user = newUser
        
        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const db = req.app.get('db')
        const result = await db.get_user_by_email(email)
        const existingUser = result[0]

        if(!existingUser) {
            return res.status(401).send('Email not found. Please sign-up as a new user before logging in.')
        }

        const isAuth = bcrypt.compareSync(password, existingUser.hash)

        if(!isAuth) {
            return res.status(403).send('Incorrect password. Please try again.')
        }

        req.session.user = existingUser

        res.status(200).send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getUser: (req, res) => {
        if(!req.session.user) {
            res.sendStatus(404)
        }

        res.status(200).send(req.session.user)
    },

    updateUser: async (req, res) => {
        const { newEmail, newPassword, newFirst_name, newLast_name } = req.body
        let password = ''
        const db = req.app.get('db')

        const isAuth = bcrypt.compareSync(newPassword, req.session.user.hash)
        if(!isAuth) {
            password = newPassword
        } else {
            password = req.session.user.hash
        }

        const result = db.update_user(newEmail, password, newFirst_name, newLast_name, req.session.user.user_id)
        const newUser = result[0]

        req.session.user = newUser

        res.status(200).send(req.session.user)
    }
}