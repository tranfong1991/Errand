var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	id: String,
	name: String,
	profilePicUrl: String,
	paymentAccount: String,
	listedErrands: [{
		type: Schema.Types.ObjectId,
		ref: 'Errand'
	}],
	takenErrands: [{
		type: Schema.Types.ObjectId,
		ref: 'Errand'
	}]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;