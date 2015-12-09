var express = require('express');
var request = require('request');
var body_parser = require('body-parser')
var router = express.Router();
var SEARCH_QUERY = ''


router.post('/', function(req, res) {
  SEARCH_QUERY = req.body.query

  // add 

  return res.redirect('/search')

})

module.exports = router
