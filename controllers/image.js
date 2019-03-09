const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'af6a822785194872a6ad58084c54e5b3'
 });

const handleApiCall = (req,res) => {              ///imageurl
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API.'))
}

const handleImage = (req, res, db) => { //image
  const {id,entries} = req.body;
  console.log("req.body image", req.body);
  console.log('faceCount api',entries);
  db('users').where('id','=',id)
    .increment('entries',entries) 
    .returning('entries')
    .then(entries=>{
      res.json(entries[0])
    })
    .catch(err => res.status(400).json("Unable to get entries"));
}

module.exports = {
  handleImage,
  handleApiCall
}