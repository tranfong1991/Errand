module.exports.handleNullResult = function(res){
	res.json({status:400, msg:'not found!'});
}