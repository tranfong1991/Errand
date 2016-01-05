var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	"id": {
		type: String,
		required: true
	},
	"name": {
		type: String,
		required: true
	},
	"profile_pic_url": String,
	"payment_account": String,
	"listed_errands": [{
		type: Schema.Types.ObjectId,
		ref: 'Errand'
	}],
	"taken_errands": [{
		type: Schema.Types.ObjectId,
		ref: 'Errand'
	}]
});

UserSchema.index({id: "text"});

var User = mongoose.model('User', UserSchema);

module.exports = User;
