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
  var queryString = 'SELECT \'' + states[0] + '\' AS state, COUNT(*) AS count FROM students WHERE address REGEXP \'.+ ' +
      states[0] + ' [1-9]{5}$\'';

  // Iterate through the rest of the states to complete the query string.
  for (var i = 1; i < states.length; i++) {
    queryString = queryString + ' UNION SELECT \'' + states[i] +
    '\' AS state, COUNT(*) AS count FROM students WHERE address REGEXP \'.+ ' + states[i] + ' [1-9]{5}$\'';
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
  var queryString = 'SELECT \'' + states[0] + '\' AS state, COUNT(*) AS count FROM students WHERE address REGEXP \'.+ ' +
      states[0] + ' [1-9]{5}$\' AND gradYear = :year';

  // Iterate through the rest of the states to complete the query string.
  for (var i = 1; i < states.length; i++) {
    queryString = queryString + ' UNION SELECT \'' + states[i] +
    '\' AS state, COUNT(*) AS count FROM students WHERE address REGEXP \'.+ ' + states[i] + ' [1-9]{5}$\' AND gradYear = :year';
  }

  // Query the database for the locations of students graduating in the given year.
  database.query(res, queryString, { year: req.param('year') }, databaseCallback);
});

/* GET major data. */
router.get('/majors', function(req, res) {
  // Create a query string to get all majors and their counts.
  var queryString = 'SELECT major, COUNT(*) AS count FROM students JOIN majors ON majorId = id GROUP BY major';

  // Query the database for the majors of students graduating in the given year.
  database.query(res, queryString, {}, databaseCallback);
});

/* GET major data for a given graduation year. */
router.get('/majors/:year', function(req, res) {
  // Create a prepared query to prevent SQL injection.
  var queryString = 'SELECT major, COUNT(*) AS count FROM students JOIN majors ON majorId = id WHERE gradYear = :year GROUP BY major';

  // Query the database for the majors of students graduating in the given year.
  database.query(res, queryString, { year: req.param('year') }, databaseCallback);
});

/* GET review data. */
router.get('/reviews', function(req, res) {
  // Create a query string to get all reviews and their ratings.
  var queryString = 'SELECT * FROM reviews';

  // Query the database for the majors of students graduating in the given year.
  database.query(res, queryString, {}, databaseCallback);
});

/* POST new review data. */
router.post('/addReview', function(req, res) {
  // Create a query string to get all reviews and their ratings.
  var queryString = 'INSERT INTO reviews VALUES (\':review\', :rating)';

  // Query the database for the majors of students graduating in the given year.
  database.query(res, queryString, { review: req.param('review'), rating: req.param('rating') }, databaseCallback);
});

module.exports = router;
