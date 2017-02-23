var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var planCode = new models.PlanCodes(request.body.planCode);
        planCode.save(function (error) {
            if (error) response.send(error);
            response.json({planCode: planCode});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var ProgramRecord = request.query.filter;
        if (!ProgramRecord) {
            models.PlanCodes.find(function (error, planCodes) {
                if (error) response.send(error);
                response.json({planCode: planCodes});
            });
        } else {
            models.PlanCodes.find({"programRecord": ProgramRecord.programRecord}, function (error, programRecords) {
                if (error) response.send(error);
                response.json({planCode: programRecords});
            });
        }
    });

router.route('/:planCode_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.PlanCodes.findById(request.params.planCode_id, function (error, planCode) {
            if (error) response.send(error);
            response.json({planCode: planCode});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.PlanCodes.findById(request.params.planCode_id, function (error, planCode) {
            if (error) {
                response.send({error: error});
            }
            else {
                planCode.name = request.body.planCode.name;
                planCode.program = request.body.planCode.program
                planCode.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({planCode: planCode});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.PlanCodes.findByIdAndRemove(request.params.planCode_id,
            function (error, deleted) {
                if (!error) {
                    response.json({planCode: deleted});
                }
            }
        );
    });

module.exports = router;
