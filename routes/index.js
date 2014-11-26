var express = require('express');
var router = express.Router();
var database = require('../sql/database');

// Send the data from a database query back to the browser.
function databaseCallback(res, data) {
  res.send(JSON.stringify(data));
}

/* GET location data. */
router.get('/locations', function(req, res) {
  // Create an array of all the state abbreviations.
  var states = ['AK','AL','AR','AZ','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA',
    'MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA',
    'RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'];

  // Initialize the query string to get the count for students from the first state.
  var queryString = 'select \'' + states[0] + '\' as state, count(*) as count from students where address regexp \'.+ ' +
      states[0] + ' [1-9]{5}$\'';

  // Iterate through the rest of the states to complete the query string.
  for (var i = 1; i < states.length; i++) {
    queryString = queryString + ' union select \'' + states[i] +
    '\' as state, count(*) as count from students where address regexp \'.+ ' + states[i] + ' [1-9]{5}$\'';
  }

  // Query the database for the locations of students graduating in the given year.
  database.query(res, queryString, {}, databaseCallback);
});

/* GET location data for a given graduation year. */
router.get('/locations/:year', function(req, res) {
  // Create an array of all the state abbreviations.
  var states = ['AK','AL','AR','AZ','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA',
    'MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA',
    'RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'];

  // Initialize the query string to get the count for students from the first state.
  var queryString = 'select \'' + states[0] + '\' as state, count(*) as count from students where address regexp \'.+ ' +
      states[0] + ' [1-9]{5}$\' and gradYear = :year';

  // Iterate through the rest of the states to complete the query string.
  for (var i = 1; i < states.length; i++) {
    queryString = queryString + ' union select \'' + states[i] +
    '\' as state, count(*) as count from students where address regexp \'.+ ' + states[i] + ' [1-9]{5}$\' and gradYear = :year';
  }

  // Query the database for the locations of students graduating in the given year.
  database.query(res, queryString, { year: req.param('year') }, databaseCallback);
});

/* GET major data. */
router.get('/majors', function(req, res) {
  // Create a query string to get all majors and their counts.
  var queryString = 'select major, count(*) as count from students join majors on majorId = id group by major';

  // Query the database for the majors of students graduating in the given year.
  database.query(res, queryString, {}, databaseCallback);
});

/* GET major data for a given graduation year. */
router.get('/majors/:year', function(req, res) {
  // Create a prepared query to prevent SQL injection.
  var queryString = 'select major, count(*) as count from students join majors on majorId = id where gradYear = :year group by major';

  // Query the database for the majors of students graduating in the given year.
  database.query(res, queryString, { year: req.param('year') }, databaseCallback);
});

module.exports = router;
