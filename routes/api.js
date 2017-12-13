var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note;

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  Note.findAll({raw: true}).then( (notes) => {
    res.send({
      status: 0,
      data: notes
    })
  });
  
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
