const db = require('./db')

const findByEmail = (email) => {
  return db.select('email').from('login')
    .where('email', '=', email)
    .then(data => {
      if (data) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => res.status(400).json(' Unauthorized '))
      } else {
        return Promise.reject(' Unauthorized.');
      }
    })
    .catch(err => err)
}

module.exports = { findByEmail }