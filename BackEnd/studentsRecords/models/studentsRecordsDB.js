var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var studentsSchema = mongoose.Schema(
    {
        number: String,
        firstName: String,
        lastName: String,
        gender: Number,
        DOB: Date,
        photo: String,
        resInfo: {type: mongoose.Schema.ObjectId, ref: 'Residencies'},
        transInfo: {type: mongoose.Schema.ObjectId, ref: 'Transcripts'}
    }
);
studentsSchema.plugin(mongoosePaginate);

var transcriptSchema = mongoose.Schema(
    {
        course: String,
        description: String,
        units: Number,
        grade: Number,
        students: [{type: mongoose.Schema.ObjectId, ref: ('Students')}]
    }
);

var residencySchema = mongoose.Schema(
    {
        name: String,
        students: [{type: mongoose.Schema.ObjectId, ref: ('Students')}]
    }
);

var Students = mongoose.model('student', studentsSchema);
var Residencies = mongoose.model('residency', residencySchema);
var Transcripts = mongoose.model('transcript', transcriptSchema);

mongoose.connect('mongodb://localhost/studentsRecords');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    exports.Students = Students;
    exports.Residencies = Residencies;
    exports.Transcripts = Transcripts;

});



