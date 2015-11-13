var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.access_token == null) {
    res.redirect('localhost:3000/')
  }
  else {

    query = 'preschool'

    var options = {
      url: 'https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=' + req.session.access_token + '&count=9'

    }

    request.get(options, function(error, response, body) {

      if (error) {
        console.log("error if 1")
        return next(error)
      }
      try {
        var feed = JSON.parse(body)
      }
      catch(err){
        console.log("error if 2")
        // return error if what we get back is HTML code
        return next(err) // displays the error on the page
        // return res.reditect('/') // just redirects to homepage
      }

      if (feed.meta.code > 200) {
        console.log("error code above 200")
        return next(feed.meta.error_message)
      }

      res.render('search', {
        title: 'Search',
        feed: feed.data
      })
    })
  }
})

module.exports = router
