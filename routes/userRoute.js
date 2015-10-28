var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('dashboard', {
		 layout: 'auth_base',
    title: 'User Dashboard!',
  })
})

module.exports = router
