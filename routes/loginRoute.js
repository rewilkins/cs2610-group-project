var express= require('express');
var router = express.Router();

router.get('/index', function(req, res){
  res.render('dashboard',{
    layout: 'index',
    title: ' Login ',

  })
})
module.exports = router
