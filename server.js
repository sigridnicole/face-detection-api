/*
--------------------------------------------------------------------------------
Server for Face Detection App using Clarifai API.
--------------------------------------------------------------------------------
Endpoints:
  
1. /signin - Validates the details of the user with the database. 
2. /image - Increments the number of image entries of the user in the database. 
3. /imageurl - Handles the API call for face detection.
4. /register - Inserts details of the new user in the database.
5. /profile/:id - Currently not being used by the app but is supposed to be a profile page dedicated to the user. 
--------------------------------------------------------------------------------
Modules / Dependencies:
1. express - web application server framework
2. body-parser - middleware used to extract the body from the incoming requests, in this app JSON data type
3. cors - middleware that can be used to enable CORS (Cross-origin resource sharing), during the development of this app allowing the front-end and back-end scripts communicate with each other from different ports.  
4. clarifai - source of the face detection API
5. bcrypt-nodejs - secures the user passwords by generating hashes
6. pg - PostgreSQL, db management used
7. nodemon - dev tool to automatically restart the app when changes are saved
8. knex - SQL query builder used for Postgres
--------------------------------------------------------------------------------
*/

const express = require("express");
const passport = require('passport');
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const db = require('./db/db');
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
require("./controllers/authorize");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working!"); // test server
});

app.post("/signin", (req, res) => {
  signin.signinAuthentication(req, res, db, bcrypt);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", passport.authenticate('jwt', { session: false }), (req, res) => {
  image.handleApiCall(req, res);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// build profile page in frontend and add authentication middleware
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});   
