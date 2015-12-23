var Errand = require('../models/errand');

module.exports.create = function(req, res){
    var errand = new Errand(req.body);

    errand.save(function(err, result){
		res.send(200);
    });
}

module.exports.list = function(req, res){
    Errand.find({}, function(err, result){
    	Errand.populate(result, {path:'customer'}, function(err, result){
    		res.json(result);
    	});
    });
}