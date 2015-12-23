var path = require('path');
var errandController = require('./controllers/errand-controller');
var userController = require('./controllers/user-controller');

module.exports = function(app){
	//===== REST API =====

	//===== Errand =====
	app.get('/api/errands', errandController.listAll);
	app.get('/api/errands/:id', errandController.listOne);
	//app.post('/api/errands');

	//===== User =====
	app.get('/api/users', userController.listAll);
	app.get('/api/users/:id', userController.listOne);
	//app.post('/api/users');

	//===== MAIN APPLICATION =====

	//return main page
	app.get('/', function(req, res){
		//use path.join to traverse __dirname up one dir in this case
		res.sendFile(path.join(__dirname, "../client/views/index.html"));
	});
}