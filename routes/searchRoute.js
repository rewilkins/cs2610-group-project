var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
console.log('Got it!')
  res.render('search', {

  })
})

module.exports = router
