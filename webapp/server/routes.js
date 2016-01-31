var errandController = require('./controllers/errand-controller');
var userController = require('./controllers/user-controller');
var router = require('express').Router();
var request = require('request');

//====================
//===== REST API =====
//====================


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
router.get('/api/search', errandController.search)  //again, don't use api/errands/search because it thinks search is the id, thus search() is never called. DUH!

//================
//===== User =====
//================

router.get('/api/users', userController.listAll);
router.get('/api/users/:id', userController.listOne);
router.get('/api/users/:id/errands', userController.listErrands);
router.put('/api/users/:id/errands', userController.modifyErrandsList); 
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.remove);

//============================
//===== Main Application =====
//============================

var Errand = require('./models/errand');

//return homepage
router.get('/', function(req, res){
    //get client ip for location lookup
    var ip = req.headers['x-forwarded-for']||req.connection.remoteAddress;

    request('http://ip-api.com/json/' + ip, function(err, reply, body){
	var json = JSON.parse(body);

	if(json.status == 'success'){
	    Errand.paginate({
		$text:{
		    $search: json.city 
		}
	    }, {
		page: 1,
		limit: 10,
		select: 'customer description compensation',
		populate: {
		    path: 'customer runner',
		    select: '-_id name profile_pic_url contact_info'
		}
	    }, function(err, result){
		if(err || result == null)
		    res.render('pages/index', {
			location: json,
			response: {}
		    });
		else res.render('pages/index', {
		    location: json,
		    response: result
		});
	    });
	} else{
	    res.render('pages/index', {
		location: {},
		response: {}
	    });
	}
    });
});

//return search page
router.get('/search', function(req, res){
    Errand.paginate({
	$text:{
	    $search: req.query.term
	}
    }, {
	page: (req.query.page ? req.query.page : 1),
	limit: (req.query.limit ? req.query.limit : 20),
	select: 'customer description compensation',
	populate: {
	    path: 'customer',
	    select: '-_id name profile_pic_url contact_info'
	}
    }, function(err, result){
	if(err || result == null)
	    res.render('pages/search');
	else res.render('pages/search', {
	    term: req.query.term,
	    response: result
	});
    });
});

module.exports = router;
