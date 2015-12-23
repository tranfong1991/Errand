var Errand = require('../models/errand');
var utils = require('../utils');

module.exports.create = function(req, res){
    var errand = new Errand(req.body);

    errand.save(function(err, result){
		res.send(200);
    });
}

module.exports.listAll = function(req, res){
    Errand.find({}, function(err, result){
    	if(result == null)
    		utils.handleNullResult(res);
    	else {
    	    Errand.populate(result, {path:'customer'}, function(err, result){
    	    	if(result == null)
    	    		utils.handleNullResult(res);
    	    	else res.json(result);
    		});
    	}
    });
}

module.exports.listOne = function(req, res){
	Errand.findById(req.params.id, function(err, result){
		if(result == null)
			utils.handleNullResult(res);
		else {
			Errand.populate(result, {path:'customer'}, function(err, result){
				if(result == null)
					utils.handleNullResult(res);
				else res.json(result);
			});
		}
	});
}