var Errand = require('../models/errand');
var User = require('../models/user');
var utils = require('../utils');

module.exports = {
    create : function(req, res){
	//find the customer's _id based on their Facebook Id, then do the saving
	User.findOne({id: req.body.customerId})
	    .select('_id')
	    .exec(function(err, result){
		if(err || result == null)
		    utils.handleNullResult(res);
		else{
		    var errand = new Errand({
			description: req.body.description,
			compensation: req.body.compensation,
			finish_by: req.body.finish_by,
			location: req.body.location,
			customer: result._id
		    });

		    errand.save(function(err){
			if(err)
			    utils.handleCreateError(res);
			else utils.handleCreateSuccess(res, errand);
		    }); 
		}
	    });
    },

    listAll : function(req, res){
	//if location is not empty, only return errand of that location. Otherwise, return all
	Errand.paginate(req.query.location ? {
	    $text:{ 
		$search: req.query.location 
	    }
	} : {}, {
	    page: (req.query.page ? req.query.page : 1),
	    limit: (req.query.limit ? req.query.limit : 10),
	    select: req.query.fields,
	    populate: {
		path: 'customer runner',	//populate customer and runner fields. Separated by space
		select: '-_id name profile_pic_url contact_info'	//only populate name, profile_pic_url, and contact_info of the above 2 fields. Also separated by space
	    }
	},
			function(err, result){
			    if(err || result == null)
				utils.handleNullResult(res);
			    else res.json(result);
			});
    },

    listOne : function(req, res){
	Errand.findById(req.params.id)
	    .select(req.query.fields)
	    .populate({
		path: 'customer runner',
		select: '-_id name profile_pic_url'
	    }).exec(function(err, result){
		if(err || result == null)
		    utils.handleNullResult(res);
		else res.json(result);
	    });
    },

    search : function(req, res){
	Errand.find({
	    $text:{
		$search: req.query.term
	    }
	}).exec(function(err, result){
	    if(err || result == null)
		utils.handleNullResult(res);
	    res.json(result);
	});
    },

    remove : function(req, res){
	Errand.remove({_id:req.params.id}, function(err){
	    if(err)
		utils.handleRemoveError(res);
	    else utils.handleSuccess(res);
	});
    },

    update : function(req, res){
	//$set operator is used to modify some of the field values
	Errand.update({_id: req.params.id}, {$set: req.body}, function(err){
	    if(err)
		utils.handleUpdateError(res);
	    else utils.handleSuccess(res);
	});
    },

    //called when a user takes an errand
    take : function(req, res){
	User.findOne({id: req.body.runnerId})
	    .select("_id")
	    .exec(function(err, result){
		if(err || result == null)
		    utils.handleNullResult(res);
		else{
		    Errand.update({_id: req.params.id}, {
		    	$set: {
		    	    is_taken: true,
		    	    runner: result._id	//no need to cast to ObjectId, it is automatically cast
		    	}
		    }, function(err){
		    	if(err)
		    	    utils.handleUpdateError(res);
		    	else utils.handleSuccess(res);
		    });
		}
	    });
    },

    //called when a user untake an errand
    untake : function(req, res){
	Errand.update({_id: req.params.id}, {
	    $set: {
		is_taken: false,
		runner: null
	    }
	}, function(err){
	    if(err)
		utils.handleRemoveError(res);
	    else utils.handleSuccess(res);
	});
    }
}
