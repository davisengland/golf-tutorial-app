module.exports = {
  getVideos: async (req, res) => {
    if(req.session.user) {
        const db = req.app.get("db");
        const result = await db.videos.get_videos(req.session.user.user_id);
        res.status(200).send(result);
    } else {
        res.sendStatus(401)
    }
  },

  addVideo: async (req, res) => {
    if(req.session.user) {
        const { url } = req.body;
        const db = req.app.get("db");
        const result = await db.videos.add_video(url, req.session.user.user_id);
        res.status(200).send(result);
    }
  },

  deleteVideo: async (req, res) => {
      if(req.session.user) {
        const { url } = req.body
        const db = req.app.get('db')
        const result = await db.videos.delete_video(url, req.session.user.user_id)
        res.status(200).send(result)
      }
  }
};