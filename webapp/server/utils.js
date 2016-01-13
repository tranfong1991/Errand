const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;

//============================
//===== HELPER FUNCTIONS =====
//============================
module.exports = {
	handleNullResult : function(res){
		res.json({status: HTTP_NOT_FOUND, msg: 'Not found!'});
	},

	handleCreateError : function(res){
		res.json({status: HTTP_NOT_FOUND, msg: 'Cannot create!'});
	},

	handleRemoveError : function(res){
		res.json({status: HTTP_NOT_FOUND, msg: 'Cannot remove!'});
	},

	handleUpdateError :function(res){
		res.json({status: HTTP_NOT_FOUND, msg: 'Cannot update!'});
	},

	handleSuccess : function(res){
		res.json({status: HTTP_OK});
	},

	handleCreateSuccess : function(res, object){
		res.json({
		    status: HTTP_CREATED,
		    object_id: object._id
		});
	}
}
