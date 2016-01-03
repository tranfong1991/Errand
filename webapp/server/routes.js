var errandController = require('./controllers/errand-controller');
var userController = require('./controllers/user-controller');
var router = require('express').Router();

//====================
//===== REST API =====
//====================

//cannot use /api/errands/search because it thinks the word 'search' is the id,
//resulting in search() will never be called
router.get('/api/search', errandController.search);

//==================
//===== Errand =====
//==================

router.get('/api/errands', errandController.listAll);
router.get('/api/errands/:id', errandController.listOne);
router.post('/api/errands', errandController.create);
router.put('/api/errands/:id', errandController.update);
router.delete('/api/errands/:id', errandController.remove);
router.put('/api/errands/:id/take', errandController.take);
router.delete('/api/errands/:id/take', errandController.untake);

//================
//===== User =====
//================

router.get('/api/users', userController.listAll);
router.get('/api/users/:id', userController.listOne);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.remove);

//============================
//===== Main Application =====
//============================

//return homepage
router.get('/', function(req, res){
	res.render('pages/index');
});

//return search page
router.get('/search', function(req, res){
	res.render('pages/search', {
		term:req.query.term
	});
});

module.exports = router;
