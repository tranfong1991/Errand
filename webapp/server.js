var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database');

//mongo pluralizes nouns. In this case, mongo will put errand in collection 'errands'
mongoose.connect(database.url);

app.use(bodyParser.urlencoded({extended: true}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());	// parse application/json
app.use(express.static(__dirname + '/client')); //set static files location to /client. For example, /js will be /client/js

require('./server/routes')(app);

app.listen(3000, function(){
    console.log("Listening on port 3000...");
});
