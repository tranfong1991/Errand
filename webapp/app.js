var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + "/client/views/index.html");
});

app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/font-awesome', express.static(__dirname + '/client/font-awesome'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/fonts', express.static(__dirname + '/client/fonts'));
app.use('/less', express.static(__dirname + '/client/less'));

app.listen(3000, function(){
    console.log("Listening on port 3000...");
});
