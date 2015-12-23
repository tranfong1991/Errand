var path = require('path');
var errandController = require('./controllers/errand-controller');
var userController = require('./controllers/user-controller');

module.exports = function(app){
	//===== REST API =====

	//===== Errand =====
	app.get('/errandl', errandController.list);

	//===== User =====
	app.get('/userl', userController.list);

	//===== MAIN APPLICATION =====
	
	//return main page
	app.get('/', function(req, res){
		//use path.join to traverse __dirname up one dir in this case
		res.sendFile(path.join(__dirname, "../client/views/index.html"));
	});
}