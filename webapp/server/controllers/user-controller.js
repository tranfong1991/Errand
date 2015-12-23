var User = require('../models/user');

module.exports.create = function(req, res){
    var user = new User(req.body);

    user.save(function(err, result){
		res.send(200);
    });
}

module.exports.list = function(req, res){
    User.find({}, function(err, result){
		res.json(result);
    });
}