var express = require('express');
var request = require('request');
var router = express.Router();
var SEARCH_QUERY = ''

router.get('/', function(req, res, next) {
  if (req.session.access_token == null) {
    res.redirect('localhost:3000/')
  } else {

    if (SEARCH_QUERY == '') {
      res.render('search', {
          title: 'Search',
          feed: {}
        })
      }
     else {


      var options = {
        url: 'https://api.instagram.com/v1/tags/' + SEARCH_QUERY + '/media/recent?access_token=' + req.session.access_token + '&count=9'

      }
      console.log(options.url)

      request.get(options, function(error, response, body) {

        if (error) {
          console.log("error if 1")
          return next(error)
        }
        try {
          var feed = JSON.parse(body)
        } catch (err) {
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
  }
})

router.post('/', function(req, res) {
  var input_data = req.body
  SEARCH_QUERY = input_data.query
  console.log('new query: ', SEARCH_QUERY)

  res.redirect('/search')

})

module.exports = router
