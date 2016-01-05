var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

//when using Date, need to call markModified() before save. Otherwise, mongoose is unaware of the change
var ErrandSchema = new Schema({
    "description": {type: String, required: true},
    "start_time": {type: Date}, //might not necessary
    "end_time": {type: Date, required: true},
    "compensation": {type: Number, min: 0},
    "is_taken": {type: Boolean, default: false},
    "destination": String,
    "customer": {
	required: true,
	type: Schema.Types.ObjectId,
	ref: 'User'	//refer to actual User object
    },
    "runner": {
	type: Schema.Types.ObjectId,
	ref: 'User'
    },
    "created_at": {type: Date},
    "modified_at": {type: Date}
});

//before saving, populate created_at, start_time, and modified_at fields
ErrandSchema.pre('save', function(next){
    var now = new Date();

    if(!this.created_at)
	this.created_at = now;

    if(!this.start_time)
	this.start_time = now;

    this.modified_at = now;

    next();
});

//add paginate plugin to errand schema
ErrandSchema.plugin(mongoosePaginate);

ErrandSchema.index({description: "text", location: "text"});

var Errand = mongoose.model('Errand', ErrandSchema);

module.exports = Errand;
