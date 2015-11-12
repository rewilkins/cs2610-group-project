var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {

  console.log('search')
  console.log(req.session.access_token)

  if (req.session.access_token == null) {
    res.render('index', {
      title: 'Home'
    })
  } else {

    var options = {
      url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token

    }

    request.get(options, function(error, response, body) {

      var results = JSON.parse(body)

      res.render('search', {
        body: results.data

      })
    })

    res.render('search', {
      title: 'Search'
    })
  }
})

module.exports = router
