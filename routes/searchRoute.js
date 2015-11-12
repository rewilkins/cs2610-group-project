var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {


    if (req.session.access_token == null) {
      res.render('index', {
        title: 'Home'
      })
    } else {

      query = 'snow'

      var options = {
        url: 'https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=' + req.session.access_token + '&count=21'

      }

      request.get(options, function(error, response, body) {

        var results = JSON.parse(body)

        console.log(results.data)

        res.render('search', {
          title: 'Search',
          feed: results.data

        })
      })
    }
    })


module.exports = router
