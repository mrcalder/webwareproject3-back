var express = require('express');
var router = express.Router();
var database = require('../sql/database');

function peopleCallback(res, data) {
  res.send(JSON.stringify(data));
}

/* GET people data. */
router.get('/people', function(req, res) {
  // Send back a JSON representation of all person objects in the database.
  database.people(res, peopleCallback);
});

module.exports = router;
