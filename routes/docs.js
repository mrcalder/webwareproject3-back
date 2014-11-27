var path = require('path');
var express = require('express');
var router = express.Router();

/* GET the docs page */
router.get('/', function(req, res) {
  var p = __dirname.split("/").slice(0,-1).join("/");
  res.sendFile(p + "/public/docs.html");
});

/* GET the docs info */
router.get('/docs.json', function(req, res) {
  var to_send = {};

  to_send.swagger = '2.0';
  to_send.info = {};
  to_send.info.description = "This is the API for the data powering the project D of Webware course (B14) at WPI";
  to_send.info.version = "1.0.0";
  to_send.info.title = "Student Data";
  to_send.host = "";
  to_send.paths = {};

  // ----------------- documentation for the /locations path ----------------
  to_send.paths["/locations"] = {};
  to_send.paths["/locations"].get = {};
  to_send.paths["/locations"].get.tags = ["locations"];
  to_send.paths["/locations"].get.summary = "Get locations of all students from WPI during the 2013-2014 school year";
  to_send.paths["/locations"].get.description = "";
  to_send.paths["/locations"].get.operationId = "getAllLocations";
  to_send.paths["/locations"].get.consumes = ["application/json"];
  to_send.paths["/locations"].get.produces = ["application/json"];
  to_send.paths["/locations"].get.responses = {};
  to_send.paths["/locations"].get.responses["200"] = {};
  to_send.paths["/locations"].get.responses["200"].description = "successful operation";
  to_send.paths["/locations"].get.responses["200"].schema = { 'type' : 'array',
                                                              'items': {
                                                                '$ref' : '#/definitions/State'
                                                              }
                                                            };
  // ------------------ end /locations path ---------------------------


  // ----------------- documentation for the /locations/{year} path ----------------
  to_send.paths["/locations/{year}"] = {};
  to_send.paths["/locations/{year}"].get = {};
  to_send.paths["/locations/{year}"].get.tags = ["locations"];
  to_send.paths["/locations/{year}"].get.summary = "Get locations of all students from WPI during the 2013-2014 school year who graduate in {year}";
  to_send.paths["/locations/{year}"].get.description = "Returns proper data when year > 2014 and year < 2017";
  to_send.paths["/locations/{year}"].get.operationId = "getLocationsByYear";
  to_send.paths["/locations/{year}"].get.produces = ["application/json"];
  to_send.paths["/locations/{year}"].get.parameters = [{
    "in"          : "path",
    "name"        : "year",
    "description" : "the graduation year for the students to retrieve",
    "required"    : true,
    "type"        : 'integer'
  }];
  to_send.paths["/locations/{year}"].get.responses = {};
  to_send.paths["/locations/{year}"].get.responses["200"] = {};
  to_send.paths["/locations/{year}"].get.responses["200"].description = "successful operation";
  to_send.paths["/locations/{year}"].get.responses["200"].schema = { 'type' : 'array',
                                                                     'items': {
                                                                       '$ref' : '#/definitions/State'
                                                                     }
                                                                   };
  to_send.paths["/locations/{year}"].get.responses["400"] = {};
  to_send.paths["/locations/{year}"].get.responses["400"].description = "invalid year supplied";
  // ------------------ end /locations/{year} path ---------------------------


  // ----------------- documentation for the /majors path ----------------
  to_send.paths["/majors"] = {};
  to_send.paths["/majors"].get = {};
  to_send.paths["/majors"].get.tags = ["majors"];
  to_send.paths["/majors"].get.summary = "Get majors of all students from WPI during the 2013-2014 school year";
  to_send.paths["/majors"].get.description = "";
  to_send.paths["/majors"].get.operationId = "getAllLocations";
  to_send.paths["/majors"].get.consumes = ["application/json"];
  to_send.paths["/majors"].get.produces = ["application/json"];
  to_send.paths["/majors"].get.responses = {};
  to_send.paths["/majors"].get.responses["200"] = {};
  to_send.paths["/majors"].get.responses["200"].description = "successful operation";
  to_send.paths["/majors"].get.responses["200"].schema = { 'type' : 'array',
                                                              'items': {
                                                                '$ref' : '#/definitions/Major'
                                                              }
                                                            };
  // ------------------ end /majors path ---------------------------


  // ----------------- documentation for the /majors/{year} path ----------------
  to_send.paths["/majors/{year}"] = {};
  to_send.paths["/majors/{year}"].get = {};
  to_send.paths["/majors/{year}"].get.tags = ["majors"];
  to_send.paths["/majors/{year}"].get.summary = "Get majors of all students from WPI during the 2013-2014 school year who graduate in {year}";
  to_send.paths["/majors/{year}"].get.description = "Returns proper data when year > 2014 and year < 2017";
  to_send.paths["/majors/{year}"].get.operationId = "getLocationsByYear";
  to_send.paths["/majors/{year}"].get.produces = ["application/json"];
  to_send.paths["/majors/{year}"].get.parameters = [{
    "in"          : "path",
    "name"        : "year",
    "description" : "the graduation year for the students to retrieve",
    "required"    : true,
    "type"        : 'integer'
  }];
  to_send.paths["/majors/{year}"].get.responses = {};
  to_send.paths["/majors/{year}"].get.responses["200"] = {};
  to_send.paths["/majors/{year}"].get.responses["200"].description = "successful operation";
  to_send.paths["/majors/{year}"].get.responses["200"].schema = { 'type' : 'array',
                                                                     'items': {
                                                                       '$ref' : '#/definitions/Major'
                                                                     }
                                                                   };
  to_send.paths["/majors/{year}"].get.responses["400"] = {};
  to_send.paths["/majors/{year}"].get.responses["400"].description = "invalid year supplied";
  // ------------------ end /majors/{year} path ---------------------------




  // ------------------- schema definitions ---------------------------
  to_send.definitions = {};


  /* -------- State Definition -----------*/
  to_send.definitions.State = {};
  to_send.definitions.State.required = [
          'state',
          'count'
  ];
  to_send.definitions.State.properties = {};
  to_send.definitions.State.properties.state = { 'type'  : 'string',
                                                     'xml'   : { 'name' : 'state' } };
  to_send.definitions.State.properties.count = { 'type'  : 'integer',
                                                     'xml'   : { 'name' : 'count' } };
  to_send.definitions.State.xml = { "name" : "State" };
  /* ----------- end State --------------*/


  /* -------- Major Definition -----------*/
  to_send.definitions.Major = {};
  to_send.definitions.Major.required = [
          'major',
          'count'
  ];
  to_send.definitions.Major.properties = {};
  to_send.definitions.Major.properties.state = { 'type'  : 'string',
                                                     'xml'   : { 'name' : 'major' } };
  to_send.definitions.Major.properties.count = { 'type'  : 'integer',
                                                     'xml'   : { 'name' : 'count' } };
  to_send.definitions.Major.xml = { "name" : "Major" };
  /* ----------- end Major --------------*/

  // --------------------- end definitions ----------------------------

  res.send(to_send);
});

module.exports = router;
