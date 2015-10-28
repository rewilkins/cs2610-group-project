var express 				= require('express')
	, exphbs			= require('express-handlebars')
	, path				= require('path')
	, port     			= 3000
	, indexRoute			= require('./routes/indexRoute')
	, userRoute			= require('./routes/userRoute')
	, loginRoute			= require('./routes/loginRoute')
	, searchRoute			= require('./routes/searchRoute')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute)
app.use('/user', userRoute)
app.use('/dashboard', indexRoute)
app.use('/login', loginRoute)
app.use('/search', searchRoute)

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
