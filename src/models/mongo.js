const mongoose = require('mongoose')

const emptySchema = new mongoose.Schema({},{ strict: false });

const Cars = mongoose.model('Car',emptySchema);
const Owners = mongoose.model('Owner',emptySchema);
const Users = mongoose.model('User',{
    email: String,
    password: String,
    avatar: String,
  });

module.exports = {
    Cars,
    Owners,
    Users,
}