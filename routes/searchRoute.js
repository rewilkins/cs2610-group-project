var express = require('express');
var router = express.Router();

router.get('/search', function(req, res) {
  res.render('search', {
		// layout: 'auth_base',
    title: 'User Dashboard!'
  })
})

module.exports = router
