const mongoose = require('mongoose')

const emptySchema = new mongoose.Schema({});

const Cars = mongoose.model('Car',emptySchema);
const Owners = mongoose.model('Owner',emptySchema);

module.exports = {
    Cars,
    Owners
}