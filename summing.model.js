const mongoose = require('mongoose')

const summingSchema = new mongoose.Schema({
    num1: Number,
    num2: Number,
    sum: Number,
});

module.exports = mongoose.model('Summing', summingSchema);
