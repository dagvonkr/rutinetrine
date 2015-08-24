var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');

var cors = require('cors');
var fs = require('fs');



var app = express();

var port = 8080;


//passport config
require('./config/passport.js')(passport);

//----------------------------------
//		configure mongo / mongoose
//----------------------------------
var configuredb = require('./config/database.js');

mongoose.connect(configuredb.url, function(err){
	if(err){
		console.log('error with mongoose');
	}
	else{
		console.log('goose = ready ');
	}
})
	

// ===================================
//		express - middleWare
//------------------------------------

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(__dirname + '/public'));

// app.use(cookie());


//passport - middleware
app.use(session( { secret: 'dagdagdag' }));
app.use(passport.initialize());
app.use(passport.session());






//====================================
//		api routes
//-----------------------------------
require('./App/routes.js')(app, passport);



app.listen(port, function(){
	console.log('app = ready', port);
})

