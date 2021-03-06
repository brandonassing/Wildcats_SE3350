var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({
    extended: false
});
var parseJSON = bodyParser.json();
var i = 0;
router.route('/find-student')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        if (request.query.number != null || Student.firstName != null || Student.lastName != null) {
            console.log('INIT');
            models.Students.find({
                "number": {
                    $regex: "^" + request.query.number
                },
                "firstName": {
                    $regex: "^" + request.query.firstName
                },
                "lastName": {
                    $regex: "^" + request.query.lastName
                }
            }, function (error, students) {
                if (error) response.send(error);
                response.json({
                    student: students
                });
            });

        }
    });
router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var student = new models.Students(request.body.student);
        student.save(function (error) {
            if (error) response.send(error);
            response.json({
                student: student
            });
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Standing = request.query.filter;
        //if (Standing != "") {
        if (!Standing) {
            /*models.Students.find(function (error, students) {
                if (error) response.send(error);
                response.json({
                    student: students
                });
            });*/
        } else {
            models.Students.find({
                "standing": Standing.standing
            }, function (error, standings) {
                if (error) response.send(error);
                response.json({
                    student: standings
                });
            });
        }
        // }
        if (typeof request.query.limit != "undefined" && typeof request.query.offset != "undefined") {
            var l = parseInt(request.query.limit);
            var o = parseInt(request.query.offset);
            var Student = request.query.student;
            if (!Student) {
                //models.Students.find(function (error, students) {
                //    if (error) response.send(error);
                //    response.json({student: students});
                //});
                models.Students.paginate({}, {
                        offset: o,
                        limit: l
                    },
                    function (error, students) {
                        if (error) response.send(error);
                        response.json({
                            student: students.docs
                        });
                    });

            } else {
                models.Students.find({
                    "residency": {
                        $regex: "^" + request.query.residency
                    }
                }, function (error, students) {
                    if (error) response.send(error);
                    response.json({
                        student: students
                    });
                });
                models.Standings.find({
                    "standing": Standing.standing
                }, function (error, standings) {
                    if (error) response.send(error);
                    response.json({
                        student: standings
                    });
                });
            }
        }
        if (typeof request.query.number != "undefined" && typeof request.query.firstName != "undefined" && typeof request.query.lastName != "undefined") {
            models.Students.find({
                "number": {
                    $regex: "^" + request.query.number
                },
                "firstName": {
                    $regex: "^" + request.query.firstName
                },
                "lastName": {
                    $regex: "^" + request.query.lastName
                }
            }, function (error, students) {
                if (error) response.send(error);
                console.log(students);
                response.json({
                    student: students
                });
            });
        }
    });

router.route('/:student_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Students.findById(request.params.student_id, function (error, student) {
            if (error) {
                response.send({
                    error: error
                });
            } else {
                response.json({
                    student: student
                });
            }
        });
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Students.findById(request.params.student_id, function (error, student) {
            if (error) {
                response.send({
                    error: error
                });
            } else {
                student.number = request.body.student.number;
                student.firstName = request.body.student.firstName;
                student.lastName = request.body.student.lastName;
                student.regComments = request.body.student.regComments;
                student.basis = request.body.student.basis;
                student.admissionAvg = request.body.student.admissionAvg;
                student.admissionComments = request.body.student.admissionComments;
                student.photo = request.body.student.photo;
                student.DOB = request.body.student.DOB;
                student.resInfo = request.body.student.resInfo;
                student.genInfo = request.body.student.genInfo;
                student.transInfo = request.body.student.transInfo;
                student.awardInfo = request.body.student.awardInfo;
                student.highSchoolCourse = request.body.student.highSchoolCourse;
                student.term = request.body.student.term;
                student.adjudication = request.body.student.adjudication;
                student.save(function (error) {
                    if (error) {
                        response.send({
                            error: error
                        });
                    } else {
                        response.json({
                            student: student
                        });
                    }
                });
            }
        });
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Students.findByIdAndRemove(request.params.student_id,
            function (error, deleted) {
                if (!error) {
                    response.json({
                        student: deleted
                    });
                }
            }
        );
    });

module.exports = router;