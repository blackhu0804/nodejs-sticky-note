//import { func } from '../../../.cache/typescript/2.6/node_modules/@types/assert-plus';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  res.send('respond with a abc');
});

router.post('/notes/add', function(req, res, next) {
  var note = req.body.note;
  console.log('addd', note);
})

router.post('/notes/edit', function(req, res, next) {

})

router.post('/notes/delete', function(req, res, next) {

})

module.exports = router;
