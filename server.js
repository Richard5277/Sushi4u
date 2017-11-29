
///
///

var app = require('express')();
var http = require('http').Server(app);
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var io = require('socket.io')(http);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/sushi4u", {useMongoClient: true})

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/index.js')(app);

http.listen(8080, function(){
   console.log("Listening on 8080");
});


// io.on('connection', function(socket){
//     console.log('A user connected');

//     socket.on('disconnect', function() {
//         console.log('user disconnected');
//     });

//     messagesModelimpl.findAllMessages(function(err, result){
//         if(err){console.log("Failed to retraving all messages" + err.message);}
//         else {
//             io.emit("allMessages", result);
//         }
//     });

//     // socket.on('')
// });

