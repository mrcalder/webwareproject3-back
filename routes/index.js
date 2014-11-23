var express = require('express');
var router = express.Router();
var database = require('../sql/database');

/* GET people data. */
router.get('/people', function(req, res) {
  // Send back a JSON representation of all person objects in the database.
  res.send(JSON.stringify(database.people()));
});

module.exports = router;
