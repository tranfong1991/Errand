//===== HELPER FUNCTIONS =====
const HTTP_OK = 200;
const HTTP_NOT_FOUND = 400;

module.exports = {
	handleNullResult : function(res){
		res.json({status:HTTP_NOT_FOUND, msg:'Not found!'});
	},

	handleCreateError : function(res){
		res.json({status:HTTP_NOT_FOUND, msg:'Cannot create!'});
	},

	handleRemoveError : function(res){
		res.json({status:HTTP_NOT_FOUND, msg:'Cannot remove!'});
	},

	handleUpdateError :function(res){
		res.json({status:HTTP_NOT_FOUND, msg:'Cannot update!'});
	},

	handleSuccess : function(res){
		res.json({status:HTTP_OK});
	}
}