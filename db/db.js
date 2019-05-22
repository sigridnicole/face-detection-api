const knex = require("knex");

// const db = knex({
//   client: "pg",
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
//   }
// });

const db = knex({
  client: "pg",
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'psqlpsqlpsql',
    database: 'smartbrain'
  }
});

module.exports = db;