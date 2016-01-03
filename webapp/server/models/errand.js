var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

//when using Date, need to call markModified() before save. Otherwise, mongoose is unaware of the change
var ErrandSchema = new Schema({
	"description": String,
	"start_time": {type: Date, default: Date.now},
	"end_time": Date,
	"compensation": {type: Number, min: 0},
	"is_taken": {type: Boolean, default: false},
	"location": String,
	"customer": {
		type: Schema.Types.ObjectId,
		ref: 'User'	//refer to actual User object
	},
	"runner": {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	"created_at": {type: Date, default: Date.now},
	"modified_at": {type: Date, default: Date.now}
});

//before saving, populate createdAt and modifiedAt fields
ErrandSchema.pre('save', function(next){
	var now = new Date();

	if(!this.created_at)
		this.created_at = now;
	this.modified_at = now;

	next();
});

//add paginate plugin to errand schema
ErrandSchema.plugin(mongoosePaginate);

ErrandSchema.index({description: "text", location: "text"});

var Errand = mongoose.model('Errand', ErrandSchema);

module.exports = Errand;
