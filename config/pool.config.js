const Pool = require("pg").Pool;

const pool = new Pool({
  user: "dzuskbzshbdkna",
  password: "64a8ea20a16e3dc13445c55ae9c791bec47af524d3949783d7747e943b2fedf7", //use your pass my friend
  database: "d7qd1m74q5go7f",
  host: "ec2-54-158-26-89.compute-1.amazonaws.com",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports.pool = pool;