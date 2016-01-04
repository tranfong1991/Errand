var Errand = require('../models/errand');
var utils = require('../utils');

module.exports = {
	create : function(req, res){
		var errand = new Errand(req.body);

		errand.save(function(err){
			if(err)
			utils.handleCreateError(res);
			else utils.handleCreateSuccess(res);
		});
	},

	listAll : function(req, res){
		Errand.paginate({}, {
			page: (req.query.page ? req.query.page : 1),
			limit: (req.query.limit ? req.query.limit : 10),
			select: req.query.fields,
			populate: {
				path: 'customer runner',	//populate customer and runner fields. Separated by space
				select: 'name profile_pic_url'	//only populate name and profilePicUrl of the above 2 fields. Also separated by space
			}
		},
		function(err, result){
			if(result == null)
			utils.handleNullResult(res);
			else res.json(result);
		});
	},

	listOne : function(req, res){
		Errand.findById(req.params.id)
		.select(req.query.fields)
		.populate({
			path: 'customer runner',
			select: 'name profile_pic_url'
		}).exec(function(err, result){
			if(result == null)
			utils.handleNullResult(res);
			else res.json(result);
		});
	},

	search : function(req, res){
		Errand.find({
			$text:{
				$search: req.query.term
			}
		})
		.exec(function(err, result){
		    if(err)
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
		Errand.update({_id: req.params.id}, {
			$set: {
				is_taken: true,
				runner: req.query.user	//no need to cast to ObjectId, it is automatically cast
			}
		}, function(err){
			if(err)
			utils.handleUpdateError(res);
			else utils.handleSuccess(res);
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
