const express = require("express");
const cors = require("cors");

// init app
const app = express();
const localhostPort = 5000;
// activating cors
app.use(cors());

// json config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

exports.app = app;
exports.localhostPort = localhostPort;
