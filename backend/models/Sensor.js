var mongoose = require('mongoose');

var sensorSchema = new mongoose.Schema({
    _id: String,
    creationDate: Date,
    location: String,
    userID: String
})

var Sensor = mongoose.model('Sensor',sensorSchema);

module.exports = Sensor;