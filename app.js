var express 				= require('express')
	, exphbs			= require('express-handlebars')
	, path				= require('path')
	, request 		= require('request')
	, querystring = require('querystring')
	, session     = require('express-session')
	, cfg         = require('./config')
	, port     			= 3000
	, indexRoute			= require('./routes/indexRoute')
	, userRoute			= require('./routes/userRoute')
	, searchRoute			= require('./routes/searchRoute')
	, dashboardRoute	= require('./routes/dashboardRoute')
	, profileRoute	= require('./routes/profileRoute')
	, bodyParser		= require('body-parser')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute)
app.use('/user', userRoute)
app.use('/index', indexRoute)
app.use('/search', searchRoute)
app.use('/dashboard', dashboardRoute)
app.use('/profile', profileRoute)

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
