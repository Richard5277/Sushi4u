
///
///

var app = require('express')();
var http = require('http').Server(app);
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var io = require('socket.io')(http);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://52.228.45.130:27017/sushi4u", {useMongoClient: true})

app.set('port', process.env.PORT || 8080);
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

http.listen(8080, function(){
   console.log("Listening on 8080");
});


