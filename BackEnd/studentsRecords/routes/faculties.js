var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        console.log('shrek1');
        var faculty = new models.Faculties(request.body.faculty);
        faculty.save(function (error) {
            if (error) response.send(error);
            response.json({faculty: faculty});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Department = request.query.filter;
        console.log('hello there');
        if (!Department) {
            console.log('hello again');
            models.Faculties.find(function (error, faculties) {
                if (error) response.send(error);
                response.json({faculty: faculties});
            });
        } else {
            console.log('you got queried');
            models.Faculties.find({"department": Department.department}, function (error, departments) {
                if (error) response.send(error);
                response.json({faculty: departments});
            });
        }
    });

router.route('/:faculty_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        console.log('shrek');
        models.Faculties.findById(request.params.faculty_id, function (error, faculty) {
            if (error) response.send(error);
            response.json({faculty: faculty});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        console.log('shrek2');
        models.Faculties.findById(request.params.faculty_id, function (error, faculty) {
            console.log('donkey');
            if (error) {
                response.send({error: error});
            }
            else {
                faculty.name = request.body.faculty.name;
                faculty.assess = request.body.faculty.assess;
                faculty.faculty = request.body.faculty.faculty;                
                faculty.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({faculty: faculty});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Faculties.findByIdAndRemove(request.params.faculty_id,
            function (error, deleted) {
                if (!error) {
                    response.json({faculty: deleted});
                }
            }
        );
    });

module.exports = router;
