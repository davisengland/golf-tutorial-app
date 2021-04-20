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
    if(req.session.user) {
      let { new_email, new_first_name, new_last_name } = req.body;
      const db = req.app.get("db");

      if(new_email.length < 1) {
        new_email = req.session.user.email
      }
      if(new_first_name.length < 1) {
        new_first_name = req.session.user.first_name
      }
      if(new_last_name.length < 1) {
        new_last_name = req.session.user.last_name
      }
  
      const result = await db.users.update_user(
        new_email,
        new_first_name,
        new_last_name,
        req.session.user.user_id
      );
      const newUser = result[0];
  
      req.session.user = newUser;
      res.status(200).send(req.session.user);
    }
  },
};
