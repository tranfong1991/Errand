var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database');
var routes = require('./server/routes');

//set the view engine to ejs
app.set('view engine', 'ejs');

//by default, res.render() looks at /views folder. Have to change it to /client folder
app.set('views', __dirname + '/client');

//mongo pluralizes nouns. In this case, mongo will put errand in collection 'errands'
mongoose.connect(database.url);	//connect to mongodb database

app.use(bodyParser.urlencoded({extended: true}));	//parse application/x-www-form-urlencoded
app.use(bodyParser.json());	//parse application/json
app.use(express.static(__dirname + '/client')); //set static files location to /client. For example, /js will be /client/js

//direct traffic to routes.js.
//Has to be after bodyParser or it won't parse json. Duh!!!
app.use('/', routes);

app.listen(3000, function(){
    console.log("Listening on port 3000...");
});
