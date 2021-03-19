const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API."));
};

const handleImage = (req, res, db) => {
  const { id, entries } = req.body;
  console.log("req.body image", req.body);
  console.log("faceCount api", entries);
  db("users")
    .where("id", "=", id)
    .increment("entries", entries)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};
