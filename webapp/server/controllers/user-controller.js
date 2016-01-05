var User = require('../models/user');
var utils = require('../utils.js');

module.exports = {
    create : function(req, res){
	//if user doesn't exist, insert. Otherwise, do nothing
	User.update(
	    {id: req.body.id},
	    {$setOnInsert: req.body},
	    {upsert: true},
	    function(err, numAffected){
		if(err)
		    utils.handleUpdateError(res);
		else utils.handleCreateSuccess(res);
	    });
    },

    listAll : function(req, res){
	User.find({})
	    .select(req.query.fields)
	    .exec(function(err, result){
		if(result == null)
		    utils.handleNullResult(res);
		else res.json(result);
	    });
    },

    listOne : function(req, res){
	User.find({id: req.params.id})
	    .select(req.query.fields)
	    .exec(function(err, result){
		if(result == null)
		    utils.handleNullResult(res);
		else res.json(result);
	    });
    },

    remove : function(req, res){
	User.remove({id:req.params.id}, function(err){
	    if(err)
		utils.handleRemoveError(res);
	    else utils.handleSuccess(res);
	});
    },

    update : function(req, res){
	User.update({id:req.params.id}, {$set:req.body}, function(err){
	    if(err)
		utils.handleUpdateError(res);
	    else utils.handleSuccess(res);
	});
    }
}
