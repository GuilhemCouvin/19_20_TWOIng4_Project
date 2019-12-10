var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userID:Number,
    country: String,
    personsInHouse: Number,
    houseSize: String,
})
  
var User = mongoose.model('User',userSchema);

module.exports = User; 