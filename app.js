var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fileUpload = require("express-fileupload");
var usersRouter = require('./routes/custom-faceapi');
const cors = require('cors');
const functions = require("firebase-functions");
var app = express();
var router = express.Router();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.options('*', cors()); 

app.use(
  fileUpload({
    useTempFiles: true
  })
)

app.get('/api', function(req, res) {
  return res.json({
    status: 200,
    message: "Hello world!"
  })
});

app.use('/api/faceapi', usersRouter);

module.exports = app;
//exports.api = functions.https.onRequest(app);