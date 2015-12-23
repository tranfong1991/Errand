var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ErrandSchema = new Schema({
	description: String,
	startTime: String,
	endTime: String,
	compensation: Number,
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

var Errand = mongoose.model('Errand', ErrandSchema);

module.exports = Errand;