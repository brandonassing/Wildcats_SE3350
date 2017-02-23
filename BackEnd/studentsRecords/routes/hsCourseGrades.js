var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var hsCourseGrade = new models.HSCourseGrades(request.body.hsCourseGrade);
        hsCourseGrade.save(function (error) {
            if (error) response.send(error);
            response.json({hsCourseGrade: hsCourseGrade});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Student = request.query.filter;
        if (!Student) {
            models.HSCourseGrades.find(function (error, hsCourseGrades) {
                if (error) response.send(error);
                response.json({hsCourseGrade: hsCourseGrades});
            });
        } else {
            models.HSCourseGrades.find({"student": Student.student}, function (error, students) {
                if (error) response.send(error);
                response.json({hsCourseGrade: students});
            });
        }
    });

router.route('/:hsCourseGrade_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.HSCourseGrades.findById(request.params.hsCourseGrade_id, function (error, hsCourseGrade) {
            if (error) response.send(error);
            response.json({hsCourseGrade: hsCourseGrade});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.HSCourseGrades.findById(request.params.hsCourseGrade_id, function (error, hsCourseGrade) {
            if (error) {
                response.send({error: error});
            }
            else {
                hsCourseGrade.mark = request.body.hsCourseGrade.mark;
                hsCourseGrade.source = request.body.hsCourseGrade.source;
                hsCourseGrade.student = request.body.hsCourseGrade.student;

                hsCourseGrade.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({hsCourseGrade: hsCourseGrade});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.HSCourseGrades.findByIdAndRemove(request.params.hsCourseGrade_id,
            function (error, deleted) {
                if (!error) {
                    response.json({hsCourseGrade: deleted});
                }
            }
        );
    });

module.exports = router;
