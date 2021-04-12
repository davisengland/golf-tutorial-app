const bcrypt = require("bcryptjs");

module.exports = {
  signup: async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    const db = req.app.get("db");
    const result = await db.users.get_user_by_email(email);
    const existingUser = result[0];

    if (existingUser) {
      return res.status(409).send(`An account already exists for ${email}`);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userSignup = await db.users.signup_user(
      email,
      hash,
      first_name,
      last_name
    );
    const newUser = userSignup[0];

    req.session.user = newUser;
    res.status(200).send(req.session.user);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    const result = await db.users.get_user_by_email(email);
    const [existingUser] = result;

    if (!existingUser) {
      return res
        .status(401)
        .send(
          "Email not found. Please sign-up as a new user before logging in."
        );
    }

    const isAuth = bcrypt.compareSync(password, existingUser.hash);

    if (!isAuth) {
      console.log("403");
      return res.status(403).send("Incorrect password. Please try again.");
    }

    req.session.user = existingUser;
    res.status(200).send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.sendStatus(401);
    }
  },

  updateUser: async (req, res) => {
    const { newEmail, newPassword, newFirst_name, newLast_name } = req.body;
    let hash = "";
    const db = req.app.get("db");

    const isAuth = bcrypt.compareSync(newPassword, req.session.user.hash);
    if (!isAuth) {
      const salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(newPassword, salt);
    } else {
      hash = req.session.user.hash;
    }

    const result = db.users.update_user(
      newEmail,
      hash,
      newFirst_name,
      newLast_name,
      req.session.user.user_id
    );
    const newUser = result[0];

    req.session.user = newUser;
    res.status(200).send(req.session.user);
  },
};
