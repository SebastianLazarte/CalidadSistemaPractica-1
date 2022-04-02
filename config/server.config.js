const express = require("express");
const cors = require("cors");

// init app
let express = require('express');

let app1 = express();  // Compliant
app1.disable("x-powered-by");

let helmet = require("helmet");
let app = express(); // Compliant
app.use(helmet.hidePoweredBy());

const localhostPort = 5000;
// activating cors
const cors = require('cors');

let corsOptions = {
  origin: 'trustedwebsite.com' // Compliant
};
app.use(cors(corsOptions));

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
