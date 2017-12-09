var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/abc', function(req, res, next) {
  res.send('respond with a abc');
});

router.get('/def', function(req, res, next) {
  res.send('respond with a def');
});

module.exports = router;
