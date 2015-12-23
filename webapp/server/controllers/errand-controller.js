var Errand = require('../models/errand');

module.exports.create = function(req, res){
    var errand = new Errand({name:'texas a&m'});

    console.log('x');

    errand.save(function(err, result){
	res.json(result);
    });
}

module.exports.list = function(req, res){
    console.log('y');
    Errand.find({}, function(err, result){
	res.json(result);
    });
}
