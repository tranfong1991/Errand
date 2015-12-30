const LIMIT_PER_PAGE = 12;

var Errand = require('../models/errand');
var utils = require('../utils');

module.exports = {
	create : function(req, res){
	    var errand = new Errand(req.body);

	    errand.save(function(err){
			if(err)
				utils.handleCreateError(res);
			else utils.handleSuccess(res);
	    });
	},

	listAll : function(req, res){
	    Errand.paginate({}, { page: (req.query.page ? req.query.page : 1), limit: LIMIT_PER_PAGE },
	    	function(err, result){
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
	},

	listOne : function(req, res){
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
	},

	search : function(req, res){
		Errand.find({
			$text:{
				$search: req.query.term
			}
		})
		.exec(function(err, result){
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
		Errand.update({id:req.params.id}, {$set:req.body}, function(err){
			if(err)
				utils.handleUpdateError(res);
			else utils.handleSuccess(res);
		});
	}
}
