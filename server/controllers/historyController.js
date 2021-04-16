module.exports = {
  getHistory: async (req, res) => {
      if(req.session.user) {
        const db = req.app.get("db");
        const history = await db.history.get_history_for_user(req.session.user.user_id);
        res.status(200).send(history);
      } else {
          res.sendStatus(401)
      }
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
        res.status(200).send(result);
      }
  },
};
