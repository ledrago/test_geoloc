var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
    email : String,
    locations : {
        label: String,
        lng: Number,
        lat: Number
    }
});
module.exports = mongoose.model('User', User);