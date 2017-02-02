var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var studentsSchema = mongoose.Schema({
    number: String,
    firstName: String,
    lastName: String,
    DOB: Date,
    regComments: String,
    basis: String,
    admissionAvg: String,
    admissionComments: String,
    photo: String,
    genInfo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genders'
    },
    resInfo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Residencies'
    },
    transInfo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Transcripts'
    },
    awardInfo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Awards'
    }
});
studentsSchema.plugin(mongoosePaginate);

var standingSchema = mongoose.Schema({
    course: String,
    description: String,
    units: Number,
    grade: Number,
    location: String,
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }]
});

var awardSchema = mongoose.Schema({
    note: String,
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }]
});

var genderSchema = mongoose.Schema({
    name: String,
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }]
});

var residencySchema = mongoose.Schema({
    name: String,
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }]
});

var Students = mongoose.model('student', studentsSchema);
var Genders = mongoose.model('gender', genderSchema);
var Residencies = mongoose.model('residency', residencySchema);
var Standings = mongoose.model('standing', standingSchema);
var Awards = mongoose.model('award', awardSchema);

mongoose.connect('mongodb://main:main@ds139909.mlab.com:39909/se3350_wildcats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    exports.Students = Students;
    exports.Genders = Genders;
    exports.Residencies = Residencies;
    exports.Standings = Standings;
    exports.Awards = Awards;

});