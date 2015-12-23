var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	gender: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
