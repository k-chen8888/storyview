/* Application variables */

// Set up the express app
var Express = require('express'),
	app = Express();

// Parses inputted HTML
var BodyParser = require('body-parser');

// Cookies
var CookieParser = require('cookie-parser'),
	ioCookieParser = require('socket.io-cookie');

// Set up socket.io
var http = require('http').Server(app),
	io = require('socket.io')(http),
	port = 3000;


/* Database setup */



/* Middleware */

// Cookies
app.use(CookieParser());

// Templating engine
app.set('view engine', 'jade');

// Static files
app.use(Express.static('views'));

// HTML parser
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
	extended: true
}));


/* Routes */

// Homepage
app.get('/', function(req, res) {
	res.render('index', {title: 'Home'});
});

// Read a chapter
app.get('/read', function(req, res) {
	//req.param['chapter'];
	res.render('index', {title: 'Under Construction'});
});


/* socket.io configuration */

// Uses cookies
io.use(ioCookieParser);

// socket.io configuration
io.on('connection', function(socket){
	// Nothing to do here!
});


/* Error handler */

// 404
app.get('*', function(req, res) {
	console.log('404: Page Not Found');
	
	res.render('index', {
		title: '404',
		display: '404: Page Not Found'
	});
});

// 500
app.use(function(err, req, res, next) {
	res.status(500);
	console.log('500: Internal Server Error');
	
	res.render('index', {
		title: '500',
		display: '500: Internal Server Error',
		error: err
	});
});


/* Server configuration */

// Listen on port ????
http.listen(port, function(){
	console.log('listening on *:' + port);
});