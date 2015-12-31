var path = require('path');
var errandController = require('./controllers/errand-controller');
var userController = require('./controllers/user-controller');

module.exports = function(app){
	//====================
	//===== REST API =====
	//====================

	//cannot use /api/errands/search because it thinks the word 'search' is the id,
	//resulting in search() will never be called
	app.get('/api/search', errandController.search);

	//==================
	//===== Errand =====
	//==================

	app.get('/api/errands', errandController.listAll);
	app.get('/api/errands/:id', errandController.listOne);
	app.post('/api/errands', errandController.create);
	app.delete('/api/errands/:id', errandController.remove)
	app.put('/api/errands/:id', errandController.update);

	//================
	//===== User =====
	//================

	app.get('/api/users', userController.listAll);
	app.get('/api/users/:id', userController.listOne);
	app.post('/api/users', userController.create);
	app.delete('/api/users/:id', userController.remove);
	app.put('/api/users/:id', userController.update);

	//============================
	//===== MAIN APPLICATION =====
	//============================

	//return homepage
	app.get('/', function(req, res){
		res.render('pages/index');
	});

	//return search page
	app.get('/search', function(req, res){
		res.render('pages/search', {
			term:req.query.term
		});
	});
}
