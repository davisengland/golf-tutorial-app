const bcrypt = require("bcryptjs");

module.exports = {
  getTutorials: async (req, res) => {
    const db = req.app.get("db");
    const tutorials = await db.tutorials.get_tutorials();
    res.status(200).send(tutorials);
  },

  getTutorial: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const result = await db.tutorials.get_tutorial_by_id(id);
    const tutorial = result[0];
    res.status(200).send(tutorial);
  },

  addTutorial: async (req, res) => {
    const { embedId, description } = req.body;
    const db = req.app.get("db");
    const result = await db.tutorials.add_tutorial(embedId, description);
    const tutorial = result[0];
    res.status(200).send(tutorial);
  }
};
