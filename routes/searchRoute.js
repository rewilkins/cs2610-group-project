var express = require('express');
var request = require('request');
var session = require('express-session');
var router = express.Router();

router.get('/', function(req, res) {

      var options = {
        url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token

      }

      request.get(options, function(error, response, body) {

        var results = JSON.parse(body)
        console.log(req.session.access_token)
        console.log(body)

        res.render('search', {
          body: results.data

        })
      })

  })

      module.exports = router
