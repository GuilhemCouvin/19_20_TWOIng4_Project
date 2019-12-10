var mongoose = require('mongoose');

var sensorSchema = new mongoose.Schema({
    sensorID: Number,
    creationDate: Date,
    userID: Number,
    location: String,
})

var Sensor = mongoose.model('Sensor',sensorSchema);

module.exports = Sensor;