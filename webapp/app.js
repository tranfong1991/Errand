var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var errandController = require('./server/controllers/errand-controller');
var userController = require('./server/controllers/user-controller');

//mongo pluralizes nouns. In this case, mongo will put errand in collection 'errands'
mongoose.connect('mongodb://localhost/errand-app');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//shortens the path
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/font-awesome', express.static(__dirname + '/client/font-awesome'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/less', express.static(__dirname + '/client/less'));
app.use('/views', express.static(__dirname + '/client/views'));

//REST API
app.get('/', function(req, res){
	res.sendFile(__dirname + "/client/views/index.html");
});

app.get('/errandl', errandController.list);
app.get('/userl', userController.list);

app.listen(3000, function(){
    console.log("Listening on port 3000...");
});
