var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('search', {
		 layout: 'baseSearch',
     title: 'Search'
  })
})

module.exports = router
