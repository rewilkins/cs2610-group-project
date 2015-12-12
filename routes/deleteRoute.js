var express = require('express');
var request = require('request');
var body_parser = require('body-parser');
var Users = require('../models/users');
var router = express.Router();
var SEARCH_QUERY = ''

router.get('/', function(req, res) {
  res.redirect('save')
})

router.post('/', function(req, res) {
  console.log(req.body)
  Users.deleteTag(id, req.body.tag, function(document) {
    res.redirect('/save')
})

})
module.exports = router
