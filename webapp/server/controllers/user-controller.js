var User = require('../models/user');
var utils = require('../utils.js');

module.exports.create = function(req, res){
    var user = new User(req.body);

    user.save(function(err, result){
		res.send(200);
    });
}

module.exports.listAll = function(req, res){
    User.find({}, function(err, result){
    	if(result == null)
    		utils.handleNullResult(res);
		else res.json(result);
    });
}

module.exports.listOne = function(req, res){
	User.findById(req.params.id, function(err, result){
		if(result == null)
			utils.handleNullResult(res);
		else res.json(result);
	});
}