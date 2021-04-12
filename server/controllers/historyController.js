const bcrypt = require("bcryptjs");

module.exports = {
  getHistory: async (req, res) => {
    const db = req.app.get("db");
    const history = await db.history.get_history();
    res.status(200).send(history);
  },

  addToHistory: async (req, res) => {
      if(req.session.user) {
        const { embed_id } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get("db");
        const result = await db.history.add_to_history(
          embed_id,
          user_id
        );
        const tutorial = result[0];
        res.status(200).send(tutorial);
      }
  },
};
