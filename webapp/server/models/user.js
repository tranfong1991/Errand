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
	"errands_listed": [{
		type: Schema.Types.ObjectId,
		ref: 'Errand'
	}],
	"errands_taken": [{
		type: Schema.Types.ObjectId,
		ref: 'Errand'
	}]
});

UserSchema.index({id: "text"});

var User = mongoose.model('User', UserSchema);

module.exports = User;
