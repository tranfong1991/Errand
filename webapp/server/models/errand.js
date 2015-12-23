var mongoose = require('mongoose');

//mongo pluralizes nouns. In this case, mongo will put errand in collection 'errands'
module.exports = mongoose.model('errand', {
    name: String
});
