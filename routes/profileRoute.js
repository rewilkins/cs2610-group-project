var express = require('express');
var request = require('request');
var Users = require('../models/users')
var router = express.Router();

router.post('/', function(req, res, next){
  //console.log(res)
  id = req.session.userId

  Users.find(id, function(document) {
    if (!document) {
      res.redirect('/profile')
    } else {
      
      document.username = req.body.username
      document.bio = req.body.bio
      document.website = req.body.website
      document.full_name = req.body.full_name
      
      Users.update(document, function(){
          console.log('i updated')
          res.redirect('/profile')
      })      
    
    }
  })
  
})

router.get('/', function(req, res, next) {
  if(req.session.access_token == null){
      res.redirect('localhost:3000/')
  }
  else{
    
    id = req.session.userId
    
    Users.find(id, function(document) {
      if (document) {
//        pull from database
        
        res.render('profile', {
          title: 'Profile',
          feed: document
          //feed: feed.data
        })
        
        //res.render("profile", { document
        //  
        //  username: document.username,
        //  bio: document.bio,
        //  website: document.website,
        //  profile_picture: document.profile_picture,
        //  full_name: document.profile_picture
        //  
        //})
        console.log('im here')
        
        
        
        
      } else {
//      pull from instagram
      
        var options = {
          url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.session.access_token
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
          
          res.render('profile', {
            title: 'Profile',
            feed: feed.data
          })
        })
      }
    
    })
    
  }
})

module.exports = router
