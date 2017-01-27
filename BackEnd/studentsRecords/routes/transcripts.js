var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var transcript = new models.Transcripts(request.body.transcript);
        transcript.save(function (error) {
            if (error) response.send(error);
            response.json({transcript: transcript});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Student = request.query.filter;
        if (!Student) {
            models.Transcripts.find(function (error, transcripts) {
                if (error) response.send(error);
                response.json({transcript: transcripts});
            });
        } else {
            models.Transcripts.find({"student": Student.student}, function (error, students) {
                if (error) response.send(error);
                response.json({transcript: students});
            });
        }
    });

router.route('/:transcript_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Transcripts.findById(request.params.transcript_id, function (error, transcript) {
            if (error) response.send(error);
            response.json({transcript: transcript});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Transcripts.findById(request.params.transcript_id, function (error, transcript) {
            if (error) {
                response.send({error: error});
            }
            else {
                transcript.course = request.body.transcript.course;
                transcript.description = request.body.transcript.description;
                transcript.units = request.body.transcript.units;
                transcript.grade = request.body.transcript.grade;
                transcript.students = request.body.transcript.students;

                transcript.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({transcript: transcript});
                    }
                });
            }
        })
    });

module.exports = router;
