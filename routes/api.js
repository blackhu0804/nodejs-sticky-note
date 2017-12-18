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
  if(!req.session.user){
    return res.send({status: 1, errorMsg: '请登录'});
  }
  
  var note = req.body.note;
  Note.create({text: note}).then( () => {
    res.send({status: 0})
  }).catch( () => {
    res.send({status: 1, errorMsg: '数据库出错'})    
  })
  console.log('addd', note);
})

router.post('/notes/edit', function(req, res, next) {
  if(!req.session.user){
    return res.send({status: 1, errorMsg: '请登录'});
  }
  
  Note.update({text: req.body.note}, {where: {id: req.body.id}}).then( () => {
    res.send({status: 0});
  }).catch( () => {
    res.send({status: 1, errorMsg: '数据库出错'})    
  })
})

router.post('/notes/delete', function(req, res, next) {
  if(!req.session.user){
    return res.send({status: 1, errorMsg: '请登录'});
  }

  Note.destroy({where: {id: req.body.id}}).then( () => {
    res.send({status: 0})
  }).catch( () => {
    res.send({status: 1, errorMsg: '数据库出错'})    
  })
})

module.exports = router;
