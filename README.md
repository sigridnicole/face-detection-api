# FaceCounter BackEnd
Server for Face Detection App using Clarifai API.

### Endpoints
<ul>
  <li> /signin - Validates the details of the user with the database. </li>
  <li> /image - Increments the number of image entries of the user in the database. </li>
  <li> /imageurl - Handles the API call for face detection.</li>
  <li> /register - Inserts details of the new user in the database.</li>
  <li> /profile/:id - Currently not being used by the app but is supposed to be a profile page dedicated to the user. </li>
</ul> 

### Modules / Dependencies 
<ul>
  <li> express - web application server framework</li>
  <li> body-parser - middleware used to extract the body from the incoming requests, in this app JSON data type</li>
  <li> cors - middleware that can be used to enable CORS (Cross-origin resource sharing), during the development of this app allowing the front-end and back-end scripts communicate with each other from different ports. </li> 
  <li> clarifai - source of the face detection API</li>
  <li> bcrypt-nodejs - secures the user passwords by generating hashes</li>
  <li> pg - PostgreSQL, db management used</li>
  <li> nodemon - dev tool to automatically restart the app when changes are saved</li>
  <li> knex - SQL query builder used for Postgres</li>
<ul>