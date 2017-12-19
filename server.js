
///
///

var app = require('express')();
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var io = require('socket.io')(http);

var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var mongoURI = "mongodb://52.237.32.43:27017/sushi4u"
var options = { promiseLibrary: require('bluebird'), useMongoClient: true }

mongoose.connect(mongoURI, options, function () { /* ... */})
.then(() => {
    console.log("mongodb connection open")
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
})

app.set('port', 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/index.js')(app);

var http = require('http').Server(app);
http.listen(8080, function(){
   console.log("Listening on 8080");
});


