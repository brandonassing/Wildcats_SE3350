var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var courseCode = new models.CourseCodes(request.body.courseCode);
        courseCode.save(function (error) {
            if (error) response.send(error);
            response.json({courseCode: courseCode});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var TermCode = request.query.filter;
        if (!TermCode) {
            models.CourseCodes.find(function (error, courseCode) {
                if (error) response.send(error);
                response.json({courseCode: courseCodes});
            });
        } else {
            models.CourseCodes.find({"termCode": TermCode.termCode}, function (error, termCodes) {
                if (error) response.send(error);
                response.json({courseCode: termCodes});
            });
        }
    });

router.route('/:courseCode_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.CourseCodes.findById(request.params.courseCode_id, function (error, courseCode) {
            if (error) response.send(error);
            response.json({courseCode: courseCode});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.CourseCodes.findById(request.params.courseCode_id, function (error, courseCode) {
            if (error) {
                response.send({error: error});
            }
            else {
                courseCode.courseLetter = request.body.courseCode.courseLetter;
                courseCode.courseNumber = request.body.courseCode.courseNumber;
                courseCode.name = request.body.courseCode.name;
                courseCode.unit = request.body.courseCode.unit;
                courseCode.mark = request.body.courseCode.mark;
                courseCode.courseNo = request.body.courseCode.courseNo;
                courseCode.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({courseCode: courseCode});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.CourseCodes.findByIdAndRemove(request.params.courseCode_id,
            function (error, deleted) {
                if (!error) {
                    response.json({courseCode: deleted});
                }
            }
        );
    });

module.exports = router;
