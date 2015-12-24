var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	id: String,
	name: String,
	profilePicUrl: String,
	paymentAccount: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;