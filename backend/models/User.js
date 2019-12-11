var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    // _id: String,
    location: String,
    personsInHouse: Number,
    houseSize: String,
})
  
var User = mongoose.model('User',userSchema);

module.exports = User; 