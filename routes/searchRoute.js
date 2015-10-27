var express = require('express');
var router = express.Router();

router.get('/search', function(req, res) {
console.log('got here')
  res.render('search', {
		 layout: 'baseSearch',
  })
})

module.exports = router
