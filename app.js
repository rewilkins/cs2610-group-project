var express 			= require('express')
	, exphbs			= require('express-handlebars')
	, request 			= require('request')
	, bodyParser		= require('body-parser')
	, querystring 		= require('querystring')
	, session     		= require('express-session')
	, path				= require('path')
	, cfg         		= require('./config')
	, indexRoute		= require('./routes/indexRoute')
	, userRoute			= require('./routes/userRoute')
	, searchRoute		= require('./routes/searchRoute')
	, dashboardRoute	= require('./routes/dashboardRoute')
	, profileRoute		= require('./routes/profileRoute')
	, port     			= 3000

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

// New session for user
app.use(session({
  cookieName: 'session',
  secret: 'something',
  resave: false,
  saveUninitialized: true
}))

app.get('/login', function(req, res) {
// created a new object
  var qs = {
	client_id: cfg.client_id,
	redirect_uri: cfg.redirect_uri,
	response_type: 'code'
  }

  var query = querystring.stringify(qs)

  var url = 'https://api.instagram.com/oauth/authorize/?' + query

  res.redirect(url)
})

app.get('/auth/finalize', function(req, res) {
  
  if(req.query.error == 'access_denied'){  // must validate like this or hackers can get in
		return res.redirect('/')  // return 'last line of code' will terminate the function at that line of code
  }
  
  var post_data = {
	client_id: cfg.client_id,
	client_secret: cfg.client_secret,
	redirect_uri: cfg.redirect_uri,
	grant_type: 'authorization_code',
	code: req.query.code
  }

  var options = {
	url: 'https://api.instagram.com/oauth/access_token',
	form: post_data
  }

  //for dashboard
  request.post(options, function(error, response, body) {
	var data = JSON.parse(body)
	req.session.access_token = data.access_token
	res.redirect('/dashboard')
  })
})

	//for dashboard
app.get('/dashboard', function(req, res, next) {
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed/?access_token=' + req.session.access_token
  }

  request.get(options, function(error, response, body) {
	
	if (error) {return next(error)}
	try {
	  var feed = JSON.parse(body)
	}
    catch(err){
	  // return error if what we get back is HTML code
	  return next(err) // displays the error on the page
	  // return res.reditect('/') // just redirects to homepage
	}

	if (feed.meta.code > 200) {return next(feed.meta.error_message)}
	
    res.render('dashboard', {
      feed: feed.data
    })
  })
})


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute)
app.use('/user', userRoute)
app.use('/index', indexRoute)
app.use('/search', searchRoute)
app.use('/dashboard', dashboardRoute)
app.use('/profile', profileRoute)

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
