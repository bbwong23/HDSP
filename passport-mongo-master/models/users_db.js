
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	directoryId: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	studentLead: Boolean,
	admin: Boolean
});