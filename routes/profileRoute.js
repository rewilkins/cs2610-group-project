var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  //console.log(req.session.access_token)
  if(req.session.access_token == null){
      res.render('index', {
      title: 'Home'
    })
  }
  else{
    res.render('profile', {
      title: 'Profile'
    })
  }
})

module.exports = router
