///
///

var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var methodOverride = require('method-override')

require('dotenv').config()

/*
function createConnection (dbURL, options) {
	var db = mongoose.createConnection(dbURL, options);
	db.on('error', function (err) {
		if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
			console.log(new Date(), String(err))
			setTimeout(function () {
				console.log("Retrying first connect...");
				db.openUri(dbURL).catch(() => {});
			 }, 20 * 1000);
		} else {
			 console.error(new Date(), String(err));
		}
	});
	db.once('open', function () {
	        console.log("Connection to db established.");
	 });
	return db;
}
createConnection("mongodb://localhost:27017/sushi4u", {useMongoClient: true})
*/

mongoose.Promise = global.Promise

var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}

mongoose.connect("mongodb://localhost:27017/sushi4u", options)
mongoose.connection.on('error', console.error.bind(console, 'Mongo error:'))

// app.set('port', 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/index.js')(app);

 var http = require('http').Server(app);
 http.listen(8080, function(){
    console.log("Listening on 8080")
 });