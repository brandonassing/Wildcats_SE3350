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
    transInfo: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Transcripts'
    }],
    awardInfo: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Awards'
    }],
    highSchoolCourses: 
    [{
        type: mongoose.Schema.ObjectId,
        ref: 'HSCourseGrades'
    }],
    marks:
    [{
        type: mongoose.Schema.ObjectId,
        ref: 'Grades'
    }]
});
studentsSchema.plugin(mongoosePaginate);

var standingSchema = mongoose.Schema({
    course: String,
    description: String,
    units: Number,
    grade: Number,
    location: String,
    student: {
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }
});

var awardSchema = mongoose.Schema({
    note: String,
    student: {
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }
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

var hsCourseGradeSchema = mongoose.Schema({
    mark: String,
    source: 
    {
        type: mongoose.Schema.ObjectId,
        ref: ('HighSchoolCourses')
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }
});

var highSchoolCourseSchema = mongoose.Schema({
    level: String,
    source: String,
    unit: String,
    school:
    {
        type: mongoose.Schema.ObjectId,
        ref: ('SecondarySchools')
    },
    course:
    {
        type: mongoose.Schema.ObjectId,
        ref: ('HighSchoolSubjects')
    },
    hsCourseGrades: [{
        type: mongoose.Schema.ObjectId,
        ref: ('HSCourseGrades')
    }]
});

var secondarySchoolSchema = mongoose.Schema({
    name: String,
    highSchoolCourses:[{
        type: mongoose.Schema.ObjectId,
        ref: ('HighSchoolCourses')
    }]
});

var highSchoolSubjectSchema = mongoose.Schema({
    name: String,
    description: String,
    highSchoolCourses:[{
        type: mongoose.Schema.ObjectId,
        ref: ('HighSchoolCourses')
    }]
});

var gradeSchema = mongoose.Schema({
    mark: String,
    note: String,
    level: {
        type: mongoose.Schema.ObjectId,
        ref: ('ProgramRecords')
    },
    student:{
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    }
});

var programRecordSchema = mongoose.Schema({
    name: String,
    level: String,
    load: String,
    status: String,
    courseInfo:
    {
        type: mongoose.Schema.ObjectId,
        ref: ('CourseCodes')
    },
    plans:
    [{
        type: mongoose.Schema.ObjectId,
        ref: ('PlanCodes')
    }],
    semester:{
        type: mongoose.Schema.ObjectId,
        ref: ('TermCodes')
    }, 
    marks:[{
        type: mongoose.Schema.ObjectId,
        ref: ('Grades')
    }]
});

var courseCodeSchema = mongoose.Schema({
    courseLetter: String,
    courseNumber: String,
    name: String,
    unit: String,
    programRecords:[{
        type: mongoose.Schema.ObjectId,
        ref: ('ProgramRecords')
    }]

});

var planCodeSchema = mongoose.Schema({
    name: String,
    programRecords:[{
        type: mongoose.Schema.ObjectId,
        ref: ('ProgramRecords')
    }]
});

var termCodeSchema = mongoose.Schema({
    name: String,
    programRecords:
    [{
        type: mongoose.Schema.ObjectId,
        ref: ('ProgramRecords')
    }]
});

var Students = mongoose.model('student', studentsSchema);
var Genders = mongoose.model('gender', genderSchema);
var Residencies = mongoose.model('residency', residencySchema);
var Standings = mongoose.model('standing', standingSchema);
var Awards = mongoose.model('award', awardSchema);
var HSCourseGrades = mongoose.model('hsCourseGrade', hsCourseGradeSchema);
var HighSchoolCourses = mongoose.model('highSchoolCourse', highSchoolCourseSchema);
var SecondarySchools = mongoose.model('secondarySchool',secondarySchoolSchema)
var HighSchoolSubjects = mongoose.model('highSchoolSubject', highSchoolSubjectSchema);
var Grades = mongoose.model('grade', gradeSchema);
var ProgramRecords = mongoose.model('programRecord', programRecordSchema);
var CourseCodes = mongoose.model('courseCode', courseCodeSchema);
var PlanCodes = mongoose.model('planCode', planCodeSchema);
var TermCodes = mongoose.model('termCode', termCodeSchema);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://main:main@ds139909.mlab.com:39909/se3350_wildcats');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    exports.Students = Students;
    exports.Genders = Genders;
    exports.Residencies = Residencies;
    exports.Standings = Standings;
    exports.Awards = Awards;
    exports.HSCourseGrades = HSCourseGrades;
    exports.HighSchoolCourses = HighSchoolCourses;
    exports.SecondarySchools = SecondarySchools;
    exports.HighSchoolCourses = HighSchoolCourses;
    exports.Grades = Grades;
    exports.ProgramRecords = ProgramRecords;
    exports.CourseCodes = CourseCodes;
    exports.PlanCodes = PlanCodes;
    exports.TermCodes = TermCodes;

});