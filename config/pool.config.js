const Pool = require("pg").Pool;

const pool = new Pool({
  user: "saagpsidxrrdjo",
  password: "3fceff2d35b4d95067c138a1f11a5fa95663a81655fe816534e0e36930cb3f85", //use your pass my friend
  database: "d16igv9ouc7rhc",
  host: "ec2-3-231-254-204.compute-1.amazonaws.com",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports.pool = pool;
