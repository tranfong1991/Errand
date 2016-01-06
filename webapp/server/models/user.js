var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "id": {  //user's Facebook ID
	type: String,
	required: true
    },
    "name": {
	type: String,
	required: true
    },
    "profile_pic_url": String,  //user's Facebook profile picture url
    "contact_info": [{type: String}],  //might include email and phone number
    "payment_account": String,  //Venmo account
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
