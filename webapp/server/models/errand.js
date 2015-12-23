var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ErrandSchema = new Schema({
	name: String
});

var Errand = mongoose.model('Errand', ErrandSchema);

module.exports = Errand;
