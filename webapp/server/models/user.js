var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	fbId: String,
	name: String,
	profilePicUrl: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;