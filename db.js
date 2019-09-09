var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UserLogin');

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, { collection: 'userscollection' });

module.exports = { Mongoose: mongoose, UserSchema: userSchema };