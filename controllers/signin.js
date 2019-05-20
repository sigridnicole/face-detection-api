const jwt = require("jsonwebtoken");

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days' });
  //change secret key
};

const setToken = (data, token) => {
  // save token to passport or redis
  return { data }
}

const createToken = (data) => {
  const { email, id } = data;
  const token = signToken(email);
  return setToken(data, token)
    .then((data) => data)
    .catch(console.log);
}

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
      }
    })
    .catch(err => err)
}

const signinAuthentication = (req, res, db, bcrypt) => {
  return handleSignin(db, bcrypt, req, res)
    .then(data =>
      data.id && data.email ? createToken(data) : Promise.reject(data))
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  signinAuthentication
};
