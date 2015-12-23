var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var errandController = require('./server/controllers/errand-controller');
var userController = require('./server/controllers/user-controller');

mongoose.connect('mongodb://localhost:27017/errand-app');

app.use(bodyParser());

//shortens the path
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/font-awesome', express.static(__dirname + '/client/font-awesome'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/less', express.static(__dirname + '/client/less'));

//REST API
app.get('/errandl', errandController.list);
//    res.sendFile(__dirname + "/client/views/index.html");

app.post('/errandc', errandController.create);


app.get('/userl', userController.list);
//    res.sendFile(__dirname + "/client/views/index.html");

app.post('/userc', userController.create);


app.listen(3000, function(){
    console.log("Listening on port 3000...");
});
