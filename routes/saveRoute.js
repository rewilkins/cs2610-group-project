var express = require('express');
var request = require('request');
var body_parser = require('body-parser');
var Users = require('../models/users');
var router = express.Router();
var SEARCH_QUERY = ''


router.post('/', function(req, res) {
  SEARCH_QUERY = req.body.query

  id = req.session.userId

  Users.find(id, function(document) {
      document.tags = SEARCH_QUERY 
      Users.update(document, function(document) {

        res.redirect('/search')
      })
  })
})

module.exports = router
