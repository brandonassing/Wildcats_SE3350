
var express = require('express');
var logger = require('./logger');
var app = express();

var students = require('./routes/students');
var residencies = require('./routes/residencies');
var genders = require('./routes/genders');
var standings = require('./routes/standings');


app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(logger);
//app.use(express.static('public'));

app.use('/students', students);
app.use('/residencies', residencies);
app.use('/genders', genders);
app.use('/standings', standings);


app.listen(3700, function () {
    console.log('Listening on port 3700');
});
