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
        ref: 'Standings'
    }],
    awardInfo: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Awards'
    }],
    highSchoolCourse: 
    [{
        type: mongoose.Schema.ObjectId,
        ref: 'HSCourseGrades'
    }],
    term: 
    [{
        type: mongoose.Schema.ObjectId,
        ref: 'Terms'
    }],
    adjudication:
    [{
        type: mongoose.Schema.ObjectId,
        ref: 'Adjudications'
    }],
});
studentsSchema.plugin(mongoosePaginate);

var standingSchema = mongoose.Schema({
    course: String,
    description: String,
    units: String,
    grade: String,
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
    courseInfo: [{
        type: mongoose.Schema.ObjectId,
        ref: ('CourseCodes')
    }]
});

var programRecordSchema = mongoose.Schema({
    name: String,
    level: String,
    load: String,
    status: String,
    term:[{
        type: mongoose.Schema.ObjectId,
        ref: ('TermCodes')
    }],
    plan:
    [{
        type: mongoose.Schema.ObjectId,
        ref: ('PlanCodes')
    }]
});

var courseCodeSchema = mongoose.Schema({
    courseLetter: String,
    courseNumber: String,
    name: String,
    unit: String,
    mark: {
        type: mongoose.Schema.ObjectId,
        ref: ('Grades')
    },
    term:{
        type: mongoose.Schema.ObjectId,
        ref: ('Terms')
    }

});

var planCodeSchema = mongoose.Schema({
    name: String,
    program:{
        type: mongoose.Schema.ObjectId,
        ref: ('ProgramRecords')
    }
});

var termSchema = mongoose.Schema({
    program:
    [{
        type: mongoose.Schema.ObjectId,
        ref: ('ProgramRecords')
    }],
    courseInfo:
    [{
        type: mongoose.Schema.ObjectId,
        ref: ('CourseCodes')
    }],
    term:
    {
        type: mongoose.Schema.ObjectId,
        ref: ('TermCodes')
    },
    student:
    {
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    },
    semester:
    [{
        type: mongoose.Schema.ObjectId,
        ref: ('Adjudications')
    }]
});

var termCodeSchema = mongoose.Schema({
    name: String,
    term: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Terms')
    }]
});

var adjudicationSchema = mongoose.Schema({
    date: String,
    termAVG: String,
    termUnitPassed: String,
    termUnitsTotal: String,
    note: String,
    semester: {
        type: mongoose.Schema.ObjectId,
        ref: ('Terms')
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: ('Students')
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: ('AssessmentCodes')
    }
});

var assessmentCodeSchema = mongoose.Schema({
    code: String,
    name: String,
    comment: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Adjudications')
    }],
    testExpression: [{
        type: mongoose.Schema.ObjectId,
        ref: ('LogicalExpressions')
    }],
    assess: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Facultys')
    }]
});

var logicalExpressionSchema = mongoose.Schema({
    booleanExp: String,
    logicalLink: String,
    testExpression: {
        type: mongoose.Schema.ObjectId,
        ref: ('AssessmentCodes')
    }
});

var facultySchema = mongoose.Schema({
    name: String,
    assess: {
        type: mongoose.Schema.ObjectId,
        ref: ('AssessmentCodes')
    },
    faculty: [{
        type: mongoose.Schema.ObjectId,
        ref: ('Departments')
    }]
});

var departmentSchema = mongoose.Schema({
    name: String,
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: ('Facultys')
    },
    dept: [{
        type: mongoose.Schema.ObjectId,
        ref: ('ProgramAdministrations')
    }]
});

var programAdministrationSchema = mongoose.Schema({
    name: String,
    position: String,
    dept: {
        type: mongoose.Schema.ObjectId,
        ref: ('Departments')
    }
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
var Terms = mongoose.model('term', termSchema);
var Adjudications = mongoose.model('adjudication', adjudicationSchema);
var AssessmentCodes = mongoose.model('assessmentCode', assessmentCodeSchema);
var LogicalExpressions = mongoose.model('logicalExpression',logicalExpressionSchema);
var Facultys = mongoose.model('faculty', facultySchema);
var Departments = mongoose.model('department', departmentSchema);
var ProgramAdministrations = mongoose.model('programAdministration', programAdministrationSchema);

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
    exports.Terms = Terms;
    exports.Adjudications = Adjudications;
    exports.AssessmentCodes = AssessmentCodes;
    exports.LogicalExpressions = LogicalExpressions;
    exports.Facultys = Facultys;
    exports.Departments = Departments;
    exports.ProgramAdministrations = ProgramAdministrations;

});
