var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//when using Date, need to call markModified() before save. Otherwise, mongoose is unaware of the change
var ErrandSchema = new Schema({
	description: String,
	startTime: {type: Date, default: Date.now},
	endTime: Date,
	compensation: {type: Number, min: 0},
	isTaken: Boolean,
	location: String,
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'User'	//refer to actual User object
	},
	runner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {type: Date, default: Date.now},
	modifiedAt: {type: Date, default: Date.now}
});

ErrandSchema.pre('save', function(next){
	var now = new Date();

	if(!this.createdAt)
		this.createdAt = now;
	this.modifiedAt = now;

	next();
});

var Errand = mongoose.model('Errand', ErrandSchema);

module.exports = Errand;