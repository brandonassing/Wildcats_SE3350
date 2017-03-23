var express = require('express');
var logger = require('./logger');
var app = express();

var students = require('./routes/students');
var residencies = require('./routes/residencies');
var genders = require('./routes/genders');
var standings = require('./routes/standings');
var awards = require('./routes/awards');
var users = require('./routes/users');
var passwords = require('./routes/passwords');
var roots = require('./routes/roots');
var rolePermissions = require('./routes/rolePermissions');
var roleCodes = require('./routes/roleCodes');
var logins = require('./routes/logins');
var userRoles = require('./routes/usersRoles');
var assessmentCodes = require('./routes/assessmentCodes');
var departments = require('./routes/departments');
var faculties = require('./routes/faculties');
var programAdministrations = require('./routes/programAdministrations');

app.use(function(request, response, next) {
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
app.use('/awards', awards);

app.use('/users', users);
app.use('/passwords', passwords);
app.use('/roleCodes', roleCodes);
app.use('/userRoles', userRoles);
app.use('/assessmentCodes',assessmentCodes);
app.use('/departments',departments);
app.use('/faculties',faculties);
app.use('/programAdministrations',programAdministrations);

app.use('/rolePermissions', rolePermissions);
app.use('/logins', logins);
app.use('/roots', roots);

app.listen(3700, function() {
    console.log('Listening on port 3700');
});