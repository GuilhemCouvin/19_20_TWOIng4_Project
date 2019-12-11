var mongoose = require('mongoose');

var measureSchema = new mongoose.Schema({
    measureID: Number,
    type: String,
    creationDate: Date,
    value: Number,
    sensorID: String,
})

var Measure = mongoose.model('Measure',measureSchema);

module.exports = Measure;