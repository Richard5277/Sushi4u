
///
///
var express = require('express')
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var port = 8080;
var methodOverride = require('method-override')
var config = require('./config/config')
var LOCAL_DB_URL = config.LOCAL_DB_URL

mongoose.connect("mongodb://52.233.44.67:27017/sushi4u" || LOCAL_DB_URL, {useMongoClient: true})
mongoose.connection.on('error', console.error.bind(console, 'Mongo error:'))

app.set('port', 8080);
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

app.listen(port)
console.log("Listening on 8080");

// var http = require('http').Server(app);
// http.listen(8080, function(){
//    console.log("Listening on 8080");
// });


