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
		else utils.handleSuccess(res);
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
    },

    //http://localhost:3000/api/users/:id/errands?category=listed
    //or
    //http://localhost:3000/api/users/:id/errands?category=taken
    listErrands: function(req, res){
	var category;

	if(req.query.category === 'listed'){
	    category = 'errands_listed';
	} else category = 'errands_taken';
	
	User.find({id: req.params.id})
	    .select(category)
	    .exec(function(err, result){
		if(result == null)
		    utils.handleNullResult(res);
		else res.json(result);
	    });
    },
    
    //combine add and delete errand. Because delete errand does not allow data in body, hence cannot know which errand to delete
    modifyErrandsList: function(req, res){
	if(req.body.method === 'add'){
	    User.update({id: req.params.id}, {$push: req.body.data}, function(err){
		if(err)
		    utils.handleUpdateError(res);
		else utils.handleSuccess(res);
	    });
	} else if(req.body.method === 'remove'){
	    User.update({id: req.params.id}, {$pull: req.body.data}, function(err){
		if(err)
		    utils.handleUpdateError(res);
		else utils.handleSuccess(res);
	    });    
	}
    }
}
