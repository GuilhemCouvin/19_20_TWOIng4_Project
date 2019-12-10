var express = require("express");
var mongoose = require('mongoose');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/projetweb',{useNewUrlParser:true,useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("MongoDB database connection established succesfully !");
})

require('./models/User');
require('./models/Measure');
require('./models/Sensor');

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");
var sensorsRouter = require("./routes/sensors");
var measuresRouter = require("./routes/measures");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/index", indexRouter);

app.use("/users", usersRouter);
app.use("/sensors", sensorsRouter);
app.use("/measures", measuresRouter);

app.listen(3000);
console.log('Projet lancé sur le port 3000');

module.exports = app;
