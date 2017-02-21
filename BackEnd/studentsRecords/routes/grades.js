var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var grade = new models.Grades(request.body.grade);
        grade.save(function (error) {
            if (error) response.send(error);
            response.json({grade: grade});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var grade = request.query.filter;
        if (!CourseCode) {
            models.Grades.find(function (error, grade) {
                if (error) response.send(error);
                response.json({grade: grades});
            });
        } else {
            models.Grades.find({"grade": Grade.grade}, function (error, grades) {
                if (error) response.send(error);
                response.json({grade: courseCodes});
            });
        }
    });

router.route('/:grade_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Grades.findById(request.params.grade_id, function (error, grade) {
            if (error) response.send(error);
            response.json({grade: grades});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Grades.findById(request.params.grade_id, function (error, grade) {
            if (error) {
                response.send({error: error});
            }
            else {
                grade.mark = request.body.grade.mark;
                grade.note = request.body.grade.note;
                grade.courseCode = request.body.grade.courseCode;
                grade.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({grade: grade});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Grades.findByIdAndRemove(request.params.grade_id,
            function (error, deleted) {
                if (!error) {
                    response.json({grade: deleted});
                }
            }
        );
    });

module.exports = router;
