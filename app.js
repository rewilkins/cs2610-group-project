var express 				= require('express')
	, exphbs			= require('express-handlebars')
	, path				= require('path')
	, port     			= 3000
	// , indexRoutes		= require('./routes/index')
	, userRoutes			= require('./routes/userRoutes')
	, loginRoute			= require('./routes/loginRoute')
	, searchRoute			= require('./routes/searchRoute')


var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRoutes)
app.use('/user', userRoutes)
app.use('/login', loginRoute)
app.use('/search', searchRoute)


app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
